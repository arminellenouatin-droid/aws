import { pgTable, text, timestamp, boolean, uuid, integer, numeric, index } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const practitioners = pgTable("practitioners", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  slug: text("slug").notNull().unique(),
  spiritualTitle: text("spiritual_title").notNull(), // e.g. "Maître Spirituel Tradipraticien", "Guide Astrologique Vodoun"
  bioSummary: text("bio_summary").notNull(),
  fullBio: text("full_bio").notNull(),
  languages: text("languages").array().notNull().default(["fr"]),
  specialties: text("specialties").array().notNull().default([]), // e.g. ["Fa", "Guidance", "Protection", "Harmonisation"]
  yearsOfExperience: integer("years_of_experience").default(10),
  isVerified: boolean("is_verified").default(false),
  isActive: boolean("is_active").default(true),
  rating: numeric("rating", { precision: 3, scale: 2 }).default("5.00"),
  totalReviews: integer("total_reviews").default(0),
  avatarUrl: text("avatar_url"),
  verificationDocumentUrl: text("verification_document_url"), // Private S3 URL
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("practitioner_slug_idx").on(table.slug),
  index("practitioner_active_idx").on(table.isActive),
]);

export const practitionerAvailabilities = pgTable("practitioner_availabilities", {
  id: uuid("id").defaultRandom().primaryKey(),
  practitionerId: uuid("practitioner_id")
    .notNull()
    .references(() => practitioners.id, { onDelete: "cascade" }),
  dayOfWeek: integer("day_of_week").notNull(), // 0 (Sun) to 6 (Sat)
  startTime: text("start_time").notNull(), // "09:00"
  endTime: text("end_time").notNull(), // "18:00"
  slotDurationMinutes: integer("slot_duration_minutes").notNull().default(45),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("practitioner_avail_practitioner_idx").on(table.practitionerId),
]);
