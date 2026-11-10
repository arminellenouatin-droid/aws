import { NextRequest, NextResponse } from "next/server";
import { verifyChariowWebhookSignature } from "@/lib/chariow/client";
import { handleChariowWebhookPulse } from "@/server/services/chariow-service";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature =
      req.headers.get("x-chariow-signature") ||
      req.headers.get("chariow-signature") ||
      req.headers.get("x-signature");

    const isValid = verifyChariowWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.warn("⚠️ [CHARIOW_WEBHOOK] Signature invalide reçue.");
      return NextResponse.json({ error: "Signature de webhook invalide" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const result = await handleChariowWebhookPulse(payload);

    return NextResponse.json({ received: true, result });
  } catch (error: any) {
    console.error("❌ [CHARIOW_WEBHOOK_HANDLER_ERROR]", error);
    return NextResponse.json(
      { error: error.message || "Erreur interne du webhook" },
      { status: 500 }
    );
  }
}
