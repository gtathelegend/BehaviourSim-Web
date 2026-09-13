"use client";

import React, { useState } from "react";
import type { SimulationResponse } from "@/lib/api/types";
import { Download, FileSpreadsheet, FileCode, Check } from "lucide-react";

interface ExportButtonsProps {
  simulation: SimulationResponse;
}

export function ExportButtons({ simulation }: ExportButtonsProps) {
  const [downloadedCSV, setDownloadedCSV] = useState(false);
  const [downloadedJSON, setDownloadedJSON] = useState(false);

  const getBaseFilename = () => {
    const dateStr = new Date().toISOString().slice(0, 10);
    const safePreset = (simulation.preset || "simulation").replace(/[^a-zA-Z0-9_-]/g, "");
    return `behaviorsim-${safePreset}-${dateStr}`;
  };

  const handleDownloadCSV = () => {
    if (!simulation.data || simulation.data.length === 0) return;

    try {
      const headers = Object.keys(simulation.data[0]);
      const csvRows: string[] = [];

      // Header row
      csvRows.push(headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(","));

      // Data rows
      for (const row of simulation.data) {
        const values = headers.map((header) => {
          const val = row[header];
          if (val === null || val === undefined) return "";
          if (typeof val === "object") {
            return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
          }
          const str = String(val);
          return `"${str.replace(/"/g, '""')}"`;
        });
        csvRows.push(values.join(","));
      }

      const blob = new Blob([csvRows.join("\r\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${getBaseFilename()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadedCSV(true);
      setTimeout(() => setDownloadedCSV(false), 2000);
    } catch {
      // Graceful fallback
    }
  };

  const handleDownloadJSON = () => {
    try {
      const blob = new Blob([JSON.stringify(simulation, null, 2)], {
        type: "application/json;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${getBaseFilename()}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadedJSON(true);
      setTimeout(() => setDownloadedJSON(false), 2000);
    } catch {
      // Graceful fallback
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDownloadCSV}
        className="px-2.5 py-1.5 rounded border border-border bg-surface-elevated hover:bg-surface-muted text-foreground text-xs font-medium transition-colors inline-flex items-center gap-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        title="Download synthetic data as CSV"
      >
        {downloadedCSV ? (
          <>
            <Check className="w-3.5 h-3.5 text-semantic-success" />
            <span className="text-semantic-success">CSV Saved</span>
          </>
        ) : (
          <>
            <FileSpreadsheet className="w-3.5 h-3.5 text-foreground-muted" />
            <span>Download CSV</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleDownloadJSON}
        className="px-2.5 py-1.5 rounded border border-border bg-surface-elevated hover:bg-surface-muted text-foreground text-xs font-medium transition-colors inline-flex items-center gap-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        title="Download complete payload as JSON"
      >
        {downloadedJSON ? (
          <>
            <Check className="w-3.5 h-3.5 text-semantic-success" />
            <span className="text-semantic-success">JSON Saved</span>
          </>
        ) : (
          <>
            <FileCode className="w-3.5 h-3.5 text-foreground-muted" />
            <span>Download JSON</span>
          </>
        )}
      </button>
    </div>
  );
}
