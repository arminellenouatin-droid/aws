import { db } from "../db";
import { orders, payments } from "../db/schema/orders";
import { consultations } from "../db/schema/consultations";
import { eq } from "drizzle-orm";
import { createChariowCheckout, ChariowPulseEvent } from "@/lib/chariow/client";
import { logAuditEvent } from "../audit/logger";

interface InitiateOrderCheckoutParams {
  orderId: string;
  orderNumber: string;
  userId: string;
  amount: number;
  currency: "XOF" | "EUR";
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
  items: Array<{ name: string; quantity: number; unitPrice: number }>;
  locale: string;
}

export async function initiateOrderCheckout(params: InitiateOrderCheckoutParams) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const redirectUrl = `${siteUrl}/${params.locale}/checkout/success?order_id=${params.orderId}`;
  const cancelUrl = `${siteUrl}/${params.locale}/panier?cancelled=1`;

  const checkoutResult = await createChariowCheckout({
    amount: params.amount,
    currency: params.currency,
    customer: {
      email: params.customerEmail,
      name: params.customerName,
      phone: params.customerPhone,
    },
    items: params.items,
    redirectUrl,
    cancelUrl,
    metadata: {
      orderId: params.orderId,
      orderNumber: params.orderNumber,
      userId: params.userId,
      type: "order",
    },
  });

  if (!checkoutResult.success) {
    throw new Error(checkoutResult.error || "Impossible d'initialiser le paiement Chariow");
  }

  // Enregistrement de la tentative de paiement dans la base de données
  try {
    await db.insert(payments).values({
      orderId: params.orderId,
      userId: params.userId,
      provider: "chariow",
      providerPaymentRef: checkoutResult.checkoutId,
      amount: params.amount,
      currency: params.currency,
      status: "pending",
      idempotencyKey: `pay_${params.orderId}_${Date.now()}`,
      rawResponse: { checkoutResult },
    });
  } catch (err) {
    console.warn("⚠️ [PAYMENT_RECORD_ERROR] Impossible de créer la ligne payment en avance:", err);
  }

  return checkoutResult;
}

export async function handleChariowWebhookPulse(event: ChariowPulseEvent) {
  console.log(`🔔 [CHARIOW_PULSE] Événement reçu : ${event.event} (ID: ${event.data.id})`);

  const { id: paymentRef, status, amount, metadata, paymentMethod, currency } = event.data;

  const isSuccessful =
    event.event === "payment.succeeded" ||
    event.event === "checkout.completed" ||
    status === "succeeded" ||
    status === "paid";

  if (!isSuccessful) {
    console.log(`ℹ️ [CHARIOW_PULSE] Statut non-succès ignoré pour l'instant: ${status}`);
    return { status: "ignored" };
  }

  // 1. Réconciliation pour une COMMANDE boutique
  if (metadata?.orderId) {
    const orderId = metadata.orderId;
    console.log(`📦 [RECONCILIATION_ORDER] Mise à jour de la commande ${orderId} à l'état 'paid'`);

    await db
      .update(orders)
      .set({
        status: "paid",
        chariowRef: paymentRef,
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    // Mettre à jour ou insérer le paiement
    const existingPayment = await db
      .select({ id: payments.id })
      .from(payments)
      .where(eq(payments.providerPaymentRef, paymentRef))
      .limit(1);

    if (existingPayment.length > 0) {
      await db
        .update(payments)
        .set({
          status: "succeeded",
          paymentMethod: paymentMethod || "chariow_checkout",
          rawResponse: event.data,
          updatedAt: new Date(),
        })
        .where(eq(payments.id, existingPayment[0].id));
    } else {
      await db.insert(payments).values({
        orderId,
        userId: metadata.userId || "anonymous_or_guest",
        provider: "chariow",
        providerPaymentRef: paymentRef,
        amount,
        currency: currency || "XOF",
        status: "succeeded",
        paymentMethod: paymentMethod || "chariow_checkout",
        rawResponse: event.data,
      });
    }

    await logAuditEvent({
      userId: metadata.userId,
      action: "PAYMENT_VERIFIED",
      targetId: orderId,
      metadata: {
        amount,
        currency,
        chariowRef: paymentRef,
        type: "shop_order",
      },
    });

    return { status: "order_reconciled", orderId };
  }

  // 2. Réconciliation pour une CONSULTATION
  if (metadata?.consultationId) {
    const consultationId = metadata.consultationId;
    console.log(`🔮 [RECONCILIATION_CONSULTATION] Confirmation de la consultation ${consultationId}`);

    await db
      .update(consultations)
      .set({
        status: "confirmed",
        updatedAt: new Date(),
      })
      .where(eq(consultations.id, consultationId));

    await logAuditEvent({
      userId: metadata.userId,
      action: "PAYMENT_VERIFIED",
      targetId: consultationId,
      metadata: {
        amount,
        currency,
        chariowRef: paymentRef,
        type: "consultation_booking",
      },
    });

    return { status: "consultation_reconciled", consultationId };
  }

  return { status: "unhandled_metadata" };
}
