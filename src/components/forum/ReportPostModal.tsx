"use client";

import { useState } from "react";
import { Flag, X, ShieldAlert, Check } from "lucide-react";

interface ReportPostModalProps {
  postId: string;
}

export function ReportPostModal({ postId }: ReportPostModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [customText, setCustomText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const reasons = [
    "Propos haineux, discriminatoires ou injurieux",
    "Spam, sollicitation commerciale ou escroquerie",
    "Violation de la charte éthique spirituelle du sanctuaire",
    "Contenu inapproprié ou prosélytisme agressif",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;

    setLoading(true);
    try {
      await fetch("/api/forum/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          reason: customText ? `${reason} : ${customText}` : reason,
        }),
      });
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setReason("");
        setCustomText("");
      }, 2000);
    } catch (err) {
      console.warn("⚠️ [REPORT_ERROR]", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 text-[11px] text-muted-foreground/70 hover:text-red-400 transition-colors p-1"
        aria-label="Signaler ce message"
      >
        <Flag className="h-3 w-3" />
        <span>Signaler</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cosmos-950/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl border border-gold-500/20 bg-cosmos-900 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-gold-500/15 pb-4">
              <div className="flex items-center gap-2.5 text-gold-300 font-serif font-bold text-lg">
                <ShieldAlert className="h-5 w-5 text-gold-400" />
                <span>Signalement de modération</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-gold-200 transition-colors"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-emerald-300">
                  Signalement bien reçu
                </h4>
                <p className="text-xs text-muted-foreground">
                  Merci de préserver la sérénité et l&apos;intégrité de notre cercle sacré.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <p className="text-muted-foreground">
                  Sélectionnez le motif principal pour lequel cette contribution contrevient
                  à la charte fraternelle :
                </p>

                <div className="space-y-2">
                  {reasons.map((r, idx) => (
                    <label
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg border border-gold-500/10 bg-cosmos-950/50 hover:bg-gold-500/5 cursor-pointer text-muted-foreground hover:text-gold-200"
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={r}
                        checked={reason === r}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-0.5 text-gold-500"
                        required
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-[11px] text-muted-foreground mb-1">
                    Précision facultative pour l&apos;équipe :
                  </label>
                  <textarea
                    rows={2}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Détails complémentaires..."
                    className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 p-2.5 text-xs text-foreground focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-xl border border-gold-500/20 text-muted-foreground hover:text-gold-200"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !reason}
                    className="px-4 py-2 rounded-xl bg-gold-500 text-cosmos-950 font-bold hover:bg-gold-400 disabled:opacity-50"
                  >
                    {loading ? "Transmission..." : "Envoyer le signalement"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
