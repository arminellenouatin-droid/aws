import DOMPurify from "isomorphic-dompurify";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory fallback cache (used when UPSTASH is not yet configured or during local dev)
const memoryCache = new Map<string, RateLimitRecord>();

// Periodically clean up expired entries from memory cache (every 60 seconds)
if (typeof setInterval !== "undefined") {
  const cleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, value] of memoryCache.entries()) {
      if (value.resetAt <= now) {
        memoryCache.delete(key);
      }
    }
  }, 60000);
  if (cleanup.unref) {
    cleanup.unref();
  }
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

/**
 * Extracts client IP from standard reverse-proxy headers.
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const ips = xForwardedFor.split(",");
    if (ips.length > 0 && ips[0].trim()) {
      return ips[0].trim();
    }
  }

  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  return "127.0.0.1";
}

/**
 * Unified rate-limiter: uses Upstash Redis REST if configured, falls back to memory sliding window.
 *
 * @param key Unique identifier (e.g., "auth:192.168.1.1" or "order:user_123")
 * @param limit Max allowed requests within the time window
 * @param windowSeconds Time window in seconds (default: 60s)
 */
export async function checkRateLimit(
  key: string,
  limit: number = 60,
  windowSeconds: number = 60
): Promise<RateLimitResult> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // 1. If Upstash Redis credentials are present, use Upstash REST API
  if (redisUrl && redisToken) {
    try {
      const fullKey = `ratelimit:${key}`;
      // Execute INCR and EXPIRE in a single pipeline or simple POST
      const incrRes = await fetch(`${redisUrl}/incr/${encodeURIComponent(fullKey)}`, {
        headers: { Authorization: `Bearer ${redisToken}` },
        cache: "no-store",
      });

      if (incrRes.ok) {
        const data = await incrRes.json();
        const currentCount = Number(data.result) || 1;

        if (currentCount === 1) {
          // Set TTL on first hit
          await fetch(
            `${redisUrl}/expire/${encodeURIComponent(fullKey)}/${windowSeconds}`,
            {
              headers: { Authorization: `Bearer ${redisToken}` },
              cache: "no-store",
            }
          );
        }

        const remaining = Math.max(0, limit - currentCount);
        const resetAt = Date.now() + windowSeconds * 1000;

        return {
          allowed: currentCount <= limit,
          limit,
          remaining,
          resetAt,
        };
      }
    } catch {
      // Degrade gracefully to in-memory fallback on network or Upstash error
    }
  }

  // 2. In-memory sliding window fallback
  const now = Date.now();
  const existing = memoryCache.get(key);

  if (!existing || existing.resetAt <= now) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetAt: now + windowSeconds * 1000,
    };
    memoryCache.set(key, newRecord);
    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetAt: newRecord.resetAt,
    };
  }

  existing.count += 1;
  const remaining = Math.max(0, limit - existing.count);

  return {
    allowed: existing.count <= limit,
    limit,
    remaining,
    resetAt: existing.resetAt,
  };
}

/**
 * Strips HTML, scripts, and potential XSS payloads using DOMPurify.
 */
export function sanitizeText(input: string): string {
  if (!input || typeof input !== "string") return "";
  return DOMPurify.sanitize(input.trim(), { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

/**
 * Honeypot bot detection: checks if a hidden field has been filled by a script.
 * @returns true if clean, false if detected as a bot submission.
 */
export function verifyHoneypot(
  body: Record<string, unknown>,
  fieldName: string = "website"
): boolean {
  const value = body[fieldName];
  // If the field is present and non-empty, it was filled by a naive automated bot
  if (typeof value === "string" && value.trim().length > 0) {
    return false;
  }
  return true;
}
