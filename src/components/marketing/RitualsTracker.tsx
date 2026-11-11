"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Sun,
  Moon,
  Sparkles,
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
      <div className="rounded-3xl border border-gold-500/25 bg-gradient-to-r from-cosmos-900 via-cosmos-950 to-cosmos-900 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl backdrop-blur-sm">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-orange-400 animate-pulse" />
            {t("currentStreak")}
          </span>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-gold-100">
            {t("days", { count: streak })}
          </div>
          <p className="text-xs text-muted-foreground">
            Chaque jour consacré fortifie votre égrégore et dissout les ombres.
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400 shadow-[0_0_20px_rgba(245,192,66,0.15)] flex-shrink-0">
          <Award className="h-8 w-8" />
        </div>
      </div>

      {allDoneToday && (
        <div className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-xs sm:text-sm text-emerald-300 font-medium">
          <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
          <span>{t("alreadyCompleted")}</span>
        </div>
      )}

      {/* Lunar Phase Card */}
      <div className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-300 flex-shrink-0">
          <Moon className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
            {t("lunarPhase")}
          </div>
          <h3 className="font-serif text-base font-bold text-gold-200">
            Lune Gibbeuse Croissante • Énergies d&apos;Élévation & de Clarté
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            La période actuelle est particulièrement propice à l&apos;ouverture des voies
            professionnelles et à la purification des espaces intérieurs.
          </p>
        </div>
      </div>

      {/* 3 Daily Micro-Rituals */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-gold-200">
          Pratiques Rituelles du Jour
        </h3>

        {/* 1. Morning */}
        <div
          onClick={() => toggleRitual("morning")}
          className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
            completed.morning
              ? "border-emerald-500/40 bg-emerald-950/20 shadow-md"
              : "border-gold-500/15 bg-cosmos-900/50 hover:border-gold-500/30"
          }`}
        >
          <div className="pt-0.5">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-lg border ${
                completed.morning
                  ? "border-emerald-400 bg-emerald-500 text-cosmos-950"
                  : "border-gold-500/30 text-transparent"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-gold-400" />
              <h4 className="font-serif text-base font-bold text-gold-200">
                {t("morningRitual")}
              </h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("morningDesc")}
            </p>
          </div>
        </div>

        {/* 2. Noon */}
        <div
          onClick={() => toggleRitual("noon")}
          className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
            completed.noon
              ? "border-emerald-500/40 bg-emerald-950/20 shadow-md"
              : "border-gold-500/15 bg-cosmos-900/50 hover:border-gold-500/30"
          }`}
        >
          <div className="pt-0.5">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-lg border ${
                completed.noon
                  ? "border-emerald-400 bg-emerald-500 text-cosmos-950"
                  : "border-gold-500/30 text-transparent"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <h4 className="font-serif text-base font-bold text-gold-200">
                {t("noonRitual")}
              </h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("noonDesc")}
            </p>
          </div>
        </div>

        {/* 3. Evening */}
        <div
          onClick={() => toggleRitual("evening")}
          className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
            completed.evening
              ? "border-emerald-500/40 bg-emerald-950/20 shadow-md"
              : "border-gold-500/15 bg-cosmos-900/50 hover:border-gold-500/30"
          }`}
        >
          <div className="pt-0.5">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-lg border ${
                completed.evening
                  ? "border-emerald-400 bg-emerald-500 text-cosmos-950"
                  : "border-gold-500/30 text-transparent"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-gold-400" />
              <h4 className="font-serif text-base font-bold text-gold-200">
                {t("eveningRitual")}
              </h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("eveningDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Daily Proverb */}
      <div className="rounded-2xl border border-gold-500/15 bg-cosmos-950/60 p-6 space-y-2 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
          {t("proverb")}
        </span>
        <p className="font-serif text-base italic text-gold-200 max-w-lg mx-auto">
          {proverbs[0]}
        </p>
      </div>
    </div>
  );
}
