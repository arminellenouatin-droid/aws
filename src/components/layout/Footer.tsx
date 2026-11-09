import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { Sparkles, ShieldCheck, HeartHandshake, Lock } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");

  return (
    <footer className="w-full border-t border-gold-500/15 bg-cosmos-950 text-foreground pt-14 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Ethical Warning Banner (Mandatory) */}
        <div className="mb-12 rounded-2xl border border-gold-500/20 bg-gradient-to-r from-cosmos-900/90 via-cosmos-850/80 to-cosmos-900/90 p-5 sm:p-6 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="text-xs leading-relaxed text-muted-foreground/90 font-sans">
              <span className="font-semibold text-gold-300 block mb-1 uppercase tracking-wider text-[11px]">
                Charte d'Éthique & Avertissement Spirituel
              </span>
              {tc("ethicalNotice")}
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold-400" />
              <span className="font-serif text-lg font-bold text-gold-300 tracking-wide">
                AFRICA WORLD SAVING
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Le sanctuaire digital d'accompagnement spirituel authentique, connectant la sagesse séculaire africaine aux femmes et aux hommes du monde entier.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-400/80 font-medium">
              <Lock className="h-3.5 w-3.5 text-gold-400" />
              <span>Chiffrement & Confidentialité Totale</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold-300">
              Accompagnements
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/consultations" className="hover:text-gold-300 transition-colors">
                  Guidance & Voyance
                </Link>
              </li>
              <li>
                <Link href="/consultations" className="hover:text-gold-300 transition-colors">
                  Purification & Déblocage
                </Link>
              </li>
              <li>
                <Link href="/consultations" className="hover:text-gold-300 transition-colors">
                  Protection Spirituelle
                </Link>
              </li>
              <li>
                <Link href="/consultations" className="hover:text-gold-300 transition-colors">
                  Harmonie & Prospérité
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sanctuaire & Boutique */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold-300">
              Sanctuaire & Ressources
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/boutique" className="hover:text-gold-300 transition-colors">
                  Boutique Sacrée
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-gold-300 transition-colors">
                  Cercle & Forum
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold-300 transition-colors">
                  Enseignements & Méditations
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-gold-300 transition-colors">
                  Notre Charte Déontologique
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Paiements Sécurisés Chariow */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold-300">
              Règlement Sécurisé
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Transactions instantanées traitées en toute sécurité via <strong>Chariow</strong> :
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-cosmos-950">
              <span className="rounded bg-gold-400 px-2 py-0.5">Mobile Money</span>
              <span className="rounded bg-gold-300 px-2 py-0.5">MTN</span>
              <span className="rounded bg-gold-300 px-2 py-0.5">Moov</span>
              <span className="rounded bg-gold-300 px-2 py-0.5">Orange</span>
              <span className="rounded bg-gold-300 px-2 py-0.5">Wave</span>
              <span className="rounded bg-gold-300 px-2 py-0.5">Visa / Mastercard</span>
            </div>
            <p className="text-[11px] text-muted-foreground/70">
              Afrique (XOF, XAF, GNF) et International (EUR, USD).
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gold-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>{t("copyright")}</p>
          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/legal/mentions-legales" className="hover:text-gold-300 transition-colors">
              {t("legal")}
            </Link>
            <Link href="/legal/confidentialite" className="hover:text-gold-300 transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/legal/cgv" className="hover:text-gold-300 transition-colors">
              {t("terms")}
            </Link>
            <Link href="/legal/avertissement" className="hover:text-gold-300 transition-colors">
              {t("disclaimer")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
