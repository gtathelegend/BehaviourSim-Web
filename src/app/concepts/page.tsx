import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitBranch, Layers, Activity, Cpu, ArrowDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, SITE_CONFIG } from "@/lib/seo/config";
import { getTechArticleSchema, getBreadcrumbListSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Concepts — Behavioral States, Transitions & Synthetic Sequences",
  description:
    "Learn the foundational principles behind BehaviourSim: hidden behavioral states, stochastic transition dynamics, observable feature emissions, and reproducible sequence generation.",
  path: "/concepts",
  keywords: [
    "behavioral states",
    "state transitions",
    "Markov transition dynamics",
    "feature emissions",
    "synthetic sequences",
    "agent profiles",
    "reproducible simulation",
  ],
});

export default function ConceptsPage() {
  const articleSchema = getTechArticleSchema({
    title: "Foundational Concepts: Behavioral States, Transitions & Synthetic Sequences",
    description:
      "Core principles of BehaviourSim: modeling agent trajectories as discrete Markov state machines with state-conditioned parametric emissions and deterministic seeds.",
    path: "/concepts",
  });

  const breadcrumbsSchema = getBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Concepts", path: "/concepts" },
  ]);

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbsSchema]} />

      <div className="flex flex-col">
        {/* Page Header */}
        <header className="border-b border-border bg-tech-grid py-14 sm:py-20">
          <Container size="default">
            <div className="max-w-3xl space-y-4">
              <Badge variant="default" size="md">
                Core Principles
              </Badge>
              <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
                Behavioral States, Transitions &amp; Synthetic Sequences
              </h1>
              <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
                BehaviourSim models agent behavior as a sequence of transitions across discrete internal
                states. Learn how the framework decouples internal behavioral state progression from
                observable parametric emissions.
              </p>
            </div>
          </Container>
        </header>

        {/* Concept 1: The Core Sequence Model */}
        <Section
          title="1. The Generative Sequence Structure"
          description="Unlike standard tabular synthesizers that generate independent, identically distributed (IID) rows, BehaviourSim structures data as temporally coherent trajectories."
        >
          <div className="space-y-8">
            <div className="prose dark:prose-invert max-w-none text-sm text-foreground-muted leading-relaxed">
              <p>
                In real-world systems—whether financial trading, user engagement, or educational learning—an
                action at step <code className="font-mono text-foreground">t</code> strongly depends on the
                preceding state at step <code className="font-mono text-foreground">t - 1</code>. BehaviourSim
                formalizes this sequential dependency by producing structured trajectories indexed by{" "}
                <code className="font-mono text-foreground">sequence_id</code> and ordered by{" "}
                <code className="font-mono text-foreground">interaction_id</code>.
              </p>
            </div>

            {/* Technical Sequence Representation Motif */}
            <div className="p-6 rounded-lg border border-border bg-surface overflow-x-auto shadow-sm">
              <div className="text-xs font-mono text-foreground-subtle mb-4">
                Discrete Trajectory Progression: Temporal Step Index (t)
              </div>
              <div className="flex items-center gap-4 min-w-[550px]">
                {[0, 1, 2, 3, 4].map((step, idx) => (
                  <React.Fragment key={step}>
                    <div className="flex-1 p-3.5 rounded border border-border bg-surface-elevated text-center space-y-1.5">
                      <div className="text-[11px] font-mono text-accent font-semibold">
                        Step t={step}
                      </div>
                      <div className="text-xs font-semibold text-foreground">
                        {["Baseline", "Active", "Active", "Elevated", "Critical"][idx]}
                      </div>
                      <div className="text-[10px] font-mono text-foreground-subtle">
                        x_t ~ F(s_t)
                      </div>
                    </div>
                    {idx < 4 && (
                      <div className="text-foreground-subtle font-mono text-sm shrink-0">
                        →
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-foreground-subtle">
                <span>Internal State Progression (Markov Chain)</span>
                <span>Observable Emission Vector (x_t)</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Concept 2: Behavioral States & Transitions */}
        <Section
          title="2. Behavioral States & Transition Dynamics"
          description="Agents occupy discrete states that dictate both their propensity to transition to new states and the probability distributions of their emitted features."
          bordered
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4 text-sm text-foreground-muted leading-relaxed">
              <p>
                A <strong>State</strong> represents a domain-neutral discrete cognitive, health, or behavioral
                phase (for example, <code className="font-mono text-foreground">Stable</code>,{" "}
                <code className="font-mono text-foreground">Volatile</code>, or{" "}
                <code className="font-mono text-foreground">Drawdown</code> in the finance preset).
              </p>
              <p>
                Transition dynamics govern how an agent migrates between states. At each interaction step, the
                next state <code className="font-mono text-foreground">s_{"{t+1}"}</code> is sampled conditionally:
              </p>
              <div className="p-3.5 rounded bg-surface-elevated border border-border font-mono text-xs text-foreground select-all">
                P(s_{"{t+1}"} = j \mid s_t = i, \theta)
              </div>
              <p>
                Transitions can be defined either through stationary probability matrices or through
                evaluable <strong>TransitionRules</strong> that inspect historical aggregations (e.g. cumulative
                session time or maximum volatility spikes) to trigger state transitions dynamically. Learn more in{" "}
                <Link href="/docs/concepts/transitions" className="text-accent underline">
                  transitions &amp; dynamics documentation
                </Link>.
              </p>
            </div>

            {/* SVG/CSS State Transition Diagram */}
            <div className="lg:col-span-5 p-5 rounded-lg border border-border bg-surface shadow-sm">
              <div className="text-xs font-semibold text-foreground mb-4 flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-accent" />
                <span>State Transition Topology (Conceptual)</span>
              </div>
              <div className="flex flex-col items-center space-y-3 font-mono text-xs">
                <div className="w-44 py-2.5 px-3 rounded border border-border bg-surface-elevated text-center font-semibold text-foreground">
                  State A (Baseline)
                </div>
                <div className="flex items-center gap-2 text-[11px] text-foreground-subtle">
                  <ArrowDown className="w-3 h-3 text-accent" />
                  <span>P(A → B) = 0.35</span>
                </div>
                <div className="w-44 py-2.5 px-3 rounded border border-accent/40 bg-accent-subtle/50 text-center font-semibold text-foreground">
                  State B (Engaged)
                </div>
                <div className="flex items-center gap-2 text-[11px] text-foreground-subtle">
                  <ArrowDown className="w-3 h-3 text-accent" />
                  <span>P(B → C) = 0.15</span>
                </div>
                <div className="w-44 py-2.5 px-3 rounded border border-border bg-surface-elevated text-center font-semibold text-foreground">
                  State C (Terminal/Absorbing)
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Concept 3: Observable Features & Labels */}
        <Section
          title="3. Observable Features & Generated Labels"
          description="The internal state is latent. What the outside world (and downstream machine learning models) observes are parametric feature emissions."
          bordered
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default">
              <CardHeader>
                <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                  <Layers className="w-4 h-4" />
                </div>
                <CardTitle>State-Conditioned Feature Emissions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Each state maps to one or more <code className="font-mono text-foreground">FeatureDistribution</code>{" "}
                  configurations. Supported distributions include Normal, Lognormal, Exponential, Poisson,
                  Uniform, Uniform Discrete, Bernoulli, and Categorical distributions. An agent in an &quot;Engaged&quot; state emits higher
                  interaction counts than an agent in an &quot;Idle&quot; state. Read our{" "}
                  <Link href="/methodology" className="text-accent underline">
                    parametric emissions methodology
                  </Link>.
                </CardDescription>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardHeader>
                <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                  <Activity className="w-4 h-4" />
                </div>
                <CardTitle>Outcome Labels &amp; Anomaly Flags</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Labels can be derived directly from active states (such as binary churn flags) or computed
                  via threshold checks on continuous emissions (such as a{" "}
                  <code className="font-mono text-foreground">risk_alert</code> triggered when drawdowns exceed
                  a calibrated threshold).
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Concept 4: Profiles & Deterministic Reproducibility */}
        <Section
          title="4. Agent Profiles & Deterministic Seeds"
          description="Calibrate behavioral heterogeneity across cohorts while maintaining bitwise reproducibility."
          bordered
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-3">
              <h3 className="text-base font-semibold text-foreground">Agent Profiles</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                A <strong>Profile</strong> represents a distinct agent persona or archetype (for instance,
                a <code className="font-mono text-foreground">balanced_investor</code> vs. an aggressive trader).
                Profiles allow you to assign different initial state priors, transition probabilities, and feature
                parameter overrides to simulate population heterogeneity.
              </p>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <h3 className="text-base font-semibold text-foreground">Seed-Guaranteed Reproducibility</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Scientific research demands exact reproducibility. BehaviourSim uses seeded NumPy random generators
                so that providing an explicit integer seed (e.g. <code className="font-mono text-foreground">seed=42</code>)
                guarantees that identical sequence traces, state transitions, and emission values are generated every time.
              </p>
            </div>
          </div>

          {/* Navigation Callout */}
          <div className="mt-12 p-6 rounded-lg border border-border bg-surface-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground">Ready for the mathematical formulation?</h4>
              <p className="text-xs text-foreground-muted mt-1">
                Explore formal mathematical definitions, transition matrices, and distribution boundaries.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button variant="outline" size="sm" href="/features">
                Inspect Features
              </Button>
              <Button variant="primary" size="sm" href="/methodology">
                <span>View Methodology</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
