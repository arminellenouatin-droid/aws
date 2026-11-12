"use client";

import { useTranslations } from "next-intl";
import { WifiOff, RefreshCw, Sparkles, Shield, Heart } from "lucide-react";

export default function OfflinePage() {
  const t = useTranslations("offline");

  return (
    <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full text-center space-y-8 p-8 rounded-3xl border border-sky-100 shadow-xl bg-white">
        {/* Offline Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-50 border border-sky-200 text-blue-600 shadow-sm">
          <WifiOff className="h-10 w-10 text-blue-600 animate-pulse" />
        </div>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Sanctuaire Paisible</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">
            {t("title")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Tip Box */}
        <div className="rounded-2xl border border-sky-100 bg-slate-50/80 p-5 text-left space-y-2">
          <div className="text-xs font-bold text-blue-800 flex items-center gap-1.5 uppercase tracking-wide">
            <Heart className="h-3.5 w-3.5 text-blue-600" />
            <span>{t("tipTitle")}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            {t("tipDesc")}
          </p>
        </div>

        {/* Reconnect Action */}
        <div className="pt-2">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.reload();
              }
            }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/25 transition-all active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            <span>{t("retry")}</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <Shield className="h-3.5 w-3.5 text-blue-600" />
          <span>Données locales protégées • AWS Sanctuaire</span>
        </div>
      </div>
    </div>
  );
}
