import { pgTable, text, timestamp, boolean, uuid, jsonb } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  phone: text("phone"),
  country: text("country").default("BJ"), // ISO code (e.g. BJ, CI, SN, FR)
  city: text("city"),
  timezone: text("timezone").default("Africa/Porto-Novo"),
  locale: text("locale").default("fr"),
  bio: text("bio"),
  spiritualPreferences: jsonb("spiritual_preferences").$type<{
    interests?: string[];
    preferredFormat?: "chat" | "audio" | "video";
    newsletterOptIn?: boolean;
    ritualReminders?: boolean;
  }>(),
  isAgeConfirmed: boolean("is_age_confirmed").default(false), // 18+ required
  acceptedTermsAt: timestamp("accepted_terms_at", { withTimezone: true }),
  privacyConsentAt: timestamp("privacy_consent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
