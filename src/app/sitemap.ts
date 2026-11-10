import { MetadataRoute } from "next";
import { routing } from "@/lib/i18n/routing";
import { DEFAULT_CONSULTATION_TYPES, DEFAULT_PRACTITIONERS } from "@/server/dal/consultations";
import { BLOG_POSTS } from "@/server/dal/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://africaworldsaving.com";

  const staticPages = [
    "",
    "/about",
    "/consultations",
    "/practitioners",
    "/blog",
    "/faq",
    "/contact",
    "/terms",
    "/privacy",
    "/spiritual-disclaimer",
  ];

  const entries: MetadataRoute.Sitemap = [];

  // 1. Static pages across all locales with hreflang alternates
  for (const page of staticPages) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [loc, `${siteUrl}/${loc}${page}`])
          ),
        },
      });
    }
  }

  // 2. Consultation types
  for (const c of DEFAULT_CONSULTATION_TYPES) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}/consultations/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [loc, `${siteUrl}/${loc}/consultations/${c.slug}`])
          ),
        },
      });
    }
  }

  // 3. Practitioners
  for (const p of DEFAULT_PRACTITIONERS) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}/practitioners/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [loc, `${siteUrl}/${loc}/practitioners/${p.slug}`])
          ),
        },
      });
    }
  }

  // 4. Blog Posts
  for (const post of BLOG_POSTS) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [loc, `${siteUrl}/${loc}/blog/${post.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
