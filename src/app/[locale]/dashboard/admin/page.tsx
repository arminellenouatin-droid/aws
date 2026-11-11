import { getTranslations } from "next-intl/server";
import { getAdminDashboardData } from "@/server/dal/dashboard";
import { AdminDashboardView } from "@/components/dashboard/AdminDashboardView";
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
      ? "Haute Vigie • Administration | AWS : Africa World Saving"
      : "High Sanctuary • Administration | AWS : Africa World Saving",
    description: isFr
      ? "Tableau de bord d'administration générale, métriques financières Chariow, modération et sécurité."
      : "General administration dashboard, Chariow financial metrics, moderation, and security.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = await getAdminDashboardData();

  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminDashboardView initialData={data} />
      </div>
    </div>
  );
}
