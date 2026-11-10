import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/lib/i18n/routing";
import {
  getPractitionerBySlug,
  DEFAULT_PRACTITIONERS,
} from "@/server/dal/consultations";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/lib/i18n/routing";
import {
  ShieldCheck,
  Star,
  Award,
  Globe,
  Calendar,
  MessageSquare,
  Lock,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const p of DEFAULT_PRACTITIONERS) {
      params.push({ locale, slug: p.slug });
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
  const prac = await getPractitionerBySlug(slug);

  if (!prac) {
    return { title: "Praticien non trouvé" };
  }

  return {
    title: `${prac.name} — ${prac.title}`,
    description: prac.bio,
  };
}

export default async function PractitionerDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const prac = await getPractitionerBySlug(slug);
  if (!prac) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://africaworldsaving.com";

  return (
    <>
      <JsonLd
        type="Organization"
        data={{
          name: prac.name,
          description: prac.bio,
          jobTitle: prac.title,
          knowsLanguage: prac.languages,
          nationality: prac.country,
        }}
      />

      <Navbar />

      <main className="flex-1">
        {/* HEADER */}
        <section className="relative overflow-hidden pt-12 pb-14 border-b border-gold-500/15">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Guides & Maîtres", href: "/practitioners" },
                { label: prac.name },
              ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="emerald" className="gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Initié Certifié & Assermenté</span>
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {prac.experienceYears} années d&apos;exercice initiatique
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
                  {prac.name}
                </h1>

                <p className="font-serif text-lg text-gold-300">
                  {prac.title}
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                    <span className="font-semibold text-foreground">{prac.rating.toFixed(2)}</span>
                    <span>({prac.reviewsCount} avis vérifiés)</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-gold-400" />
                    <span>Origine : {prac.country}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4 text-emeraldSacred-400" />
                    <span>+{prac.consultationsCount} séances guidées</span>
                  </div>
                </div>
              </div>

              {/* Action Box */}
              <div className="lg:col-span-4">
                <div className="glass-panel rounded-2xl p-6 border border-gold-500/30 bg-cosmos-900/90 shadow-2xl space-y-5">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold block">
                      Consultation directe
                    </span>
                    <h3 className="font-serif text-lg font-bold text-foreground">
                      Réserver une séance avec {prac.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Séance confidentielle par chat chiffré, téléphone ou visioconférence.
                    </p>
                  </div>

                  <Link
                    href="/consultations"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-lg shadow-gold-500/25 hover:from-gold-400 hover:to-gold-300 transition-all"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Choisir une formule</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BIO & SPECIALTIES */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-8">
                {/* Bio */}
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Parcours & Lignée Initiatique
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {prac.bio}
                  </p>
                </div>

                {/* Specialties */}
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Domaines d&apos;expertise sacrée
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {prac.specialties.map((s) => (
                      <div
                        key={s}
                        className="glass-panel rounded-xl p-4 border border-gold-500/20 space-y-1.5"
                      >
                        <Award className="h-5 w-5 text-gold-400" />
                        <h3 className="font-semibold text-gold-300 text-sm">
                          {s}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="p-4 rounded-xl border border-gold-500/15 bg-cosmos-900/40 text-xs text-muted-foreground space-y-1">
                  <span className="font-semibold text-foreground uppercase tracking-wider block text-[11px]">
                    Langues de consultation :
                  </span>
                  <p>{prac.languages.join(", ")}</p>
                </div>
              </div>

              {/* Sidebar: Ethical oath */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-2xl border border-gold-500/20 bg-cosmos-900/60 space-y-4">
                  <div className="flex items-center gap-3">
                    <HeartHandshake className="h-6 w-6 text-gold-400" />
                    <h3 className="font-serif text-base font-bold text-gold-300">
                      Serment d&apos;Intégrité
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {prac.name} a signé solennellement la Charte Déontologique d&apos;Africa World Saving : respect du secret spirituel, refus des fausses promesses et dévouement au bien-être du consultant.
                  </p>
                  <div className="pt-3 border-t border-gold-500/15 text-[11px] text-emeraldSacred-400 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Identité et filiation vérifiées</span>
                  </div>
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
