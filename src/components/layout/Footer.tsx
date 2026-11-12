import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { Sparkles, ShieldCheck, Lock } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");

  return (
    <footer className="w-full border-t border-sky-100 bg-slate-50 text-slate-800 pt-14 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Ethical Warning Banner (Mandatory) */}
        <div className="mb-12 rounded-2xl border border-sky-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-sky-200 text-blue-600">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-xs leading-relaxed text-slate-600 font-sans">
              <span className="font-semibold text-blue-900 block mb-1 uppercase tracking-wider text-[11px]">
                Charte d&apos;Éthique & Avertissement Spirituel
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
              <Sparkles className="h-5 w-5 text-blue-600" />
              <span className="font-serif text-lg font-bold text-slate-950 tracking-wide">
                AFRICA WORLD SAVING
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Le sanctuaire digital d&apos;accompagnement spirituel authentique, connectant la sagesse séculaire africaine aux femmes et aux hommes du monde entier.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-700 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-200/80 font-medium w-fit">
              <Lock className="h-3.5 w-3.5 text-blue-600" />
              <span>Chiffrement & Confidentialité Totale</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-slate-950">
              Accompagnements
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/consultations" className="hover:text-blue-600 transition-colors">
                  Guidance & Voyance
                </Link>
              </li>
              <li>
                <Link href="/consultations" className="hover:text-blue-600 transition-colors">
                  Purification & Déblocage
                </Link>
              </li>
              <li>
                <Link href="/consultations" className="hover:text-blue-600 transition-colors">
                  Protection Spirituelle
                </Link>
              </li>
              <li>
                <Link href="/consultations" className="hover:text-blue-600 transition-colors">
                  Harmonie & Prospérité
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sanctuaire & Boutique */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-slate-950">
              Sanctuaire & Ressources
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/boutique" className="hover:text-blue-600 transition-colors">
                  Boutique Sacrée
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-blue-600 transition-colors">
                  Cercle & Forum
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">
                  Enseignements & Méditations
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  Notre Charte & Mission
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-600 transition-colors">
                  Foire Aux Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Assistance & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Paiements Sécurisés Chariow */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-slate-950">
              Règlement Sécurisé
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transactions instantanées traitées en toute sécurité via <strong>Chariow</strong> :
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
              <span className="rounded bg-sky-100 text-blue-900 border border-sky-200 px-2 py-0.5">Mobile Money</span>
              <span className="rounded bg-sky-100 text-blue-900 border border-sky-200 px-2 py-0.5">MTN</span>
              <span className="rounded bg-sky-100 text-blue-900 border border-sky-200 px-2 py-0.5">Moov</span>
              <span className="rounded bg-sky-100 text-blue-900 border border-sky-200 px-2 py-0.5">Orange</span>
              <span className="rounded bg-sky-100 text-blue-900 border border-sky-200 px-2 py-0.5">Wave</span>
              <span className="rounded bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5">Visa / Mastercard</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Afrique (XOF, XAF, GNF) et International (EUR, USD).
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t("copyright")}</p>
          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              {t("terms")}
            </Link>
            <Link href="/spiritual-disclaimer" className="hover:text-blue-600 transition-colors">
              {t("disclaimer")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
