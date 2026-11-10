import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from "@/lib/i18n/routing";
import { getBlogPosts } from "@/server/dal/blog";
import { Sparkles, Clock, Calendar, ArrowRight, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enseignements, Rituels & Sagesses d'Afrique",
  description:
    "Explorez nos articles de fond sur le Fâ, les rituels traditionnels de purification, la géomancie sacrée et l'éveil spirituel en Afrique.",
};

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getBlogPosts();

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* HEADER */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 border-b border-gold-500/15">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gold-500/10 via-cosmos-800/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Blog & Enseignements" }]} />

            <div className="max-w-3xl space-y-4">
              <Badge variant="default" className="gap-1.5 py-1.5 px-4 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                <span>Sagesses & Rituels Ancestraux</span>
              </Badge>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                Enseignements, Fâ &{" "}
                <span className="text-gold-gradient">sagesses d&apos;Afrique</span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                Découvrez des clés pratiques et des explications claires sur la cosmologie africaine, la géomancie du Fâ, les bains de purification et la souveraineté spirituelle.
              </p>
            </div>
          </div>
        </section>

        {/* ARTICLES GRID */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card
                  key={post.slug}
                  className="flex flex-col justify-between hover:border-gold-500/50 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px] border-gold-500/30 text-gold-400">
                        {post.category}
                      </Badge>

                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3 text-gold-400" />
                        <span>{post.readingTimeMinutes} min</span>
                      </div>
                    </div>

                    <CardTitle className="text-xl leading-snug">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-gold-200 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>

                    <CardDescription className="text-xs leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </CardDescription>

                    <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3.5 w-3.5 text-gold-400" />
                      <span>{post.author.name}</span>
                      <span>•</span>
                      <span className="text-[11px]">{post.publishedAt}</span>
                    </div>
                  </div>

                  <CardFooter className="justify-between pt-5 border-t border-gold-500/15 mt-6">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] text-muted-foreground bg-cosmos-950 px-2 py-0.5 rounded border border-gold-500/15"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gold-400 hover:text-gold-300 group"
                    >
                      <span>Lire l&apos;article</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
