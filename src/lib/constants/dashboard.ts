export interface ClientDashboardData {
  user: {
    name: string;
    email: string;
    role: string;
    points: number;
    referralCode: string;
  };
  upcomingConsultations: Array<{
    id: string;
    typeTitle: string;
    practitionerName: string;
    practitionerSlug: string;
    date: string;
    format: "chat" | "audio" | "video";
    status: string;
    roomUrl: string;
  }>;
  pastConsultations: Array<{
    id: string;
    typeTitle: string;
    practitionerName: string;
    date: string;
    hasNotes: boolean;
  }>;
  orders: Array<{
    id: string;
    orderNumber: string;
    totalAmount: number;
    currency: string;
    status: string;
    date: string;
    itemsSummary: string;
    isDigital: boolean;
    downloadToken?: string;
  }>;
  journalEntries: Array<{
    id: string;
    title: string;
    content: string;
    mood: string;
    createdAt: string;
  }>;
  gdprRequests: Array<{
    id: string;
    type: "export" | "deletion";
    status: string;
    createdAt: string;
    downloadUrl?: string;
  }>;
}

export interface PractitionerDashboardData {
  practitioner: {
    name: string;
    title: string;
    email: string;
    timezone: string;
  };
  stats: {
    totalSessions: number;
    averageRating: number;
    totalEarningsXof: number;
    totalEarningsEur: number;
  };
  availability: {
    timezone: string;
    activeDays: string[];
    timeSlots: string[];
    autoAccept: boolean;
  };
  upcomingSessions: Array<{
    id: string;
    clientName: string;
    typeTitle: string;
    date: string;
    format: "chat" | "audio" | "video";
    status: string;
    roomUrl: string;
  }>;
  completedSessions: Array<{
    id: string;
    clientName: string;
    typeTitle: string;
    date: string;
    hasNotes: boolean;
  }>;
  reviews: Array<{
    id: string;
    clientName: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export interface AdminDashboardData {
  kpis: {
    revenueXof: number;
    revenueEur: number;
    totalConsultations: number;
    totalOrders: number;
    activeUsers: number;
    satisfactionRate: number;
  };
  practitioners: Array<{
    id: string;
    name: string;
    title: string;
    email: string;
    isVerified: boolean;
    rating: number;
    sessionsCount: number;
  }>;
  reports: Array<{
    id: string;
    postId: string;
    reporterName: string;
    reason: string;
    status: string;
    date: string;
  }>;
  auditLogs: Array<{
    id: string;
    action: string;
    userEmail: string;
    date: string;
    details: string;
  }>;
  pendingGdpr: Array<{
    id: string;
    userEmail: string;
    type: string;
    status: string;
    date: string;
  }>;
}

export const MOCK_CLIENT_DASHBOARD: ClientDashboardData = {
  user: {
    name: "Koffi Mensah",
    email: "koffi.mensah@africaworldsaving.com",
    role: "client",
    points: 1500,
    referralCode: "AWS-LUMIERE-777",
  },
  upcomingConsultations: [
    {
      id: "cons-upcoming-1",
      typeTitle: "Clarté & Orientation de Vie",
      practitionerName: "Maître Dossou",
      practitionerSlug: "maitre-dossou-agboville",
      date: "Demain à 15:00 (GMT+1)",
      format: "video",
      status: "confirmed",
      roomUrl: "/consultations/cons-upcoming-1/room",
    },
  ],
  pastConsultations: [
    {
      id: "cons-past-1",
      typeTitle: "Consultation Découverte Spirituelle",
      practitionerName: "Maman Akouavi Claire",
      date: "Il y a 2 semaines",
      hasNotes: true,
    },
  ],
  orders: [
    {
      id: "order-1",
      orderNumber: "AWS-2026-48291",
      totalAmount: 27000,
      currency: "XOF",
      status: "paid",
      date: "08/11/2026",
      itemsSummary: "Encens Sacré d'Oliban & E-book Fâ",
      isDigital: true,
      downloadToken: "AWS-Guide-Fa-Numerique",
    },
  ],
  journalEntries: [
    {
      id: "journal-1",
      title: "Harmonie matinale après le rituel de purification",
      content: "La fumigation d'Oliban d'Éthiopie a profondément assaini l'espace. Le sentiment d'oppression s'est dissipé dès l'aube. Grande paix ressentie.",
      mood: "serene",
      createdAt: "2026-11-09T07:15:00Z",
    },
    {
      id: "journal-2",
      title: "Rêve révélateur et vision des ancêtres",
      content: "Un vieil homme vêtu de blanc m'a tendu sept graines sacrées près de la lagune. Le symbole semblait correspondre au signe Ogbe.",
      mood: "contemplative",
      createdAt: "2026-11-06T06:30:00Z",
    },
  ],
  gdprRequests: [],
};

export const MOCK_PRACTITIONER_DASHBOARD: PractitionerDashboardData = {
  practitioner: {
    name: "Maître Dossou",
    title: "Maître Babalawo & Prêtre du Fâ",
    email: "maitre.dossou@africaworldsaving.com",
    timezone: "Africa/Porto-Novo (GMT+1)",
  },
  stats: {
    totalSessions: 148,
    averageRating: 4.95,
    totalEarningsXof: 3850000,
    totalEarningsEur: 5870,
  },
  availability: {
    timezone: "Africa/Porto-Novo",
    activeDays: ["Lundi", "Mardi", "Jeudi", "Vendredi", "Samedi"],
    timeSlots: ["09:00 - 12:00", "14:00 - 18:00"],
    autoAccept: true,
  },
  upcomingSessions: [
    {
      id: "cons-upcoming-1",
      clientName: "Koffi Mensah",
      typeTitle: "Clarté & Orientation de Vie",
      date: "Demain à 15:00 (GMT+1)",
      format: "video",
      status: "confirmed",
      roomUrl: "/consultations/cons-upcoming-1/room",
    },
    {
      id: "cons-upcoming-2",
      clientName: "Fatoumata K.",
      typeTitle: "Harmonie Professionnelle & Projets",
      date: "Vendredi à 10:30 (GMT+1)",
      format: "audio",
      status: "confirmed",
      roomUrl: "/consultations/cons-upcoming-2/room",
    },
  ],
  completedSessions: [
    {
      id: "cons-past-1",
      clientName: "Amina Diallo",
      typeTitle: "Déblocage, Purification & Protection",
      date: "06/11/2026",
      hasNotes: true,
    },
  ],
  reviews: [
    {
      id: "rev-1",
      clientName: "Amina Diallo",
      rating: 5,
      comment: "Une justesse bouleversante. Les préconisations ont débloqué mon contentieux en moins de 5 jours. Gratitude infinie !",
      date: "06/11/2026",
    },
  ],
};

export const MOCK_ADMIN_DASHBOARD: AdminDashboardData = {
  kpis: {
    revenueXof: 14250000,
    revenueEur: 21720,
    totalConsultations: 432,
    totalOrders: 318,
    activeUsers: 1840,
    satisfactionRate: 98.4,
  },
  practitioners: [
    {
      id: "prac-1",
      name: "Maître Dossou",
      title: "Maître Babalawo (Danxomè)",
      email: "maitre.dossou@africaworldsaving.com",
      isVerified: true,
      rating: 4.95,
      sessionsCount: 148,
    },
    {
      id: "prac-2",
      name: "Maman Akouavi Claire",
      title: "Guérisseuse & Herboriste Traditionnelle",
      email: "akouavi.claire@africaworldsaving.com",
      isVerified: true,
      rating: 4.98,
      sessionsCount: 162,
    },
    {
      id: "prac-3",
      name: "Guide Kofi Mensah",
      title: "Médium & Spécialiste des Arcanes Akan",
      email: "kofi.mensah@africaworldsaving.com",
      isVerified: true,
      rating: 4.92,
      sessionsCount: 122,
    },
  ],
  reports: [
    {
      id: "rep-1",
      postId: "post-sample",
      reporterName: "Sékou Traoré",
      reason: "Sollicitation financière privée suspecte par message",
      status: "pending",
      date: "11/11/2026",
    },
  ],
  auditLogs: [
    {
      id: "audit-1",
      action: "PAYMENT_VERIFIED",
      userEmail: "koffi.mensah@africaworldsaving.com",
      date: "10/11/2026 19:48",
      details: "Paiement Chariow vérifié pour la commande AWS-2026-48291 (27 000 FCFA)",
    },
    {
      id: "audit-2",
      action: "AUTH_LOGIN",
      userEmail: "admin@africaworldsaving.com",
      date: "10/11/2026 17:35",
      details: "Connexion sécurisée réussie avec 2FA activée",
    },
  ],
  pendingGdpr: [
    {
      id: "gdpr-1",
      userEmail: "client.archive@africaworldsaving.com",
      type: "export",
      status: "pending",
      date: "10/11/2026",
    },
  ],
};
