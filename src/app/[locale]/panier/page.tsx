"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/lib/store/cart-store";
import { Link, useRouter } from "@/lib/i18n/routing";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Lock,
  ArrowRight,
  Truck,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function CartPage() {
  const t = useTranslations("shop");
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPriceXof,
    getTotalPriceEur,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Customer form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Bénin");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-cosmos-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold-400" />
      </div>
    );
  }

  const hasPhysicalItems = items.some((item) => item.product.type !== "digital");
  const totalXof = getTotalPriceXof();
  const totalEur = getTotalPriceEur();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Veuillez renseigner votre adresse email pour recevoir la confirmation.");
      return;
    }

    if (hasPhysicalItems && (!street || !city)) {
      setErrorMessage("Veuillez renseigner votre adresse postale complète pour l'expédition.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/checkout/chariow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: {
            name: fullName,
            email,
            phone,
          },
          shippingAddress: hasPhysicalItems
            ? {
                fullName,
                phone,
                street,
                city,
                country,
              }
            : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Impossible d'initialiser le paiement Chariow");
      }

      // Redirection vers le guichet Chariow sécurisé
      window.location.href = data.checkoutUrl;
    } catch (err: any) {
      console.error("❌ [CHECKOUT_SUBMIT_ERROR]", err);
      setErrorMessage(err.message || "Une erreur est survenue lors de l'accès au paiement.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Page Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400">
            <ShoppingBag className="h-4 w-4" />
            Panier & Finalisation
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gold-200">
            {t("cartTitle")}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-gold-500/20 bg-cosmos-900/40 p-12 text-center space-y-6">
            <div className="h-20 w-20 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 border border-gold-500/20">
              <Sparkles className="h-10 w-10 opacity-70" />
            </div>
            <div className="space-y-2 max-w-sm">
              <h2 className="font-serif text-xl font-bold text-gold-200">
                Votre panier sacré est vide
              </h2>
              <p className="text-sm text-muted-foreground">{t("cartEmpty")}</p>
            </div>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all"
            >
              <span>Explorer la Boutique Sacrée</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Items in Cart */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gold-500/20 bg-cosmos-900/60 shadow-lg"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-gold-500/15 text-gold-400 border border-gold-500/30">
                          {item.product.category}
                        </span>
                        {item.product.type === "digital" && (
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            Numérique
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-base font-bold text-gold-200">
                        {item.product.name}
                      </h3>
                      <div className="text-xs text-muted-foreground font-mono">
                        {item.product.priceXof.toLocaleString("fr-FR")} FCFA (~{" "}
                        {item.product.priceEur} €)
                      </div>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-0 border-gold-500/10">
                      <div className="flex items-center border border-gold-500/25 rounded-xl bg-cosmos-950">
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

                      <div className="text-right">
                        <div className="font-serif text-sm font-bold text-gold-300">
                          {(
                            item.product.priceXof * item.quantity
                          ).toLocaleString("fr-FR")}{" "}
                          FCFA
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-red-400 transition-colors p-1"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs text-muted-foreground px-2">
                <button
                  onClick={clearCart}
                  className="hover:text-red-400 transition-colors underline underline-offset-4"
                >
                  Vider tout le panier
                </button>
                <Link
                  href="/boutique"
                  className="text-gold-400 hover:text-gold-300 transition-colors"
                >
                  + Ajouter d&apos;autres articles
                </Link>
              </div>
            </div>

            {/* Right: Checkout Form & Total */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleCheckout}
                className="rounded-3xl border border-gold-500/25 bg-cosmos-900/70 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-sm"
              >
                <h2 className="font-serif text-xl font-bold text-gold-200 border-b border-gold-500/15 pb-4">
                  Informations de Livraison & Contact
                </h2>

                {errorMessage && (
                  <div className="flex items-center gap-2 p-3.5 rounded-xl border border-red-500/30 bg-red-950/30 text-xs text-red-300">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-medium text-gold-300/90 mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex: Koffi Mensah"
                      className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 px-3.5 py-2.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gold-300/90 mb-1">
                      Adresse email (réception des accès & reçus) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre.email@exemple.com"
                      className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 px-3.5 py-2.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gold-300/90 mb-1">
                      Numéro de téléphone (Mobile Money / Suivi)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+229 97 00 00 00"
                      className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 px-3.5 py-2.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  {hasPhysicalItems && (
                    <div className="pt-2 border-t border-gold-500/10 space-y-3">
                      <div className="flex items-center gap-1.5 text-gold-400 font-semibold">
                        <Truck className="h-4 w-4" />
                        <span>Adresse d&apos;expédition physique</span>
                      </div>

                      <div>
                        <label className="block font-medium text-gold-300/90 mb-1">
                          Rue / Quartier / Repère *
                        </label>
                        <input
                          type="text"
                          required
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          placeholder="Quartier Haie Vive, Rue 340"
                          className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 px-3.5 py-2.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-medium text-gold-300/90 mb-1">
                            Ville *
                          </label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Cotonou"
                            className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 px-3.5 py-2.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-gold-300/90 mb-1">
                            Pays *
                          </label>
                          <input
                            type="text"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Bénin"
                            className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 px-3.5 py-2.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price calculation */}
                <div className="pt-4 border-t border-gold-500/15 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Sous-total</span>
                    <span className="font-mono text-gold-300">
                      {totalXof.toLocaleString("fr-FR")} FCFA ({totalEur} €)
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frais de livraison</span>
                    <span className="text-emerald-400 font-semibold">
                      Inclus / Offerts
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gold-100 pt-2 border-t border-gold-500/15">
                    <span>Total à régler</span>
                    <span className="font-serif text-xl text-gold-300">
                      {totalXof.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-4 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-xl shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Génération de la session sécurisée...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>{t("checkout")}</span>
                    </>
                  )}
                </button>

                <div className="space-y-1.5 text-center text-[11px] text-muted-foreground">
                  <div className="flex items-center justify-center gap-1.5 text-gold-400/90 font-medium">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Paiements acceptés : MTN, Moov, Wave, Carte Bancaire</span>
                  </div>
                  <p>Guichet sécurisé par Chariow • Chiffrement SSL 256 bits</p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
