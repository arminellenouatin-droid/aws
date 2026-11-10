import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://africaworldsaving.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/admin/",
          "/consultations/*/salle",
          "/checkout/",
          "/panier",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
