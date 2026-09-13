import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { AccountResponse } from "@/lib/api/types";
import { User, Shield, Calendar, KeyRound, CheckCircle2, XCircle } from "lucide-react";

interface ProfileCardProps {
  user: AccountResponse;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const formattedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown";

  return (
    <Card className="border-border bg-surface">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-accent" />
            <CardTitle className="text-base font-semibold">Account Profile</CardTitle>
          </div>
          <Badge variant={user.plan === "free" ? "neutral" : "default"} size="sm" className="uppercase font-mono">
            {user.plan} Plan
          </Badge>
        </div>
        <CardDescription className="text-xs text-foreground-muted">
          Authoritative profile information returned from the BehaviorSim API identity service.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
          {/* Email */}
          <div className="p-3 rounded border border-border bg-surface-elevated/40">
            <div className="text-[11px] font-mono uppercase text-foreground-muted tracking-wider mb-1">
              Email Address
            </div>
            <div className="text-sm font-medium text-foreground truncate" title={user.email}>
              {user.email}
            </div>
          </div>

          {/* Display Name */}
          <div className="p-3 rounded border border-border bg-surface-elevated/40">
            <div className="text-[11px] font-mono uppercase text-foreground-muted tracking-wider mb-1">
              Display Name
            </div>
            <div className="text-sm font-medium text-foreground truncate">
              {user.display_name || "—"}
            </div>
          </div>

          {/* Account Status */}
          <div className="p-3 rounded border border-border bg-surface-elevated/40">
            <div className="text-[11px] font-mono uppercase text-foreground-muted tracking-wider mb-1">
              Account Status
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium">
              {user.is_active ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-semantic-success" />
                  <span className="text-semantic-success">Active</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 text-semantic-error" />
                  <span className="text-semantic-error">Suspended</span>
                </>
              )}
            </div>
          </div>

          {/* User ID */}
          <div className="p-3 rounded border border-border bg-surface-elevated/40">
            <div className="text-[11px] font-mono uppercase text-foreground-muted tracking-wider mb-1 flex items-center gap-1">
              <KeyRound className="w-3 h-3 text-foreground-muted" />
              <span>User ID</span>
            </div>
            <div className="text-xs font-mono text-foreground-muted truncate" title={user.id}>
              {user.id}
            </div>
          </div>

          {/* Authentication Provider */}
          <div className="p-3 rounded border border-border bg-surface-elevated/40">
            <div className="text-[11px] font-mono uppercase text-foreground-muted tracking-wider mb-1 flex items-center gap-1">
              <Shield className="w-3 h-3 text-foreground-muted" />
              <span>Auth Provider</span>
            </div>
            <div className="text-xs font-medium text-foreground capitalize">
              {user.authentication_methods?.length > 0
                ? user.authentication_methods.join(", ")
                : "OAuth"}
            </div>
          </div>

          {/* Created Date */}
          <div className="p-3 rounded border border-border bg-surface-elevated/40">
            <div className="text-[11px] font-mono uppercase text-foreground-muted tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-foreground-muted" />
              <span>Member Since</span>
            </div>
            <div className="text-xs font-medium text-foreground">
              {formattedDate}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
