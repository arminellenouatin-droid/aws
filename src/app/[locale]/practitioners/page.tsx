import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from "@/lib/i18n/routing";
import { getPractitioners } from "@/server/dal/consultations";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Sparkles,
  ShieldCheck,
  Star,
  Award,
  Globe,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Guides & Maîtres Spirituels Vérifiés",
  description:
    "Découvrez les initiés, maîtres du Fâ et prêtresses reconnus pour leur sagesse ancestrale et leur intégrité déontologique. Consultations confidentielles.",
};

export default async function PractitionersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const practitionersList = await getPractitioners();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://africaworldsaving.com";

  return (
    <>
      <JsonLd
        type="Organization"
        data={{
          name: "Guides & Initiés — Africa World Saving",
          member: practitionersList.map((p) => ({
            "@type": "Person",
            name: p.name,
            jobTitle: p.title,
            description: p.bio,
            knowsLanguage: p.languages,
          })),
        }}
      />

      <Navbar />

      <main className="flex-1">
        {/* HEADER */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 border-b border-gold-500/15">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gold-500/10 via-cosmos-800/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Guides & Maîtres" }]} />

            <div className="max-w-3xl space-y-4">
              <Badge variant="default" className="gap-1.5 py-1.5 px-4 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                <span>Cercle des Initiés Certifiés</span>
              </Badge>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                Des guides reconnus pour leur{" "}
                <span className="text-gold-gradient">sagesse et leur intégrité</span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                Chaque maître présent sur Africa World Saving a fait l&apos;objet d&apos;une vérification rigoureuse : filiation traditionnelle, pratique éprouvée, casier judiciaire vierge et adhésion intégrale à notre charte éthique.
              </p>
            </div>
          </div>
        </section>

        {/* PRACTITIONERS LIST */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {practitionersList.map((prac) => (
                <Card
                  key={prac.slug}
                  className="flex flex-col justify-between hover:border-gold-500/50 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Header: Verified badge & Experience */}
                    <div className="flex items-center justify-between">
                      <Badge variant="emerald" className="gap-1 text-[10px]">
                        <ShieldCheck className="h-3 w-3" />
                        <span>Initié Certifié</span>
                      </Badge>

                      <div className="flex items-center gap-1 text-xs text-gold-400 font-semibold">
                        <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                        <span>{prac.rating.toFixed(2)}</span>
                        <span className="text-muted-foreground text-[10px]">
                          ({prac.reviewsCount})
                        </span>
                      </div>
                    </div>

                    {/* Name & Title */}
                    <div>
                      <CardTitle className="text-xl mb-1">{prac.name}</CardTitle>
                      <span className="text-xs font-medium text-gold-400/90 block">
                        {prac.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
                        <Globe className="h-3 w-3 text-gold-500/70" />
                        <span>{prac.country}</span>
                      </span>
                    </div>

                    {/* Bio excerpt */}
                    <CardDescription className="text-xs leading-relaxed line-clamp-3">
                      {prac.bio}
                    </CardDescription>

                    {/* Specialties */}
                    <div className="space-y-1.5 pt-2 border-t border-gold-500/10">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        Domaines sacrés :
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {prac.specialties.map((s) => (
                          <span
                            key={s}
                            className="rounded-md bg-cosmos-950/80 border border-gold-500/20 px-2 py-0.5 text-[11px] text-gold-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="text-[11px] text-muted-foreground">
                      <span className="font-medium text-foreground">Langues : </span>
                      {prac.languages.join(", ")}
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <CardFooter className="justify-between pt-5 border-t border-gold-500/15 mt-6">
                    <span className="text-[11px] text-muted-foreground">
                      +{prac.consultationsCount} accompagnements
                    </span>
                    <Link
                      href={`/practitioners/${prac.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20 hover:from-gold-400 hover:to-gold-300 transition-all"
                    >
                      <span>Voir le profil</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
