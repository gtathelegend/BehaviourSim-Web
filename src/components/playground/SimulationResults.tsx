"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DataPreviewTable } from "./DataPreviewTable";
import { ExportButtons } from "./ExportButtons";
import { ResultsOverview } from "./ResultsOverview";
import { StateDistribution } from "./StateDistribution";
import { TransitionAnalysis } from "./TransitionAnalysis";
import { FeatureAnalysis } from "./FeatureAnalysis";
import { LabelAnalysis } from "./LabelAnalysis";
import {
  calculateStateDistribution,
  calculateTransitionMatrix,
  detectSchema,
} from "@/lib/analysis";
import type { SimulationResponse, SimulationDetailResponse, PresetResponse } from "@/lib/api/types";
import type { JobStatus, JobError } from "@/lib/hooks/useSimulationJob";
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
  BarChart2,
  GitFork,
  Activity,
  Sliders,
  RotateCw,
} from "lucide-react";

interface SimulationResultsProps {
  simulation: SimulationDetailResponse | SimulationResponse | null;
  jobStatus: JobStatus;
  simulationId: string | null;
  error: JobError | null;
  selectedPreset: PresetResponse | null;
  onRetry: () => void;
  onCheckStatus?: () => void;
}

type TabKey = "overview" | "states" | "transitions" | "features" | "labels" | "table" | "json";

