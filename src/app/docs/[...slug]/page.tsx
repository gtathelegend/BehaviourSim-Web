import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DOC_PAGES, getDocPageBySlug } from "@/lib/docs/data";
import { getBreadcrumbs, getDocPagination } from "@/lib/docs/navigation";
import { DocsBreadcrumbs } from "@/components/docs/DocsBreadcrumbs";
import { DocsTableOfContents } from "@/components/docs/DocsTableOfContents";
import { DocsPagination } from "@/components/docs/DocsPagination";
import { Badge } from "@/components/ui/Badge";

interface DocPageRouteProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Generate static params at build time for all documented pages
export async function generateStaticParams() {
  return DOC_PAGES.map((page) => ({
    slug: page.slug,
  }));
}

// Generate unique SEO metadata for each documentation page
export async function generateMetadata({
  params,
}: DocPageRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocPageBySlug(slug);

  if (!doc) {
    return {
      title: "Page Not Found | Documentation",
    };
  }

  return {
    title: `${doc.title} — BehaviorSim Documentation`,
    description: doc.description,
    alternates: {
      canonical: `https://behavioursim.vedaangsharma.in${doc.path}`,
    },
    openGraph: {
      title: `${doc.title} — BehaviorSim Documentation`,
      description: doc.description,
      url: `https://behavioursim.vedaangsharma.in${doc.path}`,
      siteName: "BehaviorSim",
      type: "article",
    },
  };
}

export default async function DocPageRenderer({ params }: DocPageRouteProps) {
  const { slug } = await params;
  const doc = getDocPageBySlug(slug);

  if (!doc) {
    notFound();
  }

  const breadcrumbs = getBreadcrumbs(doc.path, doc.title);
  const pagination = getDocPagination(doc.path);

  return (
    <div className="flex flex-col xl:flex-row gap-10 items-start">
      <div className="flex-1 min-w-0">
        <DocsBreadcrumbs items={breadcrumbs} />

        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2">
            <Badge variant="neutral" size="sm">
              {doc.section}
            </Badge>
            {doc.version && (
              <Badge variant="code" size="sm">
                v{doc.version}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            {doc.title}
          </h1>
          <p className="text-base text-foreground-muted leading-relaxed">
            {doc.description}
          </p>
        </div>

        {/* Document Body */}
        <div className="min-w-0">{doc.content}</div>

        {/* Previous / Next Pagination */}
        <DocsPagination prev={pagination.prev} next={pagination.next} />
      </div>

      {/* On This Page TOC */}
      <DocsTableOfContents headings={doc.headings} />
    </div>
  );
}
