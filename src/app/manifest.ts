import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.name} — Synthetic Sequential Behavioral Data Platform`,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0c10",
    theme_color: "#0a0c10",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
