import React from "react";
import { DocHeading } from "@/lib/docs/types";

export interface DocsTableOfContentsProps {
  headings: DocHeading[];
}

export function DocsTableOfContents({ headings }: DocsTableOfContentsProps) {
  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block w-56 shrink-0 pl-6 py-6 sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto border-l border-border text-xs">
      <div className="space-y-3">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle">
          On This Page
        </h4>
        <ul className="space-y-2 text-foreground-muted">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "pl-3 text-[11px]" : ""}>
              <a
                href={`#${h.id}`}
                className="hover:text-foreground transition-colors line-clamp-1"
              >
                {h.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
