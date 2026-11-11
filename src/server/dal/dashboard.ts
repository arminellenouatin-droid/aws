import { db } from "../db";
import { users } from "../db/schema/auth";
import { consultations, consultationNotes } from "../db/schema/consultations";
import { orders, payments } from "../db/schema/orders";
import { journalEntries } from "../db/schema/content";
import { dataRequests, auditLogs } from "../db/schema/system";
import { forumReports } from "../db/schema/community";
import { practitioners } from "../db/schema/practitioners";
import { eq, desc } from "drizzle-orm";
import {
  ClientDashboardData,
  PractitionerDashboardData,
  AdminDashboardData,
  MOCK_CLIENT_DASHBOARD,
  MOCK_PRACTITIONER_DASHBOARD,
  MOCK_ADMIN_DASHBOARD,
} from "@/lib/constants/dashboard";
import { logAuditEvent } from "../audit/logger";

export async function getClientDashboardData(
  userId?: string
): Promise<ClientDashboardData> {
  if (!userId) {
    return MOCK_CLIENT_DASHBOARD;
  }

  try {
    // 1. User info
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return MOCK_CLIENT_DASHBOARD;
    }

    // 2. Journal entries
    const journalRows = await db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.userId, userId))
      .orderBy(desc(journalEntries.createdAt))
      .limit(10);

    const mappedJournal = journalRows.map((j) => ({
      id: j.id,
      title: j.title,
      content: j.content,
      mood: j.mood || "serene",
      createdAt: j.createdAt.toISOString(),
    }));

    // 3. GDPR requests
    const gdprRows = await db
      .select()
      .from(dataRequests)
      .where(eq(dataRequests.userId, userId))
      .orderBy(desc(dataRequests.createdAt));

    const mappedGdpr = gdprRows.map((g) => ({
      id: g.id,
      type: g.type as "export" | "deletion",
      status: g.status,
      createdAt: g.createdAt.toISOString(),
      downloadUrl: g.downloadUrl || undefined,
    }));

    return {
      user: {
        name: user.name || "Initié du Sanctuaire",
        email: user.email,
        role: user.role,
        points: 1500,
        referralCode: `AWS-${user.id.slice(0, 6).toUpperCase()}`,
      },
      upcomingConsultations: MOCK_CLIENT_DASHBOARD.upcomingConsultations,
      pastConsultations: MOCK_CLIENT_DASHBOARD.pastConsultations,
      orders: MOCK_CLIENT_DASHBOARD.orders,
      journalEntries: mappedJournal.length > 0 ? mappedJournal : MOCK_CLIENT_DASHBOARD.journalEntries,
      gdprRequests: mappedGdpr,
    };
  } catch (err) {
    console.warn("⚠️ [DASHBOARD_CLIENT_DAL] DB read error, fallback:", err);
    return MOCK_CLIENT_DASHBOARD;
  }
}

export async function getPractitionerDashboardData(
  userId?: string
): Promise<PractitionerDashboardData> {
  return MOCK_PRACTITIONER_DASHBOARD;
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  try {
    const recentAudit = await db
      .select({
        log: auditLogs,
        user: users,
      })
      .from(auditLogs)
      .leftJoin(users, eq(auditLogs.userId, users.id))
      .orderBy(desc(auditLogs.createdAt))
      .limit(10);

    if (recentAudit.length > 0) {
      const mappedLogs = recentAudit.map(({ log, user }) => ({
        id: log.id,
        action: log.action,
        userEmail: user?.email || "Système AWS",
        date: log.createdAt.toLocaleString("fr-FR"),
        details: log.targetType
          ? `${log.targetType} (#${log.targetId || "id"})`
          : "Action système",
      }));

      return {
        ...MOCK_ADMIN_DASHBOARD,
        auditLogs: mappedLogs,
      };
    }
  } catch (err) {
    console.warn("⚠️ [DASHBOARD_ADMIN_DAL] DB read error, fallback:", err);
  }

  return MOCK_ADMIN_DASHBOARD;
}

export async function saveJournalEntry(params: {
  userId: string;
  title: string;
  content: string;
  mood?: string;
}) {
  const [entry] = await db
    .insert(journalEntries)
    .values({
      userId: params.userId,
      title: params.title,
      content: params.content,
      mood: params.mood || "serene",
      isPrivate: true,
    })
    .returning();

  return entry;
}

export async function requestGdprAction(params: {
  userId: string;
  type: "export" | "deletion";
}) {
  const [req] = await db
    .insert(dataRequests)
    .values({
      userId: params.userId,
      type: params.type,
      status: "pending",
    })
    .returning();

  await logAuditEvent({
    userId: params.userId,
    action:
      params.type === "export"
        ? "GDPR_DATA_EXPORT_REQUESTED"
        : "GDPR_DATA_DELETION_REQUESTED",
    targetType: "user_data",
    targetId: params.userId,
  });

  return req;
}
