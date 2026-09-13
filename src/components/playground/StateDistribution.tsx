"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import type { StateDistributionResult } from "@/lib/analysis/types";
import { Layers, AlertCircle } from "lucide-react";

interface StateDistributionProps {
  distribution: StateDistributionResult;
  configuredStates?: string[];
}

export function StateDistribution({
  distribution,
  configuredStates = [],
}: StateDistributionProps) {
  if (distribution.validTotal === 0) {
    return (
      <div className="py-12 text-center text-xs text-foreground-muted space-y-2">
        <AlertCircle className="w-5 h-5 mx-auto text-foreground-muted" />
        <p>No valid behavioral states were observed in this simulation run.</p>
      </div>
    );
  }

  const maxCount = Math.max(...distribution.states.map((s) => s.count), 1);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">
            Observed State Distribution
          </h3>
        </div>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Distribution of latent behavioral states across {distribution.validTotal.toLocaleString()}{" "}
          valid sequential interactions.
        </p>
      </div>

      {/* Visual Horizontal Distribution Bars */}
      <div className="space-y-3 p-4 rounded-lg border border-border bg-surface-elevated/20">
        <div className="text-[11px] font-mono uppercase text-foreground-muted tracking-wider mb-2">
          State Frequency Breakdown
        </div>

        <div className="space-y-2.5">
          {distribution.states.map(({ state, count, share }) => {
            const barWidthPercent = maxCount > 0 ? (count / maxCount) * 100 : 0;

            return (
              <div key={state} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-medium text-foreground">{state}</span>
                    {count === 0 && (
                      <Badge variant="outline" size="sm" className="text-[10px] opacity-70">
                        Unobserved
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-foreground-muted">
                    <strong className="text-foreground">{count.toLocaleString()}</strong>
                    <span className="w-12 text-right">({share.toFixed(1)}%)</span>
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-3 rounded bg-surface-elevated overflow-hidden border border-border/50">
                  <div
                    className={`h-full transition-all duration-500 ${
                      count > 0 ? "bg-accent" : "bg-transparent"
                    }`}
                    style={{ width: `${barWidthPercent}%` }}
                    role="progressbar"
                    aria-valuenow={share}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`State ${state}: ${share}%`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* State Statistics Table */}
      <div className="border border-border rounded-lg overflow-x-auto bg-surface">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-surface-elevated/60 border-b border-border text-[11px] font-mono uppercase text-foreground-muted">
            <tr>
              <th className="py-2 px-3 font-semibold">Behavioral State</th>
              <th className="py-2 px-3 font-semibold text-right">Observations</th>
              <th className="py-2 px-3 font-semibold text-right">Sample Share</th>
              <th className="py-2 px-3 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 font-sans">
            {distribution.states.map(({ state, count, share }) => (
              <tr key={state} className="hover:bg-surface-elevated/30 transition-colors">
                <td className="py-2.5 px-3 font-medium text-foreground">
                  <span className="font-mono text-xs">{state}</span>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-foreground">
                  {count.toLocaleString()}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-foreground">
                  {share.toFixed(1)}%
                </td>
                <td className="py-2.5 px-3 text-right">
                  {count > 0 ? (
                    <Badge variant="success" size="sm">
                      Observed
                    </Badge>
                  ) : (
                    <Badge variant="neutral" size="sm">
                      Zero Frequency
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-surface-elevated/30 border-t border-border font-mono text-[11px] text-foreground">
            <tr>
              <td className="py-2 px-3 font-bold">Total Valid Sample</td>
              <td className="py-2 px-3 text-right font-bold">
                {distribution.validTotal.toLocaleString()}
              </td>
              <td className="py-2 px-3 text-right font-bold">100.0%</td>
              <td className="py-2 px-3 text-right text-foreground-muted">
                {distribution.missingCount > 0
                  ? `${distribution.missingCount} excluded nulls`
                  : "Complete"}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {distribution.missingCount > 0 && (
        <p className="text-[11px] text-foreground-muted">
          * Note: {distribution.missingCount} row(s) with missing or invalid state values were excluded from share calculation.
        </p>
      )}
    </div>
  );
}
