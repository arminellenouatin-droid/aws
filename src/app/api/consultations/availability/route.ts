import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/server/services/booking-service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dateStr = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const timezone = searchParams.get("timezone") || "Africa/Porto-Novo";
  const duration = parseInt(searchParams.get("duration") || "45", 10);
  const practitionerId = searchParams.get("practitionerId") || undefined;

  const result = await getAvailableSlots({
    dateStr,
    durationMinutes: duration,
    timezone,
    practitionerId,
  });

  return NextResponse.json(result);
}
