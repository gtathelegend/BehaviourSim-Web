import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertTriangle, CheckCircle, Database, ShieldAlert, Cpu } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Methodology — Synthetic Sequential Behavioral Data Generation",
  description:
    "Formal methodology, mathematical state transition formulation, supported parametric emission distributions, and explicit synthetic-data boundaries.",
  alternates: {
    canonical: "https://behavioursim.vedaangsharma.in/methodology",
  },
};

export default function MethodologyPage() {
  const supportedDistributions = [
    { name: "normal", params: "loc (mean), scale (std)", desc: "Gaussian continuous emissions" },
    { name: "lognormal", params: "mean, sigma", desc: "Right-skewed positive values (durations, volumes)" },
    { name: "exponential", params: "scale (1 / lambda)", desc: "Inter-arrival intervals and elapsed times" },
    { name: "poisson", params: "lam (rate)", desc: "Discrete event frequencies and counts" },
    { name: "uniform", params: "low, high", desc: "Bounded continuous intervals" },
    { name: "uniform_discrete", params: "low, high", desc: "Equiprobable integer sampling" },
    { name: "bernoulli", params: "p (probability)", desc: "Binary indicators, clicks, and event flags" },
    { name: "categorical", params: "categories, probabilities", desc: "Discrete non-numeric choices or classes" },
  ];

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="border-b border-border bg-tech-grid py-14 sm:py-20">
        <Container size="default">
          <div className="max-w-3xl space-y-4">
            <Badge variant="default" size="md">
              Formal Methodology
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
              Mathematical Foundations & Generative Architecture
            </h1>
            <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
              A detailed technical breakdown of the generative pipeline: state transition graphs,
              parametric emission sampling, population heterogeneity, and explicit synthetic data boundaries.
            </p>
          </div>
        </Container>
      </div>

      {/* 1. Formal Generation Pipeline */}
      <Section
        title="1. Generative Execution Pipeline"
        description="The simulation loop advances agents through discrete temporal steps. Each step samples internal state progression, evaluates condition rules, and emits observable features."
      >
        <div className="p-6 rounded-lg border border-border bg-surface shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 text-xs font-mono">
            {[
              { step: "01", name: "Config / Prior", detail: "Load States & Profiles" },
              { step: "02", name: "Initial State", detail: "Sample s_0 ~ π_0" },
              { step: "03", name: "Dynamics", detail: "Evaluate P(s_t+1 | s_t)" },
              { step: "04", name: "Active State", detail: "Resolve s_t ∈ S" },
              { step: "05", name: "Emission", detail: "Sample x_t ~ F(s_t)" },
              { step: "06", name: "Lineage", detail: "Append to DataFrame" },
            ].map((p, i) => (
              <div
                key={p.step}
                className="p-3.5 rounded border border-border bg-surface-elevated flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between text-foreground-subtle">
                  <span className="font-semibold text-accent">{p.step}</span>
                  <span className="text-[10px]">Phase</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{p.name}</div>
                  <div className="text-[11px] text-foreground-subtle mt-0.5">{p.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 2. State Transition Model */}
      <Section
        title="2. State Transition Model"
        description="BehaviorSim formalizes behavioral paths as a discrete-time Markov decision process without external reward feedback."
        bordered
      >
        <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
          <p>
            Let <code className="font-mono text-foreground">{"\\mathcal{S} = \\{s_1, s_2, \\dots, s_K\\}"}</code>{" "}
            denote a finite state space of <code className="font-mono text-foreground">K</code> discrete states.
            The transition dynamics between states are governed by a row-stochastic transition matrix{" "}
            <code className="font-mono text-foreground">{"P \\in \\mathbb{R}^{K \\times K}"}</code>, where each
            entry satisfies:
          </p>

          <div className="p-4 rounded bg-surface-elevated border border-border font-mono text-xs text-foreground select-all max-w-xl">
            P_ij = P(s_t+1 = s_j \mid s_t = s_i), \quad \sum_{"{j=1}"}^K P_ij = 1, \quad P_ij \ge 0
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Absorbing / Terminal States</h4>
              <p className="text-xs text-foreground-subtle leading-relaxed">
                States such as <code className="font-mono text-foreground">Churned</code> or{" "}
                <code className="font-mono text-foreground">Discharged</code> act as absorbing states where{" "}
                <code className="font-mono text-foreground">P_ii = 1.0</code>, terminating further trajectory
                progression for that specific agent.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Dynamic Condition Rules</h4>
              <p className="text-xs text-foreground-subtle leading-relaxed">
                In addition to static matrices, transition probabilities can be modulated dynamically using{" "}
                <code className="font-mono text-foreground">TransitionRule</code> objects that evaluate
                historical aggregations (<code className="font-mono text-foreground">last</code>,{" "}
                <code className="font-mono text-foreground">sum</code>,{" "}
                <code className="font-mono text-foreground">max</code>,{" "}
                <code className="font-mono text-foreground">mean</code>,{" "}
                <code className="font-mono text-foreground">min</code>).
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Parametric Feature Emission Distributions */}
      <Section
        title="3. Supported Parametric Feature Distributions"
        description="At each temporal step, observable continuous and discrete variables are emitted from probability distributions strictly conditioned on the active state."
        bordered
      >
        <div className="rounded-lg border border-border bg-surface overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-elevated text-foreground font-semibold">
                  <th className="py-3 px-4">Distribution Key</th>
                  <th className="py-3 px-4">Parameters</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground-muted">
                {supportedDistributions.map((d) => (
                  <tr key={d.name} className="hover:bg-surface-elevated/50 font-mono">
                    <td className="py-2.5 px-4 font-semibold text-accent">{d.name}</td>
                    <td className="py-2.5 px-4 text-foreground">{d.params}</td>
                    <td className="py-2.5 px-4 font-sans text-foreground-subtle">{d.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* 4. Multi-Agent Heterogeneity & Determinism */}
      <Section
        title="4. Profiles, Presets & Reproducibility"
        description="Calibrating population diversity across cohorts with strict bitwise deterministic replay."
        bordered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-foreground-muted leading-relaxed">
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">Profile Mixtures</h3>
            <p>
              When simulating populations of users, patients, or accounts, individual agents exhibit distinct
              baseline tendencies. BehaviorSim supports multiple profiles within a single simulator run,
              allocating profiles according to a calibrated mixture weight distribution.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">Seeded Random Number Generation</h3>
            <p>
              Every stochastic decision—from initial state sampling to Gaussian noise generation—relies on an
              internal NumPy Generator initialized with the user-supplied{" "}
              <code className="font-mono text-foreground">seed</code>. Re-running a simulation with identical
              configurations and seed guarantees bitwise identical trace outputs.
            </p>
          </div>
        </div>
      </Section>

      {/* 5. Scientific Boundary & Explicit Disclaimers */}
      <Section
        title="5. Scientific Boundary & Limitations"
        description="Essential disclosure regarding the synthetic nature of generated data and the scope of built-in domain presets."
        bordered
      >
        <div className="p-6 rounded-lg border border-semantic-warning-border bg-semantic-warning-bg space-y-4">
          <div className="flex items-center gap-2 text-semantic-warning font-semibold text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>Explicit Scientific & Regulatory Boundary</span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-foreground-muted leading-relaxed">
            <p>
              <strong>Synthetic Nature:</strong> All data produced by BehaviorSim is entirely synthetic. It is
              generated from mathematical state machines and parametric distributions specified by configuration
              files or preset defaults.
            </p>
            <p>
              <strong>Domain Presets Are Not Validated Real-World Models:</strong> Built-in presets for{" "}
              <code className="font-mono text-foreground">education</code>,{" "}
              <code className="font-mono text-foreground">finance</code>,{" "}
              <code className="font-mono text-foreground">healthcare</code>, and{" "}
              <code className="font-mono text-foreground">mobile_app</code> are illustrative scenario generators
              constructed for software testing, algorithm prototyping, and pipeline validation. They carry:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>NO clinical or medical validation:</strong> The healthcare preset must not be used as clinical evidence or diagnostic validation.</li>
              <li><strong>NO financial or market predictive validity:</strong> The finance preset is not financial advice or econometric forecasting.</li>
              <li><strong>NO educational efficacy certification:</strong> The education preset is a synthetic benchmark, not pedagogical validation.</li>
            </ul>
            <p className="text-xs text-foreground-subtle">
              Researchers and engineers must calibrate transition probabilities and emission parameters against
              empirical domain datasets before drawing real-world scientific conclusions.
            </p>
          </div>
        </div>

        {/* Navigation Callout */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <Button variant="outline" size="sm" href="/concepts">
            ← Revisit Concepts
          </Button>
          <Button variant="primary" size="sm" href="/use-cases">
            <span>Explore Use Cases</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </Section>
    </div>
  );
}
