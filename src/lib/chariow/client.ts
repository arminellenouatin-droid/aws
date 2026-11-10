import crypto from "crypto";

export interface ChariowCustomer {
  email: string;
  name?: string;
  phone?: string;
}

export interface ChariowItem {
  name: string;
  quantity: number;
  unitPrice: number;
  description?: string;
}

export interface CreateCheckoutSessionParams {
  amount: number;
  currency: "XOF" | "EUR" | "USD";
  customer: ChariowCustomer;
  items?: ChariowItem[];
  redirectUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
  idempotencyKey?: string;
}

export interface CheckoutSessionResponse {
  success: boolean;
  checkoutUrl: string;
  checkoutId: string;
  error?: string;
}

export interface ChariowPulseEvent {
  event: "checkout.completed" | "payment.succeeded" | "payment.failed" | "subscription.activated";
  data: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    customer: {
      email: string;
      name?: string;
      phone?: string;
    };
    metadata?: {
      orderId?: string;
      consultationId?: string;
      userId?: string;
      type?: "order" | "consultation";
      [key: string]: any;
    };
    paymentMethod?: string;
    createdAt?: string;
  };
}

const CHARIOW_API_URL = process.env.CHARIOW_API_URL || "https://api.chariow.com/v1";
const CHARIOW_API_KEY = process.env.CHARIOW_API_KEY;
const CHARIOW_WEBHOOK_SECRET = process.env.CHARIOW_WEBHOOK_SECRET;

/**
 * Création d'une session de paiement sécurisée auprès de l'API Chariow.
 * Si CHARIOW_API_KEY n'est pas encore fournie (TODO_CLIENT), simule une URL de redirection sécurisée.
 */
export async function createChariowCheckout(
  params: CreateCheckoutSessionParams
): Promise<CheckoutSessionResponse> {
  const idempotencyKey = params.idempotencyKey || `idemp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  if (!CHARIOW_API_KEY || CHARIOW_API_KEY.includes("TODO")) {
    console.warn(
      "⚠️ [CHARIOW] Aucune clé API configurée (CHARIOW_API_KEY). Mode simulation activé pour le checkout."
    );
    const mockCheckoutId = `ch_sim_${Date.now()}`;
    const redirectUrlWithParam = new URL(params.redirectUrl);
    redirectUrlWithParam.searchParams.set("chariow_id", mockCheckoutId);
    if (params.metadata?.orderId) {
      redirectUrlWithParam.searchParams.set("order_id", params.metadata.orderId);
    }
    return {
      success: true,
      checkoutUrl: redirectUrlWithParam.toString(),
      checkoutId: mockCheckoutId,
    };
  }

  try {
    const res = await fetch(`${CHARIOW_API_URL}/checkout-sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHARIOW_API_KEY}`,
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency,
        customer: params.customer,
        items: params.items,
        redirect_url: params.redirectUrl,
        cancel_url: params.cancelUrl,
        metadata: params.metadata,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("❌ [CHARIOW_API_ERROR]", res.status, errBody);
      return {
        success: false,
        checkoutUrl: "",
        checkoutId: "",
        error: `Erreur Chariow (${res.status}): ${errBody}`,
      };
    }

    const data = await res.json();
    return {
      success: true,
      checkoutUrl: data.checkout_url || data.url,
      checkoutId: data.id || data.checkout_id,
    };
  } catch (err: any) {
    console.error("❌ [CHARIOW_FETCH_ERROR]", err);
    return {
      success: false,
      checkoutUrl: "",
      checkoutId: "",
      error: err.message || "Impossible de joindre le serveur de paiement Chariow",
    };
  }
}

/**
 * Vérification de la signature HMAC-SHA256 envoyée par Chariow dans les Webhooks ("Pulses").
 */
export function verifyChariowWebhookSignature(
  rawBody: string,
  signatureHeader: string | null
): boolean {
  if (!CHARIOW_WEBHOOK_SECRET || CHARIOW_WEBHOOK_SECRET.includes("TODO")) {
    console.warn("⚠️ [CHARIOW_WEBHOOK] Pas de CHARIOW_WEBHOOK_SECRET défini. Validation contournée en mode dev.");
    return true;
  }

  if (!signatureHeader) {
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", CHARIOW_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    const headerBuf = Buffer.from(signatureHeader, "utf8");
    const expectedBuf = Buffer.from(expectedSignature, "utf8");

    if (headerBuf.length !== expectedBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(headerBuf, expectedBuf);
  } catch (err) {
    console.error("❌ [CHARIOW_SIGNATURE_ERROR]", err);
    return false;
  }
}
