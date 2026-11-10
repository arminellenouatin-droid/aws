import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/lib/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  HelpCircle,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  CreditCard,
  Lock,
  MessageCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foire Aux Questions & Réponses — Africa World Saving",
  description:
    "Toutes les réponses à vos questions sur le déroulement des séances, le Fâ, les paiements Mobile Money (Chariow) et la confidentialité.",
};

const FAQ_ITEMS = [
  {
    category: "Général & Déontologie",
    question: "Qu'est-ce qui différencie Africa World Saving des autres services spirituels ?",
    answer:
      "Notre sanctuaire repose sur une charte déontologique stricte : aucun charlatanisme, aucune promesse de richesse magique ou de retour d'affection forcé. Nos guides sont initiés aux sagesses authentiques du Bénin et d'Afrique, vérifiés par notre conseil d'anciens et tenus au secret le plus absolu.",
  },
  {
    category: "Général & Déontologie",
    question: "La consultation gratuite découverte engage-t-elle à payer ensuite ?",
    answer:
      "Non, absolument pas. La consultation découverte (15 min) est offerte aux nouveaux membres pour faire le point sans engagement financier. Vous êtes libre de poursuivre ou non avec une séance approfondie.",
  },
  {
    category: "Déroulement des Consultations",
    question: "Comment se passe une consultation à distance ?",
    answer:
      "Après réservation de votre créneau, vous accédez à notre sanctuaire numérique privé. À l'heure convenue, la séance débute par chat crypté, appel vocal ou vidéo selon votre choix. Tout fonctionne directement sur votre navigateur web, même sur smartphone avec une connexion mobile 3G.",
  },
  {
    category: "Déroulement des Consultations",
    question: "Puis-je choisir mon maître ou guide spirituel ?",
    answer:
      "Oui. Vous pouvez consulter les profils complets de nos initiés (parcours, spécialités, langues parlées, avis vérifiés) et sélectionner le praticien avec lequel vous ressentez la meilleure affinité vibratoire.",
  },
  {
    category: "Paiements & Mobile Money",
    question: "Quels sont les modes de paiement acceptés ?",
    answer:
      "Nous acceptons tous les moyens de paiement usuels en Afrique via notre partenaire certifié Chariow : MTN Mobile Money, Moov Money, Orange Money, Wave, ainsi que les cartes Visa et Mastercard pour la diaspora internationale (France, Canada, USA, etc.).",
  },
  {
    category: "Paiements & Mobile Money",
    question: "Que se passe-t-il si un imprévu m'empêche d'assister à mon créneau ?",
    answer:
      "Vous pouvez reporter gratuitement votre séance jusqu'à 4 heures avant le début du rendez-vous depuis votre espace personnel ou en contactant notre équipe d'assistance par WhatsApp.",
  },
  {
    category: "Confidentialité & Données",
    question: "Mes confidences et mes rituels sont-ils protégés ?",
    answer:
      "Oui, au plus haut niveau. Toutes vos données sont chiffrées de bout en bout. Africa World Saving respecte scrupuleusement la loi sur la protection des données personnelles du Bénin (APDP, Code du numérique) ainsi que le RGPD européen pour les résidents de la diaspora.",
  },
];

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />

      <Navbar />

      <main className="flex-1">
        {/* HEADER */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 border-b border-gold-500/15">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gold-500/10 via-cosmos-800/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Foire Aux Questions" }]} />

            <div className="max-w-3xl space-y-4">
              <Badge variant="default" className="gap-1.5 py-1.5 px-4 text-xs">
                <HelpCircle className="h-3.5 w-3.5 text-gold-400" />
                <span>Réponses & Clarté</span>
              </Badge>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                Foire Aux{" "}
                <span className="text-gold-gradient">Questions</span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                Découvrez tout ce que vous devez savoir sur le fonctionnement des séances, nos garanties éthiques et la sécurité de vos paiements.
              </p>
            </div>
          </div>
        </section>

        {/* ACCORDION FAQ */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <details
                key={idx}
                className="group glass-panel rounded-2xl border border-gold-500/20 bg-cosmos-900/60 p-6 transition-all duration-300 open:border-gold-500/50 open:bg-cosmos-900/90"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-lg sm:text-xl font-bold text-gold-300 list-none select-none">
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-wider text-gold-400/70 font-sans font-semibold">
                      [{item.category}]
                    </span>
                    <span>{item.question}</span>
                  </div>
                  <ChevronDown className="h-5 w-5 shrink-0 text-gold-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>

                <div className="mt-4 pt-4 border-t border-gold-500/10 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}

            {/* Assistance Box */}
            <div className="mt-12 p-8 rounded-3xl border border-gold-500/25 bg-cosmos-900/80 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  Vous avez une question spécifique ?
                </h3>
                <p className="text-xs text-muted-foreground">
                  Notre équipe bienveillante est disponible pour vous assister sous 24 heures.
                </p>
              </div>

              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20 hover:from-gold-400 hover:to-gold-300 transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Nous contacter</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
