export interface QuizQuestion {
  id: number;
  question: string;
  options: Array<{
    text: string;
    archetype: "clarite" | "purification" | "abondance";
  }>;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Quelle est la sensation ou l'épreuve dominante qui vous pèse en ce moment ?",
    options: [
      {
        text: "Doutes profonds, indécision face à un choix capital ou carrefour de vie.",
        archetype: "clarite",
      },
      {
        text: "Lourdeur inexpliquée, fatigue au réveil, sensation d'ondes négatives ou de blocage persistant.",
        archetype: "purification",
      },
      {
        text: "Ralentissement financier, projets qui avortent au dernier moment, manque de fécondité matérielle.",
        archetype: "abondance",
      },
      {
        text: "Conflits relationnels ou tensions familiales qui drainent mon énergie vitale.",
        archetype: "purification",
      },
    ],
  },
  {
    id: 2,
    question: "Comment se manifestent vos nuits et vos songes ces derniers temps ?",
    options: [
      {
        text: "Songes confus avec des visages inconnus, des symboles géométriques ou des carrefours.",
        archetype: "clarite",
      },
      {
        text: "Sommeil agité, réveils nocturnes réguliers vers 3h du matin ou sentiment d'oppression.",
        archetype: "purification",
      },
      {
        text: "Songes d'eaux stagnantes, de pertes d'objets précieux ou de monnaie dispersée.",
        archetype: "abondance",
      },
      {
        text: "Je me réveille sans souvenir précis de mes songes, avec une sensation de vide.",
        archetype: "clarite",
      },
    ],
  },
  {
    id: 3,
    question: "Quel est votre lien actuel avec les sagesses et traditions africaines ?",
    options: [
      {
        text: "J'en ressens l'appel au fond de mon cœur sans savoir par où débuter mon initiation.",
        archetype: "clarite",
      },
      {
        text: "J'ai un besoin urgent de pratiques concrètes de purification et d'un bouclier de sérénité.",
        archetype: "purification",
      },
      {
        text: "Je cherche à aligner mes entreprises sur les lois universelles de fécondité et d'abondance.",
        archetype: "abondance",
      },
      {
        text: "Je pratique déjà la prière mais je cherche un accompagnement déontologique rigoureux.",
        archetype: "clarite",
      },
    ],
  },
  {
    id: 4,
    question: "Quel résultat prioritaire souhaitez-vous manifester dans les 30 prochains jours ?",
    options: [
      {
        text: "Avoir les idées lumineuses, savoir quelle décision prendre pour mon avenir sans regret.",
        archetype: "clarite",
      },
      {
        text: "Me sentir profondément purifié(e), léger(e), débarrassé(e) des pollutions énergétiques.",
        archetype: "purification",
      },
      {
        text: "Débloquer mes opportunités financières et voir fleurir mes projets professionnels.",
        archetype: "abondance",
      },
      {
        text: "Rétablir l'harmonie et la paix dans mes relations intimes et familiales.",
        archetype: "purification",
      },
    ],
  },
  {
    id: 5,
    question: "Quelle forme de guidance résonne le plus avec votre cœur aujourd'hui ?",
    options: [
      {
        text: "Un échange direct et bienveillant avec un maître dépositaire du Fâ (visio ou audio).",
        archetype: "clarite",
      },
      {
        text: "Un rituel sacré complet (bain d'herbes douces, encens d'Oliban) à accomplir chez moi.",
        archetype: "purification",
      },
      {
        text: "Un médaillon talisman consacré en cuivre que je peux garder en permanence auprès de moi.",
        archetype: "abondance",
      },
      {
        text: "L'apprentissage autonome à travers un ouvrage numérique de transmission sacrée.",
        archetype: "clarite",
      },
    ],
  },
];

export const ARCHETYPES = {
  clarite: {
    id: "clarite",
    title: "Le Chercheur de Clarté & d'Orientation",
    badge: "Archétype de la Vision & du Discernement",
    summary:
      "Votre âme se trouve à un carrefour initiatique majeur. Vos blocages actuels ne résultent pas d'une fatalité ou d'une mauvaise intention extérieure, mais d'une hésitation intérieure face à votre mission de vie. La lumière du Fâ et la consultation oraculaire vous permettront de lever le voile du doute.",
    advice: [
      "Pratiquez le silence intérieur chaque matin avant d'allumer vos écrans.",
      "Consultez un maître du Fâ pour éclairer les nœuds karmiques de votre arbre généalogique.",
      "Évitez de prendre des décisions irréversibles sous l'emprise de la précipitation.",
    ],
    recommendedTitle: "Guidance Clarté & Orientation de Vie",
    recommendedDesc: "Consultation approfondie de 45 minutes avec Maître Dossou pour interroger le Fâ et aligner vos choix.",
    recommendedCta: "Réserver ma séance Clarté",
    recommendedHref: "/consultations/guidance-clarte-de-vie",
  },
  purification: {
    id: "purification",
    title: "L'Âme en Voie de Purification & Protection",
    badge: "Archétype du Bouclier & du Renouveau",
    summary:
      "Vous portez une accumulation d'énergies lourdes dues à des milieux disharmonieux ou à des jalousies silencieuses dans votre entourage. Votre priorité spirituelle absolue est un désencombrement aurique et une sanctification de votre lieu de vie.",
    advice: [
      "Accomplissez un bain de sel gemme et feuilles purificatrices sur trois soirs consécutifs.",
      "Fumigez votre habitation à l'Oliban pur en partant de la pièce du fond vers l'entrée.",
      "Conservez une discrétion absolue sur vos projets en cours pour ne pas disperser leur force.",
    ],
    recommendedTitle: "Coffret Rituel Complet de Déblocage",
    recommendedDesc: "Kit tout-en-un avec plantes de bain consacrées, encens d'Oliban, bougie de cire naturelle et livret rituel pas à pas.",
    recommendedCta: "Découvrir le Coffret Rituel",
    recommendedHref: "/boutique/kit-rituel-complet-deblocage-purification",
  },
  abondance: {
    id: "abondance",
    title: "Le Bâtisseur d'Abondance & de Victoire",
    badge: "Archétype de la Fécondité & de l'Ancrage",
    summary:
      "Votre potentiel est immense et vos intentions sont nobles, mais un déphasage entre votre énergie spirituelle et la réalité matérielle freine la concrétisation de vos récoltes. Vous avez besoin d'un ancrage aux énergies terrestres et royales d'Afrique.",
    advice: [
      "Saluez les quatre orients chaque matin en déclarant votre légitimité à prospérer.",
      "Portez un talisman métallique consacré aux glyphes de fécondité pour ancrer vos affaires.",
      "Purifiez vos mains avec quelques gouttes d'huile d'onction sacrée avant chaque négociation.",
    ],
    recommendedTitle: "Talisman Protecteur de Fâ en Cuivre Forgé",
    recommendedDesc: "Médaillon d'Allada gravé des sceaux d'abondance et consacré nominativement pour vous ouvrir les portes.",
    recommendedCta: "Acquérir le Talisman de Fâ",
    recommendedHref: "/boutique/talisman-protecteur-fa-cuivre-forge",
  },
};
