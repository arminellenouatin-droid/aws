import { db } from "./index";
import { consultationTypes } from "./schema/consultations";
import { forumCategories } from "./schema/community";
import { users } from "./schema/auth";
import { eq } from "drizzle-orm";
import { logAuditEvent } from "../audit/logger";

export async function runSeed() {
  console.log("🌱 [SEED] Démarrage du peuplement initial...");

  // 1. Initial Consultation Types
  const defaultConsultationTypes = [
    {
      slug: "guidance-clarte-de-vie",
      title: "Clarté & Orientation de Vie",
      description: "Faites le point sur vos choix de vie, vos blocages intérieurs et identifiez les opportunités qui s'ouvrent à vous.",
      durationMinutes: 45,
      priceXof: 25000,
      priceEur: 40,
      isFreeIntro: false,
      allowedFormats: ["chat", "audio", "video"],
    },
    {
      slug: "deblocage-purification-protection",
      title: "Déblocage, Purification & Protection",
      description: "Rituels sacrés et conseils traditionnels pour assainir vos énergies environnantes et restaurer un bouclier de sérénité.",
      durationMinutes: 60,
      priceXof: 35000,
      priceEur: 55,
      isFreeIntro: false,
      allowedFormats: ["chat", "audio", "video"],
    },
    {
      slug: "harmonie-prospere-projets",
      title: "Harmonie Professionnelle & Projets",
      description: "Alignez vos entreprises, vos finances et vos activités professionnelles sur les lois universelles de fécondité et d'abondance.",
      durationMinutes: 45,
      priceXof: 30000,
      priceEur: 50,
      isFreeIntro: false,
      allowedFormats: ["chat", "audio", "video"],
    },
    {
      slug: "guidance-initiale-decouverte",
      title: "Consultation Découverte Spirituelle",
      description: "Premier contact gratuit (15 min) pour faire connaissance, évaluer vos besoins et recevoir une orientation de base.",
      durationMinutes: 15,
      priceXof: 0,
      priceEur: 0,
      isFreeIntro: true,
      allowedFormats: ["chat"],
    },
  ];

  for (const cType of defaultConsultationTypes) {
    const existing = await db
      .select({ id: consultationTypes.id })
      .from(consultationTypes)
      .where(eq(consultationTypes.slug, cType.slug))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(consultationTypes).values(cType);
      console.log(`  ✓ Type de consultation créé : ${cType.title}`);
    }
  }

  // 2. Initial Forum Categories
  const defaultCategories = [
    {
      slug: "eveil-spiritualite",
      name: "Éveil & Sagesses Africaines",
      description: "Échanges sur les traditions séculaires, la cosmogonie et l'élévation de conscience.",
      icon: "Sun",
      sortOrder: 1,
    },
    {
      slug: "rituels-protection",
      name: "Rituels & Prières de Protection",
      description: "Partages bienveillants autour des pratiques de purification et des symboles sacrés.",
      icon: "Shield",
      sortOrder: 2,
    },
    {
      slug: "temoignages-gratitude",
      name: "Témoignages & Gratitude",
      description: "Partagez vos victoires spirituelles, guérisons intérieures et délivrances.",
      icon: "Heart",
      sortOrder: 3,
    },
    {
      slug: "entraide-communaute",
      name: "Entraide & Fraternité",
      description: "Espace d'écoute, de soutien mutuel et de solidarité pour la communauté.",
      icon: "Users",
      sortOrder: 4,
    },
  ];

  for (const cat of defaultCategories) {
    const existing = await db
      .select({ id: forumCategories.id })
      .from(forumCategories)
      .where(eq(forumCategories.slug, cat.slug))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(forumCategories).values(cat);
      console.log(`  ✓ Catégorie de forum créée : ${cat.name}`);
    }
  }

  // 3. Super Admin Initial Check
  const adminEmail = process.env.ADMIN_SEED_EMAIL || "admin@africaworldsaving.com";
  const existingAdmin = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, adminEmail))
    .limit(1);

  if (existingAdmin.length === 0) {
    console.log(`  ℹ Super Admin [${adminEmail}] non créé automatiquement (sera créé lors du premier sign-up sécurisé).`);
  }

  await logAuditEvent({
    action: "ADMIN_ACTION",
    metadata: { details: "Initial database seed completed" },
  });

  console.log("✅ [SEED] Base de données initialisée avec succès !");
}

if (require.main === module) {
  runSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ [SEED_ERROR]", err);
      process.exit(1);
    });
}
