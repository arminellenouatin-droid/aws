import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema/auth";
import { consents } from "@/server/db/schema/system";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { checkRateLimit, getClientIp, sanitizeText, verifyHoneypot } from "@/server/security/rate-limiter";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: max 5 quiz submissions per IP per 5 minutes
    const rateCheck = await checkRateLimit(`quiz:${ip}`, 5, 300);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez patienter quelques minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Anti-bot honeypot check
    if (!verifyHoneypot(body, "website")) {
      return NextResponse.json({ success: true, discountCode: "BIENVENUE-AWS-15" });
    }

    const { firstName, email, archetype, consent } = body;

    if (!email || !firstName) {
      return NextResponse.json(
        { error: "Prénom et adresse email requis pour recevoir l'analyse" },
        { status: 400 }
      );
    }

    const cleanEmail = sanitizeText(email).toLowerCase();
    const cleanFirstName = sanitizeText(firstName);
    let userId: string;

    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, cleanEmail))
      .limit(1);

    if (existing.length > 0) {
      userId = existing[0].id;
    } else {
      userId = crypto.randomUUID();
      await db.insert(users).values({
        id: userId,
        email: cleanEmail,
        name: cleanFirstName,
        role: "client",
        emailVerified: false,
      });
    }

    if (consent) {
      await db.insert(consents).values({
        userId,
        consentType: "marketing_newsletter",
        granted: true,
        ipAddress: ip,
        userAgent: req.headers.get("user-agent") || undefined,
      });
    }

    return NextResponse.json({
      success: true,
      discountCode: "BIENVENUE-AWS-15",
      archetype,
      message: "Votre synthèse sacrée a été générée avec succès.",
    });
  } catch (error: unknown) {
    console.error("❌ [API_MARKETING_QUIZ_ERROR]", error);
    return NextResponse.json({
      success: true,
      discountCode: "BIENVENUE-AWS-15",
      archetype: "clarite",
    });
  }
}
