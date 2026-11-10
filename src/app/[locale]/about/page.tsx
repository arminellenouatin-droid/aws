import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "@/lib/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Compass,
  Flame,
  Award,
  Globe2,
  Lock,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre Mission & Origines Sacrées",
  description:
    "Découvrez l'histoire d'Africa World Saving, sanctuaire spirituel béninois et panafricain alliant traditions ancestrales du Fâ et déontologie moderne.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://africaworldsaving.com";

  return (
    <>
      <JsonLd
        type="Organization"
        data={{
          name: "AWS : Africa World Saving",
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
          description:
            "Sanctuaire spirituel d'Afrique et de la diaspora : consultations en ligne, sagesse du Fâ et boutique rituelle.",
          foundingLocation: {
            "@type": "Place",
            name: "Cotonou, République du Bénin",
          },
          knowsAbout: [
            "Spiritualité africaine",
            "Fâ et géomancie",
            "Rituels de protection",
            "Éveil personnel",
          ],
        }}
      />

      <Navbar />

      <main className="flex-1">
        {/* HERO / HEADER */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-gold-500/15">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gold-500/10 via-cosmos-800/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "À Propos" }]} />

            <div className="max-w-3xl space-y-5">
              <Badge variant="default" className="gap-1.5 py-1.5 px-4 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                <span>Origines & Engagements</span>
              </Badge>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                Aux racines de la{" "}
                <span className="text-gold-gradient">sagesse sacrée d&apos;Afrique</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans">
                AWS : Africa World Saving est né d&apos;une conviction profonde : la spiritualité africaine est un phare de lumière, d&apos;équilibre et de régénération pour le monde moderne.
              </p>
            </div>
          </div>
        </section>

        {/* ORIGINS & STORY */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <Badge variant="outline" className="border-gold-500/30 text-gold-400">
                  Notre Histoire
                </Badge>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground">
                  Un pont entre terre sacrée et diaspora mondiale
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <p>
                    Fondée à <strong>Cotonou au Bénin</strong> — berceau des initiations royales d&apos;Abomey, de Ouidah et des oracles sacrés du Fâ — Africa World Saving rapproche les chercheurs de vérité des véritables détenteurs de la connaissance sacrée.
                  </p>
                  <p>
                    Trop longtemps, les sagesses africaines ont été victimes soit de préjugés réducteurs, soit d&apos;exploitations mercantiles abusives. Notre mission est de restaurer la <strong>dignité, la clarté et la noblesse</strong> de ces transmissions millénaires.
                  </p>
                  <p>
                    Que vous soyez sur le continent africain ou dans la diaspora en Europe, aux Amériques ou dans les îles, ce sanctuaire vous offre une écoute fraternelle, sans jugement ni superstition.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="glass-panel rounded-3xl p-8 border border-gold-500/25 bg-cosmos-900/80 shadow-2xl space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/15 border border-gold-500/30 text-gold-400">
                      <Award className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-gold-300">
                        Notre Charte Fondatrice
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Signée par nos initiés & maîtres
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-emeraldSacred-400 shrink-0 mt-0.5" />
                      <span>Respect scrupuleux du libre arbitre et de la raison</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-emeraldSacred-400 shrink-0 mt-0.5" />
                      <span>Interdiction totale de toute promesse miraculeuse ou chantage affectif</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-emeraldSacred-400 shrink-0 mt-0.5" />
                      <span>Transparence absolue des tarifs et des rituels prescrits</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-emeraldSacred-400 shrink-0 mt-0.5" />
                      <span>Secret spirituel absolu et chiffrement de vos données</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOUR PILLARS */}
        <section className="py-16 sm:py-24 border-t border-gold-500/15 bg-cosmos-900/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <Badge variant="outline" className="border-gold-500/30 text-gold-400">
                Piliers d&apos;Intégrité
              </Badge>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground">
                Quatre principes directeurs non-négociables
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-400 mb-4">
                  <Flame className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg mb-2">Authenticité Ancestrale</CardTitle>
                <CardDescription>
                  Des rituels et des guidances transmis selon les rites originels et le respect scrupuleux des lois cosmiques et des éléments.
                </CardDescription>
              </Card>

              <Card>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emeraldSacred-500/15 border border-emeraldSacred-500/30 text-emeraldSacred-400 mb-4">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg text-emeraldSacred-300 mb-2">Zéro Illusion</CardTitle>
                <CardDescription>
                  Aucune fausse promesse d&apos;argent magique ni d&apos;attraction forcée. Nous vous accompagnons vers l&apos;alignement et la responsabilité.
                </CardDescription>
              </Card>

              <Card>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-400 mb-4">
                  <Lock className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg mb-2">Secret & Protection</CardTitle>
                <CardDescription>
                  Chaque mot échangé reste strictement confidentiel. Vos données sont régies par l&apos;APDP (Bénin) et le RGPD européen.
                </CardDescription>
              </Card>

              <Card>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-400 mb-4">
                  <Globe2 className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg text-terracotta-300 mb-2">Accessibilité Mobile</CardTitle>
                <CardDescription>
                  Paiements par Mobile Money et séances optimisées pour les réseaux mobiles à bas débit, partout sur le continent et au-delà.
                </CardDescription>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16 sm:py-24 text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Prêt à faire l&apos;expérience d&apos;une guidance éclairée ?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Nos guides certifiés sont à votre écoute en toute discrétion. Profitez d&apos;une première séance découverte offerte ou explorez nos guidances personnalisées.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/consultations"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-lg shadow-gold-500/25 hover:from-gold-400 hover:to-gold-300 transition-all"
              >
                <Compass className="h-4 w-4" />
                <span>Voir les consultations</span>
              </Link>
              <Link
                href="/practitioners"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-cosmos-900/60 px-7 py-3.5 text-xs font-semibold tracking-wide text-gold-300 hover:bg-gold-500/10 transition-all"
              >
                <span>Découvrir nos praticiens</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
