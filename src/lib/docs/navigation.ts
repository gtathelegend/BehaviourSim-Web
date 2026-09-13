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
    title: "Interfaces",
    items: [
      { title: "Python API", href: "/docs/interfaces/python" },
      { title: "Command-Line (CLI)", href: "/docs/interfaces/cli" },
    ],
  },
  {
    title: "Advanced (Roadmap)",
    items: [
      { title: "Transition Rules", href: "/docs/concepts/transitions#transition-rules", badge: "Core" },
      { title: "YAML Specifications", href: "/docs/interfaces/cli#yaml-config", badge: "CLI" },
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
  { title: "Python API", href: "/docs/interfaces/python" },
  { title: "Command-Line (CLI)", href: "/docs/interfaces/cli" },
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
