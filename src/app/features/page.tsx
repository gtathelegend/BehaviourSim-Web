import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Terminal,
  FileCode,
  Layers,
  Database,
  Cpu,
  ShieldAlert,
  GitBranch,
  Sliders,
  FileSpreadsheet,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
  title: "Features — Synthetic Behavioral Data Generation Capabilities",
  description:
    "Explore the complete verified capability matrix of BehaviorSim 1.0.1: Markov state transitions, 8 parametric distributions, CLI tooling, YAML configs, and domain presets.",
  alternates: {
    canonical: "https://behavioursim.vedaangsharma.in/features",
  },
};

export default function FeaturesPage() {
  const cliExample = `# Validate a YAML simulation configuration
behaviorsim validate simulation.yaml

# Execute a simulation and export directly to Parquet or CSV
behaviorsim run simulation.yaml \\
  --output ./traces.parquet \\
  --seed 42 \\
  --interactions 100 \\
  --sequences 25`;

  const yamlExample = `# simulation.yaml - Declarative Configuration
seed: 42
states:
  - name: "Active"
    description: "Engaged session state"
  - name: "Idle"
    description: "Passive browsing state"
distributions:
  - state: "Active"
    feature: "action_count"
    distribution: "poisson"
    params: { lam: 8.5 }
  - state: "Active"
    feature: "session_duration"
    distribution: "lognormal"
    params: { mean: 4.2, sigma: 0.8 }`;

  const verifiedCapabilities = [
    {
      title: "Sequential Behavioral Trajectories",
      desc: "Generates ordered temporal interaction sequences indexed by sequence_id and interaction_id rather than independent rows.",
      icon: GitBranch,
    },
    {
      title: "Discrete State Machine",
      desc: "Define custom discrete states with stationary Markov transition matrices, absorbing states, and custom priors.",
      icon: Layers,
    },
    {
      title: "8 Parametric Emission Distributions",
      desc: "Supports Normal, Lognormal, Exponential, Poisson, Uniform, Uniform Discrete, Bernoulli, and Categorical distributions.",
      icon: Sliders,
    },
    {
      title: "Dynamic Condition Rules",
      desc: "Modulate state transitions using threshold expressions evaluated on historical aggregations (last, sum, max, mean, min).",
      icon: CheckCircle2,
    },
    {
      title: "4 Domain Presets",
      desc: "Ready-to-use domain generators for finance, healthcare, education, and mobile application behavioral modeling.",
      icon: Database,
    },
    {
      title: "Multi-Profile Heterogeneity",
      desc: "Assign multiple agent archetypes with custom mixture weights to model diverse population segments in a single run.",
      icon: Sliders,
    },
    {
      title: "Deterministic Seed Control",
      desc: "Guarantees exact, reproducible sequence and feature outputs across all operating systems and environments.",
      icon: CheckCircle2,
    },
    {
      title: "Native Pandas DataFrame Export",
      desc: "Returns rich, tabular data structures ready for immediate analysis, visualization, or machine learning training.",
      icon: FileSpreadsheet,
    },
    {
      title: "Command-Line Interface (CLI)",
      desc: "Standardized behaviorsim CLI with validate and run subcommands exporting to CSV, JSON, or Apache Parquet formats.",
      icon: Terminal,
    },
    {
      title: "Declarative YAML / JSON Configs",
      desc: "Version-control simulation parameters outside of Python source code with schema-validated YAML and JSON files.",
      icon: FileCode,
    },
    {
      title: "Zero Heavy ML Runtime",
      desc: "Lightweight NumPy and Pandas core dependencies ensure fast installation and zero GPU hardware requirements.",
      icon: Cpu,
    },
    {
      title: "REST Cloud API Synchronization",
      desc: "Integrates with the BehaviorSim cloud simulation API for remote execution, quota tracking, and team collaboration.",
      icon: Database,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="border-b border-border bg-tech-grid py-14 sm:py-20">
        <Container size="default">
          <div className="max-w-3xl space-y-4">
            <Badge variant="default" size="md">
              Capability Matrix
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
              Verified Capabilities of BehaviorSim 1.0.1
            </h1>
            <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
              Every feature listed below is verified against the official <code className="font-mono text-foreground">behaviorsim==1.0.1</code>{" "}
              PyPI package release. BehaviorSim delivers dependable, mathematically grounded behavioral simulation tools.
            </p>
          </div>
        </Container>
      </div>

      {/* Feature Grid */}
      <Section
        title="Core Engine Capabilities"
        description="Comprehensive tooling for constructing, executing, and exporting sequential behavioral datasets."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedCapabilities.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} variant="default" className="hover:border-border-strong">
                <CardHeader>
                  <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                    <Icon className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-sm">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.desc}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* CLI & Declarative Config Showcase */}
      <Section
        title="Declarative Workflows: CLI & Configuration"
        description="Run simulations directly from the shell or orchestrate complex configurations with version-controlled YAML files."
        bordered
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>Standardized Command-Line Interface</span>
            </div>
            <CodeBlock code={cliExample} language="bash" filename="terminal" />
            <p className="text-xs text-foreground-subtle leading-relaxed">
              The CLI supports output formatting in CSV, JSON, and Apache Parquet with optional seed and interaction overrides.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <FileCode className="w-3.5 h-3.5 text-accent" />
              <span>Declarative YAML Specification</span>
            </div>
            <CodeBlock code={yamlExample} language="yaml" filename="simulation.yaml" />
            <p className="text-xs text-foreground-subtle leading-relaxed">
              Define state graphs, parametric distributions, and transition conditions without writing repetitive Python boilerplate.
            </p>
          </div>
        </div>
      </Section>

      {/* Explicit Functional Boundaries */}
      <Section
        title="Scope & Functional Boundaries"
        description="Clear delineation of what BehaviorSim does and does not do, ensuring scientific honesty and integrity."
        bordered
      >
        <div className="p-6 rounded-lg border border-border bg-surface-elevated space-y-4">
          <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
            <ShieldAlert className="w-4 h-4 text-accent" />
            <span>Explicit Non-Claims & Scope Demarcation</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-foreground-muted leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">What BehaviorSim IS:</h4>
              <ul className="list-disc pl-4 space-y-1 text-foreground-subtle">
                <li>A stochastic sequential behavioral trajectory synthesizer.</li>
                <li>A reproducible testing and machine learning benchmarking utility.</li>
                <li>A parameterizable Markov state engine with configurable feature emissions.</li>
                <li>A lightweight Python library and CLI tool.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">What BehaviorSim IS NOT:</h4>
              <ul className="list-disc pl-4 space-y-1 text-foreground-subtle">
                <li>Not a causal inference or counterfactual reasoning engine.</li>
                <li>Not a pre-trained predictive AI model for real-world individuals.</li>
                <li>Not clinically or financially certified decision software.</li>
                <li>Not a privacy-preserving differential privacy synthesizer.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Callout */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <Button variant="outline" size="sm" href="/methodology">
            ← Review Methodology
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
