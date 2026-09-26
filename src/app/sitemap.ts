import type { MetadataRoute } from "next";
import { DOC_PAGES } from "@/lib/docs/data";
import { SITE_CONFIG } from "@/lib/seo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.siteUrl;

  // Core public marketing, methodology, concepts & API pages
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/concepts`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/use-cases`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/api`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // All 16 public documentation paths
  const docRoutes: MetadataRoute.Sitemap = DOC_PAGES.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date("2026-03-01"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...coreRoutes, ...docRoutes];
}
