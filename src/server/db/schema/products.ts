import { pgTable, text, timestamp, boolean, uuid, integer, index } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  type: text("type").notNull().default("physical"), // physical, digital, ritual_kit, course
  priceXof: integer("price_xof").notNull(), // FCFA
  priceEur: integer("price_eur").notNull(), // EUR
  stock: integer("stock").notNull().default(0),
  images: text("images").array().notNull().default([]),
  category: text("category").notNull().default("encens"), // encens, huiles, talismans, livres, rituels
  isActive: boolean("is_active").notNull().default(true),
  isFeatured: boolean("is_featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("product_slug_idx").on(table.slug),
  index("product_category_idx").on(table.category),
  index("product_active_idx").on(table.isActive),
]);

export const productVariants = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  name: text("name").notNull(), // e.g. "Grand Format - 250ml"
  sku: text("sku").notNull().unique(),
  priceDeltaXof: integer("price_delta_xof").notNull().default(0),
  stock: integer("stock").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const productFiles = pgTable("product_files", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  fileKey: text("file_key").notNull(), // S3 object key
  fileSizeBytes: integer("file_size_bytes").notNull(),
  mimeType: text("mime_type").notNull(),
  maxDownloads: integer("max_downloads").default(5),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
