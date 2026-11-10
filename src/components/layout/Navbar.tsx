"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/routing";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Globe, Shield, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { CartDrawer } from "@/components/shop/CartDrawer";

export function Navbar() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { openCart, getTotalCount } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? getTotalCount() : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold-500/10 bg-cosmos-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-400/30 text-gold-400 shadow-[0_0_15px_rgba(245,192,66,0.2)] group-hover:border-gold-400 transition-colors">
            <Sparkles className="h-5 w-5 animate-pulse-slow" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-wide text-gold-300">
              AFRICA WORLD SAVING
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gold-400/70 font-sans">
              AWS Sanctuaire Spirituel
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link
            href="/"
            className="hover:text-gold-300 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-gold-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("home")}
          </Link>
          <Link
            href="/consultations"
            className="hover:text-gold-300 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-gold-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("consultations")}
          </Link>
          <Link
            href="/practitioners"
            className="hover:text-gold-300 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-gold-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("practitioners")}
          </Link>
          <Link
            href="/boutique"
            className="hover:text-gold-300 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-gold-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("shop")}
          </Link>
          <Link
            href="/forum"
            className="hover:text-gold-300 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-gold-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("forum")}
          </Link>
          <Link
            href="/blog"
            className="hover:text-gold-300 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-gold-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("blog")}
          </Link>
          <Link
            href="/about"
            className="hover:text-gold-300 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-gold-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            {t("about")}
          </Link>
        </nav>

        {/* Action + Lang */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-gold-500/20 text-gold-300 hover:bg-gold-500/10 transition-colors"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-cosmos-950">
                {cartCount}
              </span>
            )}
          </button>
          <Link
            href="/consultations"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Shield className="h-3.5 w-3.5" />
            {tc("consult")}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gold-500/20 text-gold-300 hover:bg-gold-500/10 transition-colors"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-cosmos-950">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold-500/20 text-gold-400 hover:bg-gold-500/10"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-gold-500/20 bg-cosmos-900/95 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gold-500/10 hover:text-gold-300"
          >
            {t("home")}
          </Link>
          <Link
            href="/consultations"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gold-500/10 hover:text-gold-300"
          >
            {t("consultations")}
          </Link>
          <Link
            href="/practitioners"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gold-500/10 hover:text-gold-300"
          >
            {t("practitioners")}
          </Link>
          <Link
            href="/boutique"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gold-500/10 hover:text-gold-300"
          >
            {t("shop")}
          </Link>
          <Link
            href="/forum"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gold-500/10 hover:text-gold-300"
          >
            {t("forum")}
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gold-500/10 hover:text-gold-300"
          >
            {t("blog")}
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gold-500/10 hover:text-gold-300"
          >
            {t("about")}
          </Link>

          <div className="pt-3 border-t border-gold-500/10">
            <Link
              href="/consultations"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-cosmos-950"
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