export function SimulationResults({
  simulation,
  jobStatus,
  simulationId,
  error,
  selectedPreset,
  onRetry,
  onCheckStatus,
}: SimulationResultsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [copiedId, setCopiedId] = useState(false);

  // Normalize simulation data for visualization components
  const completedSimulation: SimulationResponse | null = useMemo(() => {
    if (!simulation || !simulation.data || simulation.data.length === 0) {
      return null;
    }
    return {
      simulation_id: simulation.simulation_id,
      preset: simulation.preset,
      num_interactions: simulation.num_interactions,
      status: simulation.status || "completed",
      seed: simulation.seed ?? null,
      data: simulation.data,
      metadata: simulation.metadata || {
        behaviorsim_version: "1.0.1",
        api_version: "1.0.0",
        compute_ms: 0,
        reproducible: simulation.seed !== null,
      },
    };
  }, [simulation]);

  // Analysis pipelines computed via useMemo for high efficiency
  const schema = useMemo(() => {
    if (!completedSimulation?.data) return null;
    return detectSchema(completedSimulation.data);
  }, [completedSimulation?.data]);

  const stateDistribution = useMemo(() => {
    if (!completedSimulation?.data) return null;
    return calculateStateDistribution(
      completedSimulation.data,
      schema?.stateColumn || "state",
      selectedPreset?.supported_states || []
    );
  }, [completedSimulation?.data, schema?.stateColumn, selectedPreset?.supported_states]);

  const transitions = useMemo(() => {
    if (!completedSimulation?.data) return null;
    return calculateTransitionMatrix(
      completedSimulation.data,
      schema?.stateColumn || "state",
      schema?.sequenceColumn || "interaction_id",
      selectedPreset?.supported_states
    );
  }, [completedSimulation?.data, schema?.stateColumn, schema?.sequenceColumn, selectedPreset?.supported_states]);

  const activeId = simulation?.simulation_id || simulationId;

  const handleCopySimulationId = async () => {
    if (!activeId) return;
    try {
      await navigator.clipboard.writeText(activeId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch {
      // Ignore clipboard write failure
    }
  };

  const hasLabels = (schema?.binaryLabels.length ?? 0) > 0;
  const hasFeatures = (schema?.numericFeatures.length ?? 0) > 0;
  const hasStates = (stateDistribution?.states.length ?? 0) > 0;
  const hasTransitions = transitions !== null && transitions.totalTransitions > 0;

  const isQueued = jobStatus === "queued";
  const isRunning = jobStatus === "running";
  const isSubmitting = jobStatus === "submitting";
  const isProcessing = isSubmitting || isQueued || isRunning;
  const isTimedOut = jobStatus === "timed_out";
  const isFailed = jobStatus === "failed";
  const isCompleted = jobStatus === "completed" || completedSimulation !== null;

  return (
    <Card className="border-border bg-surface shadow-xs min-h-[520px] flex flex-col">
      <CardHeader className="pb-3 border-b border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent" />
            <CardTitle className="text-base font-semibold">Simulation Analysis &amp; Telemetry</CardTitle>
          </div>

          {completedSimulation && (
            <div className="flex items-center gap-2">
              <ExportButtons simulation={completedSimulation} />
            </div>
          )}
        </div>
        <CardDescription className="text-xs text-foreground-muted">
          Interactive behavioral telemetry exploration, Markov transition models, and synthetic sequence statistics.
        </CardDescription>

        {/* Tab Navigation Bar (Active only when completed results exist) */}
        {completedSimulation && (
          <div className="pt-3 overflow-x-auto">
            <div className="flex items-center gap-1 p-1 rounded-lg border border-border bg-surface-elevated/50 text-xs w-max">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition-colors ${
                  activeTab === "overview"
                    ? "bg-surface text-foreground font-semibold shadow-xs"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-accent" />
                <span>Overview</span>
              </button>

              {hasStates && (
                <button
                  type="button"
                  onClick={() => setActiveTab("states")}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition-colors ${
                    activeTab === "states"
                      ? "bg-surface text-foreground font-semibold shadow-xs"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-accent" />
                  <span>States</span>
                </button>
              )}

              {hasTransitions && (
                <button
                  type="button"
                  onClick={() => setActiveTab("transitions")}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition-colors ${
                    activeTab === "transitions"
                      ? "bg-surface text-foreground font-semibold shadow-xs"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  <GitFork className="w-3.5 h-3.5 text-accent" />
                  <span>Transitions</span>
                </button>
              )}

              {hasFeatures && (
                <button
                  type="button"
                  onClick={() => setActiveTab("features")}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition-colors ${
                    activeTab === "features"
                      ? "bg-surface text-foreground font-semibold shadow-xs"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5 text-accent" />
                  <span>Features</span>
                </button>
              )}

              {hasLabels && (
                <button
                  type="button"
                  onClick={() => setActiveTab("labels")}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition-colors ${
                    activeTab === "labels"
                      ? "bg-surface text-foreground font-semibold shadow-xs"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 text-accent" />
                  <span>Labels</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab("table")}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition-colors ${
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
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 font-medium transition-colors ${
                  activeTab === "json"
                    ? "bg-surface text-foreground font-semibold shadow-xs"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Raw JSON</span>
              </button>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-4 flex-1 flex flex-col">
        {/* 1. Submitting State */}
        {isSubmitting && (
          <div className="my-auto py-16 text-center space-y-4 max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border flex items-center justify-center mx-auto text-accent">
              <RefreshCw className="w-6 h-6 animate-spin text-accent" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">Submitting Simulation Request</h4>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Allocating interaction quota and creating durable simulation record...
              </p>
            </div>
          </div>
        )}

        {/* 2. Queued / Pending State */}
        {isQueued && (
          <div className="my-auto py-16 text-center space-y-4 max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border flex items-center justify-center mx-auto text-accent">
              <Clock className="w-6 h-6 animate-pulse text-accent" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-elevated border border-border text-[11px] font-mono text-foreground-muted mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>STATUS: QUEUED</span>
              </div>
              <h4 className="text-sm font-semibold text-foreground">Simulation queued</h4>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Job accepted by the API and queued for worker execution. Polling for worker claim...
              </p>
            </div>

            {activeId && (
              <div className="p-2.5 rounded bg-surface-elevated/40 border border-border text-[11px] font-mono text-foreground-muted flex items-center justify-between gap-2">
                <span className="truncate">Job ID: {activeId}</span>
                <button
                  type="button"
                  onClick={handleCopySimulationId}
                  className="p-1 rounded hover:text-foreground hover:bg-surface-elevated transition-colors shrink-0"
                  title="Copy Simulation ID"
                  aria-label="Copy Simulation ID"
                >
                  {copiedId ? <Check className="w-3 h-3 text-semantic-success" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. Running State */}
        {isRunning && (
          <div className="my-auto py-16 text-center space-y-4 max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border flex items-center justify-center mx-auto text-accent">
              <Sparkles className="w-6 h-6 animate-spin text-accent" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-elevated border border-border text-[11px] font-mono text-foreground-muted mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-spin" />
                <span>STATUS: RUNNING</span>
              </div>
              <h4 className="text-sm font-semibold text-foreground">Simulation running</h4>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Durable worker claimed the job. Executing Markov trajectory and synthesizing continuous telemetry...
              </p>
            </div>

            {activeId && (
              <div className="p-2.5 rounded bg-surface-elevated/40 border border-border text-[11px] font-mono text-foreground-muted flex items-center justify-between gap-2">
                <span className="truncate">Job ID: {activeId}</span>
                <button
                  type="button"
                  onClick={handleCopySimulationId}
                  className="p-1 rounded hover:text-foreground hover:bg-surface-elevated transition-colors shrink-0"
                  title="Copy Simulation ID"
                  aria-label="Copy Simulation ID"
                >
                  {copiedId ? <Check className="w-3 h-3 text-semantic-success" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. Client Timeout / Processing State */}
        {isTimedOut && (
          <div className="my-auto py-10 max-w-md mx-auto w-full space-y-4">
            <div className="p-4 rounded-lg border border-border bg-surface-elevated text-xs space-y-3">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                <div className="space-y-1 flex-1">
                  <h4 className="font-semibold text-sm text-foreground">Simulation Still Processing</h4>
                  <p className="text-foreground-muted leading-relaxed">
                    {error?.message ||
                      "Client polling timed out, but your simulation job is still safely processing on the server."}
                  </p>
                  {activeId && (
                    <div className="pt-1 font-mono text-[11px] text-foreground-muted flex items-center gap-1.5">
                      <span>Job ID: {activeId}</span>
                      <button
                        type="button"
                        onClick={handleCopySimulationId}
                        className="p-0.5 rounded hover:text-foreground transition-colors"
                        title="Copy Simulation ID"
                      >
                        {copiedId ? <Check className="w-3 h-3 text-semantic-success" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
                <Link
                  href="/account"
                  className="px-3 py-1.5 rounded bg-surface-elevated text-foreground hover:bg-surface-muted border border-border text-xs font-medium transition-colors"
                >
                  Check Account History
                </Link>
                {onCheckStatus && (
                  <button
                    type="button"
                    onClick={onCheckStatus}
                    className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Check Status</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 5. Safe Error State */}
        {isFailed && error && (
          <div className="my-auto py-10 max-w-md mx-auto w-full space-y-4">
            <div className="p-4 rounded-lg border border-semantic-error-border bg-semantic-error-bg text-semantic-error text-xs space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <h4 className="font-semibold text-sm">Simulation Execution Failed</h4>
                  <p className="text-foreground leading-relaxed">{error.message}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {error.statusCode && (
                      <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-surface-elevated text-foreground-muted border border-border">
                        HTTP {error.statusCode}
                      </span>
                    )}
                    {error.errorCode && (
                      <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-surface-elevated text-foreground-muted border border-border">
                        Code: {error.errorCode}
                      </span>
                    )}
                  </div>
                  {error.simulationId && (
                    <p className="font-mono text-[10px] text-foreground-muted mt-1">
                      Simulation ID: {error.simulationId}
                    </p>
                  )}
                  {error.requestId && (
                    <p className="font-mono text-[10px] text-foreground-muted mt-0.5">
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
                    className="px-3 py-1.5 rounded bg-surface-elevated hover:bg-surface-muted text-foreground border border-border text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Try Again (New Job)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 6. Empty State (Before Any Run) */}
        {!isProcessing && !isFailed && !isTimedOut && !completedSimulation && (
          <div className="my-auto py-12 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border flex items-center justify-center mx-auto text-foreground-muted">
              <Terminal className="w-6 h-6 text-foreground-muted/60" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-semibold text-foreground">Simulation Workbench Ready</h4>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Select a domain preset, configure interaction scale, and run a simulation to inspect state distributions, transition dynamics, and feature distributions.
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

        {/* 7. Populated Success State */}
        {!isProcessing && !isFailed && !isTimedOut && completedSimulation && schema && (
          <div className="space-y-4 flex-1 flex flex-col">
            {/* Quick Provenance Chip Bar */}
            <div className="p-2.5 rounded-lg border border-border bg-surface-elevated/30 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success" size="sm" className="gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{completedSimulation.num_interactions.toLocaleString()} interactions</span>
                </Badge>
                <Badge variant="default" size="sm" className="font-mono uppercase">
                  {completedSimulation.preset}
                </Badge>
                <Badge variant="neutral" size="sm" className="gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  <span>{completedSimulation.metadata.compute_ms}ms</span>
                </Badge>
                {completedSimulation.seed !== null && (
                  <Badge variant="outline" size="sm" className="font-mono text-accent">
                    Seed: {completedSimulation.seed} (Deterministic)
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[11px] text-foreground-muted">
                <span>Run: {completedSimulation.simulation_id.slice(0, 8)}...</span>
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

            {/* Tab Panels */}
            <div className="flex-1">
              {activeTab === "overview" && (
                <ResultsOverview
                  simulation={completedSimulation}
                  selectedPreset={selectedPreset}
                  schema={schema}
                  observedStatesCount={stateDistribution?.states.filter((s) => s.count > 0).length || 0}
                />
              )}

              {activeTab === "states" && stateDistribution && (
                <StateDistribution
                  distribution={stateDistribution}
                  configuredStates={selectedPreset?.supported_states}
                />
              )}

              {activeTab === "transitions" && (
                <TransitionAnalysis transitions={transitions} />
              )}

              {activeTab === "features" && (
                <FeatureAnalysis
                  data={completedSimulation.data}
                  numericFeatures={schema.numericFeatures}
                />
              )}

              {activeTab === "labels" && (
                <LabelAnalysis
                  data={completedSimulation.data}
                  binaryLabels={schema.binaryLabels}
                  categoricalFeatures={schema.categoricalFeatures}
                />
              )}

              {activeTab === "table" && (
                <DataPreviewTable
                  data={completedSimulation.data}
                  totalInteractions={completedSimulation.num_interactions}
                />
              )}

              {activeTab === "json" && (
                <CodeBlock
                  code={JSON.stringify(completedSimulation, null, 2)}
                  language="json"
                  filename="simulation_response.json"
                />
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
