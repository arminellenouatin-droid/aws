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
      className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label={t("cartTitle")}
    >
      <div className="absolute inset-0" onClick={closeCart} />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white border-l border-sky-100 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-sky-100 bg-slate-50/80">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 border border-sky-200 text-blue-600">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h2 className="font-serif text-xl font-bold text-slate-950">
                {t("cartTitle")}
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="rounded-lg p-2 text-slate-500 hover:bg-sky-50 hover:text-blue-600 transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-4">
                <div className="h-16 w-16 rounded-full bg-sky-50 flex items-center justify-center text-blue-600">
                  <Sparkles className="h-8 w-8 opacity-75" />
                </div>
                <p className="text-slate-600 text-sm max-w-xs">
                  {t("cartEmpty")}
                </p>
                <button
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all"
                >
                  Découvrir les trésors
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-xl bg-slate-50/80 border border-sky-100"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-sm font-bold text-slate-950 leading-snug">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Supprimer cet article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-xs text-blue-700 font-mono font-medium">
                      {item.product.priceXof.toLocaleString("fr-FR")} FCFA{" "}
                      <span className="text-slate-500">
                        ({item.product.priceEur} €)
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center border border-sky-200 rounded-lg bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1.5 text-slate-500 hover:text-blue-600 transition-colors"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-slate-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1.5 text-slate-500 hover:text-blue-600 transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="text-xs font-bold text-slate-950 ml-auto font-mono">
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
            <div className="border-t border-sky-100 bg-slate-50/90 p-6 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{t("subtotal")}</span>
                  <span className="font-mono text-slate-950 font-bold">
                    {totalXof.toLocaleString("fr-FR")} FCFA ({totalEur} €)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                  <span>{t("shipping")}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/panier"
                  onClick={closeCart}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>{t("checkout")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="flex justify-between items-center text-xs pt-1">
                  <button
                    onClick={clearCart}
                    className="text-slate-500 hover:text-red-500 transition-colors"
                  >
                    Vider le panier
                  </button>
                  <button
                    onClick={closeCart}
                    className="text-blue-600 hover:text-blue-700 transition-colors underline underline-offset-4 font-medium"
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
