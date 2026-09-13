"use client";

import React, { useState } from "react";
import { Play, Check, Copy, Clock, Hash, AlertCircle, ShieldCheck } from "lucide-react";
import { EXPLORER_WHITELIST, runExplorerRequest, ExplorerResult } from "@/lib/api/client";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function ApiExplorer() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("/health");
  const [presetParam, setPresetParam] = useState<string>("education");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ExplorerResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.behavioursim.vedaangsharma.in";

  const resolvedPath =
    selectedEndpoint === "/v1/presets/{preset}"
      ? `/v1/presets/${encodeURIComponent(presetParam.trim())}`
      : selectedEndpoint;

  const fullUrl = `${baseUrl}${resolvedPath}`;

  const handleExecute = async () => {
    setLoading(true);
    try {
      const res = await runExplorerRequest(selectedEndpoint, presetParam);
      setResult(res);
    } catch (err: unknown) {
      setResult({
        status: 500,
        statusText: "Client Error",
        durationMs: 0,
        requestId: null,
        data: { error: { message: err instanceof Error ? err.message : "Execution failed" } },
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyJson = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(result.data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Graceful fallback
    }
  };

  return (
    <div className="rounded-lg border border-border bg-surface shadow-sm overflow-hidden text-xs">
      {/* Top Banner with Safety Guarantee */}
      <div className="px-4 py-2.5 bg-surface-elevated border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <ShieldCheck className="w-4 h-4 text-semantic-success" />
          <span>Interactive REST API Explorer</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-foreground-subtle hidden sm:inline">
            Public &amp; Read-Only Endpoints
          </span>
          <Badge variant="code" size="sm">
            Live
          </Badge>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Controls Row */}
        <div className="space-y-4">
          <div>
            <label htmlFor="endpoint-select" className="block text-xs font-semibold text-foreground mb-1.5">
              Select Public Endpoint
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8">
                <select
                  id="endpoint-select"
                  value={selectedEndpoint}
                  onChange={(e) => {
                    setSelectedEndpoint(e.target.value);
                    setResult(null);
                  }}
                  className="w-full h-9 px-3 rounded border border-border bg-background text-foreground font-mono text-xs focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {EXPLORER_WHITELIST.map((ep) => (
                    <option key={ep.path} value={ep.path}>
                      {ep.method} {ep.path} — {ep.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-4">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleExecute}
                  disabled={loading}
                  className="w-full justify-center font-mono gap-1.5"
                >
                  <Play className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                  <span>{loading ? "Sending..." : "Send Request"}</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Preset Parameter Input (Only shown if endpoint contains {preset}) */}
          {selectedEndpoint === "/v1/presets/{preset}" && (
            <div className="p-3.5 rounded border border-border bg-surface-elevated/60 space-y-2">
              <label htmlFor="preset-input" className="block text-[11px] font-semibold text-foreground">
                Path Parameter: <code className="font-mono text-accent">&#123;preset&#125;</code>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  id="preset-input"
                  type="text"
                  value={presetParam}
                  onChange={(e) => setPresetParam(e.target.value)}
                  placeholder="e.g. education, finance, healthcare, mobile_app"
                  className="h-8 px-2.5 rounded border border-border bg-background text-foreground font-mono text-xs w-56 focus-visible:ring-2 focus-visible:ring-ring"
                />
                <span className="text-[11px] text-foreground-subtle">Quick test:</span>
                {["education", "finance", "healthcare", "mobile_app", "invalid_test"].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setPresetParam(name)}
                    className="px-2 py-0.5 rounded text-[10px] font-mono border border-border bg-surface hover:bg-surface-elevated text-foreground transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resolved Target URL */}
          <div className="p-2.5 rounded bg-surface-elevated font-mono text-xs flex items-center justify-between text-foreground-muted overflow-x-auto border border-border/80">
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="code" size="sm" className="font-bold text-accent">
                GET
              </Badge>
              <span className="select-all text-foreground">{fullUrl}</span>
            </div>
          </div>
        </div>

        {/* Response Viewer */}
        {result && (
          <div className="border border-border rounded-md overflow-hidden space-y-0">
            {/* Metadata Bar */}
            <div className="px-3.5 py-2 border-b border-border bg-surface-elevated flex flex-wrap items-center justify-between gap-3 text-[11px]">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 rounded font-mono font-semibold ${
                    result.status >= 200 && result.status < 300
                      ? "bg-semantic-success-bg text-semantic-success border border-semantic-success-border"
                      : result.status >= 400 && result.status < 500
                      ? "bg-semantic-warning-bg text-semantic-warning border border-semantic-warning-border"
                      : "bg-semantic-error-bg text-semantic-error border border-semantic-error-border"
                  }`}
                >
                  {result.status} {result.statusText}
                </span>

                <span className="flex items-center gap-1 text-foreground-subtle font-mono">
                  <Clock className="w-3 h-3" />
                  <span>{result.durationMs}ms</span>
                </span>

                {result.requestId && (
                  <span className="flex items-center gap-1 text-foreground-subtle font-mono hidden sm:inline-flex">
                    <Hash className="w-3 h-3" />
                    <span>{result.requestId}</span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleCopyJson}
                className="inline-flex items-center gap-1 text-foreground-subtle hover:text-foreground transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-semantic-success" />
                    <span className="text-semantic-success">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>

            {/* JSON Output Container */}
            <div className="p-4 bg-code-bg text-code-fg font-mono text-[11px] overflow-x-auto max-h-96 leading-relaxed select-all">
              <pre>
                <code>{JSON.stringify(result.data, null, 2)}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
