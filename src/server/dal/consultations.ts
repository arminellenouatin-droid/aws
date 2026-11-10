import { db } from "@/server/db";
import { consultationTypes, practitioners } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import {
  DEFAULT_CONSULTATION_TYPES,
  DEFAULT_PRACTITIONERS,
  type StaticConsultationType,
  type StaticPractitioner,
} from "@/lib/constants/consultations";

export * from "@/lib/constants/consultations";

export async function getConsultationTypes(): Promise<StaticConsultationType[]> {
  try {
    const rows = await db
      .select()
      .from(consultationTypes)
      .where(eq(consultationTypes.isActive, true));

    if (rows.length > 0) {
      return rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        description: r.description || "",
        durationMinutes: r.durationMinutes,
        priceXof: r.priceXof,
        priceEur: r.priceEur,
        isFreeIntro: r.isFreeIntro,
        allowedFormats: r.allowedFormats as string[],
        category: r.isFreeIntro ? "free" : "guidance",
      }));
    }
  } catch (error) {
    // Graceful fallback to static data during build or if DB is offline
  }

  return DEFAULT_CONSULTATION_TYPES;
}

export async function getConsultationTypeBySlug(slug: string): Promise<StaticConsultationType | null> {
  const all = await getConsultationTypes();
  return all.find((c) => c.slug === slug) || null;
}

export async function getPractitioners(): Promise<StaticPractitioner[]> {
  try {
    const rows = await db
      .select()
      .from(practitioners)
      .where(and(eq(practitioners.isVerified, true), eq(practitioners.isActive, true)));

    if (rows.length > 0) {
      // Map rows if populated
    }
  } catch {
    // Fallback
  }

  return DEFAULT_PRACTITIONERS;
}

export async function getPractitionerBySlug(slug: string): Promise<StaticPractitioner | null> {
  const all = await getPractitioners();
  return all.find((p) => p.slug === slug) || null;
}
