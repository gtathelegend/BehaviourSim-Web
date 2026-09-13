"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Container } from "@/components/layout/Container";
import { QuotaIndicator } from "@/components/playground/QuotaIndicator";
import { SimulationSettings } from "@/components/playground/SimulationSettings";
import { SimulationResults } from "@/components/playground/SimulationResults";
import { useAuth } from "@/lib/auth/AuthContext";
import { getPresets } from "@/lib/api/client";
import { useSimulationJob } from "@/lib/hooks/useSimulationJob";
import type { PresetResponse, SimulationRequest } from "@/lib/api/types";

// Standard canonical fallback presets matching the verified behaviorsim==1.0.1 engine
const FALLBACK_PRESETS: PresetResponse[] = [
  {
    name: "education",
    description: "Adaptive learning telemetry modeling cognitive load, accuracy, response times, and student mastery.",
    available: true,
    default_profile: "average",
    supported_profiles: ["average", "fast_accurate", "fast_inaccurate", "slow_accurate", "slow_inaccurate"],
    supported_states: ["Optimal", "Overload", "Underload"],
  },
  {
    name: "finance",
    description: "Synthetic behavioral telemetry for financial trading, risk alerts, drawdowns, and portfolio volatility.",
    available: true,
    default_profile: "balanced_investor",
    supported_profiles: ["conservative_investor", "balanced_investor", "growth_investor", "active_trader"],
    supported_states: ["Stable", "Active", "Volatile", "Drawdown", "Recovered", "Closed"],
  },
  {
    name: "healthcare",
    description: "Synthetic patient monitoring telemetry tracking vital trends, alerts, and mobility trajectories.",
    available: true,
    default_profile: "stable_patient",
    supported_profiles: ["stable_patient", "chronic_risk", "post_operative", "geriatric_frail"],
    supported_states: ["Baseline", "Elevated", "Critical", "Recovery", "Discharged"],
  },
  {
    name: "mobile_app",
    description: "User engagement simulation tracking session duration, navigation depth, actions, and checkout flows.",
    available: true,
    default_profile: "casual_browser",
    supported_profiles: ["power_user", "casual_browser", "deal_seeker", "infrequent_visitor"],
    supported_states: ["Browsing", "ActiveSession", "CheckoutFlow", "Idle", "Churned"],
  },
];

export default function PlaygroundPage() {
  const { isAuthenticated } = useAuth();
  const [presets, setPresets] = useState<PresetResponse[]>(FALLBACK_PRESETS);
  const [selectedPreset, setSelectedPreset] = useState<PresetResponse>(FALLBACK_PRESETS[0]);
  const [isLoadingPresets, setIsLoadingPresets] = useState(true);

  // Durable async simulation job lifecycle hook
  const {
    jobStatus,
    simulationId,
    detail,
    error,
    isBusy,
    submitJob,
    checkStatus,
    retry,
  } = useSimulationJob();

  // Fetch presets from authoritative API catalog
  useEffect(() => {
    let isMounted = true;
    async function loadPresets() {
      try {
        const data = await getPresets();
        if (isMounted && data && data.length > 0) {
          setPresets(data);
          setSelectedPreset(data[0]);
        }
      } catch {
        // Fallbacks remain in place on network error
      } finally {
        if (isMounted) setIsLoadingPresets(false);
      }
    }
    loadPresets();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRunSimulation = useCallback(
    (request: SimulationRequest) => {
      submitJob(request);
    },
    [submitJob]
  );

  return (
    <div className="py-8 sm:py-12">
      <Container size="default">
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="space-y-1.5 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-accent inline-block" />
              <span className="text-xs font-mono uppercase text-foreground-muted tracking-wider">
                Interactive Workbench
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              BehaviorSim Playground
            </h1>
            <p className="text-xs sm:text-sm text-foreground-muted max-w-3xl leading-relaxed">
              Configure domain parameters, submit asynchronous simulation jobs to durable background workers, and inspect synthetic behavioral telemetry in real time.
            </p>
          </div>

          {/* Quota / Authentication Banner */}
          <QuotaIndicator />

          {/* Workbench Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Simulation Settings (5 cols) */}
            <div className="lg:col-span-5">
              <SimulationSettings
                presets={presets}
                selectedPreset={selectedPreset}
                onSelectPreset={setSelectedPreset}
                onSubmit={handleRunSimulation}
                jobStatus={jobStatus}
                isBusy={isBusy}
                isAuthenticated={isAuthenticated}
                isLoadingPresets={isLoadingPresets}
              />
            </div>

            {/* Right: Results & Inspection (7 cols) */}
            <div className="lg:col-span-7">
              <SimulationResults
                simulation={detail}
                jobStatus={jobStatus}
                simulationId={simulationId}
                error={error}
                selectedPreset={selectedPreset}
                onRetry={retry}
                onCheckStatus={() => checkStatus()}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
