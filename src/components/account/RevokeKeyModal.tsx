"use client";

import React, { useState } from "react";
import { apiClient } from "@/lib/api/client";
import { BehaviorSimAPIError } from "@/lib/api/errors";
import type { APIKeyMetadataResponse, RevokeAPIKeyResponse } from "@/lib/api/types";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface RevokeKeyModalProps {
  apiKey: APIKeyMetadataResponse | null;
  isOpen: boolean;
  onClose: () => void;
  onKeyRevoked: () => void;
}

export function RevokeKeyModal({
  apiKey,
  isOpen,
  onClose,
  onKeyRevoked,
}: RevokeKeyModalProps) {
  const [isRevoking, setIsRevoking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !apiKey) return null;

  const handleRevoke = async () => {
    setIsRevoking(true);
    setError(null);

    try {
      await apiClient<RevokeAPIKeyResponse>(`/v1/api-keys/${apiKey.id}`, {
        method: "DELETE",
      });
      onKeyRevoked();
      onClose();
    } catch (err) {
      if (err instanceof BehaviorSimAPIError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to revoke API key.");
      }
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="revoke-key-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md rounded-lg border border-border bg-surface p-6 shadow-xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <h3 id="revoke-key-title" className="text-sm font-semibold text-semantic-error flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-semantic-error" />
            <span>Revoke API key?</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            disabled={isRevoking}
            className="p-1 rounded text-foreground-muted hover:text-foreground hover:bg-surface-elevated transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded border border-semantic-error-border bg-semantic-error-bg text-semantic-error text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        <div className="space-y-2 text-xs text-foreground-muted leading-relaxed">
          <p>
            Are you sure you want to revoke <strong className="text-foreground">{apiKey.name}</strong> (
            <code className="font-mono text-accent">{apiKey.key_prefix}...</code>)?
          </p>
          <div className="p-2.5 rounded bg-surface-elevated border border-border text-[11px] text-foreground">
            This action cannot be undone. Any active applications or agent services using this key will immediately receive HTTP 401 Unauthorized.
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            disabled={isRevoking}
            className="px-3 py-1.5 rounded border border-border text-xs font-medium text-foreground-muted hover:text-foreground hover:bg-surface-elevated transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleRevoke}
            disabled={isRevoking}
            className="px-3.5 py-1.5 rounded bg-semantic-error text-white text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isRevoking ? "Revoking key..." : "Revoke key"}
          </button>
        </div>
      </div>
    </div>
  );
}
