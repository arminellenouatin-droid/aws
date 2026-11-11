"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { QUIZ_QUESTIONS, ARCHETYPES } from "@/lib/constants/quiz";
import { Link } from "@/lib/i18n/routing";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Gift,
  Shield,
  Loader2,
  Share2,
  RefreshCw,
  Compass,
} from "lucide-react";

export function SpiritualQuiz() {
  const t = useTranslations("quiz");
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Array<"clarite" | "purification" | "abondance">
  >([]);

  // Lead form
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Result state
  const [resultArchetype, setResultArchetype] = useState<
    "clarite" | "purification" | "abondance" | null
  >(null);
  const [promoCode, setPromoCode] = useState("BIENVENUE-AWS-15");

  const totalQuestions = QUIZ_QUESTIONS.length;
  const isLeadStep = currentStep === totalQuestions;
  const isFinished = resultArchetype !== null;

  const handleSelectOption = (archetype: "clarite" | "purification" | "abondance") => {
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentStep] = archetype;
    setSelectedAnswers(nextAnswers);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(totalQuestions); // aller au lead capture
    }
  };

  const calculateArchetype = () => {
    const counts: Record<string, number> = {
      clarite: 0,
      purification: 0,
      abondance: 0,
    };
    for (const ans of selectedAnswers) {
      counts[ans] = (counts[ans] || 0) + 1;
    }
    let highest: "clarite" | "purification" | "abondance" = "clarite";
    let max = -1;
    for (const [key, val] of Object.entries(counts)) {
      if (val > max) {
        max = val;
        highest = key as "clarite" | "purification" | "abondance";
      }
    }
    return highest;
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !email.trim()) {
      setError("Veuillez renseigner votre prénom et votre adresse email.");
      return;
    }

    setLoading(true);
    const archetype = calculateArchetype();

    try {
      const res = await fetch("/api/marketing/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          archetype,
          consent,
        }),
      });
      const data = await res.json();
      if (data.discountCode) {
        setPromoCode(data.discountCode);
      }
      setResultArchetype(archetype);
    } catch (err: any) {
      setResultArchetype(archetype);
    } finally {
      setLoading(false);
    }
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setResultArchetype(null);
  };

  // 1. Results View
  if (isFinished && resultArchetype) {
    const result = ARCHETYPES[resultArchetype];
    return (
      <div className="rounded-3xl border border-gold-500/25 bg-cosmos-900/70 p-6 sm:p-10 space-y-8 shadow-2xl backdrop-blur-sm max-w-3xl mx-auto text-left">
        <div className="text-center space-y-3 border-b border-gold-500/15 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
            <Sparkles className="h-3.5 w-3.5" />
            {result.badge}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gold-100">
            {result.title}
          </h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
            Bilan pour {firstName} • Sanctuaire AWS
          </p>
        </div>

        {/* Gift promo card */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-gold-500/30 bg-gradient-to-r from-gold-500/15 via-gold-500/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/20 text-gold-400">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold-300">
                Grâce de Bienvenue AWS (-15%)
              </div>
              <div className="text-xs text-muted-foreground">
                Valable sur votre première consultation ou commande
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gold-500/40 bg-cosmos-950 px-4 py-2 font-mono text-sm font-bold text-gold-400 select-all">
            {promoCode}
          </div>
        </div>

        {/* Diagnosis & Advice */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-gold-200">
            Éclairage Spirituel de Votre Situation
          </h3>
          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            {result.summary}
          </p>
        </div>

        <div className="space-y-3 rounded-2xl border border-gold-500/15 bg-cosmos-950/50 p-6">
          <h4 className="font-serif text-base font-bold text-gold-300">
            Trois Actes d&apos;Harmonisation Préconisés :
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
            {result.advice.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="h-4 w-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Offering */}
        <div className="rounded-2xl border border-gold-500/30 bg-gradient-to-b from-cosmos-900 to-cosmos-950 p-6 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
            {t("recommendedAction")}
          </div>
          <div>
            <h4 className="font-serif text-xl font-bold text-gold-100">
              {result.recommendedTitle}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {result.recommendedDesc}
            </p>
          </div>

          <Link
            href={result.recommendedHref}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all text-center"
          >
            <span>{result.recommendedCta}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Restart Button */}
        <div className="text-center pt-2">
          <button
            onClick={restartQuiz}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold-300 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Repasser le bilan spirituel</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. Lead Capture Step
  if (isLeadStep) {
    return (
      <form
        onSubmit={handleSubmitLead}
        className="rounded-3xl border border-gold-500/25 bg-cosmos-900/70 p-6 sm:p-10 space-y-6 shadow-2xl backdrop-blur-sm max-w-xl mx-auto text-left"
      >
        <div className="text-center space-y-2 border-b border-gold-500/15 pb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
            <Sparkles className="h-3.5 w-3.5" />
            Étape Finale
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-100">
            {t("leadTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {t("leadSubtitle")}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl border border-red-500/30 bg-red-950/20 text-xs text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-muted-foreground font-semibold mb-1">
              {t("firstName")} *
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ex: Amina"
              className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 px-3.5 py-2.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-muted-foreground font-semibold mb-1">
              {t("email")} *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@exemple.com"
              className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 px-3.5 py-2.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
            />
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer text-muted-foreground pt-1">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 text-gold-500 rounded"
            />
            <span className="leading-tight">{t("consent")}</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-lg shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Génération de votre synthèse...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>{t("submit")}</span>
            </>
          )}
        </button>
      </form>
    );
  }

  // 3. Question Step
  const currentQ = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="rounded-3xl border border-gold-500/25 bg-cosmos-900/70 p-6 sm:p-10 space-y-8 shadow-2xl backdrop-blur-sm max-w-2xl mx-auto text-left">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono text-gold-400 font-semibold">
            {t("question", { current: currentStep + 1, total: totalQuestions })}
          </span>
          <span className="font-mono">
            {Math.round(((currentStep + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-cosmos-950 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-300 rounded-full"
            style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Title */}
      <h2 className="font-serif text-xl sm:text-2xl font-bold text-gold-100 leading-snug">
        {currentQ.question}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedAnswers[currentStep] === opt.archetype;
          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt.archetype)}
              className={`w-full flex items-start gap-3.5 p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all ${
                isSelected
                  ? "border-gold-500 bg-gold-500/15 text-gold-100 shadow-md shadow-gold-500/10"
                  : "border-gold-500/15 bg-cosmos-950/60 text-muted-foreground hover:border-gold-500/40 hover:text-gold-200 hover:bg-gold-500/5"
              }`}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-mono font-bold flex-shrink-0 mt-0.5 ${
                  isSelected
                    ? "border-gold-400 bg-gold-500 text-cosmos-950"
                    : "border-gold-500/30 text-gold-400"
                }`}
              >
                {String.fromCharCode(65 + idx)}
              </div>
              <span className="leading-relaxed">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      {currentStep > 0 && (
        <div className="flex justify-start pt-2">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold-200 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{t("prev")}</span>
          </button>
        </div>
      )}
    </div>
  );
}
