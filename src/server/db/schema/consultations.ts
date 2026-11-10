import { pgTable, text, timestamp, boolean, uuid, integer, numeric, uniqueIndex, index } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { practitioners } from "./practitioners";

export const consultationTypes = pgTable("consultation_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  durationMinutes: integer("duration_minutes").notNull().default(45),
  priceXof: integer("price_xof").notNull(), // Amount in FCFA (e.g. 25000)
  priceEur: integer("price_eur").notNull(), // Amount in EUR (e.g. 40)
  isFreeIntro: boolean("is_free_intro").notNull().default(false), // First free guidance check
  allowedFormats: text("allowed_formats").array().notNull().default(["chat", "audio", "video"]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const consultations = pgTable("consultations", {
  id: uuid("id").defaultRandom().primaryKey(),
  practitionerId: uuid("practitioner_id")
    .notNull()
    .references(() => practitioners.id, { onDelete: "restrict" }),
  clientId: text("client_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  typeId: uuid("type_id")
    .notNull()
    .references(() => consultationTypes.id, { onDelete: "restrict" }),
  status: text("status").notNull().default("pending"), // pending, confirmed, in_progress, completed, cancelled, no_show
  format: text("format").notNull().default("chat"), // chat, audio, video
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
  durationMinutes: integer("duration_minutes").notNull().default(45),
  clientNotes: text("client_notes"), // Sensitive client intent (encrypted in production)
  meetRoomId: text("meet_room_id"), // LiveKit room ID
  chariowPaymentRef: text("chariow_payment_ref"), // Reference from Chariow
  pricePaidXof: integer("price_paid_xof").default(0),
  cancellationReason: text("cancellation_reason"),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  // Unique constraint to prevent double-booking the same practitioner on the same slot
  uniqueIndex("practitioner_slot_unique_idx").on(table.practitionerId, table.scheduledAt),
  index("consultation_client_idx").on(table.clientId),
  index("consultation_status_idx").on(table.status),
  index("consultation_scheduled_idx").on(table.scheduledAt),
]);

export const consultationNotes = pgTable("consultation_notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  consultationId: uuid("consultation_id")
    .notNull()
    .references(() => consultations.id, { onDelete: "cascade" }),
  practitionerId: uuid("practitioner_id")
    .notNull()
    .references(() => practitioners.id, { onDelete: "cascade" }),
  summary: text("summary").notNull(),
  spiritualPrescription: text("spiritual_prescription"), // Rituels préconisés, conseils de purification
  isClientVisible: boolean("is_client_visible").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const consultationMessages = pgTable("consultation_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  consultationId: uuid("consultation_id")
    .notNull()
    .references(() => consultations.id, { onDelete: "cascade" }),
  senderId: text("sender_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  attachmentUrl: text("attachment_url"),
  isEncrypted: boolean("is_encrypted").notNull().default(true),
  readAt: timestamp("read_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("msg_consultation_created_idx").on(table.consultationId, table.createdAt),
]);

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  consultationId: uuid("consultation_id")
    .notNull()
    .references(() => consultations.id, { onDelete: "cascade" })
    .unique(),
  practitionerId: uuid("practitioner_id")
    .notNull()
    .references(() => practitioners.id, { onDelete: "cascade" }),
  clientId: text("client_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(), // 1 to 5
  comment: text("comment"),
  isApproved: boolean("is_approved").notNull().default(true), // Content moderation
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("review_practitioner_idx").on(table.practitionerId),
]);
