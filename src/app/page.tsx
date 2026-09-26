import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
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
  HelpCircle,
  BookOpen,
  Sliders,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, SITE_CONFIG } from "@/lib/seo/config";
import {
  getSoftwareApplicationSchema,
  getWebSiteSchema,
  getFaqPageSchema,
  getPersonSchema,
} from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "BehaviourSim — Synthetic Sequential Behavioral Data Platform",
  description:
    "An open-source scientific Python framework and cloud API for generating, calibrating, feature-engineering, validating, and analyzing reproducible synthetic sequential behavioral data.",
  path: "/",
});

const HOME_FAQS = [
  {
    question: "What is BehaviourSim?",
    answer:
      "BehaviourSim is an open-source Python framework (distributed as 'behaviorsim' on PyPI) and cloud API designed for generating reproducible synthetic sequential behavioral data. It models human and system trajectories as discrete Markov state machines that emit parametric features at each interaction step.",
  },
  {
    question: "What is synthetic sequential behavioral data?",
    answer:
      "Synthetic sequential behavioral data consists of artificially generated time-series or event-log trajectories where each record depends chronologically on previous states and actions. Unlike independent, identically distributed (IID) tabular rows, sequential behavioral data preserves temporal dependencies, transition dynamics, and user state progressions.",
  },
  {
    question: "How do I generate synthetic behavioral data in Python?",
    answer:
      "Install the package via 'pip install behaviorsim', initialize a simulator using Simulator.from_preset('finance') (or custom states), and call sim.generate(num_interactions=100, num_sequences=10, seed=42). The method returns a structured pandas DataFrame.",
  },
  {
    question: "What is a behavioral state?",
    answer:
      "In BehaviourSim, a behavioral state represents a discrete internal or operational condition of an agent (such as 'browsing', 'evaluating', 'transacting', 'churned', 'adherent', or 'stressed'). Active states govern which feature distributions are sampled and constrain valid transitions to subsequent states.",
  },
  {
    question: "How does BehaviourSim generate sequential data?",
    answer:
      "Generation follows a two-stage decoupled stochastic process: First, an agent transitions across discrete states according to a Markov transition probability matrix or conditional rules. Second, observable continuous and categorical features are sampled from probability distributions parameterized specifically for that active state.",
  },
  {
    question: "Can BehaviourSim generate reproducible synthetic data?",
    answer:
      "Yes. BehaviourSim guarantees deterministic reproducibility across platforms by accepting an explicit integer seed. Running simulation workloads with the same seed, state definitions, and emission parameters produces bit-for-bit identical sequence datasets.",
  },
  {
    question: "What distributions does BehaviourSim support?",
    answer:
      "BehaviourSim supports 8 verified parametric emission distributions: Normal (Gaussian), Lognormal, Exponential, Poisson, Uniform, Uniform Discrete, Bernoulli (binary flags), and Categorical (multinomial choices).",
  },
  {
    question: "Can BehaviourSim model different behavioral profiles?",
    answer:
      "Yes. Agents can be initialized with distinct profile vectors and prior distributions (Dirichlet priors), allowing simulations to model heterogeneous cohorts such as novice versus power users, high-frequency traders, or adherent versus non-adherent patients.",
  },
  {
    question: "What domain presets does BehaviourSim provide?",
    answer:
      "BehaviourSim includes 4 built-in domain presets: Finance (trading states, portfolio values, volatility alerts), Healthcare (vital signs, adherence, dosage levels), Education (engagement states, accuracy, response times), and Mobile App (onboarding, active session, checkout funnel, churn). Note: presets are simulation models for testing and research, not clinical or financial advice.",
  },
  {
    question: "Can BehaviourSim be used for machine learning experiments?",
    answer:
      "Yes. Researchers and ML engineers use BehaviourSim to benchmark recurrent neural networks (RNNs/LSTMs/Transformers), evaluate feature engineering pipelines, simulate temporal concept drift, and test anomaly detection without exposing sensitive real-world user data.",
  },
  {
    question: "Does BehaviourSim provide an API?",
    answer:
      "Yes. BehaviourSim provides a hosted cloud REST API at api.behavioursim.vedaangsharma.in with endpoints for preset discovery, asynchronous simulation job dispatch, status polling, and API key management.",
  },
  {
    question: "Does BehaviourSim provide a web interface?",
    answer:
      "Yes. The BehaviourSim Web platform at behavioursim.vedaangsharma.in provides an interactive Simulation Playground, statistical telemetry visualizers, transition matrix heatmaps, and comprehensive documentation.",
  },
  {
    question: "How does BehaviourSim differ from a generic random data generator?",
    answer:
      "Generic random generators sample rows independently without temporal continuity or state awareness. BehaviourSim enforces temporal inertia, absorbing Markov states, state-conditioned multivariate distributions, and deterministic lineage required for realistic sequence simulation.",
  },
];

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
    <>
      <JsonLd
        data={[
          getWebSiteSchema(),
          getSoftwareApplicationSchema(),
          getPersonSchema(),
          getFaqPageSchema(HOME_FAQS),
        ]}
      />

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
                BehaviourSim is an open-source Python engine and cloud API designed to model complex human
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
                    href={SITE_CONFIG.repository}
                    external
                  >
                    GitHub
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    href="/playground"
                  >
                    Playground
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Conceptual Pipeline Section */}
        <Section
          title="Conceptual Simulation Pipeline"
          description="BehaviourSim structures behavioral generation into a clean, decoupled generative pipeline. Every observed event is conditioned on underlying transition dynamics."
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
                feature distributions calibrated for specific behavioral domains. Read the{" "}
                <Link href="/docs/generation/presets" className="text-accent underline hover:text-accent-hover">
                  domain presets reference
                </Link>{" "}
                or follow the{" "}
                <Link href="/docs/getting-started/quickstart" className="text-accent underline hover:text-accent-hover">
                  quickstart guide
                </Link>.
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
                  First-order and higher-order discrete state graphs with customizable transition probabilities, inertia weights, and absorbing states. Learn more in{" "}
                  <Link href="/concepts/transitions" className="text-accent underline">
                    transitions & dynamics
                  </Link>.
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
                  Emit continuous or categorical features sampled from state-conditioned Normal, Beta, Poisson, or custom parametric distributions. Read our{" "}
                  <Link href="/methodology" className="text-accent underline">
                    distribution methodology
                  </Link>.
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
                  Built-in domain factories for finance, healthcare, educational engagement, and mobile application retention modeling. Explore{" "}
                  <Link href="/use-cases" className="text-accent underline">
                    practical use cases
                  </Link>.
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
                  High-throughput REST API with quota tracking, session management, and parameter evaluation hosted at <code className="text-[11px] font-mono">api.behavioursim.vedaangsharma.in</code>. Test the{" "}
                  <Link href="/api" className="text-accent underline">
                    API Explorer
                  </Link>.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Generative Engine Optimization (GEO): Entity Definition & Architecture Ecosystem */}
        <section className="py-16 border-t border-border bg-surface-elevated/20">
          <Container size="default">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="space-y-2">
                <Badge variant="default" size="sm">
                  About the Platform
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  About BehaviourSim &amp; The Simulation Ecosystem
                </h2>
                <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                  BehaviourSim is an open-source Python-based platform for generating, calibrating,
                  validating, and analyzing reproducible synthetic sequential behavioral data.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-foreground-muted leading-relaxed">
                <div className="p-5 rounded-lg border border-border bg-surface space-y-3">
                  <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-accent" />
                    What BehaviourSim Is &amp; Does
                  </h3>
                  <ul className="list-disc pl-4 space-y-1.5 text-foreground-subtle">
                    <li>
                      <strong>Python Library:</strong> Distributed via PyPI as{" "}
                      <code className="text-[11px] font-mono text-foreground font-semibold">behaviorsim</code>,
                      providing <code className="text-[11px] font-mono text-foreground">Simulator</code>,{" "}
                      <code className="text-[11px] font-mono text-foreground">State</code>, and distribution samplers.
                    </li>
                    <li>
                      <strong>Markov Sequence Modeling:</strong> Transitions governed by stationary transition
                      matrices and conditional rule evaluation.
                    </li>
                    <li>
                      <strong>8 Parametric Distributions:</strong> Normal, Lognormal, Exponential, Poisson,
                      Uniform, Uniform Discrete, Bernoulli, and Categorical.
                    </li>
                    <li>
                      <strong>Hosted REST API:</strong> High-throughput FastAPI backend for asynchronous batch simulation and preset discovery.
                    </li>
                    <li>
                      <strong>Web Platform:</strong> Interactive telemetry visualizer, statistical inspection, and documentation hub.
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-lg border border-border bg-surface space-y-3">
                  <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    Explicit Boundaries &amp; Scope
                  </h3>
                  <ul className="list-disc pl-4 space-y-1.5 text-foreground-subtle">
                    <li>
                      <strong>Synthetic Simulation Only:</strong> BehaviourSim generates controlled synthetic data.
                      It is not an automated HMM discovery algorithm or latent-structure inferencer for unlabeled real-world data.
                    </li>
                    <li>
                      <strong>Domain Presets Are Not Certified Models:</strong> Healthcare and finance presets are
                      stylized mathematical simulation scenarios for testing data pipelines, not clinical diagnostic advice or financial trading strategies.
                    </li>
                    <li>
                      <strong>Cross-Platform Reproducibility:</strong> Guarantees bit-for-bit identical sequences when given the same random seed.
                    </li>
                    <li>
                      <strong>Permissive Open Source:</strong> Maintained under the MIT License by creator{" "}
                      <a href={SITE_CONFIG.author.url} className="text-foreground hover:underline">
                        Vedaang Sharma
                      </a>.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Ecosystem Quick Links */}
              <div className="p-4 rounded-lg border border-border bg-surface flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-foreground-muted">
                  Official Distribution &amp; Repository References
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="outline" size="sm" href={SITE_CONFIG.pypi} external>
                    PyPI Package <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                  </Button>
                  <Button variant="outline" size="sm" href={SITE_CONFIG.repository} external>
                    GitHub Source <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                  </Button>
                  <Button variant="outline" size="sm" href="/api">
                    REST API Specs
                  </Button>
                  <Button variant="primary" size="sm" href="/docs">
                    Read Documentation
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Answer Engine Optimization (AEO): Technical Questions & Answers */}
        <section className="py-16 border-t border-border bg-surface">
          <Container size="default">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-accent" />
                  <Badge variant="neutral" size="sm">
                    Answer Engine &amp; FAQ Reference
                  </Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  Frequently Asked Questions &amp; Technical Reference
                </h2>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  Direct, factual answers to common questions about synthetic sequential data generation,
                  Markov modeling, and BehaviourSim capabilities.
                </p>
              </div>

              <div className="space-y-4">
                {HOME_FAQS.map((faq, idx) => (
                  <article
                    key={idx}
                    className="p-5 rounded-lg border border-border bg-surface-elevated/40 hover:border-border-strong transition-colors space-y-2"
                  >
                    <h3 className="text-base font-semibold text-foreground">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </article>
                ))}
              </div>

              <div className="p-4 rounded-lg border border-border bg-surface-elevated text-xs text-foreground-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  Have more technical questions? Review our full mathematical methodology and API catalog.
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href="/methodology" className="text-accent underline hover:text-accent-hover font-medium">
                    Methodology
                  </Link>
                  <span>•</span>
                  <Link href="/docs/interfaces/python" className="text-accent underline hover:text-accent-hover font-medium">
                    Python API Docs
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Verification & Open Source Guarantee */}
        <section className="py-16 border-t border-border bg-surface-elevated/40">
          <Container size="default">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-lg border border-border bg-surface">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-semantic-success" />
                  <h3 className="text-base font-semibold text-foreground">
                    Open Source &amp; Peer-Review Ready
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  BehaviourSim is licensed under the permissive MIT License. Full test suites, transition matrix verification, and simulation recipes are open for community inspection.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  href={SITE_CONFIG.repository}
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
    </>
  );
}
