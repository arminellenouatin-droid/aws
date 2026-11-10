import { db } from "@/server/db";
import { auditLogs } from "@/server/db/schema/system";

export type AuditAction =
  | "AUTH_LOGIN"
  | "AUTH_LOGOUT"
  | "AUTH_REGISTER"
  | "AUTH_PASSWORD_CHANGE"
  | "AUTH_2FA_ENABLE"
  | "CONSULTATION_BOOKED"
  | "CONSULTATION_CANCELLED"
  | "CONSULTATION_COMPLETED"
  | "PAYMENT_INITIATED"
  | "PAYMENT_VERIFIED"
  | "ORDER_PLACED"
  | "PRACTITIONER_VERIFIED"
  | "GDPR_DATA_EXPORT_REQUESTED"
  | "GDPR_DATA_DELETION_REQUESTED"
  | "ADMIN_ACTION";

export interface LogAuditOptions {
  userId?: string | null;
  action: AuditAction;
  targetType?: string;
  targetId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export async function logAuditEvent(options: LogAuditOptions): Promise<void> {
  try {
    // Ensure metadata does not contain sensitive passwords or raw tokens
    const sanitizedMetadata = options.metadata
      ? sanitizeAuditMetadata(options.metadata)
      : undefined;

    await db.insert(auditLogs).values({
      userId: options.userId ?? null,
      action: options.action,
      targetType: options.targetType,
      targetId: options.targetId,
      ipAddress: options.ipAddress,
      userAgent: options.userAgent,
      metadata: sanitizedMetadata,
    });
  } catch (error) {
    // We log but never throw an unhandled exception to prevent crashing critical flows
    console.error("[AUDIT_LOG_ERROR]", error);
  }
}

function sanitizeAuditMetadata(data: Record<string, unknown>): Record<string, unknown> {
  const sensitiveKeys = ["password", "token", "secret", "cvv", "creditCard", "refreshToken"];
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (sensitiveKeys.some((k) => key.toLowerCase().includes(k.toLowerCase()))) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeAuditMetadata(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}
