import { pgTable, text, timestamp, boolean, uuid, integer, jsonb, index } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { products, productVariants } from "./products";
import { consultations } from "./consultations";

export const carts = pgTable("carts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  guestToken: text("guest_token").unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  cartId: uuid("cart_id")
    .notNull()
    .references(() => carts.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "set null" }),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderNumber: text("order_number").notNull().unique(), // e.g. "AWS-2026-0001"
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  status: text("status").notNull().default("pending"), // pending, paid, processing, shipped, delivered, cancelled
  currency: text("currency").notNull().default("XOF"),
  totalAmount: integer("total_amount").notNull(),
  shippingAddress: jsonb("shipping_address").$type<{
    fullName: string;
    phone: string;
    street: string;
    city: string;
    country: string;
    postalCode?: string;
  }>(),
  chariowRef: text("chariow_ref"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("order_user_idx").on(table.userId),
  index("order_status_idx").on(table.status),
]);

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "restrict" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "set null" }),
  quantity: integer("quantity").notNull().default(1),
  unitPrice: integer("unit_price").notNull(),
});

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "set null" }),
  consultationId: uuid("consultation_id").references(() => consultations.id, { onDelete: "set null" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  provider: text("provider").notNull().default("chariow"),
  providerPaymentRef: text("provider_payment_ref").notNull().unique(), // Chariow pulse ID / checkout ref
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("XOF"),
  status: text("status").notNull().default("pending"), // pending, succeeded, failed, refunded
  paymentMethod: text("payment_method"), // mobile_money_mtn, mobile_money_moov, wave, card
  idempotencyKey: text("idempotency_key").unique(),
  rawResponse: jsonb("raw_response"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("payment_user_idx").on(table.userId),
  index("payment_ref_idx").on(table.providerPaymentRef),
]);

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  plan: text("plan").notNull(), // monthly_guidance, vip_circle
  status: text("status").notNull().default("active"), // active, past_due, canceled
  currentPeriodStart: timestamp("current_period_start", { withTimezone: true }).notNull(),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }).notNull(),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
  chariowSubscriptionRef: text("chariow_subscription_ref"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
