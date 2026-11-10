import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from "@/lib/i18n/routing";
import { getConsultationTypes } from "@/server/dal/consultations";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Sparkles,
  Clock,
  Shield,
  MessageSquare,
  Phone,
  Video,
  ArrowRight,
  CheckCircle2,
  Gift,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultations & Guidances Spirituelles Africaines",
  description:
    "Réservez votre séance de voyance, guidance du Fâ, déblocage et rituels de protection avec nos maîtres initiés. Consultation découverte offerte.",
};

export default async function ConsultationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const consultations = await getConsultationTypes();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://africaworldsaving.com";

  return (
    <>
      <JsonLd
        type="Service"
        data={{
          name: "Consultations Spirituelles Africaines en Ligne",
          provider: {
            "@type": "Organization",
            name: "AWS : Africa World Saving",
          },
          serviceType: "Spiritual Guidance & Ancestral Healing",
          areaServed: ["Benin", "Ivory Coast", "Senegal", "France", "Worldwide"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Types de Consultations",
            itemListElement: consultations.map((c) => ({
              "@type": "Offer",
              name: c.title,
              description: c.description,
              price: c.priceXof,
              priceCurrency: "XOF",
              url: `${siteUrl}/${locale}/consultations/${c.slug}`,
            })),
          },
        }}
      />

      <Navbar />

      <main className="flex-1">
        {/* HEADER */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 border-b border-gold-500/15">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-gold-500/10 via-cosmos-800/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Consultations" }]} />

            <div className="max-w-3xl space-y-4">
              <Badge variant="default" className="gap-1.5 py-1.5 px-4 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                <span>Guidance Personnalisée & Rituels</span>
              </Badge>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                Des guidances sacrées pour{" "}
                <span className="text-gold-gradient">éclairer votre chemin</span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                Chaque être humain traverse des carrefours décisifs. Nos maîtres initiés vous reçoivent en direct par chat crypté, appel vocal ou visioconférence pour vous transmettre les clés de votre alignement.
              </p>
            </div>
          </div>
        </section>

        {/* CONSULTATIONS GRID */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {consultations.map((item) => {
                const isFree = item.isFreeIntro || item.priceXof === 0;

                return (
                  <Card
                    key={item.slug}
                    className={`flex flex-col justify-between transition-all duration-300 ${
                      isFree
                        ? "border-emeraldSacred-500/40 bg-gradient-to-br from-cosmos-900/90 to-emeraldSacred-950/20 shadow-emeraldSacred-500/5"
                        : "hover:border-gold-500/50"
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        {isFree ? (
                          <Badge variant="emerald" className="gap-1.5">
                            <Gift className="h-3.5 w-3.5" />
                            <span>Offre Découverte Offerte</span>
                          </Badge>
                        ) : (
                          <Badge variant="default">Guidance Complète</Badge>
                        )}

                        <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                          <Clock className="h-3.5 w-3.5 text-gold-400" />
                          <span>{item.durationMinutes} min</span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <CardTitle className="text-2xl mb-3">
                        {item.title}
                      </CardTitle>

                      <CardDescription className="text-sm leading-relaxed mb-6">
                        {item.description}
                      </CardDescription>

                      {/* Format Badges */}
                      <div className="space-y-2 mb-6">
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                          Formats au choix :
                        </span>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {item.allowedFormats.includes("chat") && (
                            <span className="inline-flex items-center gap-1 rounded-lg border border-gold-500/20 bg-cosmos-950/70 px-2.5 py-1 text-gold-300">
                              <MessageSquare className="h-3 w-3 text-gold-400" />
                              <span>Chat crypté</span>
                            </span>
                          )}
                          {item.allowedFormats.includes("audio") && (
                            <span className="inline-flex items-center gap-1 rounded-lg border border-gold-500/20 bg-cosmos-950/70 px-2.5 py-1 text-gold-300">
                              <Phone className="h-3 w-3 text-gold-400" />
                              <span>Appel vocal</span>
                            </span>
                          )}
                          {item.allowedFormats.includes("video") && (
                            <span className="inline-flex items-center gap-1 rounded-lg border border-gold-500/20 bg-cosmos-950/70 px-2.5 py-1 text-gold-300">
                              <Video className="h-3 w-3 text-gold-400" />
                              <span>Visioconférence</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer: Price & CTA */}
                    <CardFooter className="justify-between pt-5 border-t border-gold-500/15">
                      <div>
                        {isFree ? (
                          <div className="flex flex-col">
                            <span className="font-serif text-2xl font-bold text-emeraldSacred-400">
                              Gratuit
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              1ère séance offerte
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                              <span className="font-serif text-2xl font-bold text-gold-300">
                                {item.priceXof.toLocaleString("fr-FR")} FCFA
                              </span>
                              <span className="text-xs text-muted-foreground">
                                (~{item.priceEur} €)
                              </span>
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                              Paiement sécurisé Chariow / Mobile Money
                            </span>
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/consultations/${item.slug}`}
                        className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                          isFree
                            ? "bg-emeraldSacred-600 text-white hover:bg-emeraldSacred-500 shadow-md shadow-emeraldSacred-600/20"
                            : "bg-gradient-to-r from-gold-500 to-gold-400 text-cosmos-950 hover:from-gold-400 hover:to-gold-300 shadow-md shadow-gold-500/20"
                        }`}
                      >
                        <span>Réserver</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ETHICAL DISCLAIMER CALLOUT */}
        <section className="py-12 border-t border-gold-500/15 bg-cosmos-900/30">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4 p-6 rounded-2xl border border-gold-500/20 bg-cosmos-950/60">
              <Shield className="h-6 w-6 text-gold-400 shrink-0 mt-1" />
              <div className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-gold-300 uppercase tracking-wider block">
                  Engagement Déontologique & Sécurité
                </span>
                <p>
                  Toutes nos consultations se déroulent dans le respect absolu de votre vie privée et de vos convictions. Conformément à notre charte éthique, nos séances ne remplacent aucun diagnostic médical ou prise en charge psychiatrique. Aucun résultat absolu ou magique n&apos;est promis. Services réservés aux personnes majeures (+18 ans).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
