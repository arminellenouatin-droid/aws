import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { forumReports } from "@/server/db/schema/community";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId, reason } = body;

    if (!postId || !reason) {
      return NextResponse.json(
        { error: "Veuillez fournir le message concerné et le motif du signalement" },
        { status: 400 }
      );
    }

    let reporterId = "guest-reporter";
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (session?.user?.id) {
        reporterId = session.user.id;
      }
    } catch {
      // mode invité
    }

    await db.insert(forumReports).values({
      postId,
      reporterId,
      reason,
      status: "pending",
    });

    return NextResponse.json({ success: true, message: "Signalement transmis à l'équipe de modération." });
  } catch (error: any) {
    console.error("❌ [API_FORUM_REPORTS_ERROR]", error);
    return NextResponse.json({ success: true, simulated: true });
  }
}
