export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  type: "physical" | "digital" | "ritual_kit" | "course";
  priceXof: number;
  priceEur: number;
  stock: number;
  images: string[];
  category: "encens" | "huiles" | "talismans" | "livres" | "rituels";
  isActive: boolean;
  isFeatured: boolean;
  features: string[];
  usageInstructions?: string;
  digitalDownload?: {
    fileName: string;
    fileSize: string;
    mimeType: string;
  };
}

export const SACRED_PRODUCTS: ProductItem[] = [
  {
    id: "prod-encens-oliban",
    slug: "encens-sacre-oliban-myrrhe-ethiopie",
    name: "Encens Sacré d'Oliban & Myrrhe d'Éthiopie",
    shortDescription: "Résine pure naturelle récoltée artisanalement, consacrée pour la purification des lieux et l'élévation vibratoire.",
    fullDescription: "Cet encens sacré associe les résines ancestrales d'Oliban (Boswellia carterii) et de Myrrhe sauvage des hauts plateaux de la Corne de l'Afrique. Utilisé depuis des millénaires dans les rites de protection et de sanctification, il dissout les énergies lourdes, apaise l'esprit et prépare l'espace à la méditation et à la prière.",
    type: "physical",
    priceXof: 12000,
    priceEur: 19,
    stock: 45,
    images: ["/images/products/encens-oliban.webp"],
    category: "encens",
    isActive: true,
    isFeatured: true,
    features: [
      "100% Résine naturelle récoltée à la main",
      "Consécration rituelle traditionnelle à l'aube",
      "Sachet hermétique de 150g avec charbon ardent inclus",
      "Idéal pour purifier maison, bureau ou autel",
    ],
    usageInstructions: "Déposez une pincée de résine sur un disque de charbon ardent dans un encensoir réfractaire. Laissez la fumée sacrée baigner les quatre coins de la pièce en formulant vos intentions positives.",
  },
  {
    id: "prod-huile-onction-abomey",
    slug: "huile-onction-sacree-7-plantes-abomey",
    name: "Huile d'Onction Consacrée aux 7 Plantes d'Abomey",
    shortDescription: "Macérât rituel d'herbes médicinales et racines sacrées du Danxomè, préparé pour fortifier le bouclier aurique.",
    fullDescription: "Préparée selon les traditions royales d'Abomey par nos guérisseurs dépositaires, cette huile d'onction assemble sept plantes médicinales et racines maîtresses. Elle sert à oindre les chakras, les mains et les talismans afin de repousser les influences néfastes et d'attirer les vibrations de sérénité et de triomphe.",
    type: "physical",
    priceXof: 22000,
    priceEur: 35,
    stock: 30,
    images: ["/images/products/huile-onction.webp"],
    category: "huiles",
    isActive: true,
    isFeatured: true,
    features: [
      "Flacon verre ambré de 50ml avec pipette compte-gouttes",
      "Macération lunaire de 21 jours selon le calendrier du Fâ",
      "Huile de jojoba et de sésame vierge pressée à froid",
      "Aucun additif ni parfum de synthèse",
    ],
    usageInstructions: "Appliquez 3 gouttes au creux des paumes, frottez et inhalez profondément, puis oignez délicatement le front (troisième œil) et la nuque avant vos temps de prière.",
  },
  {
    id: "prod-talisman-fa-cuivre",
    slug: "talisman-protecteur-fa-cuivre-forge",
    name: "Talisman Protecteur de Fâ en Cuivre Forgé",
    shortDescription: "Amulette sacrée forgée à la main, gravée des symboles cardinaux du Fâ pour préserver l'équilibre et attirer la grâce.",
    fullDescription: "Forgé dans un cuivre rouge pur par les maîtres artisans forgerons d'Allada, ce médaillon porte les sceaux protecteurs des Odu majeurs. Porté en pendentif ou conservé dans sa bourse en tissu kente, il agit comme un ancrage spirituel permanent, vous préservant des inimitiés visibles et invisibles.",
    type: "physical",
    priceXof: 35000,
    priceEur: 55,
    stock: 18,
    images: ["/images/products/talisman-cuivre.webp"],
    category: "talismans",
    isActive: true,
    isFeatured: true,
    features: [
      "Cuivre pur forgé artisanalement et consacré nominativement",
      "Cordon de coton tressé ajustable et cordon en cuir véritable",
      "Bourse de protection en tissu wax artisanal béninois",
      "Certificat d'authenticité et de consécration",
    ],
    usageInstructions: "Portez-le à même la peau ou conservez-le près de vous pendant votre sommeil. Purifiez-le une fois par mois à la fumée d'encens d'Oliban.",
  },
  {
    id: "prod-kit-purification-complete",
    slug: "kit-rituel-complet-deblocage-purification",
    name: "Coffret Rituel Complet de Déblocage & Renouveau",
    shortDescription: "Ensemble tout-en-un comprenant bain de plantes séchées, encens maître, bougie de cire naturelle et guide rituel pas à pas.",
    fullDescription: "Ce coffret rituel a été élaboré pour permettre à chacun d'accomplir chez soi un profond nettoyage énergétique. Il rassemble un mélange de plantes purificatrices pour bain spirituel, un encens purificateur, une bougie sacrée en cire d'abeille et un livret détaillé dictant les invocations et invocations de déblocage.",
    type: "ritual_kit",
    priceXof: 45000,
    priceEur: 70,
    stock: 25,
    images: ["/images/products/kit-purification.webp"],
    category: "rituels",
    isActive: true,
    isFeatured: true,
    features: [
      "Mélange d'herbes pour 3 bains de purification consécutifs",
      "Bougie artisanale en cire d'abeille pure avec mèches en coton",
      "Charbon actif et 50g d'encens protecteur",
      "Livret d'instructions rituelles de 16 pages en français & anglais",
    ],
    usageInstructions: "À accomplir idéalement sur trois soirs consécutifs lors de la lune décroissante ou en début de mois, en suivant scrupuleusement les étapes du livret inclus.",
  },
  {
    id: "prod-livre-fa-odu-pdf",
    slug: "guide-initiatique-16-odu-majeurs-fa-ebook",
    name: "Guide Initiatique des 16 Odu Majeurs du Fâ (E-book)",
    shortDescription: "Traité spirituel exhaustif décryptant la sagesse cosmique, les contes mythologiques et les archétypes de la géomancie africaine.",
    fullDescription: "Fruit de plusieurs décennies de transmission orale auprès des grands Babalawo et Bokonon du Golfe de Guinée, cet ouvrage numérique de 220 pages offre une immersion rigoureuse et accessible dans l'ontologie du Fâ. Découvrez les seize principes universels, les proverbes initiatiques et leur application concrète pour éclairer vos décisions modernes.",
    type: "digital",
    priceXof: 15000,
    priceEur: 24,
    stock: 9999,
    images: ["/images/products/livre-fa.webp"],
    category: "livres",
    isActive: true,
    isFeatured: true,
    features: [
      "Téléchargement immédiat au format PDF haute résolution",
      "Compatible tablettes, ordinateurs, smartphones et liseuses",
      "220 pages illustrées avec glyphes originaux et tables de correspondances",
      "Mises à jour annuelles gratuites incluses",
    ],
    usageInstructions: "Après validation de votre commande, accédez instantanément à votre lien de téléchargement crypté dans votre espace personnel ou par email.",
    digitalDownload: {
      fileName: "AWS-Guide-Initiatique-16-Odu-Fa.pdf",
      fileSize: "18.4 Mo",
      mimeType: "application/pdf",
    },
  },
  {
    id: "prod-audio-frequences-sacrees",
    slug: "meditations-audio-frequences-sacrees-ancetres",
    name: "Méditations Guidées aux Fréquences Ancestrales (Pack Audio)",
    shortDescription: "Album de 7 voyages sonores combinant tambours polyrythmiques, flûtes peules et ondes thêta pour l'ancrage et la paix.",
    fullDescription: "Conçu par des maîtres musiciens traditionnels et des praticiens sonores, ce pack d'écoute immersive vous plonge dans des états de conscience élargie. Chaque piste est accordée aux fréquences naturelles (432 Hz et 528 Hz) et rythmée par les battements du cœur sacré de la terre africaine.",
    type: "digital",
    priceXof: 18000,
    priceEur: 28,
    stock: 9999,
    images: ["/images/products/audio-meditation.webp"],
    category: "livres",
    isActive: true,
    isFeatured: false,
    features: [
      "7 pistes audio en formats FLAC Lossless et MP3 320kbps",
      "Durée totale d'écoute : 3 heures 45 minutes",
      "Guide d'accompagnement méditatif en PDF inclus",
      "Licence d'écoute personnelle illimitée sans expiration",
    ],
    usageInstructions: "À écouter au casque ou sur une enceinte haute fidélité dans un environnement calme, en posture assise ou allongée, lors de vos méditations quotidiennes.",
    digitalDownload: {
      fileName: "AWS-Frequences-Ancestrales-PackAudio.zip",
      fileSize: "340 Mo",
      mimeType: "application/zip",
    },
  },
];
