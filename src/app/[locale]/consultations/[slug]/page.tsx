import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import {
  getConsultationTypeBySlug,
  DEFAULT_CONSULTATION_TYPES,
} from "@/server/dal/consultations";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/lib/i18n/routing";
import {
  Clock,
  Shield,
  MessageSquare,
  Phone,
  Video,
  CheckCircle2,
  Calendar,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const c of DEFAULT_CONSULTATION_TYPES) {
      params.push({ locale, slug: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getConsultationTypeBySlug(slug);

  if (!item) {
    return { title: "Consultation non trouvée" };
  }

  return {
    title: `${item.title} — Consultation Spirituelle`,
    description: item.description,
  };
}

export default async function ConsultationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const item = await getConsultationTypeBySlug(slug);
  if (!item) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://africaworldsaving.com";
  const isFree = item.isFreeIntro || item.priceXof === 0;

  return (
    <>
      <JsonLd
        type="Service"
        data={{
          name: item.title,
          description: item.description,
          provider: {
            "@type": "Organization",
            name: "AWS : Africa World Saving",
          },
          offers: {
            "@type": "Offer",
            price: item.priceXof,
            priceCurrency: "XOF",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/${locale}/consultations/${item.slug}`,
          },
        }}
      />

      <Navbar />

      <main className="flex-1">
        {/* HEADER */}
        <section className="relative overflow-hidden pt-12 pb-14 border-b border-gold-500/15">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Consultations", href: "/consultations" },
                { label: item.title },
              ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {isFree ? (
                    <Badge variant="emerald">Séance Découverte Offerte</Badge>
                  ) : (
                    <Badge variant="default">Guidance Individuelle</Badge>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
                    <Clock className="h-3.5 w-3.5 text-gold-400" />
                    <span>{item.durationMinutes} minutes</span>
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
                  {item.title}
                </h1>

                <p className="text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Booking Action Box */}
              <div className="lg:col-span-4">
                <div className="glass-panel rounded-2xl p-6 border border-gold-500/30 bg-cosmos-900/90 shadow-2xl space-y-5">
                  <div className="flex items-baseline justify-between border-b border-gold-500/15 pb-4">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Tarif séance
                    </span>
                    {isFree ? (
                      <span className="font-serif text-2xl font-bold text-emeraldSacred-400">
                        Offert (0 FCFA)
                      </span>
                    ) : (
                      <div className="text-right">
                        <span className="font-serif text-2xl font-bold text-gold-300 block">
                          {item.priceXof.toLocaleString("fr-FR")} FCFA
                        </span>
                        <span className="text-xs text-muted-foreground">
                          (~{item.priceEur} EUR)
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2 text-foreground font-medium">
                      <Lock className="h-4 w-4 text-gold-400 shrink-0" />
                      <span>Sanctuaire 100% crypté et confidentiel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-emeraldSacred-400 shrink-0" />
                      <span>Paiement sécurisé par Chariow & Mobile Money</span>
                    </div>
                  </div>

                  <Link
                    href={`/consultations/booking?type=${item.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-lg shadow-gold-500/25 hover:from-gold-400 hover:to-gold-300 transition-all"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Choisir un créneau</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS & PROCEDURE */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-10">
                {/* Formats Section */}
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Formats de séance disponibles
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {item.allowedFormats.includes("chat") && (
                      <div className="glass-panel rounded-xl p-4 border border-gold-500/20 space-y-2">
                        <MessageSquare className="h-6 w-6 text-gold-400" />
                        <h3 className="font-serif font-semibold text-gold-300 text-sm">
                          Chat Écrit Sécurisé
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Idéal pour échanger en toute discrétion et conserver l&apos;historique complet de vos messages.
                        </p>
                      </div>
                    )}

                    {item.allowedFormats.includes("audio") && (
                      <div className="glass-panel rounded-xl p-4 border border-gold-500/20 space-y-2">
                        <Phone className="h-6 w-6 text-gold-400" />
                        <h3 className="font-serif font-semibold text-gold-300 text-sm">
                          Appel Vocal Chiffré
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          L&apos;intimité et la chaleur de la voix pour déposer vos fardeaux et recevoir la guidance.
                        </p>
                      </div>
                    )}

                    {item.allowedFormats.includes("video") && (
                      <div className="glass-panel rounded-xl p-4 border border-gold-500/20 space-y-2">
                        <Video className="h-6 w-6 text-gold-400" />
                        <h3 className="font-serif font-semibold text-gold-300 text-sm">
                          Visioconférence Privée
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Un face-à-face sacré avec le maître pour observer le tirage et les rituels en direct.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Steps Section */}
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Comment se déroule votre consultation ?
                  </h2>

                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-xl border border-gold-500/15 bg-cosmos-900/40">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 font-bold text-sm">
                        1
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground text-sm">
                          Choix du créneau et confirmation instantanée
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Vous sélectionnez la date et l&apos;heure adaptées à votre fuseau horaire. Vous recevez un lien d&apos;accès sécurisé par email et SMS.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 rounded-xl border border-gold-500/15 bg-cosmos-900/40">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 font-bold text-sm">
                        2
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground text-sm">
                          Pose des intentions et questionnement
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Vous formulez vos interrogations principales avant la séance afin que le maître puisse préparer les éléments sacrés.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 rounded-xl border border-gold-500/15 bg-cosmos-900/40">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 font-bold text-sm">
                        3
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground text-sm">
                          Connexion sacrée en direct
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          À l&apos;heure convenue, vous rejoignez la salle privée directement sur votre navigateur web, sans aucune application à installer.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 rounded-xl border border-gold-500/15 bg-cosmos-900/40">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 font-bold text-sm">
                        4
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground text-sm">
                          Compte-rendu et préconisations de rituels
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Après la séance, vous recevez vos notes de guidance et les recommandations pratiques pour pérenniser votre équilibre.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-2xl border border-gold-500/20 bg-cosmos-900/50 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-gold-300">
                    Garantie d&apos;Intégrité
                  </h3>
                  <ul className="space-y-2.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emeraldSacred-400 shrink-0 mt-0.5" />
                      <span>Praticien certifié par le conseil des initiés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emeraldSacred-400 shrink-0 mt-0.5" />
                      <span>Aucun supplément financier imposé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emeraldSacred-400 shrink-0 mt-0.5" />
                      <span>Secret spirituel scellé sous serment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emeraldSacred-400 shrink-0 mt-0.5" />
                      <span>Remboursement garanti si le maître ne se présente pas</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl border border-gold-500/10 bg-cosmos-950/80 text-xs text-muted-foreground space-y-2">
                  <span className="font-semibold text-gold-400 block uppercase tracking-wider text-[11px]">
                    Avis Légal Déontologique
                  </span>
                  <p>
                    Cette consultation constitue un accompagnement de développement personnel et d&apos;éveil spirituel. Elle ne dispense pas de consulter un médecin ou un juriste. Réservé aux personnes majeures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
