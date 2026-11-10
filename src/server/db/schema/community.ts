import { pgTable, text, timestamp, boolean, uuid, integer, index } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const forumCategories = pgTable("forum_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").default("Sparkles"),
  sortOrder: integer("sort_order").default(0),
  isPrivate: boolean("is_private").default(false), // e.g. for initiated members
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const forumThreads = pgTable("forum_threads", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => forumCategories.id, { onDelete: "cascade" }),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  isPinned: boolean("is_pinned").default(false),
  isLocked: boolean("is_locked").default(false),
  viewCount: integer("view_count").default(0),
  lastReplyAt: timestamp("last_reply_at", { withTimezone: true }).defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("thread_category_idx").on(table.categoryId),
  index("thread_slug_idx").on(table.slug),
]);

export const forumPosts = pgTable("forum_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  threadId: uuid("thread_id")
    .notNull()
    .references(() => forumThreads.id, { onDelete: "cascade" }),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(), // Sanitized HTML via DOMPurify
  isSolution: boolean("is_solution").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("post_thread_created_idx").on(table.threadId, table.createdAt),
]);

export const forumReactions = pgTable("forum_reactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id")
    .notNull()
    .references(() => forumPosts.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull().default("like"), // like, pray, gratitude, fire
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const forumReports = pgTable("forum_reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id")
    .notNull()
    .references(() => forumPosts.id, { onDelete: "cascade" }),
  reporterId: text("reporter_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  reason: text("reason").notNull(),
  status: text("status").notNull().default("pending"), // pending, reviewed, dismissed, actioned
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
