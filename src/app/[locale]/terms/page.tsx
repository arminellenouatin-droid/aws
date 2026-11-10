import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { FileText, ShieldAlert, Scale } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation & de Vente (CGU / CGV)",
  description:
    "Conditions contractuelles régissant les consultations spirituelles, les achats rituels et l'utilisation de la plateforme Africa World Saving.",
};

export default async function TermsPage({
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
          <Breadcrumbs items={[{ label: "Conditions Générales" }]} />

          <header className="space-y-4 pb-8 border-b border-gold-500/15">
            <Badge variant="outline" className="border-gold-500/30 text-gold-400">
              Cadre Contractuel
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Conditions Générales d&apos;Utilisation & de Vente
            </h1>

            <p className="text-xs text-muted-foreground">
              Dernière révision : 10 mars 2026 • Document d&apos;orientation légale à faire valider par votre conseil juridique.
            </p>
          </header>

          <div className="prose prose-invert prose-gold max-w-none space-y-8 pt-8 text-sm sm:text-base leading-relaxed text-muted-foreground font-sans">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                1. Objet et Champ d&apos;Application
              </h2>
              <p>
                Les présentes Conditions Générales d&apos;Utilisation et de Vente (ci-après « CGU/CGV ») régissent l&apos;ensemble des relations contractuelles entre la plateforme <strong>AWS : Africa World Saving</strong> (éditée depuis Cotonou, République du Bénin) et toute personne physique accédant au site ou souscrivant à un service (ci-après l&apos;« Utilisateur » ou le « Consultant »).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                2. Conditions d&apos;Accès & Majorité (+18 ans)
              </h2>
              <p>
                Les services de consultation spirituelle, d&apos;astrologie, de guidance du Fâ et d&apos;achat de rituels sont <strong>strictement réservés aux personnes physiques majeures (âgées de 18 ans révolus)</strong> jouissant de la pleine capacité juridique. L&apos;Utilisateur certifie sur l&apos;honneur l&apos;exactitude de sa date de naissance lors de son inscription.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                3. Nature des Services & Absence de Garantie de Résultat
              </h2>
              <div className="p-5 rounded-2xl border border-gold-500/30 bg-cosmos-900/80 text-foreground space-y-2">
                <div className="flex items-center gap-2 text-gold-400 font-bold text-sm">
                  <ShieldAlert className="h-5 w-5" />
                  <span>Avertissement Essentiel : Obligation de Moyens</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Les consultations proposées relèvent du <strong>développement personnel, de l&apos;accompagnement moral et des sagesses traditionnelles</strong>. Elles ne constituent en aucun cas une science exacte ni une promesse de résultat infaillible. Aucune garantie de retour amoureux forcé, de guérison médicale miraculeuse ou de gain financier soudain ne saurait être donnée.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                4. Tarifs, Devises et Paiement Sécurisé
              </h2>
              <p>
                Les tarifs de nos consultations et produits rituels sont indiqués en <strong>Francs CFA (XOF)</strong> ainsi qu&apos;en Euros (EUR) et Dollars US (USD) à titre informatif. Le règlement s&apos;effectue en ligne via l&apos;infrastructure certifiée <strong>Chariow</strong> par Mobile Money (MTN, Moov, Orange, Wave) ou carte bancaire internationale.
              </p>
              <p>
                Toute consultation doit être réglée préalablement à la fixation définitive du créneau horaire, à l&apos;exception de la séance découverte gratuite (15 min) offerte aux nouveaux membres.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                5. Annulation et Droit de Rétractation
              </h2>
              <p>
                Conformément aux règles applicables aux prestations de services personnalisées fournies à une date ou selon une périodicité déterminée :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>
                  L&apos;Utilisateur peut reporter son rendez-vous sans frais jusqu&apos;à <strong>4 heures</strong> avant l&apos;heure fixée.
                </li>
                <li>
                  En cas d&apos;absence non signalée du consultant à l&apos;heure convenue, la séance est réputée consommée et ne donne lieu à aucun remboursement.
                </li>
                <li>
                  En cas d&apos;empêchement imprévu du maître initié, la séance est immédiatement reprogrammée ou remboursée intégralement selon le souhait du consultant.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                6. Interdiction des Transactions Parallèles
              </h2>
              <p>
                Pour la sécurité et la protection des consultants, il est <strong>strictement interdit</strong> à tout praticien de solliciter un quelconque versement d&apos;argent ou remise d&apos;objets précieux en dehors de la plateforme Africa World Saving. Tout utilisateur sollicité de la sorte est invité à le signaler immédiatement à notre cellule de vigilance.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                7. Droit Applicable & Résolution des Litiges
              </h2>
              <p>
                Les présentes CGU/CGV sont régies par le droit de la <strong>République du Bénin</strong> (notamment le Code du Numérique). En cas de contestation, l&apos;Utilisateur s&apos;engage à rechercher prioritairement une résolution amiable auprès du support client par écrit. À défaut d&apos;accord amiable sous 30 jours, compétence expresse est attribuée aux tribunaux compétents de Cotonou.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
