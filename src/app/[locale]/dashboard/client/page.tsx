import { getTranslations } from "next-intl/server";
import { getClientDashboardData } from "@/server/dal/dashboard";
import { ClientDashboardView } from "@/components/dashboard/ClientDashboardView";
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
      ? "Mon Sanctuaire Personnel | AWS : Africa World Saving"
      : "My Personal Sanctuary | AWS : Africa World Saving",
    description: isFr
      ? "Tableau de bord membre : guidances à venir, journal spirituel intime, commandes et téléchargements de fichiers sacrés."
      : "Member dashboard: upcoming guidance sessions, private spiritual journal, sacred orders, and downloads.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ClientDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = await getClientDashboardData();

  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <ClientDashboardView initialData={data} />
      </div>
    </div>
  );
}
