import { getTranslations } from "next-intl/server";
import { RitualsTracker } from "@/components/marketing/RitualsTracker";
import { Link } from "@/lib/i18n/routing";
import { Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
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
      ? "Rituels Quotidiens & Calendrier Sacré | AWS : Africa World Saving"
      : "Daily Sacred Rituals & Lunar Almanac | AWS : Africa World Saving",
    description: isFr
      ? "Pratiques rituelles du matin, du zénith et du crépuscule pour préserver votre alignement spirituel et cultiver votre série d'éveil."
      : "Dawn, zenith, and twilight sacred practices to maintain your spiritual alignment and cultivate your devotion streak.",
    alternates: {
      canonical: `/${locale}/rituels`,
      languages: {
        fr: "/fr/rituels",
        en: "/en/rituels",
      },
    },
    openGraph: {
      title: isFr
        ? "Rituels Quotidiens Sacrés | AWS"
        : "Daily Sacred Rituals | AWS",
      description: isFr
        ? "Pratiques ancestrales d'ancrage, de gratitude et de purification."
        : "Ancestral practices of grounding, gratitude, and purification.",
    },
  };
}

export default async function RitualsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rituals" });

  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12 text-center">
        {/* Header Hero */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400">
            <Sparkles className="h-3.5 w-3.5" />
            Almanach & Pratiques Ancestrales
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Rituals Tracker */}
        <RitualsTracker />

        {/* Shop CTA Banner */}
        <div className="rounded-3xl border border-gold-500/20 bg-gradient-to-r from-cosmos-900 to-cosmos-950 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl max-w-3xl mx-auto text-left">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Matières Authentiques
            </div>
            <h3 className="font-serif text-lg font-bold text-gold-100">
              Besoin d&apos;encens ou d&apos;huile d&apos;onction pour vos rituels ?
            </h3>
            <p className="text-xs text-muted-foreground">
              Découvrez nos résines d&apos;Oliban et kits de déblocage préparés dans les règles traditionnelles.
            </p>
          </div>

          <Link
            href="/boutique"
            className="flex items-center gap-2 rounded-xl bg-gold-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md hover:bg-gold-400 transition-all flex-shrink-0"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Visiter la Boutique</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
