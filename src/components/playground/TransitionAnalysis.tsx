"use client";

import React, { useState } from "react";
import type { TransitionMatrixResult } from "@/lib/analysis/types";
import { ArrowRight, GitFork, AlertCircle, Eye } from "lucide-react";

interface TransitionAnalysisProps {
  transitions: TransitionMatrixResult | null;
}

export function TransitionAnalysis({ transitions }: TransitionAnalysisProps) {
  const [viewMode, setViewMode] = useState<"probability" | "count">("probability");

  if (!transitions || transitions.totalTransitions === 0) {
    return (
      <div className="py-12 text-center text-xs text-foreground-muted space-y-2">
        <AlertCircle className="w-5 h-5 mx-auto text-foreground-muted" />
        <p>
          Transition analysis is unavailable for this result because the returned data does not provide enough consecutive state transitions.
        </p>
      </div>
    );
  }

  const { states, matrix, probabilities, totalTransitions } = transitions;

  // Extract top 3 most probable non-zero transitions
  const pairs: { from: string; to: string; count: number; prob: number }[] = [];
  for (let r = 0; r < states.length; r++) {
    for (let c = 0; c < states.length; c++) {
      if (matrix[r][c] > 0) {
        pairs.push({
          from: states[r],
          to: states[c],
          count: matrix[r][c],
          prob: probabilities[r][c],
        });
      }
    }
  }
  pairs.sort((a, b) => b.count - a.count);
  const topPairs = pairs.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">
              Sequential State Transition Dynamics
            </h3>
          </div>
          <p className="text-xs text-foreground-muted leading-relaxed">
            First-order Markov transition matrix across {totalTransitions.toLocaleString()} consecutive step pairs.
          </p>
        </div>

        {/* Toggle Mode */}
        <div className="flex items-center rounded border border-border bg-surface-elevated p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setViewMode("probability")}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              viewMode === "probability"
                ? "bg-surface text-foreground font-semibold shadow-xs"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            Probability (%)
          </button>
          <button
            type="button"
            onClick={() => setViewMode("count")}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              viewMode === "count"
                ? "bg-surface text-foreground font-semibold shadow-xs"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            Counts (N)
          </button>
        </div>
      </div>

      {/* Top Transitions Quick Callout */}
      {topPairs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {topPairs.map((pair, idx) => (
            <div
              key={`${pair.from}-${pair.to}`}
              className="p-2.5 rounded border border-border bg-surface-elevated/30 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-foreground-muted font-bold text-[10px]">#{idx + 1}</span>
                <span className="text-foreground">{pair.from}</span>
                <ArrowRight className="w-3 h-3 text-accent shrink-0" />
                <span className="text-foreground">{pair.to}</span>
              </div>
              <span className="font-mono text-accent font-semibold">
                {(pair.prob * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Transition Matrix Grid */}
      <div className="border border-border rounded-lg overflow-x-auto bg-surface">
        <table className="w-full text-center text-xs border-collapse">
          <thead>
            <tr className="bg-surface-elevated/80 border-b border-border text-[11px] font-mono text-foreground-muted">
              <th className="py-2.5 px-3 text-left font-semibold border-r border-border/60">
                From State (S<sub>t</sub>) \ To (S<sub>t+1</sub>)
              </th>
              {states.map((toState) => (
                <th key={toState} className="py-2.5 px-3 font-semibold whitespace-nowrap">
                  {toState}
                </th>
              ))}
              <th className="py-2.5 px-3 font-semibold border-l border-border/60 text-right">
                Row Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 font-mono">
            {states.map((fromState, r) => {
              const rowSum = matrix[r].reduce((acc, c) => acc + c, 0);

              return (
                <tr key={fromState} className="hover:bg-surface-elevated/30 transition-colors">
                  <td className="py-2.5 px-3 text-left font-medium text-foreground border-r border-border/60 bg-surface-elevated/20 whitespace-nowrap">
                    {fromState}
                  </td>
                  {states.map((toState, c) => {
                    const prob = probabilities[r][c];
                    const count = matrix[r][c];
                    // Dynamic opacity shading based on probability
                    const bgOpacity = prob > 0 ? Math.max(0.12, prob * 0.5) : 0;

                    return (
                      <td
                        key={toState}
                        className="py-2.5 px-3 whitespace-nowrap transition-colors"
                        style={{
                          backgroundColor:
                            prob > 0 ? `rgba(96, 165, 250, ${bgOpacity})` : undefined,
                        }}
                        title={`From ${fromState} to ${toState}: ${count} transitions (${(prob * 100).toFixed(1)}%)`}
                      >
                        {viewMode === "probability" ? (
                          <span
                            className={
                              prob > 0 ? "text-foreground font-semibold" : "text-foreground-muted/40"
                            }
                          >
                            {(prob * 100).toFixed(1)}%
                          </span>
                        ) : (
                          <span
                            className={
                              count > 0 ? "text-foreground font-semibold" : "text-foreground-muted/40"
                            }
                          >
                            {count}
                          </span>
                        )}
                      </td>
                    );
                  })}
                  <td className="py-2.5 px-3 text-right text-foreground-muted border-l border-border/60 bg-surface-elevated/20">
                    {rowSum}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-foreground-muted leading-relaxed">
        * Probabilities are row-conditional: each row sums to 100% (or 0% if the state is absorbing / terminal with zero outbound transitions).
      </p>
    </div>
  );
}
