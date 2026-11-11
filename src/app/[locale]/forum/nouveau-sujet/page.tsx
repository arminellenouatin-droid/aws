"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FORUM_CATEGORIES } from "@/lib/constants/forum";
import { Link, useRouter } from "@/lib/i18n/routing";
import {
  Sparkles,
  Send,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Bold,
  Italic,
  Quote,
  List,
} from "lucide-react";

function NewThreadForm() {
  const t = useTranslations("forum");
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get("category") || "eveil-spiritualite";

  const [categorySlug, setCategorySlug] = useState(defaultCategory);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [acceptCharter, setAcceptCharter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const insertFormatting = (tag: string) => {
    switch (tag) {
      case "bold":
        setContent((prev) => `${prev} **texte en gras** `);
        break;
      case "italic":
        setContent((prev) => `${prev} *texte en italique* `);
        break;
      case "quote":
        setContent((prev) => `${prev}\n> Citation sacrée\n`);
        break;
      case "list":
        setContent((prev) => `${prev}\n- Point 1\n- Point 2\n`);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || title.length < 5) {
      setError("Le titre doit comporter au moins 5 caractères.");
      return;
    }

    if (!content.trim() || content.length < 20) {
      setError("Le contenu de votre sujet doit comporter au moins 20 caractères pour éclairer le cercle.");
      return;
    }

    if (!acceptCharter) {
      setError("Veuillez accepter la charte éthique fraternelle avant de publier.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/forum/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categorySlug,
          title,
          content,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Impossible de publier la discussion");
      }

      // Redirection vers la catégorie ou le nouveau sujet
      router.push(`/forum/${categorySlug}`);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la publication");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4 sm:px-6">
      <Link
        href="/forum"
        className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 transition-colors font-medium"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>{t("backToForum")}</span>
      </Link>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
          <Sparkles className="h-3 w-3" />
          Transmission Fraternelle
        </div>
        <h1 className="font-serif text-3xl font-bold text-gold-100">
          Ouvrir une nouvelle discussion
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Posez une question, partagez une illumination ou soumettez une intention au cercle bienveillant.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-gold-500/25 bg-cosmos-900/70 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-sm"
      >
        {error && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl border border-red-500/30 bg-red-950/30 text-xs text-red-300">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Category */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300/90">
            Catégorie du Cercle *
          </label>
          <select
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 px-3.5 py-2.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
          >
            {FORUM_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.slug} className="bg-cosmos-950 text-foreground">
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300/90">
            Titre de la discussion *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Comment harmoniser les énergies de son foyer au réveil ?"
            className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 px-3.5 py-2.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
          />
        </div>

        {/* Content with toolbar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300/90">
              Votre message / Enseignement *
            </label>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => insertFormatting("bold")}
                className="p-1 rounded text-muted-foreground hover:text-gold-300 transition-colors"
                title="Gras"
              >
                <Bold className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("italic")}
                className="p-1 rounded text-muted-foreground hover:text-gold-300 transition-colors"
                title="Italique"
              >
                <Italic className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("quote")}
                className="p-1 rounded text-muted-foreground hover:text-gold-300 transition-colors"
                title="Citation"
              >
                <Quote className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("list")}
                className="p-1 rounded text-muted-foreground hover:text-gold-300 transition-colors"
                title="Liste"
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <textarea
            rows={7}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Décrivez votre expérience, votre question ou votre prière en détail..."
            className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 p-3.5 text-sm text-foreground focus:border-gold-400 focus:outline-none"
          />
        </div>

        {/* Ethical Charter agreement */}
        <div className="pt-2 border-t border-gold-500/15">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-muted-foreground">
            <input
              type="checkbox"
              required
              checked={acceptCharter}
              onChange={(e) => setAcceptCharter(e.target.checked)}
              className="mt-0.5 text-gold-500 rounded"
            />
            <span>
              Je certifie que mes propos sont respectueux, bienveillants et conformes à
              la charte éthique et fraternelle du sanctuaire AWS.
            </span>
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-lg shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Publication en cours...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Publier dans le Cercle</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function NewThreadPage() {
  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gold-400" />
          </div>
        }
      >
        <NewThreadForm />
      </Suspense>
    </div>
  );
}
