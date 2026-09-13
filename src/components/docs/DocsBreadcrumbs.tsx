import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbItem } from "@/lib/docs/types";

export interface DocsBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function DocsBreadcrumbs({ items }: DocsBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-foreground-subtle mb-6">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            ) : (
              <span className={isLast ? "text-foreground font-medium" : ""}>
                {item.title}
              </span>
            )}
            {!isLast && <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
