import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, Database, EyeOff } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protection des Données Personnelles (APDP & RGPD)",
  description:
    "Engagement d'Africa World Saving pour la confidentialité de vos données spirituelles et le respect du Code du Numérique du Bénin et du RGPD.",
};

export default async function PrivacyPage({
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
          <Breadcrumbs items={[{ label: "Politique de Confidentialité" }]} />

          <header className="space-y-4 pb-8 border-b border-gold-500/15">
            <Badge variant="emerald" className="gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Conformité APDP Bénin & RGPD Europe</span>
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Politique de Confidentialité & de Protection des Données
            </h1>

            <p className="text-xs text-muted-foreground">
              Dernière mise à jour : 10 mars 2026 • Document d&apos;orientation à faire valider par votre DPO ou conseil juridique.
            </p>
          </header>

          <div className="prose prose-invert prose-gold max-w-none space-y-8 pt-8 text-sm sm:text-base leading-relaxed text-muted-foreground font-sans">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                1. Notre Engagement de Secret & de Respect
              </h2>
              <p>
                La démarche spirituelle touche à ce qu&apos;il y a de plus intime : vos peurs, vos désirs, vos liens familiaux et votre destinée. <strong>AWS : Africa World Saving</strong> s&apos;engage à protéger ce sanctuaire avec la plus haute rigueur technique et éthique, en application stricte de la <strong>Loi n° 2017-20 du 20 avril 2018 portant Code du numérique en République du Bénin</strong> (Livre V relatif à la protection des données personnelles, sous le contrôle de l&apos;APDP) et du <strong>Règlement Général sur la Protection des Données (RGPD 2016/679)</strong> pour les utilisateurs résidant dans l&apos;Union Européenne.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                2. Responsable de Traitement & Contact DPO
              </h2>
              <p>
                Le responsable du traitement des données personnelles est la société éditrice d&apos;Africa World Saving (Cotonou, Bénin). Pour toute demande relative à vos données ou pour contacter notre délégué à la protection des données (DPO), écrivez à : <strong>dpo@africaworldsaving.com</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                3. Données Collectées & Finalités
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-gold-500/20 rounded-xl">
                  <thead className="bg-cosmos-900 text-gold-300 border-b border-gold-500/20">
                    <tr>
                      <th className="p-3">Catégorie de données</th>
                      <th className="p-3">Finalité</th>
                      <th className="p-3">Base légale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-500/10">
                    <tr>
                      <td className="p-3 font-medium text-foreground">Identité (Nom, email, téléphone)</td>
                      <td className="p-3">Création de compte, réservation de séances, envoi de rappels</td>
                      <td className="p-3">Exécution du contrat</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">Données de paiement</td>
                      <td className="p-3">Traitement sécurisé par Chariow (Mobile Money / Carte)</td>
                      <td className="p-3">Exécution du contrat</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">Notes de consultation & échanges</td>
                      <td className="p-3">Historique personnel de guidance, compte-rendu</td>
                      <td className="p-3">Consentement explicite (+18 ans)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">Logs de connexion & sécurité</td>
                      <td className="p-3">Prévention des fraudes, anti-intrusion, audit trail</td>
                      <td className="p-3">Obligation légale & Intérêt légitime</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                4. Sous-Traitants & Sécurité de l&apos;Hébergement
              </h2>
              <p>
                Nos sous-traitants techniques ont été sélectionnés pour leurs standards élevés de sécurité :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>Neon Serverless Postgres :</strong> Stockage des bases de données avec chiffrement au repos (AES-256) et en transit (TLS 1.3).</li>
                <li><strong>Vercel Inc. :</strong> Hébergement applicatif haute disponibilité et réseau de diffusion CDN mondial.</li>
                <li><strong>Chariow :</strong> Passerelle de paiement agréée pour Mobile Money et cartes bancaires.</li>
                <li><strong>Resend :</strong> Routage sécurisé des emails transactionnels de confirmation.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                5. Vos Droits Inaliénables
              </h2>
              <p>
                Conformément aux lois applicables, vous bénéficiez des droits suivants :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>Droit d&apos;accès et d&apos;exportation :</strong> Télécharger l&apos;intégralité de vos données personnelles au format JSON standardisé depuis vos paramètres de profil.</li>
                <li><strong>Droit de rectification :</strong> Modifier à tout moment vos coordonnées personnelles.</li>
                <li><strong>Droit à l&apos;effacement définitif :</strong> Demander la suppression totale et irréversible de votre compte et de vos notes de consultation.</li>
                <li><strong>Droit de retrait du consentement :</strong> Modifier vos préférences relatives aux cookies analytiques et aux communications.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-gold-300">
                6. Durée de Conservation des Données
              </h2>
              <p>
                Vos données de compte sont conservées pendant la durée d&apos;activité de votre compte. En cas d&apos;inactivité prolongée de plus de <strong>36 mois</strong>, vos données font l&apos;objet d&apos;un préavis de purge puis d&apos;un effacement complet. Les pièces comptables et justificatifs de paiement sont archivés selon les durées fiscales obligatoires (10 ans).
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
