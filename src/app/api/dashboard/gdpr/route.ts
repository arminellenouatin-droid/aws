import { NextRequest, NextResponse } from "next/server";
import { requestGdprAction } from "@/server/dal/dashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (type !== "export" && type !== "deletion") {
      return NextResponse.json({ error: "Type de demande non valide" }, { status: 400 });
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

    const gdprReq = await requestGdprAction({
      userId,
      type,
    });

    return NextResponse.json({
      success: true,
      request: gdprReq,
      message:
        type === "export"
          ? "Votre demande d'export a été enregistrée. Une archive sécurisée sera préparée."
          : "Votre demande d'effacement a été transmise au délégué à la protection des données.",
    });
  } catch (error: any) {
    console.error("❌ [API_GDPR_ERROR]", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de l'enregistrement de la demande" },
      { status: 500 }
    );
  }
}
