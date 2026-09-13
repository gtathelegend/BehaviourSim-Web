import React from "react";
import {
  ArrowRight,
  Code2,
  Database,
  GitBranch,
  Layers,
  Terminal,
  Activity,
  FileSpreadsheet,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Home() {
  const quickstartPythonCode = `# 1. Initialize simulator from a registered domain preset
from behaviorsim import Simulator

# Presets: 'finance', 'healthcare', 'education', 'mobile_app'
sim = Simulator.from_preset("finance")

# 2. Generate reproducible multi-agent sequential behavioral traces
df = sim.generate(
    num_interactions=100,
    num_sequences=10,
    seed=42
)

# 3. Inspect generated dataset (profiles, latent states, observable metrics)
print(df[["sequence_id", "interaction_id", "state", "portfolio_value", "risk_alert"]].head())`;

  const pipelineSteps = [
    {
      step: "01",
      title: "Initial State",
      math: "s_0 \\sim \\pi_0",
      description: "Agents sample an initial state from a baseline prior distribution or profile vector.",
    },
    {
      step: "02",
      title: "Transition Dynamics",
      math: "P(s_{t+1} \\mid s_t, \\theta)",
      description: "Stochastic transition matrix evaluates temporal inertia, absorption, and Markov steps.",
    },
    {
      step: "03",
      title: "Latent State",
      math: "s_t \\in \\mathcal{S}",
      description: "Discrete behavioral status (e.g. browsing, trading, researching, churned).",
    },
    {
      step: "04",
      title: "Observable Features",
      math: "x_t \\sim \\mathcal{F}(s_t)",
      description: "Continuous and discrete emissions sampled conditionally on the current active state.",
    },
    {
      step: "05",
      title: "Labels & Outcomes",
      math: "y_t = g(s_t, x_t)",
      description: "Deterministic or stochastic threshold checks flag alerts, anomalies, or conversions.",
    },
    {
      step: "06",
      title: "Synthetic Dataset",
      math: "\\mathcal{D} = \\{(x_t, y_t)_{t=1}^T\\}",
      description: "Structured pandas DataFrame exported with full lineage, timestamps, and sequence IDs.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-border bg-tech-grid">
        <Container size="default">
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" size="md">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse mr-1" />
                Python Behavioral Simulation Framework
              </Badge>
              <Badge variant="code" size="md">
                PyPI: behaviorsim==1.0.1
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.15] text-foreground">
              Reproducible synthetic behavioral sequences for research and engineering.
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-foreground-muted">
              BehaviorSim is an open-source Python engine and cloud API designed to model complex human
              and system trajectories. Generate deterministic or stochastic traces governed by Markov
              dynamics, Dirichlet priors, and state-conditioned feature emissions.
            </p>

            {/* Installation and Primary Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center justify-between gap-3 px-3.5 py-2 rounded bg-surface-elevated border border-border font-mono text-xs text-foreground select-all shadow-sm">
                <span className="text-foreground-subtle select-none">$</span>
                <span className="font-semibold">pip install behaviorsim</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Button variant="primary" size="md" href="/docs">
                  <span>Documentation</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  href="https://github.com/gtathelegend/BehaviourSim"
                  external
                >
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Conceptual Pipeline Section */}
      <Section
        title="Conceptual Simulation Pipeline"
        description="BehaviorSim structures behavioral generation into a clean, decoupled generative pipeline. Every observed event is conditioned on underlying transition dynamics."
        badge={
          <Badge variant="neutral" size="sm">
            Mathematical Architecture
          </Badge>
        }
        bordered
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pipelineSteps.map((item) => (
            <Card key={item.step} variant="default" className="relative group hover:border-border-strong">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-semibold text-accent">
                  {item.step}
                </span>
                <code className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-surface-elevated text-foreground-subtle border border-border">
                  {item.math}
                </code>
              </div>
              <CardTitle className="mb-2 text-sm">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </div>

        {/* Linear Connector Flow Indicator */}
        <div className="mt-8 p-3.5 rounded border border-border bg-surface-elevated/60 flex flex-wrap items-center justify-between gap-3 text-xs text-foreground-muted font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>State Space (S)</span>
          </span>
          <span className="text-foreground-subtle hidden sm:inline">→</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-border-strong" />
            <span>Transition Matrix (P)</span>
          </span>
          <span className="text-foreground-subtle hidden sm:inline">→</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-border-strong" />
            <span>Emission Sampling (F)</span>
          </span>
          <span className="text-foreground-subtle hidden sm:inline">→</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-semantic-success" />
            <span>DataFrame (D)</span>
          </span>
        </div>
      </Section>

      {/* Code & Data Preview Section */}
      <Section
        title="Immediate Productivity with Python"
        description="Generate rich tabular datasets in three lines of code using domain-specific presets or custom stochastic state definitions."
        badge={
          <Badge variant="neutral" size="sm">
            Code & Execution
          </Badge>
        }
        bordered
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Code Block */}
          <div className="lg:col-span-7 space-y-3">
            <CodeBlock
              code={quickstartPythonCode}
              language="python"
              filename="quickstart.py"
              showLineNumbers
            />
            <p className="text-xs text-foreground-subtle leading-relaxed">
              Domain presets configure realistic states, transition probability matrices, and continuous
              feature distributions calibrated for specific behavioral domains.
            </p>
          </div>

          {/* Right: Data Table Preview Motif */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-md border border-border bg-surface overflow-hidden shadow-sm">
              <div className="px-4 py-2.5 border-b border-border bg-surface-elevated flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-accent" />
                  <span>Synthetic Trace Output (Sample)</span>
                </div>
                <Badge variant="code" size="sm">
                  DataFrame
                </Badge>
              </div>
              <div className="overflow-x-auto text-[11px] font-mono">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-surface-muted/50 text-foreground-subtle">
                      <th className="py-2 px-3">seq_id</th>
                      <th className="py-2 px-3">step</th>
                      <th className="py-2 px-3">state</th>
                      <th className="py-2 px-3">metric_val</th>
                      <th className="py-2 px-3">alert</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-surface-elevated/50">
                      <td className="py-2 px-3 text-foreground-muted">1</td>
                      <td className="py-2 px-3 text-foreground-muted">0</td>
                      <td className="py-2 px-3 font-medium text-accent">evaluating</td>
                      <td className="py-2 px-3">104.28</td>
                      <td className="py-2 px-3 text-foreground-subtle">0</td>
                    </tr>
                    <tr className="hover:bg-surface-elevated/50">
                      <td className="py-2 px-3 text-foreground-muted">1</td>
                      <td className="py-2 px-3 text-foreground-muted">1</td>
                      <td className="py-2 px-3 font-medium text-accent">transacting</td>
                      <td className="py-2 px-3">108.91</td>
                      <td className="py-2 px-3 text-foreground-subtle">0</td>
                    </tr>
                    <tr className="hover:bg-surface-elevated/50">
                      <td className="py-2 px-3 text-foreground-muted">1</td>
                      <td className="py-2 px-3 text-foreground-muted">2</td>
                      <td className="py-2 px-3 font-medium text-semantic-warning">hedging</td>
                      <td className="py-2 px-3">92.45</td>
                      <td className="py-2 px-3 text-semantic-warning font-semibold">1</td>
                    </tr>
                    <tr className="hover:bg-surface-elevated/50">
                      <td className="py-2 px-3 text-foreground-muted">2</td>
                      <td className="py-2 px-3 text-foreground-muted">0</td>
                      <td className="py-2 px-3 font-medium text-accent">evaluating</td>
                      <td className="py-2 px-3">101.12</td>
                      <td className="py-2 px-3 text-foreground-subtle">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3 rounded border border-border bg-surface-elevated text-xs text-foreground-muted space-y-1.5">
              <div className="flex items-center gap-1.5 text-foreground font-medium">
                <Activity className="w-3.5 h-3.5 text-accent" />
                <span>Deterministic Reproducibility</span>
              </div>
              <p className="text-[11px] leading-relaxed text-foreground-subtle">
                Pass a fixed integer <code className="font-mono text-foreground">seed</code> to guarantee identical sequence generation across operating systems and hardware configurations.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Core Architectural Capabilities */}
      <Section
        title="Engine Architecture & Capabilities"
        description="Constructed for high-fidelity experimentation where standard uniform or Gaussian random generators fail to capture sequential dependencies."
        badge={
          <Badge variant="neutral" size="sm">
            Technical Capabilities
          </Badge>
        }
        bordered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="default">
            <CardHeader>
              <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                <GitBranch className="w-4 h-4" />
              </div>
              <CardTitle>Markov State Transitions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                First-order and higher-order discrete state graphs with customizable transition probabilities, inertia weights, and absorbing states.
              </CardDescription>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                <Layers className="w-4 h-4" />
              </div>
              <CardTitle>Parametric Feature Emissions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Emit continuous or categorical features sampled from state-conditioned Normal, Beta, Poisson, or custom parametric distributions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                <Database className="w-4 h-4" />
              </div>
              <CardTitle>Calibrated Domain Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built-in domain factories for finance, healthcare, educational engagement, and mobile application retention modeling.
              </CardDescription>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-accent mb-2">
                <Cpu className="w-4 h-4" />
              </div>
              <CardTitle>Cloud Simulation API</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                High-throughput REST API with quota tracking, session management, and parameter evaluation hosted at <code className="text-[11px] font-mono">api.behavioursim.vedaangsharma.in</code>.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Verification & Open Source Guarantee */}
      <section className="py-16 border-t border-border bg-surface-elevated/40">
        <Container size="default">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-lg border border-border bg-surface">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-semantic-success" />
                <h3 className="text-base font-semibold text-foreground">
                  Open Source & Peer-Review Ready
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                BehaviorSim is licensed under the permissive MIT License. Full test suites, transition matrix verification, and simulation recipes are open for community inspection.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="outline"
                size="sm"
                href="https://github.com/gtathelegend/BehaviourSim"
                external
              >
                Inspect Source
              </Button>
              <Button variant="primary" size="sm" href="/docs">
                Get Started
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
