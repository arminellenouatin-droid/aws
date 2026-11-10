import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/lib/i18n/routing";
import {
  FileText,
  Sparkles,
  ShieldCheck,
  Calendar,
  User,
  Heart,
  Flame,
  CheckCircle2,
  Printer,
  ArrowLeft,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compte-Rendu & Conseils Spirituels — Africa World Saving",
  description:
    "Consultez les notes officielles, rituels prescrits et conseils spirituels remis par votre guide lors de votre consultation.",
};

export default async function ConsultationNotesPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Consultations", href: "/consultations" },
              { label: "Compte-Rendu Spirituel" },
            ]}
          />

          {/* Header */}
          <header className="space-y-4 pb-8 border-b border-gold-500/15">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Badge variant="emerald" className="gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Document Scellé & Confidentiel</span>
              </Badge>

              <span className="font-mono text-xs text-muted-foreground">
                Réf : AWS-NOTE-{id.substring(0, 8)}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Compte-Rendu & Conseils Spirituels
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Retrouvez la synthèse de votre guidance, les enseignements transmis par votre maître et les rituels sacrés recommandés pour maintenir votre alignement.
            </p>
          </header>

          {/* Main Notes Sheet */}
          <div className="mt-8 space-y-8">
            {/* Guide & Session Metadata Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl border border-gold-500/20 bg-cosmos-900/60 text-xs">
              <div className="space-y-1">
                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-semibold">
                  Guide Référent
                </span>
                <span className="font-serif text-base font-bold text-gold-300 block">
                  Maître Spirituel Initié
                </span>
                <span className="text-muted-foreground">Lignée du Fâ • Bénin</span>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-semibold">
                  Date de la Séance
                </span>
                <span className="font-semibold text-foreground block">
                  10 Mars 2026
                </span>
                <span className="text-muted-foreground">Sanctuaire Numérique Crypté</span>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-semibold">
                  Statut de l&apos;Accompagnement
                </span>
                <span className="text-emeraldSacred-400 font-bold block flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Séance Clôturée avec Succès</span>
                </span>
                <span className="text-muted-foreground">Suivi personnalisé actif</span>
              </div>
            </div>

            {/* Section 1: Summary of the Guidance */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/25 bg-cosmos-900/80 space-y-4">
              <div className="flex items-center gap-2.5 text-gold-400">
                <Sparkles className="h-5 w-5" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                  Synthèse & Éclairage de la Séance
                </h2>
              </div>

              <div className="text-sm sm:text-base leading-relaxed text-muted-foreground space-y-3 font-sans">
                <p>
                  Lors de cette séance, nous avons exploré en profondeur vos interrogations concernant votre transition de vie et le sentiment de stagnation ressenti ces derniers mois.
                </p>
                <p>
                  L&apos;oracle et les tirages de sagesse ont mis en lumière un besoin impérieux de <strong>clôturer un cycle émotionnel antérieur</strong>. Vos énergies créatives sont intactes, mais elles sont actuellement entravées par des liens psychiques non résolus et des pollutions environnementales.
                </p>
                <p>
                  La voie qui s&apos;ouvre à vous est propice à l&apos;abondance et au renouveau, à condition de poser un acte délibéré de purification et de recentrage sur votre vérité intérieure.
                </p>
              </div>
            </div>

            {/* Section 2: Spiritual Prescriptions & Rituals */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/25 bg-cosmos-900/80 space-y-6">
              <div className="flex items-center gap-2.5 text-gold-400">
                <Flame className="h-5 w-5" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                  Rituels Préconisés & Conseils Pratiques
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {/* Ritual 1 */}
                <div className="p-4 rounded-xl border border-gold-500/15 bg-cosmos-950/60 space-y-2">
                  <h3 className="font-serif text-base font-bold text-gold-300">
                    1. Bain de Purification à l&apos;Eau Salée & Citron
                  </h3>
                  <p>
                    À effectuer durant 3 matins consécutifs, avant le lever du soleil. Remplissez une bassine d&apos;eau claire, ajoutez 3 poignées de gros sel naturel et le jus d&apos;un citron vert. Versez l&apos;eau des épaules aux pieds en formulant une intention de libération totale.
                  </p>
                </div>

                {/* Ritual 2 */}
                <div className="p-4 rounded-xl border border-gold-500/15 bg-cosmos-950/60 space-y-2">
                  <h3 className="font-serif text-base font-bold text-gold-300">
                    2. Protection du Lieu d&apos;Habitation
                  </h3>
                  <p>
                    Brûlez de l&apos;encens d&apos;oliban naturel ou des feuilles sèches de sauge sacrée aux quatre coins de votre pièce de repos pour dissoudre les stagnations résiduelles et apaiser le sommeil.
                  </p>
                </div>

                {/* Ritual 3 */}
                <div className="p-4 rounded-xl border border-gold-500/15 bg-cosmos-950/60 space-y-2">
                  <h3 className="font-serif text-base font-bold text-gold-300">
                    3. Méditation d&apos;Ancrage Matinal
                  </h3>
                  <p>
                    Chaque matin au réveil, posez les deux pieds nus au sol durant 5 minutes en silence. Visualisez vos racines plongeant dans la terre rouge nourricière de vos ancêtres.
                  </p>
                </div>
              </div>
            </div>

            {/* Sacred Caution */}
            <div className="p-5 rounded-2xl border border-gold-500/15 bg-cosmos-950/80 text-xs text-muted-foreground space-y-1">
              <span className="font-semibold text-gold-400 block uppercase tracking-wider text-[11px]">
                Consignes de Confidentialité
              </span>
              <p>
                Ce compte-rendu est un document sacré qui s&apos;adresse exclusivement à vous. Conservez-le précieusement dans la discrétion de votre cheminement.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <Link
                href="/consultations"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour aux consultations</span>
              </Link>

              <Link
                href="/consultations/booking"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20"
              >
                <span>Planifier une nouvelle séance de suivi</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
