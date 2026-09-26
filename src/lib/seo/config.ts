import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "BehaviourSim",
  legalName: "BehaviourSim Simulation Platform",
  siteUrl: "https://behavioursim.vedaangsharma.in",
  apiBaseUrl: "https://api.behavioursim.vedaangsharma.in",
  repository: "https://github.com/gtathelegend/BehaviourSim",
  webRepository: "https://github.com/gtathelegend/BehaviourSim-Web",
  pypi: "https://pypi.org/project/behaviorsim/",
  license: "https://opensource.org/licenses/MIT",
  version: "1.0.1",
  author: {
    name: "Vedaang Sharma",
    url: "https://vedaangsharma.in",
    github: "https://github.com/gtathelegend",
    email: "info@vedaangsharma.in",
    /** Canonical sameAs URLs used in Person JSON-LD for entity disambiguation.
     *  Only verified public identity URLs. No project URLs, no email addresses. */
    sameAs: [
      "https://vedaangsharma.in",
      "https://github.com/gtathelegend",
      "https://pypi.org/user/vedaangsharma2006/",
      "https://www.linkedin.com/in/vedaangsharma2006/",
    ],
  },
  defaultTitle: "BehaviourSim — Synthetic Sequential Behavioral Data Platform",
  titleTemplate: "%s | BehaviourSim",
  defaultDescription:
    "An open-source scientific Python framework and cloud API for generating, calibrating, feature-engineering, validating, and analyzing reproducible synthetic sequential behavioral data.",
  locale: "en_US",
  defaultKeywords: [
    "synthetic behavioral data",
    "sequential behavioral data",
    "behavioral simulation",
    "discrete behavioral states",
    "observable features",
    "state transitions",
    "probabilistic feature emissions",
    "reproducible simulation",
    "synthetic telemetry",
    "Markov behavioral modeling",
    "Python behavioral simulator",
    "domain presets",
    "behaviorsim",
  ],
} as const;

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Creates standardized, canonical page metadata adhering to SEO best practices.
 */
export function createPageMetadata({
  title,
  description,
  path,
  ogType = "website",
  keywords,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_CONFIG.siteUrl}${cleanPath === "/" ? "" : cleanPath}`;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords || [...SITE_CONFIG.defaultKeywords],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: ogType,
      images: [
        {
          url: `${SITE_CONFIG.siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} — Synthetic Sequential Behavioral Data Platform`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_CONFIG.siteUrl}/opengraph-image`],
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  } else {
    metadata.robots = {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    };
  }

  return metadata;
}
