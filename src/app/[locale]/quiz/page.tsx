import { getTranslations } from "next-intl/server";
import { SpiritualQuiz } from "@/components/marketing/SpiritualQuiz";
import { Sparkles, Shield, HeartHandshake } from "lucide-react";
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
      ? "Bilan Spirituel : Quel est votre blocage actuel ? | AWS"
      : "Spiritual Assessment: Discover Your Obstacle | AWS",
    description: isFr
      ? "Évaluez gratuitement vos blocages énergétiques et recevez votre archétype spirituel ainsi qu'un bon de bienvenue de 15%."
      : "Assess your energetic blockages for free, discover your spiritual archetype, and unlock an exclusive 15% welcome code.",
    alternates: {
      canonical: `/${locale}/quiz`,
      languages: {
        fr: "/fr/quiz",
        en: "/en/quiz",
      },
    },
    openGraph: {
      title: isFr
        ? "Bilan Spirituel Confidentiel | AWS : Africa World Saving"
        : "Confidential Spiritual Assessment | AWS : Africa World Saving",
      description: isFr
        ? "Découvrez l'origine de vos blocages en 5 questions rapides et recevez des conseils sacrés."
        : "Discover the source of your obstacles in 5 quick questions and receive sacred advice.",
    },
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quiz" });

  return (
    <div className="min-h-screen bg-white text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12 text-center">
        {/* Header Hero */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            Oracle & Discernement Intérieur
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 leading-tight">
            {t("title")}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Interactive Quiz Component */}
        <SpiritualQuiz />

        {/* Reassurance */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <span>100% Confidentiel & Sécurisé</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-4 w-4 text-blue-600" />
            <span>Sans engagement & déontologique</span>
          </div>
        </div>
      </div>
    </div>
  );
}
