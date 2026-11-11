"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ClientDashboardData } from "@/lib/constants/dashboard";
import { Link } from "@/lib/i18n/routing";
import {
  Sparkles,
  Calendar,
  ShoppingBag,
  BookOpen,
  ShieldCheck,
  Video,
  FileText,
  Download,
  Plus,
  Send,
  Loader2,
  CheckCircle,
  Clock,
  Award,
  Share2,
} from "lucide-react";

export function ClientDashboardView({ initialData }: { initialData: ClientDashboardData }) {
  const t = useTranslations("dashboard");
  const [activeTab, setActiveTab] = useState<
    "overview" | "consultations" | "orders" | "journal" | "gdpr"
  >("overview");

  // Journal form state
  const [journalTitle, setJournalTitle] = useState("");
  const [journalContent, setJournalContent] = useState("");
  const [journalMood, setJournalMood] = useState("serene");
  const [journalEntries, setJournalEntries] = useState(initialData.journalEntries);
  const [journalLoading, setJournalLoading] = useState(false);
  const [journalSuccess, setJournalSuccess] = useState(false);

  // GDPR state
  const [gdprMessage, setGdprMessage] = useState("");
  const [gdprLoading, setGdprLoading] = useState(false);

  const handleSaveJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalTitle.trim() || !journalContent.trim()) return;

    setJournalLoading(true);
    try {
      const res = await fetch("/api/dashboard/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: journalTitle,
          content: journalContent,
          mood: journalMood,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setJournalEntries([
          {
            id: `j-${Date.now()}`,
            title: journalTitle,
            content: journalContent,
            mood: journalMood,
            createdAt: new Date().toISOString(),
          },
          ...journalEntries,
        ]);
        setJournalTitle("");
        setJournalContent("");
        setJournalSuccess(true);
        setTimeout(() => setJournalSuccess(false), 3000);
      }
    } catch (err) {
      console.warn("⚠️ [JOURNAL_SAVE_ERROR]", err);
    } finally {
      setJournalLoading(false);
    }
  };

  const handleGdprRequest = async (type: "export" | "deletion") => {
    setGdprLoading(true);
    setGdprMessage("");
    try {
      const res = await fetch("/api/dashboard/gdpr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      setGdprMessage(data.message || "Demande prise en compte.");
    } catch (err) {
      setGdprMessage("Erreur lors de la requête.");
    } finally {
      setGdprLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* User Welcome Banner */}
      <div className="rounded-3xl border border-gold-500/20 bg-gradient-to-r from-cosmos-900 via-cosmos-950 to-cosmos-900 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
            <Sparkles className="h-3 w-3" />
            Sanctuaire Personnel AWS
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gold-100">
            Bienvenue, {initialData.user.name}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Que la paix des ancêtres et l&apos;harmonie universelle éclairent votre journée.
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="rounded-2xl border border-gold-500/15 bg-cosmos-950/60 p-4 text-center">
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
              Points d&apos;Honneur
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-gold-300">
              {initialData.user.points} pts
            </div>
          </div>
          <Link
            href="/parrainage"
            className="flex items-center gap-2 rounded-xl bg-gold-500/10 border border-gold-500/30 px-4 py-3 text-xs font-bold uppercase tracking-wider text-gold-300 hover:bg-gold-500/20 transition-all"
          >
            <Share2 className="h-4 w-4" />
            <span>Mon Parrainage</span>
          </Link>
        </div>
      </div>

      {/* Tabs Navigation */}
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
          onClick={() => setActiveTab("consultations")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === "consultations"
              ? "bg-gold-500 text-cosmos-950 shadow-md shadow-gold-500/20"
              : "text-muted-foreground hover:text-gold-200 hover:bg-gold-500/5"
          }`}
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>{t("tabConsultations")}</span>
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === "orders"
              ? "bg-gold-500 text-cosmos-950 shadow-md shadow-gold-500/20"
              : "text-muted-foreground hover:text-gold-200 hover:bg-gold-500/5"
          }`}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>{t("tabOrders")}</span>
        </button>

        <button
          onClick={() => setActiveTab("journal")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === "journal"
              ? "bg-gold-500 text-cosmos-950 shadow-md shadow-gold-500/20"
              : "text-muted-foreground hover:text-gold-200 hover:bg-gold-500/5"
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>{t("tabJournal")}</span>
        </button>

        <button
          onClick={() => setActiveTab("gdpr")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === "gdpr"
              ? "bg-gold-500 text-cosmos-950 shadow-md shadow-gold-500/20"
              : "text-muted-foreground hover:text-gold-200 hover:bg-gold-500/5"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>{t("tabGdpr")}</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Upcoming Consultation Alert */}
          {initialData.upcomingConsultations.length > 0 && (
            <div className="rounded-2xl border border-gold-500/30 bg-gradient-to-r from-gold-950/30 via-cosmos-900 to-cosmos-900 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Prochaine Séance Confirmée
                </span>
                <h3 className="font-serif text-lg font-bold text-gold-200">
                  {initialData.upcomingConsultations[0].typeTitle} avec{" "}
                  {initialData.upcomingConsultations[0].practitionerName}
                </h3>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{initialData.upcomingConsultations[0].date}</span>
                </div>
              </div>

              <Link
                href={initialData.upcomingConsultations[0].roomUrl}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all flex-shrink-0"
              >
                <Video className="h-4 w-4" />
                <span>{t("enterRoom")}</span>
              </Link>
            </div>
          )}

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-2">
              <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-wider font-semibold">
                <Calendar className="h-4 w-4" />
                <span>Guidances Vécues</span>
              </div>
              <div className="font-serif text-3xl font-bold text-gold-200">
                {initialData.pastConsultations.length + initialData.upcomingConsultations.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Séances de clarté et de libération
              </p>
            </div>

            <div className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-2">
              <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-wider font-semibold">
                <ShoppingBag className="h-4 w-4" />
                <span>Trésors Reçus</span>
              </div>
              <div className="font-serif text-3xl font-bold text-gold-200">
                {initialData.orders.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Objets rituels & e-books initiatiques
              </p>
            </div>

            <div className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-2">
              <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-wider font-semibold">
                <BookOpen className="h-4 w-4" />
                <span>Notes Rituelles</span>
              </div>
              <div className="font-serif text-3xl font-bold text-gold-200">
                {journalEntries.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Pensées & prières consignées
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Consultations */}
      {activeTab === "consultations" && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-gold-200">
              Guidances en attente & passées
            </h2>

            {initialData.upcomingConsultations.map((c) => (
              <div
                key={c.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gold-500/20 bg-cosmos-900/60"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      À venir
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      Format {c.format.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-gold-100">
                    {c.typeTitle}
                  </h3>
                  <div className="text-xs text-gold-400/90 font-mono">
                    Guide : {c.practitionerName} • {c.date}
                  </div>
                </div>

                <Link
                  href={c.roomUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md hover:bg-gold-400 transition-all"
                >
                  <Video className="h-4 w-4" />
                  <span>{t("enterRoom")}</span>
                </Link>
              </div>
            ))}

            {initialData.pastConsultations.map((c) => (
              <div
                key={c.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gold-500/10 bg-cosmos-900/30"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/20">
                    Achevée
                  </span>
                  <h3 className="font-serif text-base font-semibold text-gold-200">
                    {c.typeTitle}
                  </h3>
                  <div className="text-xs text-muted-foreground font-mono">
                    Guide : {c.practitionerName} • {c.date}
                  </div>
                </div>

                <Link
                  href={`/consultations/${c.id}/notes`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-cosmos-950 px-4 py-2.5 text-xs font-semibold text-gold-300 hover:bg-gold-500/10 transition-all"
                >
                  <FileText className="h-4 w-4" />
                  <span>{t("viewNotes")}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Orders & Downloads */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-gold-200">
            Mes Commandes & Accès aux Fichiers Sacrés
          </h2>

          <div className="space-y-4">
            {initialData.orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-gold-500/15 bg-cosmos-900/50 p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gold-500/10 pb-3">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Commande
                    </span>
                    <div className="font-mono text-sm font-bold text-gold-300">
                      {order.orderNumber}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Date & Statut
                    </span>
                    <div className="text-xs font-medium text-emerald-400 flex items-center gap-1 sm:justify-end">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>Payée • {order.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-foreground font-medium">
                      {order.itemsSummary}
                    </div>
                    <div className="font-mono text-xs text-gold-400">
                      Total : {order.totalAmount.toLocaleString("fr-FR")}{" "}
                      {order.currency}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {order.isDigital && (
                      <a
                        href={`/api/downloads/${order.downloadToken}?token=demo`}
                        download
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-all"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Télécharger e-book</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Spiritual Journal */}
      {activeTab === "journal" && (
        <div className="space-y-8">
          {/* New Entry Box */}
          <form
            onSubmit={handleSaveJournal}
            className="rounded-3xl border border-gold-500/25 bg-cosmos-900/70 p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-gold-300 font-serif font-bold text-lg border-b border-gold-500/15 pb-3">
              <BookOpen className="h-5 w-5 text-gold-400" />
              <span>{t("newJournalEntry")}</span>
            </div>

            {journalSuccess && (
              <div className="flex items-center gap-2 p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-xs text-emerald-300">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <span>Réflexion sacrée enregistrée en toute confidentialité.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="block text-muted-foreground font-medium">
                  Titre de la réflexion *
                </label>
                <input
                  type="text"
                  required
                  value={journalTitle}
                  onChange={(e) => setJournalTitle(e.target.value)}
                  placeholder="Ex: Vision reçue après le bain de plantes..."
                  className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 px-3.5 py-2.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-muted-foreground font-medium">
                  État vibratoire / Humeur
                </label>
                <select
                  value={journalMood}
                  onChange={(e) => setJournalMood(e.target.value)}
                  className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 px-3.5 py-2.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
                >
                  <option value="serene">Serein & Aligné</option>
                  <option value="contemplative">Méditatif & En quête</option>
                  <option value="grateful">Reconnaissant</option>
                  <option value="troubled">En épreuve / Doute</option>
                  <option value="energized">Énergisé & Victorieux</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="block text-muted-foreground font-medium">
                Contenu de votre carnet intime *
              </label>
              <textarea
                rows={4}
                required
                value={journalContent}
                onChange={(e) => setJournalContent(e.target.value)}
                placeholder="Consignez vos rêves, intuitions et prises de conscience..."
                className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 p-3.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={journalLoading}
              className="flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md hover:bg-gold-400 transition-all disabled:opacity-50"
            >
              {journalLoading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Enregistrement...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Consigner dans le carnet</span>
                </>
              )}
            </button>
          </form>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-gold-200">
              Historique de mes notes intimes
            </h3>

            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-3 shadow-md"
              >
                <div className="flex items-center justify-between border-b border-gold-500/10 pb-2.5">
                  <h4 className="font-serif text-base font-bold text-gold-200">
                    {entry.title}
                  </h4>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {new Date(entry.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: GDPR & Data Rights */}
      {activeTab === "gdpr" && (
        <div className="rounded-3xl border border-gold-500/25 bg-cosmos-900/70 p-6 sm:p-10 space-y-6 shadow-2xl backdrop-blur-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gold-300 font-serif font-bold text-xl">
              <ShieldCheck className="h-6 w-6 text-gold-400" />
              <span>Souveraineté des Données & Protection de la Vie Privée</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("dataExportNotice")}
            </p>
          </div>

          {gdprMessage && (
            <div className="p-4 rounded-xl border border-gold-500/30 bg-gold-500/10 text-xs text-gold-200 font-medium">
              {gdprMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gold-500/15">
            <div className="space-y-3 p-5 rounded-2xl border border-gold-500/15 bg-cosmos-950/50">
              <h4 className="font-serif font-bold text-gold-200 text-sm">
                Exportabilité Intégrale (Droit d&apos;accès)
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Téléchargez l&apos;intégralité de votre historique : consultations, notes,
                commandes et réflexions de journal au format JSON / ZIP sécurisé.
              </p>
              <button
                onClick={() => handleGdprRequest("export")}
                disabled={gdprLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold-500/20 border border-gold-500/40 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-300 hover:bg-gold-500/30 transition-all disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                <span>{t("exportData")}</span>
              </button>
            </div>

            <div className="space-y-3 p-5 rounded-2xl border border-red-500/20 bg-red-950/20">
              <h4 className="font-serif font-bold text-red-300 text-sm">
                Droit à l&apos;Oubli Définitif
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Demandez la purge définitive et irréversible de votre compte, de vos
                échanges et de toutes vos données spirituelles archivées.
              </p>
              <button
                onClick={() => handleGdprRequest("deletion")}
                disabled={gdprLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500/20 border border-red-500/40 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-300 hover:bg-red-500/30 transition-all disabled:opacity-50"
              >
                <span>{t("deleteAccount")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
