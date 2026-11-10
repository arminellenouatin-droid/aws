import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { routing } from "@/lib/i18n/routing";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata, Viewport } from "next";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060713",
};

export const metadata: Metadata = {
  title: {
    default: "AWS : Africa World Saving — Sanctuaire Spirituel d'Afrique",
    template: "%s | AWS : Africa World Saving",
  },
  description:
    "Plateforme de référence pour les consultations spirituelles en ligne, guidance authentique, boutique rituelle et communauté sacrée.",
  keywords: [
    "spiritualité africaine",
    "consultation spirituelle en ligne",
    "voyance africaine sérieuse",
    "rituel de protection",
    "harmonie spirituelle",
    "Bénin",
    "Afrique",
    "diaspora",
  ],
  authors: [{ name: "Africa World Saving" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://africaworldsaving.com"),
  alternates: {
    canonical: "/",
    languages: {
      fr: "/fr",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    siteName: "AWS : Africa World Saving",
    title: "AWS : Africa World Saving — Sanctuaire Spirituel d'Afrique",
    description:
      "Accompagnement spirituel authentique, enraciné dans la sagesse ancestrale africaine et accessible partout dans le monde via une plateforme confidentielle, sécurisée et bienveillante.",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://africaworldsaving.com";

  return (
    <html lang={locale} className={`dark ${cormorant.variable} ${inter.variable}`}>
      <head>
        <JsonLd
          type="Organization"
          data={{
            name: "AWS : Africa World Saving",
            url: siteUrl,
            logo: `${siteUrl}/logo.png`,
            sameAs: [
              "https://facebook.com/africaworldsaving",
              "https://instagram.com/africaworldsaving",
              "https://youtube.com/@africaworldsaving",
            ],
          }}
        />
        <JsonLd
          type="WebSite"
          data={{
            name: "Africa World Saving",
            url: siteUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteUrl}/${locale}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
      </head>
      <body className="min-h-screen bg-cosmos-950 font-sans text-foreground antialiased selection:bg-gold-500/30 selection:text-gold-300">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScrollProvider>
            <div className="relative flex min-h-screen flex-col">
              {children}
            </div>
            <CookieConsent />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
