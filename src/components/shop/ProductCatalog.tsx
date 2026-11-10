"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SACRED_PRODUCTS, ProductItem } from "@/lib/constants/products";
import { useCartStore } from "@/lib/store/cart-store";
import { Link } from "@/lib/i18n/routing";
import {
  Sparkles,
  ShoppingBag,
  Check,
  ShieldCheck,
  Download,
  Flame,
  ArrowRight,
} from "lucide-react";

export function ProductCatalog() {
  const t = useTranslations("shop");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const { addItem, openCart } = useCartStore();

  const categories = [
    { key: "all", label: t("filterAll") },
    { key: "encens", label: t("filterEncens") },
    { key: "huiles", label: t("filterHuiles") },
    { key: "talismans", label: t("filterTalismans") },
    { key: "rituels", label: t("filterRituels") },
    { key: "livres", label: t("filterNumerique") },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? SACRED_PRODUCTS
      : SACRED_PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: ProductItem) => {
    addItem(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCategory === cat.key
                ? "bg-gradient-to-r from-gold-500 to-gold-600 text-cosmos-950 shadow-md shadow-gold-500/20"
                : "border border-gold-500/20 bg-cosmos-900/50 text-gold-300/80 hover:border-gold-500/40 hover:text-gold-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const isAdded = !!addedIds[product.id];
          return (
            <div
              key={product.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-gold-500/20 bg-gradient-to-b from-cosmos-900/80 to-cosmos-950 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-gold-500/40 hover:shadow-gold-500/10"
            >
              <div className="space-y-4">
                {/* Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                      product.type === "digital"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-gold-500/15 text-gold-400 border border-gold-500/30"
                    }`}
                  >
                    {product.type === "digital" ? (
                      <>
                        <Download className="h-3 w-3" />
                        {t("digitalBadge")}
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3 w-3" />
                        {t("physicalBadge")}
                      </>
                    )}
                  </span>

                  <span className="text-[11px] font-medium text-emerald-400/90 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {t("inStock")}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <Link
                    href={`/boutique/${product.slug}`}
                    className="group-hover:text-gold-300 transition-colors"
                  >
                    <h3 className="font-serif text-xl font-bold text-gold-200 leading-snug">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Features highlights */}
                <ul className="space-y-1.5 pt-2 border-t border-gold-500/10 text-xs text-muted-foreground">
                  {product.features.slice(0, 2).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-gold-400 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & CTA */}
              <div className="mt-6 pt-4 border-t border-gold-500/15 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div className="font-serif text-2xl font-bold text-gold-300">
                    {product.priceXof.toLocaleString("fr-FR")} FCFA
                  </div>
                  <div className="text-sm font-medium text-muted-foreground font-mono">
                    ~ {product.priceEur} €
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                      isAdded
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                        : "border-gold-500/30 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 hover:border-gold-500"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Ajouté !
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-3.5 w-3.5" />
                        {t("addToCart")}
                      </>
                    )}
                  </button>

                  <Link
                    href={`/boutique/${product.slug}`}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all text-center"
                  >
                    <span>Détails</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
