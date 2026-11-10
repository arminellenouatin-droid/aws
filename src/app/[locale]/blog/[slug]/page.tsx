import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/lib/i18n/routing";
import { getBlogPostBySlug, BLOG_POSTS } from "@/server/dal/blog";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/lib/i18n/routing";
import { Clock, Calendar, User, ArrowLeft, Compass, Share2 } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const post of BLOG_POSTS) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article non trouvé" };
  }

  return {
    title: `${post.title} — AWS Enseignements`,
    description: post.excerpt,
    keywords: post.tags,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://africaworldsaving.com";

  return (
    <>
      <JsonLd
        type="Article"
        data={{
          headline: post.title,
          description: post.excerpt,
          author: {
            "@type": "Person",
            name: post.author.name,
          },
          publisher: {
            "@type": "Organization",
            name: "AWS : Africa World Saving",
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/logo.png`,
            },
          },
          datePublished: post.publishedAt,
          mainEntityOfPage: `${siteUrl}/${locale}/blog/${post.slug}`,
        }}
      />

      <Navbar />

      <main className="flex-1">
        <article className="py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />

            {/* Header */}
            <header className="space-y-4 pb-8 border-b border-gold-500/15">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="border-gold-500/30 text-gold-400">
                  {post.category}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-gold-400" />
                  <span>{post.readingTimeMinutes} min de lecture</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-400 border border-gold-500/30">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block">
                      {post.author.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {post.author.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-gold-400" />
                  <span>Publié le {post.publishedAt}</span>
                </div>
              </div>
            </header>

            {/* Excerpt Lead */}
            <div className="my-8 rounded-2xl border-l-4 border-gold-400 bg-cosmos-900/50 p-6 text-sm sm:text-base leading-relaxed text-gold-200/90 italic font-serif">
              « {post.excerpt} »
            </div>

            {/* Body Content */}
            <div className="prose prose-invert prose-gold max-w-none space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed">
              {post.content.split("\n\n").map((block, idx) => {
                const trimmed = block.trim();
                if (trimmed.startsWith("## ")) {
                  return (
                    <h2 key={idx} className="font-serif text-2xl sm:text-3xl font-bold text-foreground pt-6 pb-2 border-b border-gold-500/15">
                      {trimmed.replace("## ", "")}
                    </h2>
                  );
                }
                if (trimmed.startsWith("### ")) {
                  return (
                    <h3 key={idx} className="font-serif text-xl sm:text-2xl font-bold text-gold-300 pt-4">
                      {trimmed.replace("### ", "")}
                    </h3>
                  );
                }
                if (trimmed.startsWith("> ")) {
                  return (
                    <blockquote key={idx} className="border-l-2 border-gold-400/60 pl-4 py-1 italic text-gold-200">
                      {trimmed.replace("> ", "")}
                    </blockquote>
                  );
                }
                return <p key={idx}>{trimmed}</p>;
              })}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-6 border-t border-gold-500/15 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold">Mots-clés :</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-cosmos-900 border border-gold-500/20 px-3 py-1 text-xs text-gold-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Consultation CTA Banner */}
            <div className="mt-12 p-8 rounded-3xl border border-gold-500/30 bg-gradient-to-r from-cosmos-900 via-cosmos-850 to-cosmos-900 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold-300">
                  Besoin d&apos;une guidance personnalisée ?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-lg">
                  Posez vos questions à nos maîtres initiés en toute sérénité. Une première séance découverte vous est offerte.
                </p>
              </div>

              <Link
                href="/consultations"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-lg shadow-gold-500/25 hover:from-gold-400 hover:to-gold-300 transition-all"
              >
                <Compass className="h-4 w-4" />
                <span>Prendre rendez-vous</span>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
