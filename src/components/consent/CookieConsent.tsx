"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Shield, Settings, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConsentSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = "aws_cookie_consent_v1";

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setShowBanner(true);
      }
    } catch {
      // LocalStorage access restricted
    }
  }, []);

  const saveConsent = (settings: ConsentSettings) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore storage error
    }
    setShowBanner(false);
    setShowCustomize(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRefuseAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      necessary: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    });
  };

  if (!mounted || !showBanner) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-2xl border border-gold-500/30 bg-cosmos-900/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-400">
            <Shield className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-base font-semibold text-gold-300">
              {t("title")}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Customization Details Accordion */}
        {showCustomize && (
          <div className="mt-2 space-y-3 rounded-xl border border-gold-500/15 bg-cosmos-950/60 p-4 text-xs">
            {/* Necessary */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-foreground">
                  {t("necessary")}
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Indispensables pour maintenir votre session sécurisée.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-gold-400/80">
                Toujours actif
              </span>
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between border-t border-gold-500/10 pt-2">
              <label htmlFor="consent-analytics" className="cursor-pointer">
                <span className="font-semibold text-foreground">
                  {t("analytics")}
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Anonyme pour mesurer la stabilité réseau en Afrique.
                </p>
              </label>
              <input
                id="consent-analytics"
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 rounded border-gold-500/40 text-gold-500 focus:ring-gold-500"
              />
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between border-t border-gold-500/10 pt-2">
              <label htmlFor="consent-marketing" className="cursor-pointer">
                <span className="font-semibold text-foreground">
                  {t("marketing")}
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Informations sur nos nouveaux rituels et guidances.
                </p>
              </label>
              <input
                id="consent-marketing"
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="h-4 w-4 rounded border-gold-500/40 text-gold-500 focus:ring-gold-500"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
          {!showCustomize ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCustomize(true)}
                className="text-xs"
              >
                <Settings className="h-3.5 w-3.5 mr-1" />
                {t("customize")}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleRefuseAll}
                className="text-xs"
              >
                {t("refuseAll")}
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleAcceptAll}
                className="text-xs"
              >
                {t("acceptAll")}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCustomize(false)}
                className="text-xs"
              >
                Annuler
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveCustom}
                className="text-xs"
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                {t("save")}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
