import { getTranslations } from "next-intl/server";
import { RitualsTracker } from "@/components/marketing/RitualsTracker";
import { Sparkles, ShoppingBag } from "lucide-react";
import { Link } from "@/lib/i18n/routing";
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
      ? "Rituels Quotidiens & Almanach Lunaire | AWS : Africa World Saving"
      : "Daily Rituals & Lunar Almanac | AWS : Africa World Saving",
    description: isFr
      ? "Suivez vos micro-pratiques quotidiennes de purification et de méditation spirituelle africaine avec notre almanach sacré."
      : "Track your daily African spiritual purification and meditation micro-practices with our sacred almanac.",
    alternates: {
      canonical: `/${locale}/rituels`,
      languages: {
        fr: "/fr/rituels",
        en: "/en/rituels",
      },
    },
    openGraph: {
      title: isFr
        ? "Almanach Lunaire & Rituels Sacrés | AWS"
        : "Lunar Almanac & Sacred Rituals | AWS",
      description: isFr
        ? "Purifiez vos énergies et entretenez votre alignement grâce aux rituels du matin, du midi et du soir."
        : "Purify your energy and maintain alignment through morning, noon, and evening rituals.",
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
    <div className="min-h-screen bg-white text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12 text-center">
        {/* Header Hero */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            Almanach & Pratiques Ancestrales
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
            {t("title")}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Rituals Tracker */}
        <RitualsTracker />

        {/* Shop CTA Banner */}
        <div className="rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-50 via-white to-sky-50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm max-w-3xl mx-auto text-left">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Matières Authentiques
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-950">
              Besoin d&apos;encens ou d&apos;huile d&apos;onction pour vos rituels ?
            </h3>
            <p className="text-xs text-slate-600">
              Découvrez nos résines d&apos;Oliban et kits de déblocage préparés dans les règles traditionnelles.
            </p>
          </div>

          <Link
            href="/boutique"
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/25 transition-all flex-shrink-0"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Visiter la Boutique</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
