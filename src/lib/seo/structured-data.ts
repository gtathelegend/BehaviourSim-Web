import { SITE_CONFIG } from "./config";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Returns Schema.org SoftwareApplication representation for BehaviourSim.
 */
export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_CONFIG.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform (Python >= 3.9)",
    description: SITE_CONFIG.defaultDescription,
    url: SITE_CONFIG.siteUrl,
    softwareVersion: SITE_CONFIG.version,
    license: SITE_CONFIG.license,
    codeRepository: SITE_CONFIG.repository,
    downloadUrl: SITE_CONFIG.pypi,
    author: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.author.url}/#person`,
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
      sameAs: SITE_CONFIG.author.sameAs,
    },
  };
}

/**
 * Returns Schema.org WebSite representation.
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
    description: SITE_CONFIG.defaultDescription,
    inLanguage: "en-US",
    publisher: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.author.url}/#person`,
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
    },
  };
}

/**
 * Returns Schema.org Person representation for the author entity.
 * Emitting this on the homepage anchors the "Vedaang Sharma" knowledge-graph
 * entity and enables cross-domain disambiguation via sameAs.
 */
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_CONFIG.author.url}/#person`,
    name: SITE_CONFIG.author.name,
    url: SITE_CONFIG.author.url,
    email: `mailto:${SITE_CONFIG.author.email}`,
    sameAs: SITE_CONFIG.author.sameAs,
    knowsAbout: [
      "Synthetic Data Generation",
      "Sequential Behavioral Modeling",
      "Markov Chain Simulation",
      "Python Scientific Computing",
      "Machine Learning Data Engineering",
    ],
    /** BehaviourSim is a project created by Vedaang Sharma, not an employer. */
    creator: {
      "@type": "SoftwareApplication",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.siteUrl,
      applicationCategory: "DeveloperApplication",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": SITE_CONFIG.siteUrl,
    },
  };
}

/**
 * Returns Schema.org BreadcrumbList representation.
 */
export function getBreadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const fullUrl = item.path.startsWith("http")
        ? item.path
        : `${SITE_CONFIG.siteUrl}${item.path.startsWith("/") ? item.path : `/${item.path}`}`;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    }),
  };
}

/**
 * Returns Schema.org TechArticle representation for documentation and deep technical pages.
 */
export function getTechArticleSchema({
  title,
  description,
  path,
  datePublished = "2025-01-01",
  dateModified = "2026-03-01",
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const fullUrl = `${SITE_CONFIG.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: fullUrl,
    inLanguage: "en-US",
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.author.url}/#person`,
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
    },
    publisher: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.author.url}/#person`,
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
  };
}

/**
 * Returns Schema.org FAQPage representation. Only to be used on pages with visible, corresponding FAQ content.
 */
export function getFaqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
