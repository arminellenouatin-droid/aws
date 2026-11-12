import crypto from "crypto";
import { checkRateLimit, sanitizeText, verifyHoneypot } from "../src/server/security/rate-limiter";
import { verifyChariowWebhookSignature } from "../src/lib/chariow/client";

async function runSmokeTests() {
  console.log("=================================================");
  console.log("   AWS : AFRICA WORLD SAVING — SMOKE TEST SUITE  ");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. Chariow Webhook HMAC-SHA256 signature test
  const webhookSecret = "test_webhook_secret_key_123";
  process.env.CHARIOW_WEBHOOK_SECRET = webhookSecret;
  const testPayload = JSON.stringify({ event: "payment.succeeded", id: "ch_test_123" });
  const validSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(testPayload)
    .digest("hex");

  assert(
    verifyChariowWebhookSignature(testPayload, validSignature, webhookSecret),
    "Chariow Webhook: valid HMAC signature accepted"
  );
  assert(
    !verifyChariowWebhookSignature(testPayload, "invalid_forged_signature", webhookSecret),
    "Chariow Webhook: forged HMAC signature rejected"
  );

  // 2. DOMPurify XSS Sanitization test
  const dirtyInput = "<script>alert('xss')</script>Bonjour <b>Guide</b>";
  const cleanInput = sanitizeText(dirtyInput);
  assert(
    !cleanInput.includes("<script>") && !cleanInput.includes("alert"),
    "Security: DOMPurify strips malicious scripts"
  );

  // 3. Honeypot Anti-Bot verification test
  const humanSubmission = { name: "Kwame", email: "kwame@example.com", website: "" };
  const botSubmission = { name: "SpamBot", email: "bot@spam.com", website: "http://spam.ru" };
  assert(verifyHoneypot(humanSubmission, "website"), "Anti-Bot: human submission with empty honeypot accepted");
  assert(!verifyHoneypot(botSubmission, "website"), "Anti-Bot: automated bot filling hidden honeypot blocked");

  // 4. Rate Limiter test
  const testIp = `test_ip_${Date.now()}`;
  const res1 = await checkRateLimit(testIp, 2, 60);
  assert(res1.allowed && res1.remaining === 1, "Rate Limiter: first request allowed");
  const res2 = await checkRateLimit(testIp, 2, 60);
  assert(res2.allowed && res2.remaining === 0, "Rate Limiter: second request allowed (limit reached)");
  const res3 = await checkRateLimit(testIp, 2, 60);
  assert(!res3.allowed, "Rate Limiter: third request blocked (429 Too Many Requests)");

  console.log("\n-------------------------------------------------");
  console.log(`Tests terminés : ${passed} réussis, ${failed} échoués.`);
  console.log("-------------------------------------------------\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runSmokeTests().catch((err) => {
  console.error("Erreur fatale smoke tests:", err);
  process.exit(1);
});
