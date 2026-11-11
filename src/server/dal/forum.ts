import { db } from "../db";
import {
  forumCategories,
  forumThreads,
  forumPosts,
  forumReactions,
  forumReports,
} from "../db/schema/community";
import { users } from "../db/schema/auth";
import { eq, desc, asc } from "drizzle-orm";
import DOMPurify from "isomorphic-dompurify";
import {
  FORUM_CATEGORIES,
  INITIAL_THREADS,
  INITIAL_POSTS,
  ForumCategoryItem,
  ForumThreadItem,
  ForumPostItem,
} from "@/lib/constants/forum";

export async function getForumCategories(): Promise<ForumCategoryItem[]> {
  try {
    const rows = await db
      .select()
      .from(forumCategories)
      .orderBy(asc(forumCategories.sortOrder));

    if (rows.length > 0) {
      return rows.map((cat) => ({
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        icon: cat.icon || "Sparkles",
        sortOrder: cat.sortOrder || 0,
        threadsCount: 0,
        postsCount: 0,
      }));
    }
  } catch (err) {
    console.warn("⚠️ [FORUM_DAL] Erreur lecture categories DB, utilisation fallback:", err);
  }

  return FORUM_CATEGORIES;
}

export async function getForumCategoryBySlug(
  slug: string
): Promise<ForumCategoryItem | null> {
  const categories = await getForumCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function getRecentThreads(limit: number = 10): Promise<ForumThreadItem[]> {
  try {
    const rows = await db
      .select({
        thread: forumThreads,
        category: forumCategories,
        author: users,
      })
      .from(forumThreads)
      .innerJoin(forumCategories, eq(forumThreads.categoryId, forumCategories.id))
      .innerJoin(users, eq(forumThreads.authorId, users.id))
      .orderBy(desc(forumThreads.isPinned), desc(forumThreads.lastReplyAt))
      .limit(limit);

    if (rows.length > 0) {
      return rows.map(({ thread, category, author }) => ({
        id: thread.id,
        categorySlug: category.slug,
        categoryName: category.name,
        title: thread.title,
        slug: thread.slug,
        authorName: author.name || "Initié du Cercle",
        authorRole: author.role === "practitioner" ? "Guide Référent" : "Membre",
        authorAvatar: author.image || undefined,
        isPinned: !!thread.isPinned,
        isLocked: !!thread.isLocked,
        viewCount: thread.viewCount || 0,
        repliesCount: 0,
        lastReplyAt: thread.lastReplyAt?.toISOString() || new Date().toISOString(),
        createdAt: thread.createdAt.toISOString(),
        firstPostContent: "",
      }));
    }
  } catch (err) {
    console.warn("⚠️ [FORUM_DAL] Erreur lecture recent threads DB, fallback:", err);
  }

  return INITIAL_THREADS.slice(0, limit);
}

export async function getThreadsByCategory(categorySlug: string): Promise<ForumThreadItem[]> {
  try {
    const rows = await db
      .select({
        thread: forumThreads,
        category: forumCategories,
        author: users,
      })
      .from(forumThreads)
      .innerJoin(forumCategories, eq(forumThreads.categoryId, forumCategories.id))
      .innerJoin(users, eq(forumThreads.authorId, users.id))
      .where(eq(forumCategories.slug, categorySlug))
      .orderBy(desc(forumThreads.isPinned), desc(forumThreads.lastReplyAt));

    if (rows.length > 0) {
      return rows.map(({ thread, category, author }) => ({
        id: thread.id,
        categorySlug: category.slug,
        categoryName: category.name,
        title: thread.title,
        slug: thread.slug,
        authorName: author.name || "Initié du Cercle",
        authorRole: author.role === "practitioner" ? "Guide Référent" : "Membre",
        authorAvatar: author.image || undefined,
        isPinned: !!thread.isPinned,
        isLocked: !!thread.isLocked,
        viewCount: thread.viewCount || 0,
        repliesCount: 0,
        lastReplyAt: thread.lastReplyAt?.toISOString() || new Date().toISOString(),
        createdAt: thread.createdAt.toISOString(),
        firstPostContent: "",
      }));
    }
  } catch (err) {
    console.warn("⚠️ [FORUM_DAL] Erreur lecture threads category DB, fallback:", err);
  }

  return INITIAL_THREADS.filter((t) => t.categorySlug === categorySlug);
}

export async function getThreadBySlug(slug: string): Promise<ForumThreadItem | null> {
  const local = INITIAL_THREADS.find((t) => t.slug === slug);
  if (local) return local;

  try {
    const [row] = await db
      .select({
        thread: forumThreads,
        category: forumCategories,
        author: users,
      })
      .from(forumThreads)
      .innerJoin(forumCategories, eq(forumThreads.categoryId, forumCategories.id))
      .innerJoin(users, eq(forumThreads.authorId, users.id))
      .where(eq(forumThreads.slug, slug))
      .limit(1);

    if (row) {
      return {
        id: row.thread.id,
        categorySlug: row.category.slug,
        categoryName: row.category.name,
        title: row.thread.title,
        slug: row.thread.slug,
        authorName: row.author.name || "Initié du Cercle",
        authorRole: row.author.role === "practitioner" ? "Guide Référent" : "Membre",
        authorAvatar: row.author.image || undefined,
        isPinned: !!row.thread.isPinned,
        isLocked: !!row.thread.isLocked,
        viewCount: row.thread.viewCount || 0,
        repliesCount: 0,
        lastReplyAt: row.thread.lastReplyAt?.toISOString() || new Date().toISOString(),
        createdAt: row.thread.createdAt.toISOString(),
        firstPostContent: "",
      };
    }
  } catch (err) {
    console.warn("⚠️ [FORUM_DAL] Erreur lecture thread by slug DB:", err);
  }

  return null;
}

export async function getThreadPosts(threadSlug: string): Promise<ForumPostItem[]> {
  const initial = INITIAL_POSTS[threadSlug];
  if (initial && initial.length > 0) {
    return initial;
  }

  return [];
}

export async function createForumThread(params: {
  categorySlug: string;
  title: string;
  content: string;
  authorId: string;
}) {
  const sanitizedContent = DOMPurify.sanitize(params.content, {
    ALLOWED_TAGS: ["p", "b", "i", "em", "strong", "ul", "ol", "li", "blockquote", "h3", "h4"],
  });

  const slug = `${params.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")}-${Date.now().toString().slice(-4)}`;

  // Rechercher la catégorie
  const [cat] = await db
    .select({ id: forumCategories.id })
    .from(forumCategories)
    .where(eq(forumCategories.slug, params.categorySlug))
    .limit(1);

  if (!cat) {
    throw new Error("Catégorie de forum introuvable");
  }

  const [newThread] = await db
    .insert(forumThreads)
    .values({
      categoryId: cat.id,
      authorId: params.authorId,
      title: params.title,
      slug,
      isPinned: false,
      isLocked: false,
    })
    .returning();

  const [firstPost] = await db
    .insert(forumPosts)
    .values({
      threadId: newThread.id,
      authorId: params.authorId,
      content: sanitizedContent,
    })
    .returning();

  return { thread: newThread, post: firstPost };
}

export async function createForumPost(params: {
  threadId: string;
  content: string;
  authorId: string;
}) {
  const sanitizedContent = DOMPurify.sanitize(params.content, {
    ALLOWED_TAGS: ["p", "b", "i", "em", "strong", "ul", "ol", "li", "blockquote"],
  });

  const [newPost] = await db
    .insert(forumPosts)
    .values({
      threadId: params.threadId,
      authorId: params.authorId,
      content: sanitizedContent,
    })
    .returning();

  await db
    .update(forumThreads)
    .set({ lastReplyAt: new Date(), updatedAt: new Date() })
    .where(eq(forumThreads.id, params.threadId));

  return newPost;
}
