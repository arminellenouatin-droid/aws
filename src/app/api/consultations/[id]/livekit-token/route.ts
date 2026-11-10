import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateRoomToken } from "@/server/services/room-service";

export const dynamic = "force-dynamic";

const TokenRequestSchema = z.object({
  participantIdentity: z.string().min(1),
  participantName: z.string().min(1),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const validated = TokenRequestSchema.parse(body);

    const token = await generateRoomToken({
      roomName: `consultation-${id}`,
      participantIdentity: validated.participantIdentity,
      participantName: validated.participantName,
    });

    return NextResponse.json({
      success: true,
      token,
      roomName: `consultation-${id}`,
      livekitUrl: process.env.LIVEKIT_URL || "wss://africaworldsaving.livekit.cloud",
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "VALIDATION_ERROR" }, { status: 422 });
    }
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
