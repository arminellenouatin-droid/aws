import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AWS : Africa World Saving — Sanctuaire Spirituel",
    short_name: "AWS Sanctuaire",
    description:
      "Plateforme confidentielle et sécurisée d'accompagnement spirituel authentique, de rituels ancestraux et de boutique sacrée.",
    start_url: "/fr",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0052ff",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["lifestyle", "spirituality", "education"],
  };
}
