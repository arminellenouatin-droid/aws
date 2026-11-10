"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ProductItem } from "@/lib/constants/products";
import { useCartStore } from "@/lib/store/cart-store";
import { useRouter } from "@/lib/i18n/routing";
import {
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Zap,
  ShieldCheck,
  Lock,
} from "lucide-react";

export function ProductPurchaseBox({ product }: { product: ProductItem }) {
  const t = useTranslations("shop");
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push("/panier");
  };

  return (
    <div className="rounded-2xl border border-gold-500/25 bg-cosmos-900/60 p-6 space-y-6 shadow-xl backdrop-blur-sm">
      {/* Price section */}
      <div className="flex items-baseline justify-between border-b border-gold-500/15 pb-4">
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            Prix unitaire
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-gold-300">
            {product.priceXof.toLocaleString("fr-FR")} FCFA
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            Équivalent
          </div>
          <div className="text-lg font-mono font-semibold text-gold-400">
            {product.priceEur} €
          </div>
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Quantité
          </span>
          <div className="flex items-center border border-gold-500/25 rounded-xl bg-cosmos-950">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-muted-foreground hover:text-gold-300 transition-colors"
              aria-label="Diminuer la quantité"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 text-sm font-semibold text-gold-300">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-muted-foreground hover:text-gold-300 transition-colors"
              aria-label="Augmenter la quantité"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={handleBuyNow}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-lg shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Zap className="h-4 w-4" />
            <span>{t("buyNow")}</span>
          </button>

          <button
            onClick={handleAddToCart}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
              isAdded
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                : "border-gold-500/30 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 hover:border-gold-500"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4" />
                <span>Ajouté au panier</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                <span>{t("addToCart")}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Security notice */}
      <div className="pt-2 border-t border-gold-500/15 space-y-2 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 text-gold-400 flex-shrink-0" />
          <span>Paiement chiffré et sécurisé par Chariow</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-gold-400 flex-shrink-0" />
          <span>Garantie authenticité & bénédiction spirituelle</span>
        </div>
      </div>
    </div>
  );
}
