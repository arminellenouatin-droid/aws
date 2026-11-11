export interface ForumCategoryItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  sortOrder: number;
  threadsCount: number;
  postsCount: number;
}

export interface ForumThreadItem {
  id: string;
  categorySlug: string;
  categoryName: string;
  title: string;
  slug: string;
  authorName: string;
  authorRole?: string;
  authorAvatar?: string;
  isPinned: boolean;
  isLocked: boolean;
  viewCount: number;
  repliesCount: number;
  lastReplyAt: string;
  createdAt: string;
  firstPostContent: string;
}

export interface ForumPostItem {
  id: string;
  threadId: string;
  authorName: string;
  authorRole?: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  reactions: {
    like: number;
    pray: number;
    gratitude: number;
    fire: number;
  };
}

export const FORUM_CATEGORIES: ForumCategoryItem[] = [
  {
    id: "cat-eveil",
    slug: "eveil-spiritualite",
    name: "Éveil & Sagesses Africaines",
    description: "Échanges sur les cosmogonies ancestrales, les préceptes du Fâ et l'élévation spirituelle au quotidien.",
    icon: "Sun",
    sortOrder: 1,
    threadsCount: 24,
    postsCount: 142,
  },
  {
    id: "cat-rituels",
    slug: "rituels-protection",
    name: "Rituels & Prières de Protection",
    description: "Partages bienveillants autour des pratiques de purification, des bains spirituels et des symboles protecteurs.",
    icon: "Shield",
    sortOrder: 2,
    threadsCount: 38,
    postsCount: 219,
  },
  {
    id: "cat-temoignages",
    slug: "temoignages-gratitude",
    name: "Témoignages & Gratitude",
    description: "Récits vérifiés de libérations énergétiques, d'ouvertures professionnelles et d'harmonie retrouvée.",
    icon: "Heart",
    sortOrder: 3,
    threadsCount: 45,
    postsCount: 310,
  },
  {
    id: "cat-entraide",
    slug: "entraide-communaute",
    name: "Entraide & Fraternité",
    description: "Espace d'écoute solidaire, soutien moral et conseils confraternels pour surmonter les épreuves de la vie.",
    icon: "Users",
    sortOrder: 4,
    threadsCount: 19,
    postsCount: 96,
  },
];

export const INITIAL_THREADS: ForumThreadItem[] = [
  {
    id: "thread-purification-oliban",
    categorySlug: "rituels-protection",
    categoryName: "Rituels & Prières de Protection",
    title: "Comment purifier son habitation avec l'encens d'Oliban et la prière aux quatre orients ?",
    slug: "purifier-habitation-encens-oliban-priere-quatre-orients",
    authorName: "Koffi Mensah",
    authorRole: "Initié du Cercle",
    authorAvatar: "/images/practitioners/dossou.webp",
    isPinned: true,
    isLocked: false,
    viewCount: 412,
    repliesCount: 14,
    lastReplyAt: "2026-11-10T18:30:00Z",
    createdAt: "2026-11-05T10:15:00Z",
    firstPostContent: `Paix et lumière à tous les membres du sanctuaire.

Je souhaitais partager avec vous un protocole de purification hebdomadaire que j'applique chaque vendredi soir. L'encens d'Oliban pur, combiné à quelques feuilles séchées d'hysope, permet de dégager instantanément les énergies stagnantes accumulées pendant la semaine.

Voici les 4 étapes recommandées :
1. Ouvrez largement toutes les fenêtres pour permettre aux basses vibrations de s'évacuer.
2. Allumez le charbon ardent dans un brûleur en terre cuite ou cuivre.
3. Commencez toujours par le fond de la demeure en vous dirigeant progressivement vers la porte d'entrée.
4. Récitez à chaque coin : « Que la paix, l'harmonie et la lumière divine habitent ce lieu. Tout obstacle est dissous. »

Quelles sont vos pratiques complémentaires pour préserver l'harmonie chez vous ?`,
  },
  {
    id: "thread-temoignage-clarte-dossou",
    categorySlug: "temoignages-gratitude",
    categoryName: "Témoignages & Gratitude",
    title: "Gratitude infinie : retour sur ma séance de Guidance Clarté avec Maître Dossou",
    slug: "temoignage-seance-guidance-clarte-maitre-dossou",
    authorName: "Amina Diallo",
    authorRole: "Membre Bienfaiteur",
    authorAvatar: "/images/practitioners/akouavi.webp",
    isPinned: true,
    isLocked: false,
    viewCount: 680,
    repliesCount: 22,
    lastReplyAt: "2026-11-10T16:45:00Z",
    createdAt: "2026-11-06T14:20:00Z",
    firstPostContent: `Chère famille spirituelle,

Je tenais à témoigner de la grande justesse de ma consultation passée la semaine dernière en direct vidéo avec Maître Dossou. 

Bloquée depuis plus d'un an dans un contentieux professionnel, ses révélations sur les nœuds karmiques familiaux ont fait résonner des vérités que je refusais d'admettre. Les rituels préconisés dans mon espace personnel (bain de feuilles douces et méditation matinale) ont débloqué la situation en moins de cinq jours.

Merci à toute l'équipe d'Africa World Saving pour ce sanctuaire numérique si précieux.`,
  },
  {
    id: "thread-comprendre-signes-fa",
    categorySlug: "eveil-spiritualite",
    categoryName: "Éveil & Sagesses Africaines",
    title: "Comprendre les 16 Odu cardinaux du Fâ sans superstition : retour aux principes universels",
    slug: "comprendre-16-odu-cardinaux-fa-principes-universels",
    authorName: "Bakonon Sêgbo",
    authorRole: "Guide Enseignant",
    authorAvatar: "/images/practitioners/kofi.webp",
    isPinned: false,
    isLocked: false,
    viewCount: 520,
    repliesCount: 18,
    lastReplyAt: "2026-11-09T20:10:00Z",
    createdAt: "2026-11-07T09:00:00Z",
    firstPostContent: `Le Fâ n'est pas une magie arbitraire ; c'est une science géomantique et cosmologique qui cartographie les lois énergétiques de l'univers.

Chaque Odu (comme Ogbe, Oyeku, Iwori...) représente un état vibratoire précis de la matière et de l'esprit. Lorsque nous comprenons les Odu comme des archétypes psychologiques et spirituels, nous apprenons à anticiper les courants plutôt qu'à les subir.

N'hésitez pas à poser vos questions sur l'interprétation des signes.`,
  },
  {
    id: "thread-prieres-du-matin-ancrage",
    categorySlug: "entraide-communaute",
    categoryName: "Entraide & Fraternité",
    title: "Cercle de soutien moral pour ceux qui traversent une traversée du désert",
    slug: "cercle-soutien-moral-traversee-du-desert",
    authorName: "Sékou Traoré",
    authorRole: "Membre",
    authorAvatar: "",
    isPinned: false,
    isLocked: false,
    viewCount: 290,
    repliesCount: 9,
    lastReplyAt: "2026-11-10T12:00:00Z",
    createdAt: "2026-11-08T11:30:00Z",
    firstPostContent: `Bonjour chers frères et sœurs,

Si certains d'entre vous se sentent seuls, fatigués ou dans le doute quant à leur avenir professionnel ou affectif, sachez que cet espace existe pour vous écouter sans aucun jugement.

Déposez ici votre intention ou votre prière du jour. La force de l'égrégore communautaire est immense.`,
  },
];

