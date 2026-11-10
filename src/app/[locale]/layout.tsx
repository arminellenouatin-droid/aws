import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { routing } from "@/lib/i18n/routing";
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

  return (
    <html lang={locale} className={`dark ${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cosmos-950 font-sans text-foreground antialiased selection:bg-gold-500/30 selection:text-gold-300">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
