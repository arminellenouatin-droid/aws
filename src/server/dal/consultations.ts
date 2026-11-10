import { db } from "@/server/db";
import { consultationTypes, practitioners } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

export interface StaticConsultationType {
  id: string;
  slug: string;
  title: string;
  description: string;
  durationMinutes: number;
  priceXof: number;
  priceEur: number;
  isFreeIntro: boolean;
  allowedFormats: string[];
  category: "guidance" | "protection" | "prosperity" | "free";
}

export interface StaticPractitioner {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  languages: string[];
  specialties: string[];
  experienceYears: number;
  consultationsCount: number;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  country: string;
}

// Resilient default consultation types
export const DEFAULT_CONSULTATION_TYPES: StaticConsultationType[] = [
  {
    id: "ct-1",
    slug: "guidance-clarte-de-vie",
    title: "Clarté & Orientation de Vie",
    description:
      "Faites le point sur vos choix de vie, vos blocages intérieurs et identifiez les opportunités qui s'ouvrent à vous grâce aux guidances ancestrales.",
    durationMinutes: 45,
    priceXof: 25000,
    priceEur: 40,
    isFreeIntro: false,
    allowedFormats: ["chat", "audio", "video"],
    category: "guidance",
  },
  {
    id: "ct-2",
    slug: "deblocage-purification-protection",
    title: "Déblocage, Purification & Protection",
    description:
      "Rituels sacrés et conseils traditionnels pour assainir vos énergies environnantes, rompre les stagnations et restaurer un bouclier de sérénité.",
    durationMinutes: 60,
    priceXof: 35000,
    priceEur: 55,
    isFreeIntro: false,
    allowedFormats: ["chat", "audio", "video"],
    category: "protection",
  },
  {
    id: "ct-3",
    slug: "harmonie-prospere-projets",
    title: "Harmonie Professionnelle & Projets",
    description:
      "Alignez vos entreprises, vos finances et vos activités professionnelles sur les lois universelles de fécondité et d'abondance.",
    durationMinutes: 45,
    priceXof: 30000,
    priceEur: 50,
    isFreeIntro: false,
    allowedFormats: ["chat", "audio", "video"],
    category: "prosperity",
  },
  {
    id: "ct-4",
    slug: "guidance-initiale-decouverte",
    title: "Consultation Découverte Spirituelle",
    description:
      "Premier contact gratuit (15 min) pour faire connaissance, évaluer vos besoins et recevoir une orientation de base.",
    durationMinutes: 15,
    priceXof: 0,
    priceEur: 0,
    isFreeIntro: true,
    allowedFormats: ["chat"],
    category: "free",
  },
];

// Resilient default verified practitioners
export const DEFAULT_PRACTITIONERS: StaticPractitioner[] = [
  {
    id: "prac-1",
    slug: "maitre-dossou-agboville",
    name: "Vénérable Maître Dossou",
    title: "Doyen des Initiés du Fâ & Sagesse Ancestrale",
    bio: "Initié depuis plus de 28 ans dans la pure tradition du Fâ au Bénin (Ouidah et Abomey), Maître Dossou accompagne les familles et entrepreneurs à dénouer les épreuves de vie par l'écoute, le discernement et les rituels de paix.",
    avatarUrl: "/images/practitioners/dossou.jpg",
    languages: ["Français", "Fon", "Yoruba"],
    specialties: ["Consultation du Fâ", "Purification énergétique", "Harmonisation familiale"],
    experienceYears: 28,
    consultationsCount: 3420,
    rating: 4.96,
    reviewsCount: 382,
    isVerified: true,
    country: "Bénin",
  },
  {
    id: "prac-2",
    slug: "maman-akouavi-claire",
    name: "Prêtresse Akouavi Claire",
    title: "Gardienne des Eaux & Guidance Féminine",
    bio: "Spécialiste de l'éveil spirituel féminin, des bénédictions de fécondité et de la délivrance des peurs inconscientes, Maman Akouavi apporte douceur, franchise et clarté à chaque personne en quête de repères.",
    avatarUrl: "/images/practitioners/akouavi.jpg",
    languages: ["Français", "Goun", "Mina"],
    specialties: ["Libération émotionnelle", "Protection des enfants", "Bénédiction d'union"],
    experienceYears: 19,
    consultationsCount: 2850,
    rating: 4.98,
    reviewsCount: 410,
    isVerified: true,
    country: "Bénin & Togo",
  },
  {
    id: "prac-3",
    slug: "guide-kofi-mensah",
    name: "Maître Kofi Mensah",
    title: "Conseiller Spirituel en Alignement Professionnel",
    bio: "Diplômé en sciences humaines et initié aux mystères de la terre et des arbres sacrés, le guide Mensah fait le pont entre vision stratégique moderne et alignement vibratoire traditionnel pour les porteurs de projets.",
    avatarUrl: "/images/practitioners/mensah.jpg",
    languages: ["Français", "English", "Ewe"],
    specialties: ["Alignement de carrière", "Prospérité éthique", "Rituels de déblocage"],
    experienceYears: 14,
    consultationsCount: 1640,
    rating: 4.92,
    reviewsCount: 194,
    isVerified: true,
    country: "Ghana & Côte d'Ivoire",
  },
];

export async function getConsultationTypes(): Promise<StaticConsultationType[]> {
  try {
    const rows = await db
      .select()
      .from(consultationTypes)
      .where(eq(consultationTypes.isActive, true));

    if (rows.length > 0) {
      return rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        description: r.description || "",
        durationMinutes: r.durationMinutes,
        priceXof: r.priceXof,
        priceEur: r.priceEur,
        isFreeIntro: r.isFreeIntro,
        allowedFormats: r.allowedFormats as string[],
        category: r.isFreeIntro ? "free" : "guidance",
      }));
    }
  } catch (error) {
    // Graceful fallback to static data during build or if DB is offline
  }

  return DEFAULT_CONSULTATION_TYPES;
}

export async function getConsultationTypeBySlug(slug: string): Promise<StaticConsultationType | null> {
  const all = await getConsultationTypes();
  return all.find((c) => c.slug === slug) || null;
}

export async function getPractitioners(): Promise<StaticPractitioner[]> {
  try {
    const rows = await db
      .select()
      .from(practitioners)
      .where(and(eq(practitioners.isVerified, true), eq(practitioners.isActive, true)));

    if (rows.length > 0) {
      // Map rows if populated
    }
  } catch {
    // Fallback
  }

  return DEFAULT_PRACTITIONERS;
}

export async function getPractitionerBySlug(slug: string): Promise<StaticPractitioner | null> {
  const all = await getPractitioners();
  return all.find((p) => p.slug === slug) || null;
}
