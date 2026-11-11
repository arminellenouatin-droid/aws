"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Send,
  Bold,
  Italic,
  Quote,
  List,
  Sparkles,
  Loader2,
  CheckCircle,
} from "lucide-react";

interface ThreadReplyBoxProps {
  threadId: string;
}

export function ThreadReplyBox({ threadId }: ThreadReplyBoxProps) {
  const t = useTranslations("forum");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
    if (!content.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId,
          content,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Impossible de publier votre réponse");
      }

      setSuccess(true);
      setContent("");
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gold-500/20 bg-cosmos-900/60 p-6 space-y-4 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-gold-500/15 pb-3">
        <div className="flex items-center gap-2 text-sm font-serif font-bold text-gold-300">
          <Sparkles className="h-4 w-4 text-gold-400" />
          <span>Apporter votre contribution</span>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertFormatting("bold")}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-gold-500/10 hover:text-gold-300 transition-colors"
            title="Gras"
          >
            <Bold className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("italic")}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-gold-500/10 hover:text-gold-300 transition-colors"
            title="Italique"
          >
            <Italic className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("quote")}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-gold-500/10 hover:text-gold-300 transition-colors"
            title="Citation"
          >
            <Quote className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("list")}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-gold-500/10 hover:text-gold-300 transition-colors"
            title="Liste"
          >
            <List className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-xs text-emerald-300">
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          <span>
            Votre réponse a été publiée avec succès et transmise au cercle bienveillant !
          </span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-950/30 text-xs text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("replyPlaceholder")}
          required
          className="w-full rounded-xl border border-gold-500/20 bg-cosmos-950 p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400/50"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <p className="text-[11px] text-muted-foreground/70">
            {t("charterNotice")}
          </p>

          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-md shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Publication...</span>
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span>{t("submitReply")}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
