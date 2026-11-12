import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { orders, orderItems } from "@/server/db/schema/orders";
import { products as productsTable } from "@/server/db/schema/products";
import { users } from "@/server/db/schema/auth";
import { eq } from "drizzle-orm";
import { initiateOrderCheckout } from "@/server/services/chariow-service";
import { SACRED_PRODUCTS } from "@/lib/constants/products";
import crypto from "crypto";
import { checkRateLimit, getClientIp } from "@/server/security/rate-limiter";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: max 10 checkout attempts per IP per 5 minutes
    const rateCheck = await checkRateLimit(`checkout:${ip}`, 10, 300);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Trop de requêtes de paiement. Veuillez patienter avant de réessayer." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { items, customer, shippingAddress, locale = "fr" } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Le panier est vide" }, { status: 400 });
    }

    if (!customer?.email) {
      return NextResponse.json(
        { error: "L'adresse email est requise pour la confirmation de commande" },
        { status: 400 }
      );
    }

    // 1. Trouver ou créer l'utilisateur (invité ou connecté)
    let userId: string;
    const existingUsers = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, customer.email.toLowerCase().trim()))
      .limit(1);

    if (existingUsers.length > 0) {
      userId = existingUsers[0].id;
    } else {
      userId = crypto.randomUUID();
      await db.insert(users).values({
        id: userId,
        email: customer.email.toLowerCase().trim(),
        name: customer.name || "Client Béni AWS",
        role: "client",
        emailVerified: false,
      });
    }

    // 2. Calculer le montant total et s'assurer que chaque produit est enregistré en BDD
    let totalXof = 0;
    const preparedOrderItems: Array<{
      productId: string;
      quantity: number;
      unitPrice: number;
      name: string;
    }> = [];

    for (const item of items) {
      const catalogProd = SACRED_PRODUCTS.find(
        (p) => p.id === item.product?.id || p.slug === item.product?.slug
      );
      if (!catalogProd) continue;

      // Vérification ou insertion dans la table products
      let dbProductId: string;
      const existingDbProd = await db
        .select({ id: productsTable.id })
        .from(productsTable)
        .where(eq(productsTable.slug, catalogProd.slug))
        .limit(1);

      if (existingDbProd.length > 0) {
        dbProductId = existingDbProd[0].id;
      } else {
        const [inserted] = await db
          .insert(productsTable)
          .values({
            slug: catalogProd.slug,
            name: catalogProd.name,
            shortDescription: catalogProd.shortDescription,
            fullDescription: catalogProd.fullDescription,
            type: catalogProd.type,
            priceXof: catalogProd.priceXof,
            priceEur: catalogProd.priceEur,
            stock: catalogProd.stock,
            category: catalogProd.category,
            isActive: true,
          })
          .returning({ id: productsTable.id });
        dbProductId = inserted.id;
      }

      const qty = Math.max(1, Number(item.quantity) || 1);
      const lineTotal = catalogProd.priceXof * qty;
      totalXof += lineTotal;

      preparedOrderItems.push({
        productId: dbProductId,
        quantity: qty,
        unitPrice: catalogProd.priceXof,
        name: catalogProd.name,
      });
    }

    if (preparedOrderItems.length === 0) {
      return NextResponse.json({ error: "Aucun article valide trouvé" }, { status: 400 });
    }

    // 3. Création de la commande
    const orderNumber = `AWS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const [newOrder] = await db
      .insert(orders)
      .values({
        orderNumber,
        userId,
        status: "pending",
        currency: "XOF",
        totalAmount: totalXof,
        shippingAddress: shippingAddress || {
          fullName: customer.name || "Client AWS",
          phone: customer.phone || "",
          street: "Livraison numérique / Standard",
          city: "Afrique & Monde",
          country: "Bénin",
        },
      })
      .returning({ id: orders.id, orderNumber: orders.orderNumber });

    // 4. Insertion des lignes de commande
    for (const line of preparedOrderItems) {
      await db.insert(orderItems).values({
        orderId: newOrder.id,
        productId: line.productId,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
      });
    }

    // 5. Initialisation du checkout Chariow
    const checkoutResult = await initiateOrderCheckout({
      orderId: newOrder.id,
      orderNumber: newOrder.orderNumber,
      userId,
      amount: totalXof,
      currency: "XOF",
      customerEmail: customer.email,
      customerName: customer.name,
      customerPhone: customer.phone,
      items: preparedOrderItems.map((p) => ({
        name: p.name,
        quantity: p.quantity,
        unitPrice: p.unitPrice,
      })),
      locale,
    });

    return NextResponse.json({
      success: true,
      orderId: newOrder.id,
      orderNumber: newOrder.orderNumber,
      checkoutUrl: checkoutResult.checkoutUrl,
    });
  } catch (error: any) {
    console.error("❌ [API_CHECKOUT_CHARIOW_ERROR]", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la génération de la commande" },
      { status: 500 }
    );
  }
}
