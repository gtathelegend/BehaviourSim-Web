import React from "react";

export interface DocHeading {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface DocPage {
  slug: string[]; // e.g. ["getting-started", "installation"]
  path: string; // e.g. "/docs/getting-started/installation"
  title: string;
  description: string;
  section: string;
  version?: string;
  headings: DocHeading[];
  content: React.ReactNode;
}

export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

export interface PaginationItem {
  title: string;
  href: string;
}
