import { getTranslations } from "next-intl/server";
import { getForumCategories, getRecentThreads } from "@/server/dal/forum";
import { Link } from "@/lib/i18n/routing";
import {
  MessageSquare,
  Sparkles,
  Sun,
  Shield,
  Heart,
  Users,
  Pin,
  Clock,
  Eye,
  Plus,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Cercle Communautaire & Forum Sacré | AWS : Africa World Saving"
      : "Community Circle & Sacred Forum | AWS : Africa World Saving",
    description: isFr
      ? "Échangez avec la fraternité du sanctuaire : traditions africaines, conseils de purification, témoignages de guidance et entraide spirituelle."
      : "Connect with the sanctuary fraternity: African wisdom, purification practices, guidance testimonials, and spiritual fellowship.",
    alternates: {
      canonical: `/${locale}/forum`,
      languages: {
        fr: "/fr/forum",
        en: "/en/forum",
      },
    },
    openGraph: {
      title: isFr
        ? "Cercle Communautaire Sacré | AWS"
        : "Sacred Community Circle | AWS",
      description: isFr
        ? "Partages bienveillants et enseignements spirituels du sanctuaire AWS."
        : "Benevolent exchanges and spiritual teachings from the AWS sanctuary.",
    },
  };
}

export default async function ForumHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "forum" });

  const categories = await getForumCategories();
  const recentThreads = await getRecentThreads(10);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Sun":
        return <Sun className="h-6 w-6 text-gold-400" />;
      case "Shield":
        return <Shield className="h-6 w-6 text-gold-400" />;
      case "Heart":
        return <Heart className="h-6 w-6 text-gold-400" />;
      case "Users":
        return <Users className="h-6 w-6 text-gold-400" />;
      default:
        return <Sparkles className="h-6 w-6 text-gold-400" />;
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    headline: t("title"),
    description: t("subtitle"),
    url: `https://africaworldsaving.com/${locale}/forum`,
    publisher: {
      "@type": "Organization",
      name: "AWS : Africa World Saving",
      url: "https://africaworldsaving.com",
    },
  };

  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl space-y-16">
        {/* Header Hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gold-500/15 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
              <Sparkles className="h-3.5 w-3.5" />
              Égrégore de Lumière & Entraide
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <Link
            href="/forum/nouveau-sujet"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-lg shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" />
            <span>{t("newThread")}</span>
          </Link>
        </div>

        {/* Ethical Charter Banner */}
        <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border border-gold-500/20 bg-cosmos-900/40 text-xs sm:text-sm text-muted-foreground">
          <ShieldAlert className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">{t("charterNotice")}</p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-gold-200">
            {t("categories")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/forum/${cat.slug}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-gold-500/20 bg-cosmos-900/50 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-gold-500/40 hover:bg-cosmos-900/80 hover:shadow-gold-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/25 group-hover:scale-105 transition-transform flex-shrink-0">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-serif text-lg font-bold text-gold-200 group-hover:text-gold-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gold-500/10 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="text-gold-400 font-mono font-medium">
                    {cat.threadsCount} discussions • {cat.postsCount} contributions
                  </span>
                  <div className="flex items-center gap-1 text-gold-400 group-hover:translate-x-1 transition-transform">
                    <span>Explorer</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Discussions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-gold-200">
              {t("recentDiscussions")}
            </h2>
            <span className="text-xs text-muted-foreground font-mono">
              Mis à jour en temps réel
            </span>
          </div>

          <div className="space-y-3">
            {recentThreads.map((thread) => (
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
                    <span className="rounded bg-gold-500/10 px-2 py-0.5 font-medium text-gold-400 border border-gold-500/20">
                      {thread.categoryName}
                    </span>
                    <span className="text-muted-foreground">
                      Par <strong className="text-gold-200 font-normal">{thread.authorName}</strong>
                    </span>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
