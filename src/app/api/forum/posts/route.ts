import { NextRequest, NextResponse } from "next/server";
import { createForumPost } from "@/server/dal/forum";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { threadId, content } = body;

    if (!threadId || !content) {
      return NextResponse.json(
        { error: "Identifiant du sujet ou contenu manquant" },
        { status: 400 }
      );
    }

    if (content.trim().length < 3) {
      return NextResponse.json(
        { error: "Votre réponse doit contenir au moins 3 caractères" },
        { status: 400 }
      );
    }

    let authorId = "anonymous-member";
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (session?.user?.id) {
        authorId = session.user.id;
      }
    } catch {
      // mode invité
    }

    const post = await createForumPost({
      threadId,
      content,
      authorId,
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error("❌ [API_FORUM_POSTS_ERROR]", error);
    return NextResponse.json(
      { error: error.message || "Impossible de publier votre réponse" },
      { status: 500 }
    );
  }
}
