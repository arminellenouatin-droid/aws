import { getTranslations } from "next-intl/server";
import { ProductCatalog } from "@/components/shop/ProductCatalog";
import { Sparkles, ShieldCheck, Truck, RefreshCw, Lock } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Boutique Sacrée & Objets de Rituel | AWS : Africa World Saving"
      : "Sacred Boutique & Ritual Artifacts | AWS : Africa World Saving",
    description: isFr
      ? "Encens d'Oliban pur, huiles d'onction royales d'Abomey, talismans de Fâ en cuivre et guides initiatiques e-books pour vos rituels spirituels."
      : "Pure Olibanum incense, royal Abomey anointing oils, copper Fa talismans, and initiatory e-books for your spiritual ceremonies.",
    alternates: {
      canonical: `/${locale}/boutique`,
      languages: {
        fr: "/fr/boutique",
        en: "/en/boutique",
      },
    },
    openGraph: {
      title: isFr
        ? "Boutique Sacrée | AWS : Africa World Saving"
        : "Sacred Boutique | AWS : Africa World Saving",
      description: isFr
        ? "Trésors sacrés et objets de rituel authentiques préparés dans la pure tradition africaine."
        : "Authentic sacred treasures and ritual artifacts crafted in pure African tradition.",
    },
  };
}

export default async function BoutiquePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("title"),
    description: t("subtitle"),
    url: `https://africaworldsaving.com/${locale}/boutique`,
    isPartOf: {
      "@type": "WebSite",
      name: "AWS : Africa World Saving",
      url: "https://africaworldsaving.com",
    },
  };

  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl space-y-16">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400">
            <Sparkles className="h-3.5 w-3.5" />
            Sanctuaire des Matières Sacrées
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Reassurance Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 px-6 rounded-2xl border border-gold-500/15 bg-cosmos-900/40 text-center">
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Sparkles className="h-5 w-5 text-gold-400" />
            <span className="font-serif text-xs font-bold text-gold-200">
              Consécration Authentique
            </span>
            <span className="text-[11px] text-muted-foreground">
              Bénis par les dépositaires
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Truck className="h-5 w-5 text-gold-400" />
            <span className="font-serif text-xs font-bold text-gold-200">
              Expédition Internationale
            </span>
            <span className="text-[11px] text-muted-foreground">
              Afrique & Diaspora entière
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Lock className="h-5 w-5 text-gold-400" />
            <span className="font-serif text-xs font-bold text-gold-200">
              Paiement Chariow
            </span>
            <span className="text-[11px] text-muted-foreground">
              Mobile Money, Wave & Cartes
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2">
            <RefreshCw className="h-5 w-5 text-gold-400" />
            <span className="font-serif text-xs font-bold text-gold-200">
              Accès Numérique Immédiat
            </span>
            <span className="text-[11px] text-muted-foreground">
              E-books & audios instantanés
            </span>
          </div>
        </div>

        {/* Catalog */}
        <ProductCatalog />
      </div>
    </div>
  );
}
