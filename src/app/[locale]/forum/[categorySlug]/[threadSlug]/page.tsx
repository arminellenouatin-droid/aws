import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  getThreadBySlug,
  getThreadPosts,
  getForumCategoryBySlug,
} from "@/server/dal/forum";
import { INITIAL_THREADS } from "@/lib/constants/forum";
import { Link } from "@/lib/i18n/routing";
import { ReactionButtons } from "@/components/forum/ReactionButtons";
import { ReportPostModal } from "@/components/forum/ReportPostModal";
import { ThreadReplyBox } from "@/components/forum/ThreadReplyBox";
import {
  ChevronRight,
  Pin,
  Clock,
  Sparkles,
  ArrowLeft,
  User,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return INITIAL_THREADS.map((thread) => ({
    categorySlug: thread.categorySlug,
    threadSlug: thread.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string; threadSlug: string }>;
}): Promise<Metadata> {
  const { locale, categorySlug, threadSlug } = await params;
  const thread = await getThreadBySlug(threadSlug);

  if (!thread) {
    return { title: "Discussion non trouvée | AWS" };
  }

  return {
    title: `${thread.title} | Forum AWS`,
    description: thread.firstPostContent.slice(0, 160) || "Échange spirituel au sein du sanctuaire AWS.",
    alternates: {
      canonical: `/${locale}/forum/${categorySlug}/${threadSlug}`,
      languages: {
        fr: `/fr/forum/${categorySlug}/${threadSlug}`,
        en: `/en/forum/${categorySlug}/${threadSlug}`,
      },
    },
  };
}

export default async function ForumThreadDetailPage({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string; threadSlug: string }>;
}) {
  const { locale, categorySlug, threadSlug } = await params;
  const thread = await getThreadBySlug(threadSlug);
  const category = await getForumCategoryBySlug(categorySlug);

  if (!thread || !category) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "forum" });
  const posts = await getThreadPosts(threadSlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    headline: thread.title,
    articleBody: thread.firstPostContent,
    author: {
      "@type": "Person",
      name: thread.authorName,
    },
    datePublished: thread.createdAt,
    url: `https://africaworldsaving.com/${locale}/forum/${categorySlug}/${threadSlug}`,
  };

  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl space-y-10">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap"
          aria-label="Fil d'Ariane"
        >
          <Link href="/" className="hover:text-gold-300 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gold-500/50" />
          <Link href="/forum" className="hover:text-gold-300 transition-colors">
            Cercle Communautaire
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gold-500/50" />
          <Link
            href={`/forum/${category.slug}`}
            className="hover:text-gold-300 transition-colors"
          >
            {category.name}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gold-500/50" />
          <span className="text-gold-300 truncate max-w-xs">{thread.title}</span>
        </nav>

        {/* Back Link */}
        <Link
          href={`/forum/${category.slug}`}
          className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Retour à {category.name}</span>
        </Link>

        {/* Thread Header */}
        <div className="space-y-4 border-b border-gold-500/15 pb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {thread.isPinned && (
              <span className="inline-flex items-center gap-1 rounded bg-gold-500/20 px-2.5 py-0.5 font-bold uppercase tracking-wider text-gold-300 border border-gold-500/30">
                <Pin className="h-3 w-3" />
                {t("pinned")}
              </span>
            )}
            <span className="rounded bg-gold-500/10 px-2.5 py-0.5 font-medium text-gold-400 border border-gold-500/20">
              {category.name}
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              Initié le {new Date(thread.createdAt).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US")}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gold-100 leading-tight">
            {thread.title}
          </h1>
        </div>

        {/* Original Post (OP) */}
        <div className="rounded-3xl border border-gold-500/25 bg-cosmos-900/70 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-sm">
          {/* Author info */}
          <div className="flex items-center justify-between border-b border-gold-500/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-serif font-bold">
                <User className="h-5 w-5" />
              </div>
              <div>
                <div className="font-serif font-bold text-gold-200 text-sm sm:text-base">
                  {thread.authorName}
                </div>
                <div className="text-[11px] text-gold-400/80">
                  {thread.authorRole || "Membre du Cercle"}
                </div>
              </div>
            </div>

            <ReportPostModal postId={thread.id} />
          </div>

          {/* Post Content */}
          <div className="text-sm sm:text-base text-gold-100/90 leading-relaxed whitespace-pre-line space-y-4">
            {thread.firstPostContent}
          </div>

          {/* Reactions */}
          <div className="pt-4 border-t border-gold-500/10">
            <ReactionButtons
              postId={thread.id}
              initialReactions={{ like: 8, pray: 14, gratitude: 11, fire: 5 }}
            />
          </div>
        </div>

        {/* Replies Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gold-500/15 pb-3">
            <h2 className="font-serif text-xl font-bold text-gold-200">
              Contributions & Éclairages ({posts.length})
            </h2>
            <span className="text-xs text-muted-foreground">
              Ordre chronologique
            </span>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-4 shadow-md"
              >
                <div className="flex items-center justify-between border-b border-gold-500/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-gold-200 text-xs sm:text-sm">
                        {post.authorName}
                      </div>
                      {post.authorRole && (
                        <div className="text-[10px] text-gold-400/70">
                          {post.authorRole}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString(
                        locale === "fr" ? "fr-FR" : "en-US"
                      )}
                    </span>
                    <ReportPostModal postId={post.id} />
                  </div>
                </div>

                <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>

                <div className="pt-2">
                  <ReactionButtons
                    postId={post.id}
                    initialReactions={post.reactions}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reply Box */}
        <div className="pt-4">
          <ThreadReplyBox threadId={thread.id} />
        </div>
      </div>
    </div>
  );
}