export const INITIAL_POSTS: Record<string, ForumPostItem[]> = {
  "purifier-habitation-encens-oliban-priere-quatre-orients": [
    {
      id: "post-1",
      threadId: "thread-purification-oliban",
      authorName: "Maman Akouavi Claire",
      authorRole: "Guérisseuse Traditionnelle",
      authorAvatar: "/images/practitioners/akouavi.webp",
      content: "Merci pour ce partage lumineux cher frère. J'ajoute qu'il est précieux de verser une goutte d'huile sacrée aux 7 plantes sur le seuil de la porte principale une fois la fumigation terminée pour sceller la protection.",
      createdAt: "2026-11-05T12:40:00Z",
      reactions: { like: 12, pray: 18, gratitude: 15, fire: 7 },
    },
    {
      id: "post-2",
      threadId: "thread-purification-oliban",
      authorName: "Jean-Eudes B.",
      authorRole: "Membre",
      content: "Merci beaucoup ! Je viens de commander le kit rituel sur la boutique et j'appliquerai ce protocole dès sa réception.",
      createdAt: "2026-11-07T16:15:00Z",
      reactions: { like: 4, pray: 2, gratitude: 6, fire: 1 },
    },
  ],
  "temoignage-seance-guidance-clarte-maitre-dossou": [
    {
      id: "post-3",
      threadId: "thread-temoignage-clarte-dossou",
      authorName: "Maître Dossou",
      authorRole: "Maître Babalawo & Bokonon",
      authorAvatar: "/images/practitioners/dossou.webp",
      content: "Que la clarté et la sagesse continuent d'illuminer votre route chère Amina. Le Fâ a simplement révélé ce qui attendait votre consentement pour fleurir. Restez ancrée dans la droiture.",
      createdAt: "2026-11-06T18:10:00Z",
      reactions: { like: 24, pray: 30, gratitude: 28, fire: 14 },
    },
  ],
  "comprendre-16-odu-cardinaux-fa-principes-universels": [
    {
      id: "post-4",
      threadId: "thread-comprendre-signes-fa",
      authorName: "Yao Kodjo",
      authorRole: "Membre",
      content: "Magnifique mise au point. Trop de personnes confondent géomancie et obscurantisme. Le livre initiatique en e-book de la boutique est-il recommandé pour débuter ?",
      createdAt: "2026-11-08T09:40:00Z",
      reactions: { like: 8, pray: 3, gratitude: 5, fire: 2 },
    },
  ],
  "cercle-soutien-moral-traversee-du-desert": [
    {
      id: "post-5",
      threadId: "thread-prieres-du-matin-ancrage",
      authorName: "Adélaïde V.",
      authorRole: "Membre",
      content: "Union de prières avec toi Sékou et avec tous ceux qui traversent l'obscurité. Aucune nuit ne dure éternellement, l'aube se prépare toujours en silence.",
      createdAt: "2026-11-09T14:00:00Z",
      reactions: { like: 15, pray: 22, gratitude: 11, fire: 9 },
    },
  ],
};
