"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import type { SimulationResponse, PresetResponse } from "@/lib/api/types";
import type { SchemaAnalysis } from "@/lib/analysis/types";
import {
  Activity,
  Layers,
  BarChart2,
  Clock,
  Dices,
  ShieldAlert,
  Sliders,
  CheckCircle2,
} from "lucide-react";

interface ResultsOverviewProps {
  simulation: SimulationResponse;
  selectedPreset: PresetResponse | null;
  schema: SchemaAnalysis;
  observedStatesCount: number;
}

export function ResultsOverview({
  simulation,
  selectedPreset,
  schema,
  observedStatesCount,
}: ResultsOverviewProps) {
  const configuredStatesCount = selectedPreset?.supported_states?.length || observedStatesCount;

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Interactions Count */}
        <div className="p-3 rounded-lg border border-border bg-surface-elevated/30 space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-mono uppercase text-foreground-muted">
            <Activity className="w-3.5 h-3.5 text-accent" />
            <span>Interactions</span>
          </div>
          <div className="text-xl font-bold font-mono text-foreground">
            {simulation.num_interactions.toLocaleString()}
          </div>
          <p className="text-[10px] text-foreground-muted">Sequential steps generated</p>
        </div>

        {/* Observed States */}
        <div className="p-3 rounded-lg border border-border bg-surface-elevated/30 space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-mono uppercase text-foreground-muted">
            <Layers className="w-3.5 h-3.5 text-accent" />
            <span>Observed States</span>
          </div>
          <div className="text-xl font-bold font-mono text-foreground">
            {observedStatesCount}{" "}
            <span className="text-xs text-foreground-muted font-normal">/ {configuredStatesCount}</span>
          </div>
          <p className="text-[10px] text-foreground-muted">Observed vs modeled states</p>
        </div>

        {/* Numeric Features */}
        <div className="p-3 rounded-lg border border-border bg-surface-elevated/30 space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-mono uppercase text-foreground-muted">
            <BarChart2 className="w-3.5 h-3.5 text-accent" />
            <span>Telemetry Features</span>
          </div>
          <div className="text-xl font-bold font-mono text-foreground">
            {schema.numericFeatures.length}
          </div>
          <p className="text-[10px] text-foreground-muted">Numeric continuous metrics</p>
        </div>

        {/* Binary Labels */}
        <div className="p-3 rounded-lg border border-border bg-surface-elevated/30 space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-mono uppercase text-foreground-muted">
            <Sliders className="w-3.5 h-3.5 text-accent" />
            <span>Labels / Indicators</span>
          </div>
          <div className="text-xl font-bold font-mono text-foreground">
            {schema.binaryLabels.length}
          </div>
          <p className="text-[10px] text-foreground-muted">Discrete conditional flags</p>
        </div>

        {/* Compute Time */}
        <div className="p-3 rounded-lg border border-border bg-surface-elevated/30 space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-1 text-[11px] font-mono uppercase text-foreground-muted">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>Compute Latency</span>
          </div>
          <div className="text-xl font-bold font-mono text-foreground">
            {simulation.metadata.compute_ms}ms
          </div>
          <p className="text-[10px] text-foreground-muted">Execution roundtrip</p>
        </div>
      </div>

      {/* Provenance & Configuration Details */}
      <div className="p-4 rounded-lg border border-border bg-surface-elevated/20 space-y-3">
        <div className="text-xs font-semibold text-foreground flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span>Execution Provenance</span>
          </span>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Badge variant="outline" size="sm">
              behaviorsim v{simulation.metadata.behaviorsim_version}
            </Badge>
            <Badge variant="neutral" size="sm">
              API v{simulation.metadata.api_version}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-2.5 rounded border border-border bg-surface-elevated/40">
            <div className="text-[11px] text-foreground-muted font-mono uppercase">Domain Preset</div>
            <div className="font-semibold text-foreground mt-0.5 capitalize">{simulation.preset}</div>
            <p className="text-[10px] text-foreground-muted mt-0.5 line-clamp-1">
              {selectedPreset?.description}
            </p>
          </div>

          <div className="p-2.5 rounded border border-border bg-surface-elevated/40">
            <div className="text-[11px] text-foreground-muted font-mono uppercase">Random Seed</div>
            <div className="font-mono font-medium text-foreground mt-0.5 flex items-center gap-1.5">
              <Dices className="w-3.5 h-3.5 text-accent" />
              <span>{simulation.seed !== null ? simulation.seed : "Unseeded (Stochastic)"}</span>
            </div>
            <p className="text-[10px] text-foreground-muted mt-0.5">
              {simulation.metadata.reproducible ? "Deterministic output" : "Non-deterministic run"}
            </p>
          </div>

          <div className="p-2.5 rounded border border-border bg-surface-elevated/40">
            <div className="text-[11px] text-foreground-muted font-mono uppercase">Simulation Identifier</div>
            <div className="font-mono text-foreground mt-0.5 text-xs truncate" title={simulation.simulation_id}>
              {simulation.simulation_id}
            </div>
            <p className="text-[10px] text-foreground-muted mt-0.5">Authoritative execution ID</p>
          </div>
        </div>
      </div>

      {/* Scientific Statistical Disclaimer */}
      <div className="p-3.5 rounded-lg border border-border-subtle bg-surface-elevated/20 text-xs text-foreground-muted flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <div className="space-y-0.5 leading-relaxed">
          <strong className="text-foreground font-medium block">Scientific Telemetry Disclaimer</strong>
          These statistics describe the generated synthetic sample from the configured generative process.
          They should not be interpreted as empirical estimates of real-world populations, clinical outcomes, or financial predictions.
        </div>
      </div>
    </div>
  );
}
