"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { PresetResponse, SimulationRequest } from "@/lib/api/types";
import { Sliders, Play, ChevronDown, ChevronRight, Dices, LogIn, Sparkles } from "lucide-react";

interface SimulationSettingsProps {
  presets: PresetResponse[];
  selectedPreset: PresetResponse | null;
  onSelectPreset: (preset: PresetResponse) => void;
  onSubmit: (request: SimulationRequest) => void;
  isRunning: boolean;
  isAuthenticated: boolean;
  isLoadingPresets: boolean;
}

const QUICK_COUNTS = [25, 50, 100, 250, 500];

export function SimulationSettings({
  presets,
  selectedPreset,
  onSelectPreset,
  onSubmit,
  isRunning,
  isAuthenticated,
  isLoadingPresets,
}: SimulationSettingsProps) {
  const [numInteractions, setNumInteractions] = useState<number>(50);
  const [seed, setSeed] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [initialState, setInitialState] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync profile & state when preset changes
  React.useEffect(() => {
    if (selectedPreset) {
      setProfile(selectedPreset.default_profile || "");
      setInitialState("");
    }
  }, [selectedPreset]);

  const handleRandomizeSeed = () => {
    const random = Math.floor(Math.random() * 1000000);
    setSeed(String(random));
  };

  const handleClearSeed = () => {
    setSeed("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <Card className="border-border bg-surface shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-accent" />
          <CardTitle className="text-base font-semibold">Simulation Settings</CardTitle>
        </div>
        <CardDescription className="text-xs text-foreground-muted">
          Configure domain dynamics, interaction scale, and deterministic seed for execution.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Preset Selector */}
          <div className="space-y-2">
            <label htmlFor="preset-select" className="block text-xs font-semibold text-foreground">
              Domain Preset
            </label>

            {isLoadingPresets ? (
              <div className="h-9 w-full rounded bg-surface-elevated animate-pulse" />
            ) : (
              <select
                id="preset-select"
                value={selectedPreset?.name || ""}
                onChange={(e) => {
                  const found = presets.find((p) => p.name === e.target.value);
                  if (found) onSelectPreset(found);
                }}
                disabled={isRunning}
                className="w-full px-3 py-2 text-xs font-medium rounded border border-border bg-surface-elevated text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {presets.map((preset) => (
                  <option key={preset.name} value={preset.name}>
                    {preset.name} — {preset.description.slice(0, 60)}...
                  </option>
                ))}
              </select>
            )}

            {selectedPreset && (
              <div className="p-3 rounded bg-surface-elevated/40 border border-border space-y-2">
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {selectedPreset.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <Badge variant="neutral" size="sm" className="font-mono text-[10px]">
                    Default Profile: {selectedPreset.default_profile}
                  </Badge>
                  <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                    {selectedPreset.supported_states?.length || 0} States
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {/* Interaction Count */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="interactions-input" className="block text-xs font-semibold text-foreground">
                Interaction Count
              </label>
              <span className="text-[11px] font-mono text-foreground-muted">
                1–1,000 interactions
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="interactions-input"
                type="number"
                min={1}
                max={1000}
                value={numInteractions}
                onChange={(e) => setNumInteractions(parseInt(e.target.value, 10) || 0)}
                disabled={isRunning}
                className="w-full px-3 py-2 text-xs font-mono rounded border border-border bg-surface-elevated text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
                  disabled={isRunning}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
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
                  disabled={isRunning}
                  className="text-[11px] text-accent hover:underline flex items-center gap-0.5"
                >
                  <Dices className="w-3 h-3" />
                  <span>Random</span>
                </button>
                {seed && (
                  <button
                    type="button"
                    onClick={handleClearSeed}
                    disabled={isRunning}
                    className="text-[11px] text-foreground-muted hover:text-foreground"
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
              disabled={isRunning}
              className="w-full px-3 py-2 text-xs font-mono rounded border border-border bg-surface-elevated text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:ring-2 focus:ring-ring"
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
                    disabled={isRunning}
                    className="w-full px-2.5 py-1.5 text-xs font-mono rounded border border-border bg-surface-elevated text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
                    disabled={isRunning}
                    className="w-full px-2.5 py-1.5 text-xs font-mono rounded border border-border bg-surface-elevated text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
                disabled={isRunning || !selectedPreset}
                className="w-full py-2.5 px-4 rounded bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 active:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {isRunning ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-accent" />
                    <span>Running Simulation...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Simulation</span>
                  </>
                )}
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
