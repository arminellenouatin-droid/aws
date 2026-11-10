"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/lib/store/cart-store";
import { Link } from "@/lib/i18n/routing";
import {
  CheckCircle2,
  Sparkles,
  Download,
  ArrowRight,
  ShieldCheck,
  FileText,
  Loader2,
} from "lucide-react";

function CheckoutSuccessContent() {
  const t = useTranslations("shop");
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();

  const orderId = searchParams.get("order_id");
  const chariowId = searchParams.get("chariow_id");

  useEffect(() => {
    // Nettoyage du panier une fois la commande validée
    clearCart();
  }, [clearCart]);

  return (
    <div className="mx-auto max-w-3xl space-y-10 py-16 px-4 text-center">
      {/* Sacred Icon */}
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gold-500/10 border-2 border-gold-500/30 text-gold-400 shadow-[0_0_50px_rgba(245,192,66,0.2)] animate-pulse-slow">
        <CheckCircle2 className="h-12 w-12" />
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <Sparkles className="h-3.5 w-3.5" />
          Paiement Confirmé avec Succès
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200">
          {t("orderSuccessTitle")}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {t("orderSuccessSubtitle")}
        </p>
      </div>

      {/* Order info card */}
      <div className="rounded-2xl border border-gold-500/20 bg-cosmos-900/60 p-6 sm:p-8 space-y-6 text-left shadow-xl backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/15 pb-4">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Référence Commande
            </div>
            <div className="font-mono text-base font-bold text-gold-300">
              {orderId ? `CMD-${orderId.slice(0, 8).toUpperCase()}` : "AWS-2026-VALIDE"}
            </div>
          </div>
          {chariowId && (
            <div className="text-left sm:text-right">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Transaction Chariow
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                {chariowId}
              </div>
            </div>
          )}
        </div>

        {/* Digital Downloads Box */}
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
            <Download className="h-4 w-4 text-emerald-400" />
            <span>Vos Fichiers Sacrés & Livres Numériques</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Vos accès de téléchargement ont été sécurisés. Vous pouvez dès à présent
            télécharger votre guide initiatique ou pack d&apos;audios :
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="/api/downloads/AWS-Guide-Fa-Numerique?token=demo-token"
              download="AWS-Guide-Fa-Odu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-all"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Guide-Fa-Odu-Initiation.pdf</span>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-gold-400 flex-shrink-0" />
          <span>
            Une notification de confirmation et votre reçu ont été expédiés à votre
            adresse email.
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all"
        >
          <span>Retour au Sanctuaire</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/boutique"
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-cosmos-900/50 px-6 py-3.5 text-xs font-semibold text-gold-300 hover:bg-gold-500/10 transition-all"
        >
          <span>Continuer mes découvertes</span>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground flex items-center justify-center">
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-gold-400" />
          </div>
        }
      >
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  );
}
