import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/lib/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Gift,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  HeartHandshake,
  Star,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultation Découverte Gratuite (15 min) — Africa World Saving",
  description:
    "Faites l'expérience d'une première guidance spirituelle gratuite de 15 minutes avec un initié authentique. Sans carte bancaire ni engagement.",
};

export default async function FreeDiscoveryPage({
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
        type="Service"
        data={{
          name: "Consultation Découverte Gratuite",
          description:
            "Séance d'initiation et de guidance spirituelle offerte de 15 minutes pour tout nouveau chercheur.",
          provider: {
            "@type": "Organization",
            name: "AWS : Africa World Saving",
          },
          offers: {
            "@type": "Offer",
            price: 0,
            priceCurrency: "XOF",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/${locale}/consultations/decouverte-gratuite`,
          },
        }}
      />

      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-gold-500/15">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-emeraldSacred-500/10 via-cosmos-800/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Consultations", href: "/consultations" },
                { label: "Séance Découverte Offerte" },
              ]}
            />

            <div className="max-w-3xl space-y-5">
              <Badge variant="emerald" className="gap-1.5 py-1.5 px-4 text-xs shadow-lg shadow-emeraldSacred-500/10">
                <Gift className="h-3.5 w-3.5 text-emeraldSacred-400" />
                <span>Offre de Bienvenue • 100% Gratuite</span>
              </Badge>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                Votre première guidance offerte :{" "}
                <span className="text-emeraldSacred-400">15 minutes de clarté</span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                Déposez vos doutes, ressentez la bienveillance de nos maîtres initiés et recevez une première orientation sur votre chemin, sans débourser le moindre centime et sans renseigner de carte bancaire.
              </p>

              <div className="pt-2">
                <Link
                  href="/consultations/booking?type=guidance-initiale-decouverte"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emeraldSacred-600 to-emeraldSacred-500 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-emeraldSacred-600/25 hover:from-emeraldSacred-500 hover:to-emeraldSacred-400 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Réserver mes 15 minutes offertes</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Trust bullet points */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gold-500/15 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emeraldSacred-400 shrink-0" />
                  <span>Aucune carte bancaire requise</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gold-400 shrink-0" />
                  <span>15 minutes en direct</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gold-400 shrink-0" />
                  <span>Confidentialité scellée</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY OFFER A FREE SESSION */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <Badge variant="outline" className="border-gold-500/30 text-gold-400">
                  Pourquoi cette démarche ?
                </Badge>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground">
                  Bâtir une confiance sacrée avant tout engagement
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <p>
                    Trop souvent, les personnes en recherche spirituelle redoutent d&apos;être trompées ou déçues par des charlatans. Chez Africa World Saving, nous pensons que la lumière doit se manifester par les actes.
                  </p>
                  <p>
                    En vous offrant cette première séance de 15 minutes, nous vous donnons l&apos;opportunité de constater par vous-même la sérénité, la justesse et la dignité de nos maîtres initiés.
                  </p>
                  <p>
                    À l&apos;issue de ce quart d&apos;heure, vous êtes <strong>libre à 100%</strong> de poursuivre votre chemin par vous-même ou de solliciter une guidance plus approfondie si vous en ressentez le besoin.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="glass-panel rounded-3xl p-8 border border-emeraldSacred-500/30 bg-cosmos-900/80 shadow-2xl space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emeraldSacred-500/20 text-emeraldSacred-400 border border-emeraldSacred-500/30">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-foreground">
                        Règle Déontologique Anti-Abus
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        1 séance découverte par personne
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Afin que chaque être dans le besoin puisse bénéficier de cette offrande solidaire, le sanctuaire vérifie l&apos;unicité de chaque demande (limite stricte d&apos;une seule consultation gratuite par personne / numéro vérifié).
                  </p>

                  <div className="pt-4 border-t border-gold-500/10">
                    <Link
                      href="/consultations/booking?type=guidance-initiale-decouverte"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20 hover:from-gold-400 hover:to-gold-300 transition-all"
                    >
                      <span>Vérifier mon éligibilité</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
