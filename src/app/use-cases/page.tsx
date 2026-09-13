import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FlaskConical,
  Binary,
  CheckSquare,
  GraduationCap,
  Smartphone,
  TrendingUp,
  HeartPulse,
  AlertCircle,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
  title: "Use Cases — Research, ML Development & Software Testing",
  description:
    "Explore practical applications of BehaviorSim: sequential machine learning pipelines, load testing, algorithmic research, and synthetic domain presets with explicit disclaimers.",
  alternates: {
    canonical: "https://behavioursim.vedaangsharma.in/use-cases",
  },
};

export default function UseCasesPage() {
  const educationCode = `from behaviorsim import Simulator

# Education preset: models learner states ('Optimal', 'Overload', 'Underload')
sim = Simulator.from_preset("education")
df = sim.generate(num_interactions=20, num_sequences=5, seed=101)

# Features: difficulty, accuracy, response time (nrt), retries, help_requested
print(df[["sequence_id", "interaction_id", "state", "difficulty", "accuracy", "help_requested"]].head())`;

  const mobileAppCode = `from behaviorsim import Simulator

# Mobile App preset: models user funnels ('Browsing', 'ActiveSession', 'CheckoutFlow', 'Idle', 'Churned')
sim = Simulator.from_preset("mobile_app")
df = sim.generate(num_interactions=30, num_sequences=10, seed=202)

# Features: session_time_seconds, action_count, scroll_depth, button_clicks, cart_value
print(df[["sequence_id", "interaction_id", "state", "session_time_seconds", "cart_value"]].head())`;

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="border-b border-border bg-tech-grid py-14 sm:py-20">
        <Container size="default">
          <div className="max-w-3xl space-y-4">
            <Badge variant="default" size="md">
              Applied Scenarios
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
              Realistic Use Cases for Engineering & Research
            </h1>
            <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
              Discover how researchers, machine learning engineers, and software architects leverage
              BehaviorSim to build reproducible test benches, benchmark sequential algorithms, and
              simulate complex behavioral workflows.
            </p>
          </div>
        </Container>
      </div>

      {/* Primary Engineering & Research Categories */}
      <Section
        title="1. Core Engineering & Research Workflows"
        description="BehaviorSim replaces static mock data with mathematically consistent sequential trajectories."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader>
              <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                <FlaskConical className="w-4 h-4" />
              </div>
              <CardTitle>Research & Experimentation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Prototype behavioral modeling algorithms, evaluate Hidden Markov Model (HMM) parameter
                recovery, and benchmark reinforcement learning agents against ground-truth transition matrices.
              </CardDescription>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                <Binary className="w-4 h-4" />
              </div>
              <CardTitle>Machine Learning Pipelines</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Validate temporal feature engineering, test sequential neural architectures (RNNs, LSTMs,
                Transformers), and measure model drift detection algorithms without risking sensitive user data.
              </CardDescription>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                <CheckSquare className="w-4 h-4" />
              </div>
              <CardTitle>Software & Integration Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Stress-test event ingestion pipelines, populate staging databases with realistic schema-compliant
                records, and simulate concurrency spikes across millions of synthetic interactions.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Domain Preset Scenarios */}
      <Section
        title="2. Calibrated Domain Preset Scenarios"
        description="BehaviorSim includes four built-in domain presets with calibrated state spaces and feature emissions."
        bordered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Scenario */}
          <div className="p-6 rounded-lg border border-border bg-surface space-y-4">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <GraduationCap className="w-4 h-4 text-accent" />
              <span>Education: Learner Engagement & Mastery</span>
            </div>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Models learner trajectory progression across <code className="font-mono text-foreground">Optimal</code>,{" "}
              <code className="font-mono text-foreground">Overload</code>, and{" "}
              <code className="font-mono text-foreground">Underload</code> states. Features emitted include task
              difficulty, response time (<code className="font-mono text-foreground">nrt</code>), retry counts, and
              help requests.
            </p>
            <CodeBlock code={educationCode} language="python" filename="education_preset.py" />
            <div className="p-2.5 rounded bg-surface-elevated border border-border text-[11px] text-foreground-subtle flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-foreground-subtle shrink-0 mt-0.5" />
              <span><strong>Note:</strong> Purely a synthetic benchmark; not a certified pedagogical measurement.</span>
            </div>
          </div>

          {/* Mobile App Scenario */}
          <div className="p-6 rounded-lg border border-border bg-surface space-y-4">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <Smartphone className="w-4 h-4 text-accent" />
              <span>Mobile Application: User Session Funnels</span>
            </div>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Simulates e-commerce and app engagement through states including{" "}
              <code className="font-mono text-foreground">Browsing</code>,{" "}
              <code className="font-mono text-foreground">ActiveSession</code>,{" "}
              <code className="font-mono text-foreground">CheckoutFlow</code>, and{" "}
              <code className="font-mono text-foreground">Churned</code>. Features emitted include scroll depth,
              session duration, and cart values.
            </p>
            <CodeBlock code={mobileAppCode} language="python" filename="mobile_app_preset.py" />
            <div className="p-2.5 rounded bg-surface-elevated border border-border text-[11px] text-foreground-subtle flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-foreground-subtle shrink-0 mt-0.5" />
              <span><strong>Note:</strong> Ideal for testing conversion rate optimization (CRO) pipeline code.</span>
            </div>
          </div>

          {/* Finance Scenario with Mandatory Disclaimer */}
          <div className="p-6 rounded-lg border border-border bg-surface space-y-4">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span>Finance: Portfolio Risk & Volatility</span>
            </div>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Simulates investor trading activities across <code className="font-mono text-foreground">Stable</code>,{" "}
              <code className="font-mono text-foreground">Volatile</code>, and{" "}
              <code className="font-mono text-foreground">Drawdown</code> states with metrics like portfolio value,
              daily returns, and risk alerts.
            </p>
            <div className="p-3.5 rounded border border-semantic-warning-border bg-semantic-warning-bg text-xs text-foreground-muted space-y-1">
              <div className="font-semibold text-semantic-warning flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Financial Disclaimer</span>
              </div>
              <p className="text-[11px] leading-relaxed text-foreground-subtle">
                This preset is strictly a synthetic data simulation designed for pipeline and software testing. It
                does NOT represent financial advice, econometric forecasting, or validated market models.
              </p>
            </div>
          </div>

          {/* Healthcare Scenario with Mandatory Disclaimer */}
          <div className="p-6 rounded-lg border border-border bg-surface space-y-4">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <HeartPulse className="w-4 h-4 text-accent" />
              <span>Healthcare: Vital Sign Trajectories</span>
            </div>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Simulates clinical telemetry progression across <code className="font-mono text-foreground">Baseline</code>,{" "}
              <code className="font-mono text-foreground">Elevated</code>, and{" "}
              <code className="font-mono text-foreground">Critical</code> states with simulated vital signs including
              heart rate, blood pressure, SpO2, and alert flags.
            </p>
            <div className="p-3.5 rounded border border-semantic-warning-border bg-semantic-warning-bg text-xs text-foreground-muted space-y-1">
              <div className="font-semibold text-semantic-warning flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Medical & Clinical Disclaimer</span>
              </div>
              <p className="text-[11px] leading-relaxed text-foreground-subtle">
                This preset generates synthetic physiological numbers for software testing purposes only. It carries
                NO clinical, medical, or diagnostic validation and must never be used in patient care decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Callout */}
        <div className="mt-12 p-6 rounded-lg border border-border bg-surface-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground">Want to dive deeper into how this is modeled?</h4>
            <p className="text-xs text-foreground-muted mt-1">
              Read the mathematical formulation of states, transition matrices, and emission distributions.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="outline" size="sm" href="/concepts">
              View Concepts
            </Button>
            <Button variant="primary" size="sm" href="/methodology">
              <span>View Methodology</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
