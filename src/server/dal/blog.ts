export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readingTimeMinutes: number;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "comprendre-le-fa-oracle-ancestral-afrique",
    title: "Comprendre le Fâ : l'oracle millénaire de la sagesse et du destin africain",
    excerpt:
      "Loin des clichés et superstitions, le Fâ est une géomancie sacrée et une science humaine globale répertoriée par l'UNESCO au patrimoine immatériel. Découvrez ses fondements.",
    category: "Sagesses Ancestrales",
    author: {
      name: "Maître Dossou",
      role: "Initié du Fâ (Bénin)",
    },
    publishedAt: "2026-03-01",
    readingTimeMinutes: 7,
    tags: ["Fâ", "Bénin", "Oracle", "Spiritualité"],
    content: `
## Introduction au Fâ : Une science de l'harmonie universelle

Dans le Golfe de Guinée et particulièrement au Bénin, au Togo et au Nigeria, le **Fâ** (ou Ifá en pays Yoruba) ne se résume pas à prédire un futur figé. Il s'agit d'un **système encyclopédique de connaissance de soi**, d'écologie humaine et de dialogue avec les lois cosmiques.

Reconnu par l'UNESCO en 2005 comme chef-d'œuvre du patrimoine oral et immatériel de l'humanité, le Fâ constitue un phare d'orientation pour l'individu et la collectivité.

### Les 16 Signes Mères (Dû) et les 256 Combinaisons

Le Fâ repose sur une arithmétique binaire fascinante :
1. **Les 16 signes majeurs** (Gbè-Mêji, Yêkou-Mêji, Woli-Mêji, Di-Mêji, etc.) incarnent les 16 principes cardinaux de la création.
2. Par croisement, ils engendrent **256 Odu (ou Dû)**, chacun associé à des centaines de récits initiatiques, d'enseignements philosophiques et de remèdes phytothérapiques.

Lors d'une consultation spirituelle, le guide (Bokonon ou Babalawo) interroge le chapelet divinatoire (*Agumaga*) ou les noix sacrées (*Ikin*). Le signe révélé met en lumière l'état énergétique du consultant et la source invisible de ses joies ou blocages.

### Pourquoi consulter le Fâ aujourd'hui ?

Dans un monde moderne fragmenté et stressant, le Fâ permet de :
- Identifier sa **vocation profonde** et aligner sa carrière.
- Connaître ses interdits personnels (*Tchité*) pour préserver son énergie vitale.
- Restaurer la paix intérieure et la concorde familiale.

> **Règle d'or éthique :** Le Fâ n'est jamais fataliste. Quel que soit le signe apparu, des orientations pratiques, des réajustements de comportement et des offrandes simples permettent de rééquilibrer la trajectoire.
    `,
  },
  {
    slug: "rituel-purification-eau-sel-energies",
    title: "Le rituel matinal de purification par l'eau et le sel : rétablir son aura",
    excerpt:
      "Pratique universelle et millénaire, le bain de purification par l'eau consacrée et le gros sel gemme permet de dissoudre les miasmes du quotidien et les tensions psychiques.",
    category: "Rituels & Protection",
    author: {
      name: "Prêtresse Akouavi Claire",
      role: "Gardienne des Eaux",
    },
    publishedAt: "2026-03-05",
    readingTimeMinutes: 5,
    tags: ["Purification", "Protection", "Rituels", "Énergie"],
    content: `
## L'Eau et le Sel : Deux éléments primordiaux

Toutes les traditions spirituelles africaines reconnaissent l'eau comme la matrice de la vie et le vecteur suprême de la mémoire cosmique. Le sel, quant à lui, est le cristal de la terre : il fixe, absorbe et neutralise les pollutions vibratoires.

Lorsque vous traversez une période de lourdeur, de pensées répétitives ou de fatigue inexpliquée après avoir fréquenté des environnements chargés, ce rituel simple vous aide à retrouver clarté et souveraineté.

### Les ingrédients nécessaires

- 1 seau ou bassine d'eau claire (idéalement eau de pluie, de source ou eau reposée au clair de lune).
- 3 poignées de gros sel de mer naturel non raffiné (ou sel gemme).
- Quelques gouttes de jus de citron vert ou quelques feuilles de basilic sacré (*Akoko* ou *Kessou-kessou*).

### Déroulement pas à pas

1. **La consécration de l'eau :** Déposez le sel dans l'eau. Placez vos deux mains au-dessus du récipient et formulez une prière claire : demandez à l'eau de dissoudre toute onde de discorde et de faire renaître votre éclat originel.
2. **Le temps de pause :** Laissez reposer 15 à 20 minutes afin que la solution saline s'homogénéise.
3. **L'application :** Après votre douche habituelle, versez lentement l'eau salée sur votre corps, des épaules jusqu'aux pieds (évitez le visage et le sommet du crâne pour ce rituel de décharge).
4. **Le séchage naturel :** Ne vous essuyez pas vigoureusement. Laissez votre peau sécher à l'air libre pour que la fine pellicule salée agisse comme un bouclier électrostatique.

Répétez ce rituel une fois par semaine ou au sortir d'une épreuve éprouvante.
    `,
  },
  {
    slug: "ethique-et-deontologie-spiritualite-africaine",
    title: "Spiritualité africaine et déontologie : reconnaître un vrai guide d'un imposteur",
    excerpt:
      "Comment discerner l'authentique initié du charlatan ? Les critères fondamentaux de transparence, de respect du libre arbitre et d'honnêteté financière à exiger.",
    category: "Éveil & Éthique",
    author: {
      name: "Maître Kofi Mensah",
      role: "Conseiller Spirituel",
    },
    publishedAt: "2026-03-08",
    readingTimeMinutes: 6,
    tags: ["Déontologie", "Intégrité", "Conseils", "Éveil"],
    content: `
## La quête spirituelle à l'épreuve des abus

La quête de sens, de protection et de paix est un élan naturel. Malheureusement, la détresse humaine attire parfois des individus sans scrupules qui usurpent les symboles et traditions sacrées d'Afrique pour extorquer de l'argent ou exercer une emprise psychologique.

Chez **Africa World Saving**, nous avons érigé une muraille déontologique pour assainir cette pratique et protéger chaque consultant.

### Les 5 signaux d'alerte incontournables (Drapeaux Rouges)

1. **La peur et la culpabilité :** Si un praticien vous annonce un danger de mort immédiat ou une malédiction imaginaire qui ne pourrait être levée que moyennant une somme astronomique, **fuyez immédiatement**.
2. **La promesse d'effets magiques instantanés :** « Devenez milliardaire en 48 heures » ou « retour affectif garanti sous 24h » sont des illusions pures. La vraie spiritualité cultive le travail, l'effort et le temps juste.
3. **L'opacité tarifaire :** Les honoraires doivent être clairs, fixés avant la séance et sans chantage ultérieur.
4. **L'isolement :** Un véritable guide vous reconnecte à vos proches et à votre autonomie ; il ne cherche jamais à vous couper de votre entourage.
5. **Le non-respect du secret :** Vos confidences, vos faiblesses et vos rituels sont sacrés. Tout chantage ou divulgation est un crime.

La véritable spiritualité africaine est une célébration de la vie, de la bienveillance et de la justice cosmique (*Mâat*).
    `,
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  return BLOG_POSTS;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}
