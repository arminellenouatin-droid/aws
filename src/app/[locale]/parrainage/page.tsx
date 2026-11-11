import { getTranslations } from "next-intl/server";
import { ReferralLinkBox } from "@/components/referral/ReferralLinkBox";
import { Link } from "@/lib/i18n/routing";
import {
  Sparkles,
  HeartHandshake,
  Gift,
  Award,
  ShieldCheck,
  ArrowRight,
  Users,
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
      ? "Programme de Parrainage & Fraternité | AWS : Africa World Saving"
      : "Referral & Fraternity Program | AWS : Africa World Saving",
    description: isFr
      ? "Recommandez le sanctuaire AWS à vos proches : 15% de réduction pour votre filleul et 5 000 FCFA de bon pour vous sur vos futures consultations."
      : "Invite your loved ones to AWS sanctuary: 15% discount for your invitee and 5,000 FCFA voucher for your future sessions.",
    alternates: {
      canonical: `/${locale}/parrainage`,
      languages: {
        fr: "/fr/parrainage",
        en: "/en/parrainage",
      },
    },
    openGraph: {
      title: isFr
        ? "Parrainage & Fraternité Sacrée | AWS"
        : "Sacred Fraternity & Referral | AWS",
      description: isFr
        ? "Partagez la lumière spirituelle et bénéficiez de grâces mutuelles."
        : "Share spiritual illumination and unlock reciprocal blessings.",
    },
  };
}

export default async function ParrainagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "referral" });

  const steps = [
    {
      icon: <Users className="h-6 w-6 text-gold-400" />,
      title: t("step1Title"),
      desc: t("step1Desc"),
    },
    {
      icon: <Gift className="h-6 w-6 text-emerald-400" />,
      title: t("step2Title"),
      desc: t("step2Desc"),
    },
    {
      icon: <Award className="h-6 w-6 text-gold-400" />,
      title: t("step3Title"),
      desc: t("step3Desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-16 text-center">
        {/* Header Hero */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400">
            <HeartHandshake className="h-4 w-4" />
            Alliance & Bienveillance Fraternelle
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Unique Link Generator Box */}
        <ReferralLinkBox />

        {/* How It Works Grid */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-200">
              {t("howItWorks")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Un cercle vertueux fondé sur l&apos;éthique et la gratitude partagée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gold-500/20 bg-cosmos-900/50 p-6 sm:p-8 space-y-4 text-left shadow-lg backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/25">
                  {step.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-gold-200">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ethical Commitment Box */}
        <div className="rounded-3xl border border-gold-500/15 bg-cosmos-900/40 p-8 sm:p-10 max-w-4xl mx-auto space-y-4 text-left">
          <div className="flex items-center gap-3 text-gold-300 font-serif font-bold text-lg">
            <ShieldCheck className="h-6 w-6 text-gold-400" />
            <span>Charte Éthique du Parrainage AWS</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            La transmission de ce lien doit toujours demeurer un geste d&apos;amour et de
            bienveillance désintéressée. Nous condamnons fermement le spam, les publications
            intrusives sur les réseaux sociaux et toute forme de sollicitation insistante.
            Nos praticiens et nos objets sacrés s&apos;adressent à celles et ceux dont le cœur
            ressent un appel authentique.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/forum"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all"
          >
            <span>Rejoindre le Cercle Communautaire</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/consultations"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-cosmos-900/50 px-6 py-3.5 text-xs font-semibold text-gold-300 hover:bg-gold-500/10 transition-all"
          >
            <span>Découvrir les Consultations</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
