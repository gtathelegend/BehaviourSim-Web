"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { listSimulations, deleteSimulation } from "@/lib/api/client";
import { BehaviorSimAPIError } from "@/lib/api/errors";
import type { SimulationHistoryItem, SimulationStatus } from "@/lib/api/types";
import {
  History,
  RefreshCw,
  Trash2,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";

export function SimulationHistoryCard() {
  const [items, setItems] = useState<SimulationHistoryItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchHistory = useCallback(async (targetPage: number) => {
    setIsLoading(true);
    setError(null);
    setActionError(null);
    try {
      const response = await listSimulations({ page: targetPage, page_size: pageSize });
      setItems(response.items);
      setTotal(response.total);
      setPage(response.page);
    } catch (err: unknown) {
      if (err instanceof BehaviorSimAPIError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load simulation history.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchHistory(page);
  }, [fetchHistory, page]);

  const handleDelete = async (item: SimulationHistoryItem) => {
    // Running simulations cannot be safely cancelled on the API
    if (item.status === "running") {
      setActionError("Cannot delete a running simulation. Please wait until execution finishes.");
      return;
    }

    const confirmMsg =
      item.status === "pending"
        ? `Cancel and delete pending simulation '${item.simulation_id.slice(0, 8)}'? Reserved quota will be refunded.`
        : `Permanently delete simulation run '${item.simulation_id.slice(0, 8)}'?`;

    if (!window.confirm(confirmMsg)) {
      return;
    }

    setDeletingId(item.simulation_id);
    setActionError(null);

    try {
      await deleteSimulation(item.simulation_id);
      // Remove deleted item from local state and update count
      setItems((prev) => prev.filter((i) => i.simulation_id !== item.simulation_id));
      setTotal((prev) => Math.max(0, prev - 1));
    } catch (err: unknown) {
      if (err instanceof BehaviorSimAPIError) {
        setActionError(err.message);
      } else if (err instanceof Error) {
        setActionError(err.message);
      } else {
        setActionError("Failed to delete simulation.");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopyId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Ignore
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const renderStatusBadge = (status: SimulationStatus) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="success" size="sm" className="gap-1 font-mono uppercase text-[10px]">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>Completed</span>
          </Badge>
        );
      case "running":
        return (
          <Badge variant="default" size="sm" className="gap-1 font-mono uppercase text-[10px] bg-accent/15 text-accent border-accent/30">
            <Sparkles className="w-2.5 h-2.5 animate-spin" />
            <span>Running</span>
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="neutral" size="sm" className="gap-1 font-mono uppercase text-[10px]">
            <Clock className="w-2.5 h-2.5 animate-pulse text-accent" />
            <span>Queued</span>
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" size="sm" className="gap-1 font-mono uppercase text-[10px] text-semantic-error border-semantic-error-border">
            <AlertCircle className="w-2.5 h-2.5" />
            <span>Failed</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="neutral" size="sm" className="font-mono uppercase text-[10px]">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card className="border-border bg-surface shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-accent" />
            <CardTitle className="text-base font-semibold">Simulation History</CardTitle>
          </div>

          <button
            type="button"
            onClick={() => fetchHistory(page)}
            disabled={isLoading}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border border-border bg-surface-elevated hover:bg-surface-muted text-foreground transition-colors disabled:opacity-50"
            title="Refresh history"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
        <CardDescription className="text-xs text-foreground-muted">
          Persisted simulation jobs, execution statuses, and compute telemetry recorded across worker runs.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {actionError && (
          <div className="p-3 rounded border border-semantic-error-border bg-semantic-error-bg text-semantic-error text-xs flex items-center justify-between">
            <span>{actionError}</span>
            <button
              type="button"
              onClick={() => setActionError(null)}
              className="text-[11px] underline ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {error ? (
          <div className="p-4 rounded border border-semantic-error-border bg-semantic-error-bg text-semantic-error text-xs text-center space-y-2">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => fetchHistory(page)}
              className="px-3 py-1 rounded bg-surface-elevated text-foreground border border-border text-xs"
            >
              Try Again
            </button>
          </div>
        ) : isLoading && items.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <RefreshCw className="w-5 h-5 animate-spin text-accent mx-auto" />
            <p className="text-xs text-foreground-muted">Loading simulation history...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Clock className="w-8 h-8 text-foreground-muted/40 mx-auto" />
            <h4 className="text-xs font-semibold text-foreground">No Simulations Yet</h4>
            <p className="text-xs text-foreground-muted max-w-sm mx-auto">
              Run simulations from the interactive playground to track your synthetic data generation jobs here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="overflow-x-auto rounded border border-border">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-elevated/60 text-foreground-muted border-b border-border text-[11px] font-medium">
                  <tr>
                    <th className="py-2.5 px-3">Run ID</th>
                    <th className="py-2.5 px-3">Preset</th>
                    <th className="py-2.5 px-3">Interactions</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Compute</th>
                    <th className="py-2.5 px-3">Created</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {items.map((item) => (
                    <tr key={item.simulation_id} className="hover:bg-surface-elevated/30 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-[11px]">
                        <div className="flex items-center gap-1">
                          <span>{item.simulation_id.slice(0, 8)}...</span>
                          <button
                            type="button"
                            onClick={() => handleCopyId(item.simulation_id)}
                            className="p-0.5 rounded hover:text-foreground text-foreground-muted"
                            title="Copy full UUID"
                          >
                            {copiedId === item.simulation_id ? (
                              <Check className="w-3 h-3 text-semantic-success" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] uppercase">
                        {item.preset}
                      </td>
                      <td className="py-2.5 px-3 font-mono">
                        {item.num_interactions.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3">
                        {renderStatusBadge(item.status)}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-foreground-muted">
                        {item.compute_ms !== null && item.compute_ms !== undefined
                          ? `${item.compute_ms}ms`
                          : "—"}
                      </td>
                      <td className="py-2.5 px-3 text-foreground-muted text-[11px]">
                        {new Date(item.created_at).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          disabled={deletingId === item.simulation_id || item.status === "running"}
                          className="p-1 rounded text-foreground-muted hover:text-semantic-error transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title={
                            item.status === "running"
                              ? "Cannot delete running simulation"
                              : "Delete simulation record"
                          }
                          aria-label={`Delete simulation ${item.simulation_id.slice(0, 8)}`}
                        >
                          {deletingId === item.simulation_id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {total > pageSize && (
              <div className="flex items-center justify-between text-xs text-foreground-muted pt-1">
                <span>
                  Showing {items.length} of {total} simulation runs
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1 || isLoading}
                    className="p-1.5 rounded border border-border bg-surface-elevated hover:bg-surface-muted disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Previous page"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] px-1">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages || isLoading}
                    className="p-1.5 rounded border border-border bg-surface-elevated hover:bg-surface-muted disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Next page"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
