import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  checkFreeIntroEligibility,
  createBooking,
} from "@/server/services/booking-service";
import { DEFAULT_CONSULTATION_TYPES, DEFAULT_PRACTITIONERS } from "@/server/dal/consultations";
import { checkRateLimit, getClientIp, sanitizeText } from "@/server/security/rate-limiter";

export const dynamic = "force-dynamic";

const BookingSchema = z.object({
  typeSlug: z.string().min(1),
  practitionerSlug: z.string().optional(),
  format: z.enum(["chat", "audio", "video"]),
  scheduledAt: z.string().datetime(),
  timezone: z.string().default("Africa/Porto-Novo"),
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(6, "Téléphone requis"),
  spiritualIntentions: z.string().max(2000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    // Rate limit: max 10 bookings per IP per 10 minutes
    const rateCheck = await checkRateLimit(`booking:${ip}`, 10, 600);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Trop de requêtes de réservation. Veuillez patienter avant de réessayer." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = BookingSchema.parse(body);

    // Sanitize user inputs
    validated.name = sanitizeText(validated.name);
    validated.email = sanitizeText(validated.email).toLowerCase();
    validated.phone = sanitizeText(validated.phone);
    if (validated.spiritualIntentions) {
      validated.spiritualIntentions = sanitizeText(validated.spiritualIntentions);
    }

    // 1. Resolve consultation type
    const cType =
      DEFAULT_CONSULTATION_TYPES.find((t) => t.slug === validated.typeSlug) ||
      DEFAULT_CONSULTATION_TYPES[0];

    const isFree = cType.isFreeIntro || cType.priceXof === 0;

    // 2. Anti-abuse verification for free intro consultations
    if (isFree) {
      const eligibility = await checkFreeIntroEligibility({
        email: validated.email,
        phone: validated.phone,
      });

      if (!eligibility.isEligible) {
        return NextResponse.json(
          {
            error: "FREE_INTRO_ALREADY_USED",
            message: eligibility.reason,
          },
          { status: 400 }
        );
      }
    }

    // 3. Resolve practitioner
    const prac = validated.practitionerSlug
      ? DEFAULT_PRACTITIONERS.find((p) => p.slug === validated.practitionerSlug) || DEFAULT_PRACTITIONERS[0]
      : DEFAULT_PRACTITIONERS[0];

    // 4. Create booking
    const result = await createBooking({
      practitionerId: prac.id,
      clientId: `user-${validated.email.replace(/[^a-zA-Z0-9]/g, "_")}`,
      typeId: cType.id,
      format: validated.format,
      scheduledAt: validated.scheduledAt,
      durationMinutes: cType.durationMinutes,
      clientNotes: `Nom: ${validated.name} | Tel: ${validated.phone} | Intentions: ${validated.spiritualIntentions || "Non précisées"}`,
      isFreeIntro: isFree,
      priceXof: cType.priceXof,
    });

    return NextResponse.json({
      success: true,
      booking: {
        id: result.id,
        meetRoomId: result.meetRoomId,
        status: result.status,
        scheduledAt: result.scheduledAt,
        consultationTitle: cType.title,
        practitionerName: prac.name,
        format: validated.format,
        durationMinutes: cType.durationMinutes,
        priceXof: cType.priceXof,
        isFree,
      },
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", details: err.errors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { error: "SERVER_ERROR", message: err.message || "Erreur lors de la réservation" },
      { status: 500 }
    );
  }
}
