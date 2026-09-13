"use client";

import React, { useState, useMemo } from "react";
import { calculateNumericSummary } from "@/lib/analysis/features";
import { BarChart3, AlertCircle, TrendingUp, Info } from "lucide-react";

interface FeatureAnalysisProps {
  data: Record<string, unknown>[];
  numericFeatures: string[];
}

export function FeatureAnalysis({ data, numericFeatures }: FeatureAnalysisProps) {
  const [selectedFeature, setSelectedFeature] = useState<string>(
    numericFeatures[0] || ""
  );

  // Sync selected feature if features list changes
  React.useEffect(() => {
    if (numericFeatures.length > 0 && !numericFeatures.includes(selectedFeature)) {
      setSelectedFeature(numericFeatures[0]);
    }
  }, [numericFeatures, selectedFeature]);

  const summary = useMemo(() => {
    if (!selectedFeature || data.length === 0) return null;
    return calculateNumericSummary(data, selectedFeature, 8);
  }, [data, selectedFeature]);

  if (!numericFeatures || numericFeatures.length === 0) {
    return (
      <div className="py-12 text-center text-xs text-foreground-muted space-y-2">
        <AlertCircle className="w-5 h-5 mx-auto text-foreground-muted" />
        <p>No numeric behavioral telemetry features were returned by this simulation.</p>
      </div>
    );
  }

  const maxBinCount = summary
    ? Math.max(...summary.bins.map((b) => b.count), 1)
    : 1;

  return (
    <div className="space-y-6">
      {/* Header & Feature Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">
              Feature Distribution Analysis
            </h3>
          </div>
          <p className="text-xs text-foreground-muted">
            Empirical parametric and quantile distribution of continuous simulation telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="feature-dropdown" className="text-xs font-medium text-foreground-muted shrink-0">
            Select Feature:
          </label>
          <select
            id="feature-dropdown"
            value={selectedFeature}
            onChange={(e) => setSelectedFeature(e.target.value)}
            className="px-3 py-1.5 text-xs font-mono rounded border border-border bg-surface-elevated text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {numericFeatures.map((feat) => (
              <option key={feat} value={feat}>
                {feat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {summary && (
        <div className="space-y-6">
          {/* Key Statistical Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="p-3 rounded-lg border border-border bg-surface-elevated/30">
              <div className="text-[11px] text-foreground-muted font-mono uppercase">Mean (μ)</div>
              <div className="text-base font-bold font-mono text-foreground mt-0.5">
                {summary.mean.toLocaleString()}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-surface-elevated/30">
              <div className="text-[11px] text-foreground-muted font-mono uppercase">Median (Q2)</div>
              <div className="text-base font-bold font-mono text-foreground mt-0.5">
                {summary.median.toLocaleString()}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-surface-elevated/30">
              <div className="text-[11px] text-foreground-muted font-mono uppercase">Min Value</div>
              <div className="text-base font-bold font-mono text-foreground mt-0.5">
                {summary.min.toLocaleString()}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-surface-elevated/30">
              <div className="text-[11px] text-foreground-muted font-mono uppercase">Max Value</div>
              <div className="text-base font-bold font-mono text-foreground mt-0.5">
                {summary.max.toLocaleString()}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-surface-elevated/30 col-span-2 sm:col-span-1">
              <div className="text-[11px] text-foreground-muted font-mono uppercase">Std Dev (σ)</div>
              <div className="text-base font-bold font-mono text-foreground mt-0.5">
                {summary.stdDev.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Histogram Chart */}
          <div className="p-4 rounded-lg border border-border bg-surface-elevated/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-mono uppercase text-foreground-muted tracking-wider">
                Frequency Histogram ({summary.validCount} valid observations)
              </div>
              <span className="text-[11px] font-mono text-foreground-muted">
                {summary.bins.length} equal-width bins
              </span>
            </div>

            {/* Vertical Bar Histogram */}
            <div className="h-44 pt-4 flex items-end gap-2 border-b border-border/80 px-2">
              {summary.bins.map((bin, idx) => {
                const heightPercent = maxBinCount > 0 ? (bin.count / maxBinCount) * 100 : 0;

                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center h-full justify-end group relative"
                  >
                    {/* Tooltip on Hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 z-20 pointer-events-none bg-surface-elevated border border-border rounded px-2 py-1 text-[10px] font-mono whitespace-nowrap shadow-md text-foreground">
                      <span>
                        Count: {bin.count} ({bin.share}%)
                      </span>
                    </div>

                    {/* Bar */}
                    <div
                      className="w-full rounded-t bg-accent hover:bg-accent/80 transition-all duration-300"
                      style={{ height: `${Math.max(heightPercent, 2)}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between text-[10px] font-mono text-foreground-muted px-1">
              <span>{summary.min.toLocaleString()}</span>
              <span>Range: [{(summary.max - summary.min).toFixed(2)}]</span>
              <span>{summary.max.toLocaleString()}</span>
            </div>
          </div>

          {/* Detailed Bins Table */}
          <div className="border border-border rounded-lg overflow-x-auto bg-surface">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-surface-elevated/60 border-b border-border text-[11px] font-mono uppercase text-foreground-muted">
                <tr>
                  <th className="py-2 px-3 font-semibold">Bin Range</th>
                  <th className="py-2 px-3 font-semibold text-right">Frequency</th>
                  <th className="py-2 px-3 font-semibold text-right">Sample Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-mono">
                {summary.bins.map((bin, idx) => (
                  <tr key={idx} className="hover:bg-surface-elevated/30 transition-colors">
                    <td className="py-2 px-3 text-foreground">
                      [{bin.binStart.toFixed(2)} — {bin.binEnd.toFixed(2)})
                    </td>
                    <td className="py-2 px-3 text-right text-foreground">
                      {bin.count.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-right text-foreground-muted">
                      {bin.share.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
