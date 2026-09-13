"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log non-sensitive error status in browser console if helpful
  }, [error]);

  return (
    <div className="py-20 sm:py-28">
      <Container size="narrow">
        <div className="mx-auto max-w-lg text-center space-y-6">
          <Card className="border-semantic-error-border bg-surface shadow-md">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-semantic-error-bg border border-semantic-error-border flex items-center justify-center mx-auto mb-2 text-semantic-error">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                An Unexpected Application Error Occurred
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-foreground-muted mt-1 leading-relaxed">
                The application encountered an unexpected runtime condition while rendering this page.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              {error.digest && (
                <div className="p-2.5 rounded bg-surface-elevated border border-border text-[11px] font-mono text-foreground-muted">
                  Error Reference: {error.digest}
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="w-full sm:w-auto px-4 py-2 rounded bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-4 py-2 rounded border border-border bg-surface-elevated hover:bg-surface-muted text-foreground text-xs sm:text-sm font-medium transition-colors inline-flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Back to Homepage</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
