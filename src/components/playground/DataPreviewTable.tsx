"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";

interface DataPreviewTableProps {
  data: Record<string, unknown>[];
  totalInteractions: number;
}

export function DataPreviewTable({ data, totalInteractions }: DataPreviewTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  if (!data || data.length === 0) {
    return (
      <div className="py-12 text-center text-xs text-foreground-muted">
        No interaction records available.
      </div>
    );
  }

  const columns = Object.keys(data[0]);
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  const displayedRows = data.slice(startIndex, endIndex);

  // Helper to safely format cell values
  const formatCellValue = (column: string, val: unknown) => {
    if (val === null || val === undefined) {
      return <span className="text-foreground-muted/40 font-mono">—</span>;
    }
    if (typeof val === "boolean") {
      return (
        <span className={`font-mono ${val ? "text-semantic-success" : "text-foreground-muted"}`}>
          {val ? "true" : "false"}
        </span>
      );
    }
    if (typeof val === "number") {
      if (Number.isInteger(val)) {
        return <span className="font-mono">{val.toLocaleString()}</span>;
      }
      return <span className="font-mono">{val.toFixed(3)}</span>;
    }
    if (column.toLowerCase().includes("state")) {
      return (
        <Badge variant="neutral" size="sm" className="font-mono font-medium">
          {String(val)}
        </Badge>
      );
    }
    return String(val);
  };

  return (
    <div className="space-y-3">
      {/* Table Subheader with Pagination info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-foreground-muted px-1">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-accent" />
          <span>
            Displaying interactions <strong className="text-foreground">{startIndex + 1}–{endIndex}</strong> of{" "}
            <strong className="text-foreground">{totalInteractions.toLocaleString()}</strong>
          </span>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-border bg-surface-elevated text-foreground hover:bg-surface-muted disabled:opacity-40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title="Previous page"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-border bg-surface-elevated text-foreground hover:bg-surface-muted disabled:opacity-40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title="Next page"
              aria-label="Next page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Bounded Scrollable Table */}
      <div className="border border-border rounded-lg overflow-x-auto bg-surface max-h-[500px]">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="sticky top-0 z-10 bg-surface-elevated border-b border-border text-[11px] font-mono uppercase text-foreground-muted shadow-xs">
            <tr>
              <th className="py-2.5 px-3 font-semibold text-center w-12 border-r border-border/50">#</th>
              {columns.map((col) => (
                <th key={col} className="py-2.5 px-3 font-semibold whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {displayedRows.map((row, rowIdx) => (
              <tr
                key={startIndex + rowIdx}
                className="hover:bg-surface-elevated/40 transition-colors"
              >
                <td className="py-2 px-3 text-center text-foreground-muted font-mono text-[11px] border-r border-border/50 bg-surface-elevated/20">
                  {startIndex + rowIdx + 1}
                </td>
                {columns.map((col) => (
                  <td key={col} className="py-2 px-3 whitespace-nowrap text-foreground">
                    {formatCellValue(col, row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
