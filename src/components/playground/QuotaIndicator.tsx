"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { getUsage } from "@/lib/api/client";
import type { UsageResponse } from "@/lib/api/types";
import { Activity, Zap, LogIn, RefreshCw } from "lucide-react";

export function QuotaIndicator() {
  const { isAuthenticated } = useAuth();
  const [usage, setUsage] = useState<UsageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuota = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const data = await getUsage();
      setUsage(data);
    } catch {
      // Non-fatal, unauthenticated or network error handled gracefully
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchQuota();
  }, [fetchQuota]);

  if (!isAuthenticated) {
    return (
      <div className="p-3.5 rounded-lg border border-border bg-surface-elevated/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <p className="font-medium text-foreground">Sign in to execute simulations</p>
          <p className="text-foreground-muted text-[11px]">
            Explore presets and configure parameters. An authenticated account is required to generate synthetic telemetry.
          </p>
        </div>
        <Link
          href="/login"
          className="px-3.5 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto shadow-sm"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Sign In</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-3 rounded-lg border border-border bg-surface-elevated/30 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-mono text-[11px] text-foreground-muted uppercase tracking-wider">
          Monthly Quota
        </span>

        {usage ? (
          <>
            <div className="flex items-center gap-1.5" title="Monthly requests used / total quota">
              <Activity className="w-3.5 h-3.5 text-accent" />
              <span className="text-foreground-muted">Requests:</span>
              <strong className="text-foreground font-mono">
                {usage.usage.requests} / {usage.plan.monthly_requests}
              </strong>
            </div>

            <div className="flex items-center gap-1.5" title="Monthly interactions generated / total quota">
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span className="text-foreground-muted">Interactions:</span>
              <strong className="text-foreground font-mono">
                {usage.usage.interactions.toLocaleString()} / {usage.plan.monthly_interactions.toLocaleString()}
              </strong>
            </div>
          </>
        ) : (
          <span className="text-foreground-muted text-[11px]">
            {isLoading ? "Loading quota..." : "Quota limits active"}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={fetchQuota}
        disabled={isLoading}
        className="p-1 rounded text-foreground-muted hover:text-foreground hover:bg-surface-elevated transition-colors disabled:opacity-50"
        title="Refresh quota"
        aria-label="Refresh quota"
      >
        <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
      </button>
    </div>
  );
}
