import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import {
  Sparkles,
  User,
  Shield,
  Lock,
  ArrowRight,
  Compass,
  CheckCircle,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Portail des Sanctuaires | AWS : Africa World Saving"
      : "Sanctuary Portal | AWS : Africa World Saving",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function DashboardPortalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard" });

  const spaces = [
    {
      title: "Mon Sanctuaire Personnel",
      role: "Espace Client & Initié",
      desc: "Accédez à vos guidances réservées, vos rituels préconisés, vos commandes de trésors sacrés et votre carnet spirituel privé.",
      icon: <User className="h-6 w-6 text-gold-400" />,
      href: "/dashboard/client",
      badge: "Accès Membre",
    },
    {
      title: "Sanctuaire du Praticien",
      role: "Espace Maître & Guide Dépositaire",
      desc: "Gérez votre calendrier de consultations, rejoignez vos fidèles en direct (vidéo/audio/chat) et rédigez vos prescriptions rituelles.",
      icon: <Compass className="h-6 w-6 text-emerald-400" />,
      href: "/dashboard/praticien",
      badge: "Accès Praticien",
    },
    {
      title: "Haute Vigie • Administration",
      role: "Supervision Globale & Sécurité",
      desc: "Suivi des métriques financières Chariow, vérification éthique des maîtres, modération des signalements du cercle et audit de sécurité.",
      icon: <Lock className="h-6 w-6 text-amber-400" />,
      href: "/dashboard/admin",
      badge: "Accès Admin 2FA",
    },
  ];

  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12 text-center">
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
            <Sparkles className="h-3.5 w-3.5" />
            Portail Centralisé AWS
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200">
            Espaces & Tableaux de Bord
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Choisissez l&apos;espace de guidance ou de gestion correspondant à votre rôle
            au sein de la communauté sacrée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {spaces.map((space, idx) => (
            <Link
              key={idx}
              href={space.href}
              className="group flex flex-col justify-between rounded-3xl border border-gold-500/20 bg-cosmos-900/50 p-6 sm:p-8 shadow-xl backdrop-blur-sm transition-all hover:border-gold-500/40 hover:bg-cosmos-900/80 hover:shadow-gold-500/10 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 border border-gold-500/25">
                    {space.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/30">
                    {space.badge}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-400/80">
                    {space.role}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-gold-100 group-hover:text-gold-300 transition-colors mt-1">
                    {space.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {space.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gold-500/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gold-400 group-hover:text-gold-300">
                <span>Accéder à l&apos;espace</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
