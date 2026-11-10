import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { SACRED_PRODUCTS, ProductItem } from "@/lib/constants/products";
import { ProductPurchaseBox } from "@/components/shop/ProductPurchaseBox";
import { Link } from "@/lib/i18n/routing";
import {
  Sparkles,
  Download,
  Check,
  ChevronRight,
  BookOpen,
  Info,
  Shield,
  Truck,
  HeartHandshake,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const params: Array<{ slug: string }> = [];
  for (const product of SACRED_PRODUCTS) {
    params.push({ slug: product.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = SACRED_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Trésor non trouvé | AWS" };
  }

  return {
    title: `${product.name} | Boutique Sacrée AWS`,
    description: product.shortDescription,
    alternates: {
      canonical: `/${locale}/boutique/${slug}`,
      languages: {
        fr: `/fr/boutique/${slug}`,
        en: `/en/boutique/${slug}`,
      },
    },
    openGraph: {
      title: `${product.name} | AWS : Africa World Saving`,
      description: product.shortDescription,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = SACRED_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "shop" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.fullDescription,
    image: `https://africaworldsaving.com${product.images[0] || "/images/og-default.jpg"}`,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "AWS : Africa World Saving",
    },
    offers: {
      "@type": "Offer",
      price: product.priceXof,
      priceCurrency: "XOF",
      availability: "https://schema.org/InStock",
      url: `https://africaworldsaving.com/${locale}/boutique/${product.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl space-y-12">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-muted-foreground"
          aria-label="Fil d'Ariane"
        >
          <Link href="/" className="hover:text-gold-300 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gold-500/50" />
          <Link
            href="/boutique"
            className="hover:text-gold-300 transition-colors"
          >
            Boutique Sacrée
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gold-500/50" />
          <span className="text-gold-300 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Visual Presentation & Descriptions */}
          <div className="lg:col-span-7 space-y-10">
            {/* Visual Hero Card */}
            <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-br from-cosmos-900 via-cosmos-950 to-cosmos-900 p-8 sm:p-12 text-center shadow-2xl">
              <div className="absolute top-4 left-4">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                    product.type === "digital"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-gold-500/20 text-gold-300 border border-gold-500/40"
                  }`}
                >
                  {product.type === "digital" ? (
                    <>
                      <Download className="h-3.5 w-3.5" />
                      {t("digitalBadge")}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      {t("physicalBadge")}
                    </>
                  )}
                </span>
              </div>

              <div className="my-8 flex justify-center">
                <div className="flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-3xl bg-gold-500/10 border-2 border-gold-500/30 text-gold-400 shadow-[0_0_40px_rgba(245,192,66,0.15)] animate-pulse-slow">
                  <Sparkles className="h-16 w-16" />
                </div>
              </div>

              <div className="text-xs uppercase tracking-widest text-gold-400/80 font-sans">
                Sanctuaire AWS • Artisanat & Rituels du Golfe de Guinée
              </div>
            </div>

            {/* Description & Cultural Context */}
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-gold-300">
                  Origine Spirituelle & Signification
                </h2>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              {/* Key Features */}
              <div className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-4">
                <h3 className="font-serif text-lg font-semibold text-gold-200 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gold-400" />
                  Caractéristiques & Préparation
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-muted-foreground">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-gold-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Usage Instructions */}
              {product.usageInstructions && (
                <div className="rounded-2xl border border-gold-500/15 bg-cosmos-900/30 p-6 space-y-3">
                  <h3 className="font-serif text-lg font-semibold text-gold-200 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-gold-400" />
                    Recommandations & Rituels d&apos;Usage
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.usageInstructions}
                  </p>
                </div>
              )}

              {/* Digital File Info if applicable */}
              {product.digitalDownload && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-6 space-y-2">
                  <h3 className="font-serif text-sm font-semibold text-emerald-300 flex items-center gap-2">
                    <Download className="h-4 w-4 text-emerald-400" />
                    Format Numérique Inclus
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Fichier :{" "}
                    <span className="font-mono text-emerald-400">
                      {product.digitalDownload.fileName}
                    </span>{" "}
                    ({product.digitalDownload.fileSize}) • Téléchargement
                    sécurisé dès validation de paiement.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Title, Purchase Box & Reassurance */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                Collection {product.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gold-100 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Sticky Purchase Box */}
            <div className="sticky top-24 space-y-6">
              <ProductPurchaseBox product={product} />

              {/* Reassurance Grid */}
              <div className="grid grid-cols-1 gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-gold-500/15 bg-cosmos-900/40">
                  <Truck className="h-4 w-4 text-gold-400 flex-shrink-0" />
                  <span>
                    Livraison discrète sous emballage neutre et protecteur.
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-gold-500/15 bg-cosmos-900/40">
                  <HeartHandshake className="h-4 w-4 text-gold-400 flex-shrink-0" />
                  <span>
                    Bénédiction individuelle au nom du destinataire avant
                    expédition.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
