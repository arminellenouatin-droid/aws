"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AdminDashboardData } from "@/lib/constants/dashboard";
import {
  Sparkles,
  TrendingUp,
  Users,
  ShieldCheck,
  ShieldAlert,
  FileText,
  CheckCircle,
  AlertTriangle,
  Lock,
  DollarSign,
  Calendar,
  ShoppingBag,
} from "lucide-react";

export function AdminDashboardView({ initialData }: { initialData: AdminDashboardData }) {
  const t = useTranslations("dashboard");
  const [activeTab, setActiveTab] = useState<
    "kpis" | "practitioners" | "moderation" | "audit" | "gdpr"
  >("kpis");

  const [practitioners, setPractitioners] = useState(initialData.practitioners);
  const [reports, setReports] = useState(initialData.reports);
  const [actionNotice, setActionNotice] = useState("");

  const toggleVerifyPractitioner = (id: string) => {
    setPractitioners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isVerified: !p.isVerified } : p))
    );
    setActionNotice("Statut du praticien mis à jour avec succès.");
    setTimeout(() => setActionNotice(""), 3000);
  };

  const dismissReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    setActionNotice("Signalement traité et classé.");
    setTimeout(() => setActionNotice(""), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-gold-500/20 bg-gradient-to-r from-cosmos-900 via-cosmos-950 to-cosmos-900 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
            <Lock className="h-3 w-3" />
            Espace d&apos;Administration Sécurisé
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gold-100">
            {t("adminTitle")}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {t("adminSubtitle")}
          </p>
        </div>

        <div className="rounded-2xl border border-gold-500/15 bg-cosmos-950/60 p-4 text-center">
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
            Satisfaction Globale
          </div>
          <div className="font-serif text-2xl font-bold text-emerald-400">
            {initialData.kpis.satisfactionRate}%
          </div>
        </div>
      </div>

      {actionNotice && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-xs text-emerald-300">
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gold-500/15 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab("kpis")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === "kpis"
              ? "bg-gold-500 text-cosmos-950 shadow-md shadow-gold-500/20"
              : "text-muted-foreground hover:text-gold-200 hover:bg-gold-500/5"
          }`}
        >
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Métriques & Finances</span>
        </button>

        <button
          onClick={() => setActiveTab("practitioners")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === "practitioners"
              ? "bg-gold-500 text-cosmos-950 shadow-md shadow-gold-500/20"
              : "text-muted-foreground hover:text-gold-200 hover:bg-gold-500/5"
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          <span>{t("tabPractitioners")}</span>
        </button>

        <button
          onClick={() => setActiveTab("moderation")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === "moderation"
              ? "bg-gold-500 text-cosmos-950 shadow-md shadow-gold-500/20"
              : "text-muted-foreground hover:text-gold-200 hover:bg-gold-500/5"
          }`}
        >
          <ShieldAlert className="h-3.5 w-3.5" />
          <span>{t("tabModeration")} ({reports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === "audit"
              ? "bg-gold-500 text-cosmos-950 shadow-md shadow-gold-500/20"
              : "text-muted-foreground hover:text-gold-200 hover:bg-gold-500/5"
          }`}
        >
          <Lock className="h-3.5 w-3.5" />
          <span>{t("tabAudit")}</span>
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
          <span>Demandes RGPD ({initialData.pendingGdpr.length})</span>
        </button>
      </div>

      {/* Tab 1: KPIs */}
      {activeTab === "kpis" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Volume Chariow Total
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">
                {initialData.kpis.revenueXof.toLocaleString("fr-FR")} FCFA
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                ~ {initialData.kpis.revenueEur.toLocaleString("fr-FR")} EUR
              </p>
            </div>

            <div className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Guidances Honorées
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-gold-200">
                {initialData.kpis.totalConsultations}
              </div>
              <p className="text-xs text-muted-foreground">
                Consultations chat, audio & vidéo
              </p>
            </div>

            <div className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Commandes Boutique
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-gold-200">
                {initialData.kpis.totalOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                Objets physiques & e-books
              </p>
            </div>

            <div className="rounded-2xl border border-gold-500/15 bg-cosmos-900/40 p-6 space-y-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Membres Inscrits
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-gold-200">
                {initialData.kpis.activeUsers}
              </div>
              <p className="text-xs text-muted-foreground">
                Communauté active et initiés
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Practitioners Management */}
      {activeTab === "practitioners" && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-gold-200">
            Gestion & Validation des Praticiens Dépositaires
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-gold-500/15 bg-cosmos-900/50">
            <table className="w-full text-left text-xs">
              <thead className="bg-cosmos-950/80 border-b border-gold-500/15 text-muted-foreground font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Dépositaire</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Guidances</th>
                  <th className="p-4">Évaluation</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-500/10">
                {practitioners.map((p) => (
                  <tr key={p.id} className="hover:bg-gold-500/5">
                    <td className="p-4 font-bold text-gold-200">{p.name}</td>
                    <td className="p-4 text-muted-foreground font-mono">{p.email}</td>
                    <td className="p-4 font-mono">{p.sessionsCount} séances</td>
                    <td className="p-4 font-mono text-gold-400">{p.rating} / 5</td>
                    <td className="p-4">
                      {p.isVerified ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-bold uppercase tracking-wider text-[10px] border border-emerald-500/30">
                          Vérifié
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold uppercase tracking-wider text-[10px] border border-amber-500/30">
                          En attente
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => toggleVerifyPractitioner(p.id)}
                        className="px-3 py-1.5 rounded-lg border border-gold-500/30 text-gold-300 hover:bg-gold-500/10 font-medium"
                      >
                        {p.isVerified ? "Suspendre" : "Valider"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Moderation Reports */}
      {activeTab === "moderation" && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-gold-200">
            Signalements & Modération du Cercle ({reports.length})
          </h2>

          {reports.length === 0 ? (
            <div className="p-8 rounded-2xl border border-gold-500/15 bg-cosmos-900/30 text-center text-xs text-muted-foreground">
              Aucun signalement en attente. La paix règne sur le forum.
            </div>
          ) : (
            reports.map((rep) => (
              <div
                key={rep.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gold-500/20 bg-cosmos-900/60"
              >
                <div className="space-y-1">
                  <div className="text-xs text-gold-400 font-semibold">
                    Signalé par {rep.reporterName} • {rep.date}
                  </div>
                  <p className="text-sm text-foreground font-medium">
                    Motif : {rep.reason}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dismissReport(rep.id)}
                    className="px-3.5 py-2 rounded-xl border border-gold-500/20 text-muted-foreground hover:text-gold-200 text-xs font-semibold"
                  >
                    Classer sans suite
                  </button>
                  <button
                    onClick={() => dismissReport(rep.id)}
                    className="px-3.5 py-2 rounded-xl bg-red-500 text-cosmos-950 text-xs font-bold hover:bg-red-400"
                  >
                    Retirer le contenu
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: Security Audit Log */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-gold-200">
            Journal d&apos;Audit & Sécurité Système
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-gold-500/15 bg-cosmos-900/50">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-cosmos-950/80 border-b border-gold-500/15 text-muted-foreground font-semibold uppercase tracking-wider font-sans">
                <tr>
                  <th className="p-3.5">Horodatage</th>
                  <th className="p-3.5">Action</th>
                  <th className="p-3.5">Utilisateur</th>
                  <th className="p-3.5">Détails de l&apos;opération</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-500/10">
                {initialData.auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gold-500/5">
                    <td className="p-3.5 text-muted-foreground">{log.date}</td>
                    <td className="p-3.5 font-bold text-gold-400">{log.action}</td>
                    <td className="p-3.5 text-foreground">{log.userEmail}</td>
                    <td className="p-3.5 text-muted-foreground">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: GDPR Requests */}
      {activeTab === "gdpr" && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-gold-200">
            Demandes de Droits aux Données (APDP Bénin / RGPD)
          </h2>

          <div className="space-y-3">
            {initialData.pendingGdpr.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gold-500/15 bg-cosmos-900/40 text-xs"
              >
                <div>
                  <div className="font-bold text-gold-200">{req.userEmail}</div>
                  <div className="text-muted-foreground">
                    Type : {req.type.toUpperCase()} • Reçu le {req.date}
                  </div>
                </div>
                <button className="px-3.5 py-1.5 rounded-lg bg-gold-500 text-cosmos-950 font-bold hover:bg-gold-400">
                  Traiter la demande
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
