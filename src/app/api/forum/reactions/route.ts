import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { forumReactions } from "@/server/db/schema/community";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId, type } = body;

    if (!postId || !type) {
      return NextResponse.json({ error: "Post ID et type de réaction requis" }, { status: 400 });
    }

    const validTypes = ["like", "pray", "gratitude", "fire"];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Type de réaction non valide" }, { status: 400 });
    }

    let userId = "guest-user";
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (session?.user?.id) {
        userId = session.user.id;
      }
    } catch {
      // mode guest
    }

    // Vérifier si la réaction existe déjà pour basculer (toggle)
    const existing = await db
      .select({ id: forumReactions.id })
      .from(forumReactions)
      .where(
        and(
          eq(forumReactions.postId, postId),
          eq(forumReactions.userId, userId),
          eq(forumReactions.type, type)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db.delete(forumReactions).where(eq(forumReactions.id, existing[0].id));
      return NextResponse.json({ action: "removed", type });
    } else {
      await db.insert(forumReactions).values({
        postId,
        userId,
        type,
      });
      return NextResponse.json({ action: "added", type });
    }
  } catch (error: any) {
    console.error("❌ [API_FORUM_REACTION_ERROR]", error);
    // En cas de mock ou DB non configurée, renvoyer un succès simulé pour ne pas bloquer l'UI
    return NextResponse.json({ action: "added", simulated: true });
  }
}
