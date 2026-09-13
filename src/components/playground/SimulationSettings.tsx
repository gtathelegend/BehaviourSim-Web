"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { PresetResponse, SimulationRequest } from "@/lib/api/types";
import type { JobStatus } from "@/lib/hooks/useSimulationJob";
import { Sliders, Play, ChevronDown, ChevronRight, Dices, LogIn, Sparkles, Clock, RefreshCw } from "lucide-react";

interface SimulationSettingsProps {
  presets: PresetResponse[];
  selectedPreset: PresetResponse | null;
  onSelectPreset: (preset: PresetResponse) => void;
  onSubmit: (request: SimulationRequest) => void;
  jobStatus?: JobStatus;
  isRunning?: boolean;
  isBusy?: boolean;
  isAuthenticated: boolean;
  isLoadingPresets: boolean;
}

const QUICK_COUNTS = [25, 50, 100, 250, 500];

export function SimulationSettings({
  presets,
  selectedPreset,
  onSelectPreset,
  onSubmit,
  jobStatus = "idle",
  isRunning = false,
  isBusy: isBusyProp,
  isAuthenticated,
  isLoadingPresets,
}: SimulationSettingsProps) {
  const [numInteractions, setNumInteractions] = useState<number>(50);
  const [seed, setSeed] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [initialState, setInitialState] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const isBusy = isBusyProp ?? (isRunning || jobStatus === "submitting" || jobStatus === "queued" || jobStatus === "running");

  // Sync profile & state when preset changes
  React.useEffect(() => {
    if (selectedPreset) {
      setProfile(selectedPreset.default_profile || "");
      setInitialState("");
    }
  }, [selectedPreset]);

  const handleRandomizeSeed = () => {
    if (isBusy) return;
    const random = Math.floor(Math.random() * 1000000);
    setSeed(String(random));
  };

  const handleClearSeed = () => {
    if (isBusy) return;
    setSeed("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Guard against double submission while already processing
    if (isBusy) return;

    if (!selectedPreset) {
      setValidationError("Please select a simulation preset.");
      return;
    }

    if (!numInteractions || numInteractions < 1 || numInteractions > 1000) {
      setValidationError("Interaction count must be between 1 and 1,000.");
      return;
    }

    let parsedSeed: number | null = null;
    if (seed.trim()) {
      const parsed = parseInt(seed.trim(), 10);
      if (isNaN(parsed) || parsed < 0 || parsed > 2147483647) {
        setValidationError("Seed must be a non-negative integer up to 2,147,483,647.");
        return;
      }
      parsedSeed = parsed;
    }

    setValidationError(null);

    const request: SimulationRequest = {
      preset: selectedPreset.name,
      num_interactions: numInteractions,
      seed: parsedSeed,
      profile: profile.trim() ? profile.trim() : null,
      initial_state: initialState.trim() ? initialState.trim() : null,
    };

    onSubmit(request);
  };

  const getButtonContent = () => {
    if (jobStatus === "submitting") {
      return (
        <>
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-accent" />
          <span>Submitting Job...</span>
        </>
      );
    }
    if (jobStatus === "queued") {
      return (
        <>
          <Clock className="w-3.5 h-3.5 animate-pulse text-accent" />
          <span>Simulation Queued...</span>
        </>
      );
    }
    if (jobStatus === "running" || isRunning) {
      return (
        <>
          <Sparkles className="w-4 h-4 animate-spin text-accent" />
          <span>Simulation Running...</span>
        </>
      );
    }
    return (
      <>
        <Play className="w-3.5 h-3.5 fill-current" />
        <span>Run Simulation</span>
      </>
    );
  };

  return (
    <Card className="border-border bg-surface shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-accent" />
            <CardTitle className="text-base font-semibold">Configuration</CardTitle>
          </div>
          {selectedPreset && (
            <Badge variant="default" size="sm" className="font-mono text-[10px] uppercase">
              {selectedPreset.name}
            </Badge>
          )}
        </div>
        <CardDescription className="text-xs text-foreground-muted">
          Select domain models, configure trajectory scale, and define optional cohort constraints.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Preset Selector */}
          <div className="space-y-1.5">
            <label htmlFor="preset-select" className="block text-xs font-semibold text-foreground">
              Domain Preset
            </label>
            <select
              id="preset-select"
              value={selectedPreset?.name || ""}
              onChange={(e) => {
                const p = presets.find((item) => item.name === e.target.value);
                if (p) onSelectPreset(p);
              }}
              disabled={isBusy || isLoadingPresets}
              className="w-full px-3 py-2 text-xs font-mono rounded border border-border bg-surface-elevated text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            >
              {presets.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name.toUpperCase()} — {p.description.slice(0, 45)}...
                </option>
              ))}
            </select>
            {selectedPreset && (
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                {selectedPreset.description}
              </p>
            )}
          </div>

          {/* Interactions Scale */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="interactions-input" className="block text-xs font-semibold text-foreground">
                Sequence Interactions
              </label>
              <span className="text-xs font-mono font-medium text-accent">
                {numInteractions.toLocaleString()} steps
              </span>
            </div>

            <div className="space-y-2">
              <input
                id="interactions-slider"
                type="range"
                min={10}
                max={1000}
                step={10}
                value={numInteractions}
                onChange={(e) => setNumInteractions(Number(e.target.value))}
                disabled={isBusy}
                className="w-full accent-accent cursor-pointer disabled:opacity-50"
              />
              <input
                id="interactions-input"
                type="number"
                min={1}
                max={1000}
                value={numInteractions}
                onChange={(e) => setNumInteractions(Number(e.target.value))}
                disabled={isBusy}
                className="w-full px-3 py-1.5 text-xs font-mono rounded border border-border bg-surface-elevated text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              />
            </div>

            {/* Quick Pick Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-foreground-muted mr-1">Quick:</span>
              {QUICK_COUNTS.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setNumInteractions(count)}
                  disabled={isBusy}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors disabled:opacity-50 ${
                    numInteractions === count
                      ? "bg-accent text-accent-foreground border-accent font-semibold"
                      : "bg-surface-elevated hover:bg-surface-muted text-foreground-muted border-border"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Seed Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="seed-input" className="block text-xs font-semibold text-foreground">
                Random Seed (Optional)
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleRandomizeSeed}
                  disabled={isBusy}
                  className="text-[11px] text-accent hover:underline flex items-center gap-0.5 disabled:opacity-50"
                >
                  <Dices className="w-3 h-3" />
                  <span>Random</span>
                </button>
                {seed && (
                  <button
                    type="button"
                    onClick={handleClearSeed}
                    disabled={isBusy}
                    className="text-[11px] text-foreground-muted hover:text-foreground disabled:opacity-50"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <input
              id="seed-input"
              type="number"
              placeholder="e.g. 42 (blank for stochastic unseeded)"
              min={0}
              max={2147483647}
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              disabled={isBusy}
              className="w-full px-3 py-2 text-xs font-mono rounded border border-border bg-surface-elevated text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            />
            <p className="text-[11px] text-foreground-muted leading-relaxed">
              Using the same configuration and seed produces reproducible results within this engine version.
            </p>
          </div>

          {/* Advanced Configuration (Collapsible Progressive Disclosure) */}
          <div className="border-t border-border pt-3">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs font-medium text-foreground-muted hover:text-foreground transition-colors py-1"
            >
              <span className="flex items-center gap-1.5">
                {showAdvanced ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                <span>Advanced Configuration</span>
              </span>
              <span className="text-[10px] uppercase font-mono text-foreground-muted">
                {showAdvanced ? "Hide" : "Expand"}
              </span>
            </button>

            {showAdvanced && selectedPreset && (
              <div className="mt-3 space-y-4 p-3 rounded bg-surface-elevated/20 border border-border">
                {/* Profile Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="profile-select" className="block text-[11px] font-medium text-foreground">
                    Cohort / Persona Profile
                  </label>
                  <select
                    id="profile-select"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    disabled={isBusy}
                    className="w-full px-2.5 py-1.5 text-xs font-mono rounded border border-border bg-surface-elevated text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                  >
                    {selectedPreset.supported_profiles.map((p) => (
                      <option key={p} value={p}>
                        {p} {p === selectedPreset.default_profile ? "(default)" : ""}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-foreground-muted">
                    Controls behavioral bias and decision distributions.
                  </p>
                </div>

                {/* Initial State Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="state-select" className="block text-[11px] font-medium text-foreground">
                    Initial State (Optional)
                  </label>
                  <select
                    id="state-select"
                    value={initialState}
                    onChange={(e) => setInitialState(e.target.value)}
                    disabled={isBusy}
                    className="w-full px-2.5 py-1.5 text-xs font-mono rounded border border-border bg-surface-elevated text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                  >
                    <option value="">Engine determined / Default</option>
                    {selectedPreset.supported_states.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-foreground-muted">
                    Forces sequence trajectory to start at a specific state.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Validation Error Banner */}
          {validationError && (
            <div className="p-3 rounded border border-semantic-error-border bg-semantic-error-bg text-semantic-error text-xs">
              {validationError}
            </div>
          )}

          {/* Execution CTA */}
          <div className="pt-2">
            {isAuthenticated ? (
              <button
                type="submit"
                disabled={isBusy || !selectedPreset}
                className="w-full py-2.5 px-4 rounded bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 active:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer disabled:cursor-not-allowed"
              >
                {getButtonContent()}
              </button>
            ) : (
              <Link
                href="/login"
                className="w-full py-2.5 px-4 rounded bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In to Run Simulation</span>
              </Link>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
