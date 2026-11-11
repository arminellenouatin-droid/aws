import { getTranslations } from "next-intl/server";
import { getPractitionerDashboardData } from "@/server/dal/dashboard";
import { PractitionerDashboardView } from "@/components/dashboard/PractitionerDashboardView";
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
      ? "Sanctuaire du Praticien | AWS : Africa World Saving"
      : "Practitioner Sanctuary | AWS : Africa World Saving",
    description: isFr
      ? "Espace dédié aux maîtres et guides spirituels : gestion des rendez-vous, notes de consultation et disponibilités."
      : "Dedicated space for master guides: session management, notes, and schedule settings.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PractitionerDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = await getPractitionerDashboardData();

  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PractitionerDashboardView initialData={data} />
      </div>
    </div>
  );
}
