"use client";

import React, { useState } from "react";
import { apiClient } from "@/lib/api/client";
import { BehaviorSimAPIError } from "@/lib/api/errors";
import type { APIKeyCreateResult } from "@/lib/api/types";
import { X, Plus, AlertTriangle, Copy, Check, ShieldAlert } from "lucide-react";

interface CreateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyCreated: () => void;
}

export function CreateKeyModal({ isOpen, onClose, onKeyCreated }: CreateKeyModalProps) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdKeyResult, setCreatedKeyResult] = useState<APIKeyCreateResult | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please specify a descriptive name for this API key.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await apiClient<APIKeyCreateResult>("/v1/api-keys", {
        method: "POST",
        body: JSON.stringify({ name: name.trim() }),
      });
      setCreatedKeyResult(result);
      onKeyCreated();
    } catch (err) {
      if (err instanceof BehaviorSimAPIError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create API key.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async () => {
    if (!createdKeyResult?.key) return;
    try {
      await navigator.clipboard.writeText(createdKeyResult.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API unavailable
    }
  };

  const handleDismiss = () => {
    setName("");
    setCreatedKeyResult(null);
    setError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-key-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg rounded-lg border border-border bg-surface p-6 shadow-xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <h3 id="create-key-title" className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Plus className="w-4 h-4 text-accent" />
            <span>{createdKeyResult ? "API Key Generated" : "Create New API Key"}</span>
          </h3>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close dialog"
            className="p-1 rounded text-foreground-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form State: Name input */}
        {!createdKeyResult ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-foreground-muted leading-relaxed">
              Generate a secret API key to authenticate programmatic simulation requests to the BehaviorSim API.
            </p>

            {error && (
              <div className="p-3 rounded border border-semantic-error-border bg-semantic-error-bg text-semantic-error text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>{error}</div>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="key-name-input" className="block text-xs font-medium text-foreground">
                Key Label / Name
              </label>
              <input
                id="key-name-input"
                type="text"
                placeholder="e.g. CI Pipeline, Agent Worker, Local Test"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                maxLength={64}
                className="w-full px-3 py-2 text-xs rounded border border-border bg-surface-elevated text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
              <p className="text-[11px] text-foreground-muted">
                Free plan accounts are permitted 1 active API key at a time.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={handleDismiss}
                disabled={isSubmitting}
                className="px-3 py-1.5 rounded border border-border text-xs font-medium text-foreground-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !name.trim()}
                className="px-3.5 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Creating key..." : "Create API Key"}
              </button>
            </div>
          </form>
        ) : (
          /* One-Time Secret Result State */
          <div className="space-y-4">
            <div className="p-3.5 rounded border border-semantic-warning-border bg-semantic-warning-bg text-semantic-warning text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">Important Security Notice</strong>
                This secret key will not be shown again. Store it securely in your environment variables.
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-foreground-muted">Raw Secret Key</span>
                <span className="text-[11px] text-foreground-muted">Label: {createdKeyResult.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={createdKeyResult.key}
                  className="w-full px-3 py-2 text-xs font-mono rounded border border-accent/40 bg-surface-elevated text-foreground select-all focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-2 rounded bg-surface-elevated hover:bg-surface-muted border border-border text-xs font-medium text-foreground flex items-center gap-1.5 shrink-0 transition-colors"
                  aria-label="Copy API Key to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-semantic-success" />
                      <span className="text-semantic-success">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={handleDismiss}
                className="px-4 py-2 rounded bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
              >
                I have stored this key securely
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
