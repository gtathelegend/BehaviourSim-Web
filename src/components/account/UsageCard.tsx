"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { apiClient } from "@/lib/api/client";
import { BehaviorSimAPIError } from "@/lib/api/errors";
import type { UsageResponse } from "@/lib/api/types";
import { BarChart3, RefreshCw, AlertCircle, Zap, Activity } from "lucide-react";

export function UsageCard() {
  const [usageData, setUsageData] = useState<UsageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ message: string; requestId?: string | null } | null>(null);

  const fetchUsage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient<UsageResponse>("/v1/usage");
      setUsageData(data);
    } catch (err) {
      if (err instanceof BehaviorSimAPIError) {
        setError({
          message: err.message,
          requestId: err.requestId,
        });
      } else if (err instanceof Error) {
        setError({ message: err.message });
      } else {
        setError({ message: "An unexpected error occurred while loading usage." });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  // Safe percentage calculation
  const calculatePercent = (used: number, limit: number) => {
    if (!limit || limit <= 0) return 0;
    const pct = Math.round((used / limit) * 100);
    return Math.min(100, Math.max(0, pct));
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "—";
    try {
      return new Date(isoString).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <Card className="border-border bg-surface">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-accent" />
            <CardTitle className="text-base font-semibold">Usage & Quotas</CardTitle>
          </div>
          <button
            type="button"
            onClick={fetchUsage}
            disabled={isLoading}
            className="p-1.5 rounded border border-border text-foreground-muted hover:text-foreground hover:bg-surface-elevated transition-colors disabled:opacity-50 text-xs flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            title="Refresh usage"
            aria-label="Refresh usage metrics"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
        <CardDescription className="text-xs text-foreground-muted">
          Current billing period consumption and capacity limits enforced by the BehaviorSim API.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading && !usageData && (
          <div className="py-8 text-center text-xs text-foreground-muted flex items-center justify-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-accent" />
            <span>Loading usage...</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded border border-semantic-error-border bg-semantic-error-bg text-semantic-error text-xs space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Unable to load usage data</p>
                <p className="text-foreground-muted mt-0.5">{error.message}</p>
                {error.requestId && (
                  <p className="font-mono text-[10px] text-foreground-muted mt-1">
                    Request ID: {error.requestId}
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={fetchUsage}
              className="mt-2 px-3 py-1 bg-surface-elevated hover:bg-surface-muted text-foreground rounded border border-border text-xs font-medium transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {usageData && (
          <div className="space-y-6">
            {/* Period Indicator */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs py-2 px-3 rounded bg-surface-elevated/40 border border-border">
              <span className="text-foreground-muted">Current Period:</span>
              <span className="font-mono text-foreground font-medium">
                {formatDate(usageData.period?.start)} — {formatDate(usageData.period?.end)}
              </span>
            </div>

            {/* Quota Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Monthly Requests */}
              <div className="p-4 rounded border border-border bg-surface-elevated/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-accent" />
                    Monthly Requests
                  </span>
                  <span className="font-mono text-foreground-muted">
                    <strong className="text-foreground font-semibold">
                      {usageData.usage.requests.toLocaleString()}
                    </strong>{" "}
                    / {usageData.plan.monthly_requests.toLocaleString()}
                  </span>
                </div>
                
                {/* Progress Bar */}
                {(() => {
                  const pct = calculatePercent(usageData.usage.requests, usageData.plan.monthly_requests);
                  return (
                    <div className="space-y-1">
                      <div className="w-full h-2 rounded-full bg-surface-muted overflow-hidden border border-border">
                        <div
                          className={`h-full transition-all duration-300 ${
                            pct >= 90
                              ? "bg-semantic-error"
                              : pct >= 75
                              ? "bg-semantic-warning"
                              : "bg-accent"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-foreground-muted">
                        <span>{pct}% consumed</span>
                        <span>{usageData.remaining.requests.toLocaleString()} remaining</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Monthly Interactions */}
              <div className="p-4 rounded border border-border bg-surface-elevated/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-accent" />
                    Monthly Interactions
                  </span>
                  <span className="font-mono text-foreground-muted">
                    <strong className="text-foreground font-semibold">
                      {usageData.usage.interactions.toLocaleString()}
                    </strong>{" "}
                    / {usageData.plan.monthly_interactions.toLocaleString()}
                  </span>
                </div>

                {/* Progress Bar */}
                {(() => {
                  const pct = calculatePercent(
                    usageData.usage.interactions,
                    usageData.plan.monthly_interactions
                  );
                  return (
                    <div className="space-y-1">
                      <div className="w-full h-2 rounded-full bg-surface-muted overflow-hidden border border-border">
                        <div
                          className={`h-full transition-all duration-300 ${
                            pct >= 90
                              ? "bg-semantic-error"
                              : pct >= 75
                              ? "bg-semantic-warning"
                              : "bg-accent"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-foreground-muted">
                        <span>{pct}% consumed</span>
                        <span>{usageData.remaining.interactions.toLocaleString()} remaining</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Plan Limit Constraints */}
            <div className="pt-2 border-t border-border">
              <div className="text-[11px] font-mono uppercase text-foreground-muted tracking-wider mb-2.5">
                Plan Execution Limits
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded border border-border bg-surface-elevated/30">
                  <div className="text-foreground-muted text-[11px]">Rate Limit</div>
                  <div className="font-mono font-medium text-foreground mt-0.5">
                    {usageData.plan.requests_per_minute} req / min
                  </div>
                </div>
                <div className="p-2.5 rounded border border-border bg-surface-elevated/30">
                  <div className="text-foreground-muted text-[11px]">Max Concurrent</div>
                  <div className="font-mono font-medium text-foreground mt-0.5">
                    {usageData.plan.max_concurrent_simulations} simulation
                  </div>
                </div>
                <div className="p-2.5 rounded border border-border bg-surface-elevated/30 col-span-2 sm:col-span-1">
                  <div className="text-foreground-muted text-[11px]">Max Step Limit</div>
                  <div className="font-mono font-medium text-foreground mt-0.5">
                    {usageData.plan.max_interactions_per_request.toLocaleString()} interactions
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
