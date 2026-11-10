import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroCanvas } from "@/components/3d/HeroCanvas";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Sparkles,
  Shield,
  CreditCard,
  Smartphone,
  Star,
  Users,
  Compass,
  Flame,
  ArrowRight,
  Sparkle,
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations("hero");
  const tf = useTranslations("features");

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
          {/* Subtle cosmos background glowing gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-gold-500/10 via-cosmos-700/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-2/3 right-10 w-[400px] h-[400px] bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
              {/* Left Column: Copy & Actions */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-6">
                {/* Badge */}
                <div className="inline-flex">
                  <Badge variant="default" className="shadow-[0_0_20px_rgba(245,192,66,0.15)] py-1.5 px-4 text-xs">
                    <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                    <span>{t("badge")}</span>
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
                  {t("titlePrefix")}{" "}
                  <span className="text-gold-gradient block sm:inline">
                    {t("titleHighlight")}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
                  {t("subtitle")}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/consultations"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Compass className="h-4 w-4" />
                    {t("ctaPrimary")}
                  </Link>

                  <Link
                    href="/boutique"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-cosmos-900/60 px-7 py-3.5 text-xs font-semibold tracking-wide text-gold-300 hover:bg-gold-500/10 hover:border-gold-500/60 transition-all"
                  >
                    <Flame className="h-4 w-4 text-gold-400" />
                    {t("ctaSecondary")}
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gold-500/15 max-w-2xl mx-auto lg:mx-0 text-xs text-muted-foreground">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Star className="h-4 w-4 text-gold-400 fill-gold-400" />
                    <span>{t("statsSatisfaction")}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Users className="h-4 w-4 text-gold-400" />
                    <span>{t("statsConsultations")}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Shield className="h-4 w-4 text-emeraldSacred-400" />
                    <span>{t("statsCountries")}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive 3D Sacred Cosmos Scene */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <HeroCanvas />
              </div>
            </div>
          </div>
        </section>

        {/* PILLARS / FEATURES SECTION */}
        <section className="py-16 sm:py-24 border-t border-gold-500/15 bg-cosmos-900/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <Badge variant="outline" className="border-gold-500/30 text-gold-400">
                Engagement & Transparence
              </Badge>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground">
                {tf("title")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <Card className="hover:border-gold-500/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-400 mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg mb-2">
                  {tf("f1Title")}
                </CardTitle>
                <CardDescription>
                  {tf("f1Desc")}
                </CardDescription>
              </Card>

              {/* Feature 2 */}
              <Card className="hover:border-emeraldSacred-500/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emeraldSacred-500/15 border border-emeraldSacred-500/30 text-emeraldSacred-400 mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg text-emeraldSacred-300 mb-2">
                  {tf("f2Title")}
                </CardTitle>
                <CardDescription>
                  {tf("f2Desc")}
                </CardDescription>
              </Card>

              {/* Feature 3 */}
              <Card className="hover:border-gold-500/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-400 mb-4">
                  <CreditCard className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg mb-2">
                  {tf("f3Title")}
                </CardTitle>
                <CardDescription>
                  {tf("f3Desc")}
                </CardDescription>
              </Card>

              {/* Feature 4 */}
              <Card className="hover:border-terracotta-500/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-400 mb-4">
                  <Smartphone className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg text-terracotta-300 mb-2">
                  {tf("f4Title")}
                </CardTitle>
                <CardDescription>
                  {tf("f4Desc")}
                </CardDescription>
              </Card>
            </div>
          </div>
        </section>

        {/* CONSULTATION TYPES OVERVIEW */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="space-y-2">
                <Badge variant="outline" className="border-gold-500/30 text-gold-400">
                  Domaines d&apos;Intervention
                </Badge>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground">
                  Des guidances adaptées à votre chemin
                </h2>
              </div>
              <Link
                href="/consultations"
                className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-wider group"
              >
                <span>Explorer toutes les séances</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <Card className="flex flex-col justify-between">
                <div>
                  <Badge variant="default" className="text-[10px] mb-3">
                    Guidance Personnelle
                  </Badge>
                  <CardTitle className="mb-2">
                    Clarté & Orientation de Vie
                  </CardTitle>
                  <CardDescription>
                    Faites le point sur vos choix de vie, vos blocages intérieurs et identifiez les opportunités qui s&apos;ouvrent à vous grâce au regard de nos guides spirituels.
                  </CardDescription>
                </div>
                <CardFooter className="justify-between mt-6">
                  <span className="text-xs font-bold text-gold-300">Format Chat, Audio ou Visio</span>
                  <Link
                    href="/consultations"
                    className="text-xs font-semibold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1 group"
                  >
                    <span>Réserver</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardFooter>
              </Card>

              {/* Card 2 */}
              <Card className="flex flex-col justify-between">
                <div>
                  <Badge variant="emerald" className="text-[10px] mb-3">
                    Purification & Énergie
                  </Badge>
                  <CardTitle className="mb-2">
                    Déblocage & Protection
                  </CardTitle>
                  <CardDescription>
                    Rituels sacrés et conseils traditionnels pour assainir vos énergies environnantes, rompre les stagnations et restaurer un bouclier de sérénité.
                  </CardDescription>
                </div>
                <CardFooter className="justify-between mt-6">
                  <span className="text-xs font-bold text-gold-300">Accompagnement personnalisé</span>
                  <Link
                    href="/consultations"
                    className="text-xs font-semibold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1 group"
                  >
                    <span>Réserver</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardFooter>
              </Card>

              {/* Card 3 */}
              <Card className="flex flex-col justify-between">
                <div>
                  <Badge variant="terracotta" className="text-[10px] mb-3">
                    Élévation & Prospérité
                  </Badge>
                  <CardTitle className="mb-2">
                    Harmonie Professionnelle & Projets
                  </CardTitle>
                  <CardDescription>
                    Alignez vos entreprises, vos finances et vos activités professionnelles sur les lois universelles de fécondité et d&apos;abondance.
                  </CardDescription>
                </div>
                <CardFooter className="justify-between mt-6">
                  <span className="text-xs font-bold text-gold-300">Suivi sur mesure</span>
                  <Link
                    href="/consultations"
                    className="text-xs font-semibold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1 group"
                  >
                    <span>Réserver</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
