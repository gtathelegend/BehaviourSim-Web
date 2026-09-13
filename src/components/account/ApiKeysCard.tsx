"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { apiClient } from "@/lib/api/client";
import { BehaviorSimAPIError } from "@/lib/api/errors";
import type { APIKeyMetadataResponse } from "@/lib/api/types";
import { CreateKeyModal } from "./CreateKeyModal";
import { RevokeKeyModal } from "./RevokeKeyModal";
import { Key, Plus, RefreshCw, AlertCircle, Trash2, CheckCircle2, ShieldCheck, Terminal } from "lucide-react";

export function ApiKeysCard() {
  const [keys, setKeys] = useState<APIKeyMetadataResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [keyToRevoke, setKeyToRevoke] = useState<APIKeyMetadataResponse | null>(null);

  const fetchKeys = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient<APIKeyMetadataResponse[]>("/v1/api-keys");
      setKeys(data);
    } catch (err) {
      if (err instanceof BehaviorSimAPIError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while loading API keys.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  const activeKeys = keys.filter((k) => k.is_active);

  const formatDate = (isoString?: string | null) => {
    if (!isoString) return "Never";
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
            <Key className="w-4 h-4 text-accent" />
            <CardTitle className="text-base font-semibold">API Keys</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchKeys}
              disabled={isLoading}
              className="p-1.5 rounded border border-border text-foreground-muted hover:text-foreground hover:bg-surface-elevated transition-colors disabled:opacity-50 text-xs flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title="Refresh keys"
              aria-label="Refresh API keys"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create API Key</span>
            </button>
          </div>
        </div>
        <CardDescription className="text-xs text-foreground-muted">
          Manage authentication tokens used for programmatic interaction with the BehaviorSim REST API.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Loading State */}
        {isLoading && keys.length === 0 && (
          <div className="py-8 text-center text-xs text-foreground-muted flex items-center justify-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-accent" />
            <span>Loading API keys...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded border border-semantic-error-border bg-semantic-error-bg text-semantic-error text-xs flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Unable to load API keys</p>
                <p className="text-foreground-muted mt-0.5">{error}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={fetchKeys}
              className="px-3 py-1 bg-surface-elevated hover:bg-surface-muted text-foreground rounded border border-border text-xs font-medium transition-colors shrink-0"
            >
              Try again
            </button>
          </div>
        )}

        {/* Keys Table */}
        {!isLoading && keys.length === 0 && !error && (
          <div className="py-10 text-center border border-dashed border-border rounded-lg p-6 space-y-2">
            <Key className="w-6 h-6 text-foreground-muted mx-auto opacity-50" />
            <h4 className="text-xs font-semibold text-foreground">No API Keys Generated</h4>
            <p className="text-xs text-foreground-muted max-w-sm mx-auto">
              You do not have any API keys configured yet. Create a key to access the BehaviorSim REST API from your Python scripts or CI/CD pipelines.
            </p>
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create First Key</span>
            </button>
          </div>
        )}

        {keys.length > 0 && (
          <div className="border border-border rounded-lg overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-elevated/50 border-b border-border text-[11px] font-mono uppercase text-foreground-muted">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Label</th>
                  <th className="px-4 py-2.5 font-medium">Prefix</th>
                  <th className="px-4 py-2.5 font-medium">Created</th>
                  <th className="px-4 py-2.5 font-medium">Last Used</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-sans">
                {keys.map((apiKey) => (
                  <tr key={apiKey.id} className="hover:bg-surface-elevated/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {apiKey.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-accent">
                      {apiKey.key_prefix}...
                    </td>
                    <td className="px-4 py-3 text-foreground-muted">
                      {formatDate(apiKey.created_at)}
                    </td>
                    <td className="px-4 py-3 text-foreground-muted">
                      {formatDate(apiKey.last_used_at)}
                    </td>
                    <td className="px-4 py-3">
                      {apiKey.is_active ? (
                        <Badge variant="success" size="sm">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="neutral" size="sm">
                          Revoked
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {apiKey.is_active ? (
                        <button
                          type="button"
                          onClick={() => setKeyToRevoke(apiKey)}
                          className="px-2.5 py-1 rounded text-semantic-error hover:bg-semantic-error-bg border border-transparent hover:border-semantic-error-border transition-colors text-xs font-medium inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Revoke</span>
                        </button>
                      ) : (
                        <span className="text-foreground-muted text-[11px]">Inactive</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Free Plan Limit Notice */}
        {activeKeys.length >= 1 && (
          <p className="text-[11px] text-foreground-muted flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>
              Free tier accounts are limited to 1 active key. To create a new key, revoke your active key first.
            </span>
          </p>
        )}

        {/* API Key Security Guidance */}
        <div className="p-4 rounded-lg border border-border bg-surface-elevated/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>API Key Security & Integration Guidance</span>
          </div>

          <p className="text-xs text-foreground-muted leading-relaxed">
            API keys carry full execution privileges within your quota limits. Never expose raw secrets in public repositories, client-side web applications, or shared logs.
          </p>

          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-foreground-muted flex items-center gap-1">
              <Terminal className="w-3 h-3 text-foreground-muted" />
              <span>Recommended usage via environment variable:</span>
            </div>
            <div className="px-3 py-2 rounded bg-surface-elevated border border-border font-mono text-xs text-foreground select-all overflow-x-auto">
              export BEHAVIORSIM_API_KEY=&quot;bs_live_your_secret_here&quot;
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-foreground-muted pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Raw secret key is displayed only once</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Add .env* to your repository .gitignore</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Rotate keys periodically or if compromised</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Requests must be sent over HTTPS</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Modals */}
      <CreateKeyModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onKeyCreated={fetchKeys}
      />

      <RevokeKeyModal
        apiKey={keyToRevoke}
        isOpen={!!keyToRevoke}
        onClose={() => setKeyToRevoke(null)}
        onKeyRevoked={fetchKeys}
      />
    </Card>
  );
}
