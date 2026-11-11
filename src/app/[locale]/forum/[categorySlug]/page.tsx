import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  getForumCategoryBySlug,
  getThreadsByCategory,
} from "@/server/dal/forum";
import { FORUM_CATEGORIES } from "@/lib/constants/forum";
import { Link } from "@/lib/i18n/routing";
import {
  ChevronRight,
  Pin,
  MessageSquare,
  Eye,
  Clock,
  Plus,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return FORUM_CATEGORIES.map((cat) => ({
    categorySlug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string }>;
}): Promise<Metadata> {
  const { locale, categorySlug } = await params;
  const category = await getForumCategoryBySlug(categorySlug);

  if (!category) {
    return { title: "Catégorie non trouvée | AWS" };
  }

  return {
    title: `${category.name} | Cercle Communautaire AWS`,
    description: category.description,
    alternates: {
      canonical: `/${locale}/forum/${categorySlug}`,
      languages: {
        fr: `/fr/forum/${categorySlug}`,
        en: `/en/forum/${categorySlug}`,
      },
    },
  };
}

export default async function ForumCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string }>;
}) {
  const { locale, categorySlug } = await params;
  const category = await getForumCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "forum" });
  const threads = await getThreadsByCategory(categorySlug);

  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-muted-foreground"
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
          <span className="text-gold-300 truncate max-w-xs">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gold-500/15 pb-8">
          <div className="space-y-3 max-w-2xl">
            <Link
              href="/forum"
              className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 transition-colors font-medium mb-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{t("backToForum")}</span>
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gold-200">
              {category.name}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {category.description}
            </p>
          </div>

          <Link
            href={`/forum/nouveau-sujet?category=${categorySlug}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" />
            <span>{t("newThread")}</span>
          </Link>
        </div>

        {/* Threads List */}
        <div className="space-y-4">
          {threads.length === 0 ? (
            <div className="rounded-3xl border border-gold-500/15 bg-cosmos-900/40 p-12 text-center space-y-4">
              <Sparkles className="h-10 w-10 text-gold-400/60 mx-auto" />
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {t("noThreads")}
              </p>
              <Link
                href={`/forum/nouveau-sujet?category=${categorySlug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500/10 border border-gold-500/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-gold-300 hover:bg-gold-500/20 transition-all"
              >
                <span>Initier la première discussion</span>
              </Link>
            </div>
          ) : (
            threads.map((thread) => (
              <Link
                key={thread.id}
                href={`/forum/${thread.categorySlug}/${thread.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gold-500/15 bg-cosmos-900/40 hover:bg-cosmos-900/70 hover:border-gold-500/30 transition-all shadow-md"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    {thread.isPinned && (
                      <span className="inline-flex items-center gap-1 rounded bg-gold-500/20 px-2 py-0.5 font-bold uppercase tracking-wider text-gold-300 border border-gold-500/30">
                        <Pin className="h-3 w-3" />
                        {t("pinned")}
                      </span>
                    )}
                    <span className="text-muted-foreground">
                      Par <strong className="text-gold-200 font-normal">{thread.authorName}</strong>
                    </span>
                    {thread.authorRole && (
                      <span className="text-gold-400/80">• {thread.authorRole}</span>
                    )}
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-semibold text-gold-100 group-hover:text-gold-300 transition-colors leading-snug">
                    {thread.title}
                  </h3>
                </div>

                <div className="flex items-center gap-5 text-xs text-muted-foreground flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-gold-500/10">
                  <div className="flex items-center gap-1.5 font-mono">
                    <MessageSquare className="h-3.5 w-3.5 text-gold-400" />
                    <span>{thread.repliesCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <Eye className="h-3.5 w-3.5 text-gold-400" />
                    <span>{thread.viewCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Récemment</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
