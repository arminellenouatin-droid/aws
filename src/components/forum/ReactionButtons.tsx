"use client";

import { useState } from "react";
import { Heart, Sparkles, Sun, Flame } from "lucide-react";

interface ReactionButtonsProps {
  postId: string;
  initialReactions?: {
    like: number;
    pray: number;
    gratitude: number;
    fire: number;
  };
}

export function ReactionButtons({ postId, initialReactions }: ReactionButtonsProps) {
  const [reactions, setReactions] = useState(
    initialReactions || { like: 0, pray: 0, gratitude: 0, fire: 0 }
  );
  const [userActive, setUserActive] = useState<Record<string, boolean>>({});

  const handleReact = async (type: "like" | "pray" | "gratitude" | "fire") => {
    const isCurrentlyActive = !!userActive[type];

    // Optimistic UI update
    setReactions((prev) => ({
      ...prev,
      [type]: isCurrentlyActive ? Math.max(0, prev[type] - 1) : prev[type] + 1,
    }));
    setUserActive((prev) => ({ ...prev, [type]: !isCurrentlyActive }));

    try {
      await fetch("/api/forum/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, type }),
      });
    } catch (err) {
      console.warn("⚠️ [REACTION_ERROR]", err);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <button
        onClick={() => handleReact("like")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
          userActive.like
            ? "bg-red-500/20 border-red-500/40 text-red-300"
            : "bg-cosmos-900/60 border-gold-500/15 text-muted-foreground hover:border-gold-500/30 hover:text-gold-200"
        }`}
        aria-label="Soutien"
      >
        <Heart className={`h-3.5 w-3.5 ${userActive.like ? "fill-red-400 text-red-400" : ""}`} />
        <span>{reactions.like}</span>
      </button>

      <button
        onClick={() => handleReact("pray")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
          userActive.pray
            ? "bg-gold-500/20 border-gold-500/40 text-gold-300"
            : "bg-cosmos-900/60 border-gold-500/15 text-muted-foreground hover:border-gold-500/30 hover:text-gold-200"
        }`}
        aria-label="Prière"
      >
        <Sparkles className="h-3.5 w-3.5 text-gold-400" />
        <span>{reactions.pray}</span>
      </button>

      <button
        onClick={() => handleReact("gratitude")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
          userActive.gratitude
            ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
            : "bg-cosmos-900/60 border-gold-500/15 text-muted-foreground hover:border-gold-500/30 hover:text-gold-200"
        }`}
        aria-label="Gratitude"
      >
        <Sun className="h-3.5 w-3.5 text-amber-400" />
        <span>{reactions.gratitude}</span>
      </button>

      <button
        onClick={() => handleReact("fire")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
          userActive.fire
            ? "bg-orange-500/20 border-orange-500/40 text-orange-300"
            : "bg-cosmos-900/60 border-gold-500/15 text-muted-foreground hover:border-gold-500/30 hover:text-gold-200"
        }`}
        aria-label="Lumière & Feu sacré"
      >
        <Flame className="h-3.5 w-3.5 text-orange-400" />
        <span>{reactions.fire}</span>
      </button>
    </div>
  );
}
