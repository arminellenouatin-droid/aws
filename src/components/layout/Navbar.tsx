"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Shield, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { CartDrawer } from "@/components/shop/CartDrawer";

export function Navbar() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { openCart, getTotalCount } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? getTotalCount() : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-100 bg-white/85 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand - Noir & Bleu Pure & Bleu Ciel */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-sky-100 border border-sky-300 text-blue-600 shadow-[0_0_15px_rgba(56,189,248,0.25)] group-hover:border-blue-600 transition-colors">
            <Sparkles className="h-5 w-5 animate-pulse-slow text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-wide text-slate-950 group-hover:text-blue-600 transition-colors">
              AFRICA WORLD SAVING
            </span>
            <span className="text-[10px] uppercase tracking-widest text-sky-600 font-sans font-semibold">
              AWS Sanctuaire Spirituel
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-blue-600 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("home")}
          </Link>
          <Link
            href="/consultations"
            className="hover:text-blue-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-blue-600 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("consultations")}
          </Link>
          <Link
            href="/practitioners"
            className="hover:text-blue-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-blue-600 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("practitioners")}
          </Link>
          <Link
            href="/boutique"
            className="hover:text-blue-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-blue-600 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("shop")}
          </Link>
          <Link
            href="/forum"
            className="hover:text-blue-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-blue-600 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("forum")}
          </Link>
          <Link
            href="/blog"
            className="hover:text-blue-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-blue-600 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("blog")}
          </Link>
          <Link
            href="/about"
            className="hover:text-blue-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-blue-600 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("about")}
          </Link>
        </nav>

        {/* Action + Lang */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-sky-200 text-slate-700 hover:bg-sky-50 hover:text-blue-600 transition-colors"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
          <Link
            href="/consultations"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-sky-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-sky-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Shield className="h-3.5 w-3.5 text-white" />
            {tc("consult")}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-sky-200 text-slate-700 hover:bg-sky-50 transition-colors"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-200 text-slate-700 hover:bg-sky-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-sky-100 bg-white/98 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-blue-600"
          >
            {t("home")}
          </Link>
          <Link
            href="/consultations"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-blue-600"
          >
            {t("consultations")}
          </Link>
          <Link
            href="/practitioners"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-blue-600"
          >
            {t("practitioners")}
          </Link>
          <Link
            href="/boutique"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-blue-600"
          >
            {t("shop")}
          </Link>
          <Link
            href="/forum"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-blue-600"
          >
            {t("forum")}
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-blue-600"
          >
            {t("blog")}
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-blue-600"
          >
            {t("about")}
          </Link>

          <div className="pt-3 border-t border-sky-100">
            <Link
              href="/consultations"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-blue-500/20"
            >
              <Shield className="h-4 w-4" />
              {tc("consult")}
            </Link>
          </div>
        </div>
      )}

      {/* Cart Drawer Modal */}
      <CartDrawer />
    </header>
  );
}
