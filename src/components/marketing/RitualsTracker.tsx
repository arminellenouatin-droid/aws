"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Sun,
  Moon,
  CheckCircle,
  Flame,
  Award,
  Clock,
  Droplets,
  BookOpen,
} from "lucide-react";

export function RitualsTracker() {
  const t = useTranslations("rituals");
  const [streak, setStreak] = useState(3);
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    morning: false,
    noon: false,
    evening: false,
  });
  const [allDoneToday, setAllDoneToday] = useState(false);

  useEffect(() => {
    // Lecture depuis localStorage
    const savedStreak = localStorage.getItem("aws_ritual_streak");
    if (savedStreak) {
      setStreak(Number(savedStreak) || 3);
    }
    const savedToday = localStorage.getItem("aws_ritual_today");
    if (savedToday) {
      try {
        const parsed = JSON.parse(savedToday);
        setCompleted(parsed);
        if (parsed.morning && parsed.noon && parsed.evening) {
          setAllDoneToday(true);
        }
      } catch {}
    }
  }, []);

  const toggleRitual = (key: "morning" | "noon" | "evening") => {
    const updated = { ...completed, [key]: !completed[key] };
    setCompleted(updated);
    localStorage.setItem("aws_ritual_today", JSON.stringify(updated));

    if (updated.morning && updated.noon && updated.evening && !allDoneToday) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setAllDoneToday(true);
      localStorage.setItem("aws_ritual_streak", String(newStreak));
    }
  };

  const proverbs = [
    "« La patience est la mère des accomplissements sacrés. » (Sagesse Fon)",
    "« Celui qui écoute le vent de l'aube entend la parole de ses aïeux. » (Proverbe Yoruba)",
    "« L'eau purifie le corps, la prière purifie l'esprit, l'amour guérit l'âme. » (Tradition Akan)",
  ];

  return (
    <div className="space-y-10 max-w-3xl mx-auto text-left">
      {/* Streak Counter Card */}
      <div className="rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-orange-500 animate-pulse" />
            {t("currentStreak")}
          </span>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-slate-950">
            {t("days", { count: streak })}
          </div>
          <p className="text-xs text-slate-600">
            Chaque jour consacré fortifie votre égrégore et dissout les ombres.
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 border border-sky-200 text-blue-600 shadow-md shadow-blue-500/10 flex-shrink-0">
          <Award className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      {allDoneToday && (
        <div className="flex items-center gap-3 p-4 rounded-2xl border border-sky-200 bg-sky-50 text-xs sm:text-sm text-blue-900 font-medium">
          <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <span>{t("alreadyCompleted")}</span>
        </div>
      )}

      {/* Lunar Phase Card */}
      <div className="rounded-2xl border border-sky-100 bg-slate-50/80 p-6 flex items-start gap-4 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-sky-200 text-blue-600 flex-shrink-0">
          <Moon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
            {t("lunarPhase")}
          </div>
          <h3 className="font-serif text-base font-bold text-slate-950">
            Lune Gibbeuse Croissante • Énergies d&apos;Élévation & de Clarté
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            La période actuelle est particulièrement propice à l&apos;ouverture des voies
            professionnelles et à la purification des espaces intérieurs.
          </p>
        </div>
      </div>

      {/* 3 Daily Micro-Rituals */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-slate-950">
          Pratiques Rituelles du Jour
        </h3>

        {/* 1. Morning */}
        <div
          onClick={() => toggleRitual("morning")}
          className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
            completed.morning
              ? "border-blue-600 bg-blue-50/80 shadow-md shadow-blue-500/10"
              : "border-slate-200 bg-white hover:border-sky-300 shadow-sm"
          }`}
        >
          <div className="pt-0.5">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-lg border ${
                completed.morning
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 text-transparent bg-white"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-blue-600" />
              <h4 className="font-serif text-base font-bold text-slate-950">
                {t("morningRitual")}
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t("morningDesc")}
            </p>
          </div>
        </div>

        {/* 2. Noon */}
        <div
          onClick={() => toggleRitual("noon")}
          className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
            completed.noon
              ? "border-blue-600 bg-blue-50/80 shadow-md shadow-blue-500/10"
              : "border-slate-200 bg-white hover:border-sky-300 shadow-sm"
          }`}
        >
          <div className="pt-0.5">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-lg border ${
                completed.noon
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 text-transparent bg-white"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <h4 className="font-serif text-base font-bold text-slate-950">
                {t("noonRitual")}
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t("noonDesc")}
            </p>
          </div>
        </div>

        {/* 3. Evening */}
        <div
          onClick={() => toggleRitual("evening")}
          className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
            completed.evening
              ? "border-blue-600 bg-blue-50/80 shadow-md shadow-blue-500/10"
              : "border-slate-200 bg-white hover:border-sky-300 shadow-sm"
          }`}
        >
          <div className="pt-0.5">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-lg border ${
                completed.evening
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 text-transparent bg-white"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-600" />
              <h4 className="font-serif text-base font-bold text-slate-950">
                {t("eveningRitual")}
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t("eveningDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Ancestral Proverb Card */}
      <div className="rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 via-white to-sky-50 p-6 flex items-start gap-4 shadow-sm">
        <BookOpen className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Parole Ancestrale du Crépuscule
          </div>
          <blockquote className="font-serif text-sm sm:text-base italic text-slate-800 leading-relaxed">
            {proverbs[streak % proverbs.length]}
          </blockquote>
        </div>
      </div>
    </div>
  );
}
