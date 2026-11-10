import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertTriangle, HeartHandshake, PhoneCall } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charte Éthique & Avertissement Spirituel Légal",
  description:
    "Consultez les principes déontologiques d'Africa World Saving : respect du libre arbitre, protection contre les abus et ressources d'aide en cas de détresse.",
};

export default async function SpiritualDisclaimerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Charte Éthique & Avertissement" }]} />

          <header className="space-y-4 pb-8 border-b border-gold-500/15">
            <Badge variant="outline" className="border-gold-500/30 text-gold-400">
              Déontologie & Intégrité
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Charte Éthique & Avertissement Spirituel Légal
            </h1>

            <p className="text-xs text-muted-foreground">
              Applicable à tous les consultants, praticiens et visiteurs de la plateforme Africa World Saving.
            </p>
          </header>

          <div className="prose prose-invert prose-gold max-w-none space-y-8 pt-8 text-sm sm:text-base leading-relaxed text-muted-foreground font-sans">
            {/* Box Alert */}
            <div className="p-6 rounded-2xl border border-gold-400/30 bg-cosmos-900/90 text-foreground space-y-3">
              <div className="flex items-center gap-2 text-gold-400 font-bold text-base">
                <AlertTriangle className="h-5 w-5" />
                <span>Avertissement Légal Solennel</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Les consultations spirituelles, lectures du Fâ, interprétations d&apos;oracles et conseils rituels dispensés sur Africa World Saving ont pour unique vocation <strong>l&apos;accompagnement personnel, le réconfort moral et l&apos;éclairage de conscience</strong>. Ils ne se substituent en aucun cas à un diagnostic médical, un traitement psychiatrique ou un conseil juridique ou financier certifié.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                1. Absence Totale de Promesse Miraculeuse
              </h2>
              <p>
                Africa World Saving proscrit formellement toute affirmation mensongère ou manipulatrice. Conformément aux lois universelles et aux règles de nos ancêtres :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>Aucun gain d&apos;argent magique ou instantané :</strong> La prospérité est le fruit d&apos;un travail juste, de l&apos;alignement et de la discipline.</li>
                <li><strong>Aucun retour d&apos;affection forcé ou manipulation d&apos;autrui :</strong> Nous respectons inconditionnellement le libre arbitre de chaque être humain.</li>
                <li><strong>Aucune promesse de guérison médicale :</strong> En cas de maladie, vous devez obligatoirement consulter un médecin diplômé.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                2. Protection des Personnes Vulnérables (+18 ans)
              </h2>
              <p>
                Nos services sont rigoureusement réservés aux personnes âgées d&apos;au moins 18 ans. Les maîtres initiés s&apos;interdisent de profiter d&apos;un état de faiblesse, de deuil récent ou de dépendance affective pour inciter à la consommation abusive de rituels.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                3. Protocole d&apos;Assistance en Cas de Détresse Psychologique
              </h2>
              <div className="p-6 rounded-2xl border border-emeraldSacred-500/30 bg-emeraldSacred-950/20 text-foreground space-y-3">
                <div className="flex items-center gap-2 text-emeraldSacred-400 font-bold text-sm">
                  <PhoneCall className="h-5 w-5" />
                  <span>Vous traversez une crise profonde ou des pensées sombres ?</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Si vous ou un de vos proches ressentez une souffrance insurmontable ou des pensées suicidaires, la guidance spirituelle ne suffit pas. Nous vous invitons à contacter sans délai les lignes d&apos;écoute médicale d&apos;urgence disponibles 24h/24 :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-cosmos-950/80 border border-gold-500/10">
                    <span className="font-bold text-foreground block">Bénin & Afrique de l&apos;Ouest</span>
                    <span className="text-muted-foreground">SAMU : 112 ou 117 • Urgences Médicales</span>
                  </div>
                  <div className="p-3 rounded-xl bg-cosmos-950/80 border border-gold-500/10">
                    <span className="font-bold text-foreground block">France & Diaspora UE</span>
                    <span className="text-muted-foreground">Numéro national de prévention du suicide : 3114 (gratuit)</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                4. Procédure de Signalement & Vigilance
              </h2>
              <p>
                Si vous constatez qu&apos;un intervenant sur notre plateforme déroge à ces règles (tentative de contact direct, demande d&apos;argent hors plateforme, menaces ou chantage affectif), signalez-le sans attendre par email à <strong>ethique@africaworldsaving.com</strong>. Toute infraction entraîne l&apos;exclusion définitive immédiate et des poursuites judiciaires.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
