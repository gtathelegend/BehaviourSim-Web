"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DataPreviewTable } from "./DataPreviewTable";
import { ExportButtons } from "./ExportButtons";
import type { SimulationResponse, PresetResponse } from "@/lib/api/types";
import {
  Sparkles,
  AlertCircle,
  Clock,
  CheckCircle2,
  Table,
  FileCode,
  Layers,
  Terminal,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";

interface SimulationResultsProps {
  simulation: SimulationResponse | null;
  isRunning: boolean;
  error: {
    message: string;
    statusCode?: number;
    requestId?: string | null;
    details?: Record<string, unknown>;
  } | null;
  selectedPreset: PresetResponse | null;
  onRetry: () => void;
}

export function SimulationResults({
  simulation,
  isRunning,
  error,
  selectedPreset,
  onRetry,
}: SimulationResultsProps) {
  const [activeTab, setActiveTab] = useState<"table" | "json">("table");
  const [copiedId, setCopiedId] = useState(false);

  const handleCopySimulationId = async () => {
    if (!simulation?.simulation_id) return;
    try {
      await navigator.clipboard.writeText(simulation.simulation_id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <Card className="border-border bg-surface shadow-xs min-h-[480px] flex flex-col">
      <CardHeader className="pb-3 border-b border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent" />
            <CardTitle className="text-base font-semibold">Synthetic Results</CardTitle>
          </div>

          {simulation && (
            <div className="flex items-center gap-2">
              {/* Tab Selector */}
              <div className="flex items-center rounded border border-border bg-surface-elevated p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("table")}
                  className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium transition-colors ${
                    activeTab === "table"
                      ? "bg-surface text-foreground font-semibold shadow-xs"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Data Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("json")}
                  className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium transition-colors ${
                    activeTab === "json"
                      ? "bg-surface text-foreground font-semibold shadow-xs"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Raw JSON</span>
                </button>
              </div>

              {/* Export Buttons */}
              <ExportButtons simulation={simulation} />
            </div>
          )}
        </div>
        <CardDescription className="text-xs text-foreground-muted">
          Inspect generated sequential telemetry, state trajectories, and reproducibility metadata.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4 flex-1 flex flex-col">
        {/* 1. Loading State */}
        {isRunning && (
          <div className="my-auto py-16 text-center space-y-4 max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border flex items-center justify-center mx-auto text-accent">
              <Sparkles className="w-6 h-6 animate-spin text-accent" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">
                Generating synthetic behavioral data…
              </h4>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Executing Markov transition dynamics, generating interaction sequences, and constructing telemetry records.
              </p>
            </div>
            <div className="p-3 rounded bg-surface-elevated/40 border border-border text-[11px] font-mono text-foreground-muted text-left space-y-1">
              <div className="flex items-center gap-1.5 text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                <span>Simulating state trajectory...</span>
              </div>
              <div className="text-foreground-muted/60 pl-3">Building feature distributions</div>
              <div className="text-foreground-muted/60 pl-3">Validating schema compliance</div>
            </div>
          </div>
        )}

        {/* 2. Error State */}
        {!isRunning && error && (
          <div className="my-auto py-10 max-w-md mx-auto w-full space-y-4">
            <div className="p-4 rounded-lg border border-semantic-error-border bg-semantic-error-bg text-semantic-error text-xs space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <h4 className="font-semibold text-sm">Simulation Execution Failed</h4>
                  <p className="text-foreground leading-relaxed">{error.message}</p>
                  {error.statusCode && (
                    <span className="inline-block font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-surface-elevated text-foreground-muted border border-border mt-1">
                      HTTP {error.statusCode}
                    </span>
                  )}
                  {error.requestId && (
                    <p className="font-mono text-[10px] text-foreground-muted mt-1">
                      Request ID: {error.requestId}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-semantic-error-border flex items-center justify-between gap-2">
                {error.statusCode === 401 ? (
                  <Link
                    href="/login"
                    className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    Sign In
                  </Link>
                ) : error.statusCode === 429 ? (
                  <Link
                    href="/account"
                    className="px-3 py-1.5 rounded bg-surface-elevated text-foreground hover:bg-surface-muted border border-border text-xs font-medium transition-colors"
                  >
                    View Account Quota
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={onRetry}
                    className="px-3 py-1.5 rounded bg-surface-elevated hover:bg-surface-muted text-foreground border border-border text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Try Again</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. Empty State (Before Run) */}
        {!isRunning && !error && !simulation && (
          <div className="my-auto py-12 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border flex items-center justify-center mx-auto text-foreground-muted">
              <Terminal className="w-6 h-6 text-foreground-muted/60" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-semibold text-foreground">Simulation Workbench Ready</h4>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Select a domain preset, configure interaction scale, and run the simulation to inspect generated telemetry records.
              </p>
            </div>

            {selectedPreset && (
              <div className="p-3.5 rounded-lg border border-border bg-surface-elevated/30 text-left space-y-2">
                <div className="text-[11px] font-mono uppercase text-foreground-muted tracking-wider">
                  Active Preset: {selectedPreset.name}
                </div>
                <div className="text-xs text-foreground-muted leading-relaxed">
                  {selectedPreset.description}
                </div>
                <div className="pt-1">
                  <span className="text-[11px] font-medium text-foreground mr-1.5">Modeled States:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedPreset.supported_states.map((st) => (
                      <Badge key={st} variant="neutral" size="sm" className="font-mono text-[10px]">
                        {st}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. Populated Success State */}
        {!isRunning && !error && simulation && (
          <div className="space-y-4 flex-1 flex flex-col">
            {/* Run Provenance Banner */}
            <div className="p-3 rounded-lg border border-border bg-surface-elevated/40 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success" size="sm" className="gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{simulation.num_interactions.toLocaleString()} interactions</span>
                </Badge>
                <Badge variant="default" size="sm" className="font-mono uppercase">
                  {simulation.preset}
                </Badge>
                <Badge variant="neutral" size="sm" className="gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  <span>{simulation.metadata.compute_ms}ms</span>
                </Badge>
                {simulation.seed !== null && (
                  <Badge variant="outline" size="sm" className="font-mono text-accent">
                    Seed: {simulation.seed} (Reproducible)
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-foreground-muted">
                <span>ID: {simulation.simulation_id.slice(0, 8)}...</span>
                <button
                  type="button"
                  onClick={handleCopySimulationId}
                  className="p-1 rounded hover:text-foreground hover:bg-surface-elevated transition-colors"
                  title="Copy full simulation ID"
                  aria-label="Copy simulation ID"
                >
                  {copiedId ? (
                    <Check className="w-3 h-3 text-semantic-success" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>

            {/* Content View */}
            {activeTab === "table" ? (
              <div className="flex-1">
                <DataPreviewTable
                  data={simulation.data}
                  totalInteractions={simulation.num_interactions}
                />
              </div>
            ) : (
              <div className="flex-1">
                <CodeBlock
                  code={JSON.stringify(simulation, null, 2)}
                  language="json"
                  filename="simulation_response.json"
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
