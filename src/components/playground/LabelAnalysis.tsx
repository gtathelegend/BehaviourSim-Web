"use client";

import React, { useMemo } from "react";
import { calculateCategoricalSummary } from "@/lib/analysis/features";
import { Sliders, AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface LabelAnalysisProps {
  data: Record<string, unknown>[];
  binaryLabels: string[];
  categoricalFeatures: string[];
}

export function LabelAnalysis({
  data,
  binaryLabels,
  categoricalFeatures,
}: LabelAnalysisProps) {
  const allDiscreteFields = useMemo(() => {
    return [...binaryLabels, ...categoricalFeatures];
  }, [binaryLabels, categoricalFeatures]);

  const summaries = useMemo(() => {
    return allDiscreteFields
      .map((field) => calculateCategoricalSummary(data, field))
      .filter((s): s is NonNullable<typeof s> => s !== null);
  }, [data, allDiscreteFields]);

  if (summaries.length === 0) {
    return (
      <div className="py-12 text-center text-xs text-foreground-muted space-y-2">
        <AlertCircle className="w-5 h-5 mx-auto text-foreground-muted" />
        <p>No discrete behavioral labels or categorical indicators were identified in this simulation.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">
            Binary Labels &amp; Discrete Indicators
          </h3>
        </div>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Observed frequency distributions of synthetic decision events, alerts, and interaction outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summaries.map((summary) => (
          <div
            key={summary.field}
            className="p-4 rounded-lg border border-border bg-surface-elevated/20 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-foreground">
                {summary.field}
              </span>
              <span className="text-[11px] font-mono text-foreground-muted">
                {summary.validCount} observations
              </span>
            </div>

            {/* Frequencies Bar */}
            <div className="space-y-2 pt-1">
              {summary.frequencies.map((freq) => (
                <div key={freq.category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-foreground-muted text-[11px] flex items-center gap-1.5">
                      {freq.category === "1" ? (
                        <CheckCircle className="w-3 h-3 text-semantic-success" />
                      ) : freq.category === "0" ? (
                        <XCircle className="w-3 h-3 text-foreground-muted" />
                      ) : null}
                      <span>Value: {freq.category}</span>
                    </span>
                    <span className="font-mono text-foreground text-[11px]">
                      {freq.count} ({freq.share.toFixed(1)}%)
                    </span>
                  </div>

                  <div className="w-full h-2 rounded bg-surface-elevated overflow-hidden border border-border/40">
                    <div
                      className={`h-full transition-all duration-300 ${
                        freq.category === "1"
                          ? "bg-semantic-success"
                          : freq.category === "0"
                          ? "bg-foreground-muted/50"
                          : "bg-accent"
                      }`}
                      style={{ width: `${Math.max(freq.share, 1)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-foreground-muted leading-relaxed">
        * Note: These binary indicators are generated conditional on behavioral state dynamics and emission distributions.
      </p>
    </div>
  );
}
