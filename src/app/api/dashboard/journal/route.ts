import { NextRequest, NextResponse } from "next/server";
import { saveJournalEntry } from "@/server/dal/dashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, mood } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Titre et contenu de votre réflexion sacrée requis" },
        { status: 400 }
      );
    }

    let userId = "demo-user-id";
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (session?.user?.id) {
        userId = session.user.id;
      }
    } catch {
      // mode démo
    }

    const entry = await saveJournalEntry({
      userId,
      title,
      content,
      mood,
    });

    return NextResponse.json({ success: true, entry });
  } catch (error: any) {
    console.error("❌ [API_JOURNAL_POST_ERROR]", error);
    return NextResponse.json(
      { error: error.message || "Impossible d'enregistrer la réflexion" },
      { status: 500 }
    );
  }
}
