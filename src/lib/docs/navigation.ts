import { NavSection, BreadcrumbItem, PaginationItem } from "./types";

export const DOCS_NAVIGATION: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/getting-started" },
      { title: "Installation", href: "/docs/getting-started/installation" },
      { title: "Quickstart", href: "/docs/getting-started/quickstart" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Concepts Overview", href: "/docs/concepts" },
      { title: "Behavioral States", href: "/docs/concepts/states" },
      { title: "Transitions & Dynamics", href: "/docs/concepts/transitions" },
    ],
  },
  {
    title: "Generation Engine",
    items: [
      { title: "Engine Overview", href: "/docs/generation" },
      { title: "Domain Presets", href: "/docs/generation/presets", badge: "4 Presets" },
    ],
  },
  {
    title: "Python Library",
    items: [
      { title: "Python API Reference", href: "/docs/interfaces/python" },
      { title: "Command-Line (CLI)", href: "/docs/interfaces/cli" },
    ],
  },
  {
    title: "REST API",
    items: [
      { title: "Overview & Base URL", href: "/docs/interfaces/rest" },
      { title: "Authentication", href: "/docs/interfaces/rest/authentication" },
      { title: "API Keys", href: "/docs/interfaces/rest/api-keys" },
      { title: "Endpoints Reference", href: "/docs/interfaces/rest/endpoints", badge: "v1" },
      { title: "Errors & Status Codes", href: "/docs/interfaces/rest/errors" },
      { title: "Rate Limits & Quotas", href: "/docs/interfaces/rest/rate-limits" },
    ],
  },
  {
    title: "Interactive Tools",
    items: [
      { title: "Simulation Playground", href: "/playground", badge: "Interactive" },
      { title: "API Explorer", href: "/api", badge: "Live" },
    ],
  },
];

// Linear array of navigable docs for pagination
export const ORDERED_DOC_ROUTES: { title: string; href: string }[] = [
  { title: "Overview", href: "/docs" },
  { title: "Introduction", href: "/docs/getting-started" },
  { title: "Installation", href: "/docs/getting-started/installation" },
  { title: "Quickstart", href: "/docs/getting-started/quickstart" },
  { title: "Concepts Overview", href: "/docs/concepts" },
  { title: "Behavioral States", href: "/docs/concepts/states" },
  { title: "Transitions & Dynamics", href: "/docs/concepts/transitions" },
  { title: "Engine Overview", href: "/docs/generation" },
  { title: "Domain Presets", href: "/docs/generation/presets" },
  { title: "Python API Reference", href: "/docs/interfaces/python" },
  { title: "Command-Line (CLI)", href: "/docs/interfaces/cli" },
  { title: "REST API Overview", href: "/docs/interfaces/rest" },
  { title: "REST Authentication", href: "/docs/interfaces/rest/authentication" },
  { title: "API Keys", href: "/docs/interfaces/rest/api-keys" },
  { title: "Endpoints Reference", href: "/docs/interfaces/rest/endpoints" },
  { title: "Errors & Status Codes", href: "/docs/interfaces/rest/errors" },
  { title: "Rate Limits & Quotas", href: "/docs/interfaces/rest/rate-limits" },
];

export function getDocPagination(currentPath: string): {
  prev: PaginationItem | null;
  next: PaginationItem | null;
} {
  const currentIndex = ORDERED_DOC_ROUTES.findIndex((r) => r.href === currentPath);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? ORDERED_DOC_ROUTES[currentIndex - 1] : null;
  const next =
    currentIndex < ORDERED_DOC_ROUTES.length - 1
      ? ORDERED_DOC_ROUTES[currentIndex + 1]
      : null;

  return { prev, next };
}

export function getBreadcrumbs(currentPath: string, pageTitle: string): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ title: "Documentation", href: "/docs" }];

  for (const section of DOCS_NAVIGATION) {
    const matchedItem = section.items.find((item) => item.href === currentPath);
    if (matchedItem) {
      crumbs.push({ title: section.title });
      crumbs.push({ title: pageTitle });
      return crumbs;
    }
  }

  if (currentPath !== "/docs") {
    crumbs.push({ title: pageTitle });
  }

  return crumbs;
}
