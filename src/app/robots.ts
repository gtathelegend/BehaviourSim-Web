import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/login",
          "/account",
          "/playground",
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
    host: SITE_CONFIG.siteUrl,
  };
}
