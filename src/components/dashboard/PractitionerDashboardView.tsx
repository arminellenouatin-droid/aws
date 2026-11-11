"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PractitionerDashboardData } from "@/lib/constants/dashboard";
import { Link } from "@/lib/i18n/routing";
import {
  Sparkles,
  Calendar,
  Clock,
  Star,
  DollarSign,
  Video,
  FileText,
  CheckCircle,
  Globe,
  Settings,
} from "lucide-react";

export function PractitionerDashboardView({
  initialData,
}: {
  initialData: PractitionerDashboardData;
}) {
  const t = useTranslations("dashboard");
  const [activeTab, setActiveTab] = useState<
    "overview" | "availability" | "sessions" | "reviews"
  >("overview");

  const [activeDays, setActiveDays] = useState(initialData.availability.activeDays);
  const [autoAccept, setAutoAccept] = useState(initialData.availability.autoAccept);
  const [savedNotice, setSavedNotice] = useState(false);

  const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const toggleDay = (day: string) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSaveAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-gold-500/20 bg-gradient-to-r from-cosmos-900 via-cosmos-950 to-cosmos-900 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
            <Sparkles className="h-3 w-3" />
            Sanctuaire du Dépositaire
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gold-100">
            {initialData.practitioner.name}
          </h1>
          <p className="text-xs sm:text-sm text-gold-400/90 font-medium">
            {initialData.practitioner.title} • {initialData.practitioner.timezone}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-2xl border border-gold-500/15 bg-cosmos-950/60 p-4 text-center">
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
              Note Moyenne
            </div>
            <div className="font-serif text-2xl font-bold text-gold-300 flex items-center justify-center gap-1">
              <Star className="h-5 w-5 fill-gold-400 text-gold-400" />
              <span>{initialData.stats.averageRating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gold-500/15 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === "overview"
              ? "bg-gold-500 text-cosmos-950 shadow-md shadow-gold-500/20"
              : "text-muted-foreground hover:text-gold-200 hover:bg-gold-500/5"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t("tabOverview")}</span>
        </button>

        <button
          onClick={() => setActiveTab("availability")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === "availability"
              ? "bg-gold-500 text-cosmos-950 shadow-md shadow-gold-500/20"
              : "text-muted-foreground hover:text-gold-200 hover:bg-gold-500/5"
          }`}
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>{t("tabAvailability")}</span>
        </button>

        <button
          onClick={() => setActiveTab("sessions")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === "sessions"
              ? "bg-gold-500 text-cosmos-950 shadow-md shadow-gold-500/20"
              : "text-muted-foreground hover:text-gold-200 hover:bg-gold-500/5"
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          <span>Séances & Consultations</span>
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === "reviews"
              ? "bg-gold-500 text-cosmos-950 shadow-md shadow-gold-500/20"
              : "text-muted-foreground hover:text-gold-200 hover:bg-gold-500/5"
          }`}
        >
          <Star className="h-3.5 w-3.5" />
          <span>{t("tabReviews")}</span>
        </button>
      </div>

      {/* Tab 1: Overview KPIs */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Guidances Accomplies
              </span>
              <div className="font-serif text-3xl font-bold text-gold-200">
                {initialData.stats.totalSessions}
              </div>
              <p className="text-xs text-muted-foreground">
                Âmes accompagnées vers la paix
              </p>
            </div>

            <div className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Honoraires Cumulés (FCFA)
              </span>
              <div className="font-serif text-3xl font-bold text-gold-300">
                {initialData.stats.totalEarningsXof.toLocaleString("fr-FR")} FCFA
              </div>
              <p className="text-xs text-muted-foreground">
                Équivalent ~ {initialData.stats.totalEarningsEur} €
              </p>
            </div>

            <div className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Prochain Rendez-Vous
              </span>
              <div className="font-serif text-lg font-bold text-emerald-400">
                Demain à 15:00
              </div>
              <p className="text-xs text-muted-foreground">
                Client : {initialData.upcomingSessions[0]?.clientName}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Availability */}
      {activeTab === "availability" && (
        <form
          onSubmit={handleSaveAvailability}
          className="rounded-3xl border border-gold-500/25 bg-cosmos-900/70 p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-sm max-w-2xl"
        >
          <div className="space-y-1 border-b border-gold-500/15 pb-4">
            <h2 className="font-serif text-xl font-bold text-gold-200">
              Paramétrage des Disponibilités
            </h2>
            <p className="text-xs text-muted-foreground">
              Définissez les jours et fuseaux horaires sur lesquels les fidèles peuvent
              réserver un temps de parole sacré avec vous.
            </p>
          </div>

          {savedNotice && (
            <div className="flex items-center gap-2 p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-xs text-emerald-300">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>Vos créneaux et fuseau ont été mis à jour avec succès.</span>
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300/90">
              Jours d&apos;ouverture du sanctuaire
            </label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => {
                const isSelected = activeDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-gold-500 text-cosmos-950 font-bold"
                        : "border border-gold-500/20 bg-cosmos-950 text-muted-foreground hover:text-gold-200"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={autoAccept}
                onChange={(e) => setAutoAccept(e.target.checked)}
                className="rounded text-gold-500"
              />
              <span>Confirmation automatique des réservations payées</span>
            </label>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md hover:bg-gold-400 transition-all"
          >
            <span>Enregistrer mes disponibilités</span>
          </button>
        </form>
      )}

      {/* Tab 3: Sessions */}
      {activeTab === "sessions" && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-gold-200">
            Consultations & Salles de Guidances
          </h2>

          {initialData.upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gold-500/20 bg-cosmos-900/60"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Confirmée
                </span>
                <h3 className="font-serif text-base font-bold text-gold-100">
                  {session.clientName} • {session.typeTitle}
                </h3>
                <div className="text-xs text-muted-foreground font-mono">
                  {session.date} • Format {session.format.toUpperCase()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={session.roomUrl}
                  className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md hover:bg-gold-400 transition-all"
                >
                  <Video className="h-4 w-4" />
                  <span>Entrer dans la salle</span>
                </Link>
                <Link
                  href={`/consultations/${session.id}/notes`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-gold-500/30 px-3.5 py-2.5 text-xs font-semibold text-gold-300 hover:bg-gold-500/10 transition-all"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Notes</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Reviews */}
      {activeTab === "reviews" && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-gold-200">
            Avis & Témoignages des Fidèles
          </h2>

          {initialData.reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-gold-500/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-gold-200 text-sm">
                    {rev.clientName}
                  </span>
                  <div className="flex items-center text-gold-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold-400" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {rev.date}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed">
                « {rev.comment} »
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
