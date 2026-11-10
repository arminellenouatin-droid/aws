import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  sendConsultationMessage,
  getConsultationMessages,
} from "@/server/services/room-service";

export const dynamic = "force-dynamic";

const MessageSchema = z.object({
  senderId: z.string().min(1),
  content: z.string().min(1).max(3000),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const messages = await getConsultationMessages(id);
  return NextResponse.json({ messages });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const validated = MessageSchema.parse(body);

    const message = await sendConsultationMessage({
      consultationId: id,
      senderId: validated.senderId,
      content: validated.content,
    });

    return NextResponse.json({ success: true, message });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "VALIDATION_ERROR" }, { status: 422 });
    }
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
