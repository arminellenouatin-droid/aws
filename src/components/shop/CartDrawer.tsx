"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/lib/store/cart-store";
import { Link } from "@/lib/i18n/routing";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function CartDrawer() {
  const t = useTranslations("shop");
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPriceXof,
    getTotalPriceEur,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fermeture par la touche Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  if (!mounted || !isOpen) return null;

  const totalXof = getTotalPriceXof();
  const totalEur = getTotalPriceEur();

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-cosmos-950/80 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label={t("cartTitle")}
    >
      <div className="absolute inset-0" onClick={closeCart} />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-cosmos-900 border-l border-gold-500/20 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gold-500/20 bg-cosmos-950/50">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h2 className="font-serif text-xl font-bold text-gold-300">
                {t("cartTitle")}
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="rounded-lg p-2 text-muted-foreground hover:bg-gold-500/10 hover:text-gold-300 transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-4">
                <div className="h-16 w-16 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400">
                  <Sparkles className="h-8 w-8 opacity-60" />
                </div>
                <p className="text-muted-foreground text-sm max-w-xs">
                  {t("cartEmpty")}
                </p>
                <button
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 rounded-lg bg-gold-500/10 border border-gold-500/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold-400 hover:bg-gold-500/20 transition-all"
                >
                  Découvrir les trésors
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-xl bg-cosmos-950/60 border border-gold-500/15"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-sm font-semibold text-gold-200 leading-snug">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-red-400 transition-colors p-1"
                        aria-label="Supprimer cet article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-xs text-gold-400/80 font-mono">
                      {item.product.priceXof.toLocaleString("fr-FR")} FCFA{" "}
                      <span className="text-muted-foreground">
                        ({item.product.priceEur} €)
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center border border-gold-500/20 rounded-lg bg-cosmos-900">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1.5 text-muted-foreground hover:text-gold-300 transition-colors"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-gold-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1.5 text-muted-foreground hover:text-gold-300 transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="text-xs font-semibold text-gold-300 ml-auto">
                        {(item.product.priceXof * item.quantity).toLocaleString(
                          "fr-FR"
                        )}{" "}
                        FCFA
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="border-t border-gold-500/20 bg-cosmos-950/70 p-6 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{t("subtotal")}</span>
                  <span className="font-mono text-gold-400 font-semibold">
                    {totalXof.toLocaleString("fr-FR")} FCFA ({totalEur} €)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/80">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold-400 flex-shrink-0" />
                  <span>{t("shipping")}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/panier"
                  onClick={closeCart}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-cosmos-950 shadow-lg shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>{t("checkout")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="flex justify-between items-center text-xs pt-1">
                  <button
                    onClick={clearCart}
                    className="text-muted-foreground hover:text-red-400 transition-colors"
                  >
                    Vider le panier
                  </button>
                  <button
                    onClick={closeCart}
                    className="text-gold-400 hover:text-gold-300 transition-colors underline underline-offset-4"
                  >
                    Continuer mes achats
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
