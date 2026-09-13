import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://behavioursim.vedaangsharma.in";

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
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
