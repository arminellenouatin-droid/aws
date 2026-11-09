import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/lib/i18n/routing";
import type { Metadata, Viewport } from "next";

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
    <html lang={locale} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
