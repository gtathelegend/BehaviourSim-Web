import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PaginationItem } from "@/lib/docs/types";

export interface DocsPaginationProps {
  prev: PaginationItem | null;
  next: PaginationItem | null;
}

export function DocsPagination({ prev, next }: DocsPaginationProps) {
  if (!prev && !next) return null;

  return (
    <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
      {prev ? (
        <Link
          href={prev.href}
          className="w-full sm:w-auto p-3 rounded-md border border-border bg-surface hover:bg-surface-elevated transition-colors flex items-center gap-2 text-foreground-muted hover:text-foreground"
        >
          <ArrowLeft className="w-3.5 h-3.5 opacity-60 shrink-0" />
          <div className="text-left">
            <span className="block text-[10px] text-foreground-subtle uppercase tracking-wider">Previous</span>
            <span className="font-semibold text-foreground">{prev.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="w-full sm:w-auto p-3 rounded-md border border-border bg-surface hover:bg-surface-elevated transition-colors flex items-center justify-end gap-2 text-foreground-muted hover:text-foreground ml-auto"
        >
          <div className="text-right">
            <span className="block text-[10px] text-foreground-subtle uppercase tracking-wider">Next</span>
            <span className="font-semibold text-foreground">{next.title}</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
