import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Key, ShieldCheck, Activity, Terminal, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ApiExplorer } from "@/components/api/ApiExplorer";

export const metadata: Metadata = {
  title: "REST API Reference & Interactive Explorer — BehaviorSim",
  description:
    "Explore the BehaviorSim REST API: interactive explorer for public endpoints, authentication specifications, preset discovery, and simulation generation endpoints.",
  alternates: {
    canonical: "https://behavioursim.vedaangsharma.in/api",
  },
};

export default function ApiExplorerPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <div className="border-b border-border bg-tech-grid py-14 sm:py-20">
        <Container size="default">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="default" size="md">
                Cloud REST API
              </Badge>
              <Badge variant="code" size="md">
                v1
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
              BehaviorSim REST API &amp; Interactive Explorer
            </h1>
            <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
              Execute simulation workloads, discover registered presets, and manage developer API keys over
              standard HTTPS. Test live public endpoints directly in your browser.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="px-3 py-1.5 rounded bg-surface-elevated border border-border font-mono text-xs text-foreground select-all">
                Base URL: <span className="font-semibold text-accent">https://api.behavioursim.vedaangsharma.in</span>
              </div>
              <Button variant="outline" size="sm" href="/docs/interfaces/rest">
                <span>View Full API Documentation</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Distinction Banner: Python vs REST */}
      <section className="py-6 border-b border-border bg-surface-elevated/40 text-xs">
        <Container size="default">
          <div className="p-4 rounded-lg border border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-accent" />
                <span>Python Package vs. Cloud REST API</span>
              </span>
              <p className="text-foreground-muted leading-relaxed">
                Looking for the local Python library? Use <code className="font-mono text-foreground">pip install behaviorsim</code> and see the{" "}
                <Link href="/docs/interfaces/python" className="text-accent underline font-mono">
                  Python API Reference
                </Link>. This page documents the cloud REST service hosted at{" "}
                <code className="font-mono text-foreground">api.behavioursim.vedaangsharma.in</code>.
              </p>
            </div>
            <Button variant="outline" size="sm" href="/docs/interfaces/python" className="shrink-0">
              Python API
            </Button>
          </div>
        </Container>
      </section>

      {/* Interactive Explorer Section */}
      <Section
        title="Interactive Public Explorer"
        description="Safely inspect responses from public endpoints (liveness, readiness, and preset catalogs) without requiring an account."
        badge={
          <Badge variant="neutral" size="sm">
            Live Testing
          </Badge>
        }
      >
        <ApiExplorer />
      </Section>

      {/* Documentation Guides Links */}
      <Section
        title="REST API Documentation Guides"
        description="Comprehensive specifications covering authentication, quotas, rate limits, and endpoint schemas."
        bordered
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Link href="/docs/interfaces/rest" className="block group">
            <Card variant="default" className="h-full group-hover:border-border-strong transition-colors">
              <CardHeader>
                <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                  <BookOpen className="w-4 h-4" />
                </div>
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>REST Overview</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                </CardTitle>
                <CardDescription>
                  Base URL, versioning (/v1), HTTPS requirements, request correlation IDs, and standard envelopes.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/docs/interfaces/rest/authentication" className="block group">
            <Card variant="default" className="h-full group-hover:border-border-strong transition-colors">
              <CardHeader>
                <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>Authentication</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                </CardTitle>
                <CardDescription>
                  Google &amp; GitHub OAuth initiation, callback handshakes, and HttpOnly session cookie handling.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/docs/interfaces/rest/api-keys" className="block group">
            <Card variant="default" className="h-full group-hover:border-border-strong transition-colors">
              <CardHeader>
                <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                  <Key className="w-4 h-4" />
                </div>
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>API Key Lifecycle</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                </CardTitle>
                <CardDescription>
                  bs_live_ keys, Bearer token authorization, generation, revocation, and security practices.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/docs/interfaces/rest/endpoints" className="block group">
            <Card variant="default" className="h-full group-hover:border-border-strong transition-colors">
              <CardHeader>
                <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                  <Activity className="w-4 h-4" />
                </div>
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>Endpoint Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                </CardTitle>
                <CardDescription>
                  Full reference for /health, /ready, /presets, /account, /usage, /api-keys, and /simulations.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/docs/interfaces/rest/errors" className="block group">
            <Card variant="default" className="h-full group-hover:border-border-strong transition-colors">
              <CardHeader>
                <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                  <Activity className="w-4 h-4" />
                </div>
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>Errors &amp; Status Codes</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                </CardTitle>
                <CardDescription>
                  Structured error format, status codes (400, 401, 403, 404, 409, 422, 429), and X-Request-ID.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/docs/interfaces/rest/rate-limits" className="block group">
            <Card variant="default" className="h-full group-hover:border-border-strong transition-colors">
              <CardHeader>
                <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                  <Clock className="w-4 h-4" />
                </div>
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>Rate Limits &amp; Quotas</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                </CardTitle>
                <CardDescription>
                  Free plan entitlements (5 req/min, 100 req/mo, 10,000 interactions/mo), and Retry-After header.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </Section>
    </div>
  );
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
