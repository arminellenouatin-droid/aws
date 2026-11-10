import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitConsultationReview } from "@/server/services/room-service";

export const dynamic = "force-dynamic";

const ReviewSchema = z.object({
  practitionerId: z.string().min(1),
  clientId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const validated = ReviewSchema.parse(body);

    const result = await submitConsultationReview({
      consultationId: id,
      practitionerId: validated.practitionerId,
      clientId: validated.clientId,
      rating: validated.rating,
      comment: validated.comment,
    });

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "VALIDATION_ERROR" }, { status: 422 });
    }
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
