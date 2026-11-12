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

    selectedAnswers.forEach((ans) => {
      if (counts[ans] !== undefined) {
        counts[ans] += 1;
      }
    });

    let winner: "clarite" | "purification" | "abondance" = "clarite";
    let max = -1;
    for (const [key, val] of Object.entries(counts)) {
      if (val > max) {
        max = val;
        winner = key as "clarite" | "purification" | "abondance";
      }
    }
    return winner;
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName || !email) {
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
      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue.");
      }

      setPromoCode(data.discountCode || "BIENVENUE-AWS-15");
      setResultArchetype(archetype);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de connexion";
      setError(msg);
      // Fallback gracieux en cas d'erreur réseau
      setResultArchetype(archetype);
    } finally {
      setLoading(false);
    }
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setResultArchetype(null);
    setFirstName("");
    setEmail("");
    setError("");
  };

  // 1. Result Diagnosis Step
  if (isFinished && resultArchetype) {
    const result = ARCHETYPES[resultArchetype];

    return (
      <div className="rounded-3xl border border-sky-100 bg-white p-6 sm:p-10 space-y-8 shadow-xl max-w-2xl mx-auto text-left">
        {/* Header Result */}
        <div className="text-center space-y-3 border-b border-sky-100 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Compass className="h-4 w-4 text-blue-600" />
            <span>Votre Archétype Sacré</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950">
            {result.title}
          </h2>
          <p className="text-sm font-medium text-blue-700 italic">
            « {result.badge} »
          </p>
        </div>

        {/* Promo Gift Box */}
        <div className="rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 via-blue-50 to-sky-50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                Votre Présent de Bienvenue (-15%)
              </div>
              <div className="text-[11px] text-slate-600">
                Valable sur votre première consultation ou commande boutique
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-blue-200 bg-white px-4 py-2 font-mono text-sm font-bold text-blue-700 select-all shadow-sm">
            {promoCode}
          </div>
        </div>

        {/* Diagnosis & Advice */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-950">
            Éclairage Spirituel de Votre Situation
          </h3>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {result.summary}
          </p>
        </div>

        <div className="space-y-3 rounded-2xl border border-sky-100 bg-slate-50/80 p-6">
          <h4 className="font-serif text-base font-bold text-slate-950">
            Trois Actes d&apos;Harmonisation Préconisés :
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            {result.advice.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Offering */}
        <div className="rounded-2xl border border-sky-200 bg-gradient-to-b from-sky-50/60 to-white p-6 space-y-4 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
            {t("recommendedAction")}
          </div>
          <div>
            <h4 className="font-serif text-xl font-bold text-slate-950">
              {result.recommendedTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {result.recommendedDesc}
            </p>
          </div>

          <Link
            href={result.recommendedHref}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/25 transition-all text-center"
          >
            <span>{result.recommendedCta}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Restart Button */}
        <div className="text-center pt-2">
          <button
            onClick={restartQuiz}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium"
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
        className="rounded-3xl border border-sky-100 bg-white p-6 sm:p-10 space-y-6 shadow-xl max-w-xl mx-auto text-left"
      >
        <div className="text-center space-y-2 border-b border-sky-100 pb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Sparkles className="h-3.5 w-3.5" />
            Étape Finale
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">
            {t("leadTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t("leadSubtitle")}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl border border-red-200 bg-red-50 text-xs text-red-600">
            {error}
          </div>
        )}

        {/* Anti-spam honeypot */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {t("firstName")} *
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ex: Kwame, Aïcha, Marc"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {t("email")} *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre-adresse@exemple.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer text-slate-600 pt-1">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 text-blue-600 rounded"
            />
            <span className="leading-tight">{t("consent")}</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
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
    <div className="rounded-3xl border border-sky-100 bg-white p-6 sm:p-10 space-y-8 shadow-xl max-w-2xl mx-auto text-left">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-blue-700 font-semibold">
            {t("question", { current: currentStep + 1, total: totalQuestions })}
          </span>
          <span className="font-mono">
            {Math.round(((currentStep + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-300 rounded-full"
            style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Title */}
      <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-950 leading-snug">
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
                  ? "border-blue-600 bg-blue-50 text-blue-950 shadow-sm"
                  : "border-slate-200 bg-slate-50/70 text-slate-700 hover:border-sky-300 hover:text-blue-600 hover:bg-sky-50/50"
              }`}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-mono font-bold flex-shrink-0 mt-0.5 ${
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-sky-300 text-blue-600 bg-white"
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
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{t("prev")}</span>
          </button>
        </div>
      )}
    </div>
  );
}
