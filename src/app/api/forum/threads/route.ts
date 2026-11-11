import { NextRequest, NextResponse } from "next/server";
import { getRecentThreads, getThreadsByCategory, createForumThread } from "@/server/dal/forum";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const limit = Number(searchParams.get("limit")) || 20;

    if (category) {
      const threads = await getThreadsByCategory(category);
      return NextResponse.json({ threads });
    }

    const threads = await getRecentThreads(limit);
    return NextResponse.json({ threads });
  } catch (error: any) {
    console.error("❌ [API_FORUM_THREADS_GET_ERROR]", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la récupération des discussions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { categorySlug, title, content } = body;

    if (!categorySlug || !title || !content) {
      return NextResponse.json(
        { error: "Veuillez renseigner la catégorie, le titre et le contenu du message" },
        { status: 400 }
      );
    }

    if (title.length < 5 || title.length > 200) {
      return NextResponse.json(
        { error: "Le titre doit comporter entre 5 et 200 caractères" },
        { status: 400 }
      );
    }

    // Récupération de la session utilisateur
    let authorId = "anonymous-member";
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (session?.user?.id) {
        authorId = session.user.id;
      }
    } catch {
      // mode invité / non authentifié
    }

    const result = await createForumThread({
      categorySlug,
      title,
      content,
      authorId,
    });

    return NextResponse.json({ success: true, thread: result.thread, post: result.post });
  } catch (error: any) {
    console.error("❌ [API_FORUM_THREADS_POST_ERROR]", error);
    return NextResponse.json(
      { error: error.message || "Impossible de publier la discussion" },
      { status: 500 }
    );
  }
}
