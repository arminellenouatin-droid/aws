"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Copy, Check, Share2, Sparkles } from "lucide-react";

export function ReferralLinkBox() {
  const t = useTranslations("referral");
  const [copied, setCopied] = useState(false);

  // Génération d'un code de parrainage harmonieux ou lecture depuis le stockage
  const referralCode = "AWS-LUMIERE-777";
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/?ref=${referralCode}`
    : `https://africaworldsaving.com/?ref=${referralCode}`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="rounded-3xl border border-gold-500/25 bg-cosmos-900/70 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-sm max-w-2xl mx-auto text-left">
      <div className="flex items-center justify-between border-b border-gold-500/15 pb-4">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {t("shareLink")}
          </span>
          <div className="font-mono text-sm text-gold-300 font-bold">
            Code Fraternel : {referralCode}
          </div>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/25 text-gold-400">
          <Share2 className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs text-muted-foreground">
          Lien personnalisé à transmettre à vos proches :
        </label>
        <div className="flex flex-col sm:flex-row items-stretch gap-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 rounded-xl border border-gold-500/20 bg-cosmos-950 px-4 py-3 text-xs sm:text-sm text-gold-200 font-mono focus:outline-none select-all"
          />
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all flex-shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>{t("copied")}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>{t("copyLink")}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gold-500/15 bg-cosmos-950/40 p-4 text-xs text-muted-foreground space-y-1">
        <span className="text-gold-300 font-semibold">Conseil de transmission :</span>
        <p className="leading-relaxed">
          Partagez ce lien sur WhatsApp ou par message privé en expliquant avec bienveillance
          comment le sanctuaire a éclairé votre propre cheminement.
        </p>
      </div>
    </div>
  );
}
