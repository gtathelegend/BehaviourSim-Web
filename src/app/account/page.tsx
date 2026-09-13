"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { Container } from "@/components/layout/Container";
import { ProfileCard } from "@/components/account/ProfileCard";
import { UsageCard } from "@/components/account/UsageCard";
import { ApiKeysCard } from "@/components/account/ApiKeysCard";
import { LogOut, ShieldAlert, RefreshCw, UserCheck } from "lucide-react";

export default function AccountPage() {
  const { user, isLoading, error, isAuthenticated, logout } = useAuth();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await logout();
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="py-20 sm:py-28">
        <Container size="default">
          <div className="max-w-md mx-auto text-center space-y-3 py-12">
            <RefreshCw className="w-5 h-5 animate-spin text-accent mx-auto" />
            <p className="text-xs text-foreground-muted">Checking authentication session...</p>
          </div>
        </Container>
      </div>
    );
  }

  // 2. Unauthenticated State (Safe recoverable CTA, no infinite redirect loop)
  if (!isAuthenticated || !user) {
    return (
      <div className="py-20 sm:py-28">
        <Container size="narrow">
          <div className="max-w-md mx-auto rounded-lg border border-border bg-surface p-8 text-center space-y-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-surface-elevated border border-border flex items-center justify-center mx-auto text-foreground-muted">
              <ShieldAlert className="w-5 h-5 text-accent" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-semibold text-foreground">Not signed in</h2>
              <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                Sign in with Google or GitHub to access your developer account, manage API keys, and monitor simulation usage quotas.
              </p>
            </div>
            {error && (
              <p className="text-xs text-semantic-error font-mono bg-semantic-error-bg border border-semantic-error-border rounded p-2">
                {error}
              </p>
            )}
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-4 py-2 rounded bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // 3. Authenticated State
  return (
    <div className="py-10 sm:py-14">
      <Container size="default">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-accent inline-block" />
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Account Dashboard
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-foreground-muted flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-accent" />
                <span>Signed in as </span>
                <strong className="text-foreground font-mono font-medium">{user.email}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded border border-border bg-surface-elevated hover:bg-surface-muted text-xs font-medium text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              >
                <LogOut className="w-3.5 h-3.5 text-foreground-muted" />
                <span>{isSigningOut ? "Signing out..." : "Sign out"}</span>
              </button>
            </div>
          </div>

          {/* Account Profile Section */}
          <ProfileCard user={user} />

          {/* Usage Section */}
          <UsageCard />

          {/* API Keys Section */}
          <ApiKeysCard />
        </div>
      </Container>
    </div>
  );
}
