import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema/auth";
import { consents } from "@/server/db/schema/system";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, email, archetype, consent } = body;

    if (!email || !firstName) {
      return NextResponse.json(
        { error: "Prénom et adresse email requis pour recevoir l'analyse" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
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
        name: firstName.trim(),
        role: "client",
        emailVerified: false,
      });
    }

    if (consent) {
      await db.insert(consents).values({
        userId,
        consentType: "marketing_newsletter",
        granted: true,
        ipAddress: req.headers.get("x-forwarded-for") || undefined,
        userAgent: req.headers.get("user-agent") || undefined,
      });
    }

    return NextResponse.json({
      success: true,
      discountCode: "BIENVENUE-AWS-15",
      archetype,
      message: "Votre synthèse sacrée a été générée avec succès.",
    });
  } catch (error: any) {
    console.error("❌ [API_MARKETING_QUIZ_ERROR]", error);
    return NextResponse.json({
      success: true,
      discountCode: "BIENVENUE-AWS-15",
      archetype: "clarite",
    });
  }
}
