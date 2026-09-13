import React from "react";
import Link from "next/link";
import { DocPage } from "./types";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { ApiEndpointCard } from "@/components/docs/ApiEndpointCard";
import { AlertCircle, Terminal, CheckCircle2, ShieldAlert, Key, Clock, ShieldCheck } from "lucide-react";

export const DOC_PAGES: DocPage[] = [
  // 1. Getting Started - Introduction
  {
    slug: ["getting-started"],
    path: "/docs/getting-started",
    title: "Introduction to BehaviorSim",
    description: "An overview of BehaviorSim's architecture, generative sequence modeling, and project goals.",
    section: "Getting Started",
    version: "1.0.1",
    headings: [
      { id: "what-is-behaviorsim", title: "What is BehaviorSim?", level: 2 },
      { id: "why-sequential-simulation", title: "Why Sequential Behavioral Simulation?", level: 2 },
      { id: "core-architecture", title: "Core Architecture", level: 2 },
      { id: "next-steps", title: "Next Steps", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          <strong>BehaviorSim</strong> is a scientific, open-source Python framework and cloud API designed
          for generating reproducible, synthetic sequential behavioral data. It enables researchers, machine
          learning engineers, and software architects to simulate complex temporal trajectories governed by
          stochastic state transitions and state-conditioned feature emissions.
        </p>

        <h2 id="what-is-behaviorsim" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          What is BehaviorSim?
        </h2>
        <p>
          Traditional synthetic data generators produce independent, identically distributed (IID) tabular
          rows. However, human, mechanical, and system behaviors are inherently sequential: a transaction at
          step 10 depends on choices made at steps 1 through 9.
        </p>
        <p>
          BehaviorSim models agents as discrete Markovian state machines where active states dictate the
          parameters of emitted features (e.g. session duration, trade volume, response time, or vital signs).
        </p>

        <h2 id="why-sequential-simulation" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Why Sequential Behavioral Simulation?
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Reproducible Research:</strong> Deterministic seed guarantees enable peer-review verification of sequential algorithms.</li>
          <li><strong>Safe Machine Learning Prototyping:</strong> Test feature engineering pipelines, recurrent architectures, and anomaly detectors without leaking private user data.</li>
          <li><strong>Software Pipeline Testing:</strong> Generate realistic, high-volume event streams for stress-testing message queues, databases, and microservices.</li>
        </ul>

        <h2 id="core-architecture" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Core Architecture
        </h2>
        <p>
          The framework decouples generation into two key components:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li><strong>State Machine &amp; Transition Rules:</strong> Manages state migration, transition probabilities, and temporal inertia.</li>
          <li><strong>Feature Emission Generator:</strong> Samples continuous and discrete metrics conditionally on active states from 8 supported parametric distributions.</li>
        </ol>

        <h2 id="next-steps" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Next Steps
        </h2>
        <p>
          Proceed to the <Link href="/docs/getting-started/installation" className="text-accent underline">Installation Guide</Link> to set up BehaviorSim in your local Python environment.
        </p>
      </div>
    ),
  },

  // 2. Getting Started - Installation
  {
    slug: ["getting-started", "installation"],
    path: "/docs/getting-started/installation",
    title: "Installation & Verification",
    description: "Install behaviorsim 1.0.1 from PyPI and verify package integrity in Python.",
    section: "Getting Started",
    version: "1.0.1",
    headings: [
      { id: "prerequisites", title: "Prerequisites", level: 2 },
      { id: "pip-installation", title: "Installation with pip", level: 2 },
      { id: "virtual-environment", title: "Virtual Environment Setup", level: 2 },
      { id: "verify-installation", title: "Verifying Installation", level: 2 },
      { id: "cli-verification", title: "CLI Verification", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          BehaviorSim is published on the Python Package Index (PyPI) as{" "}
          <code className="font-mono text-foreground">behaviorsim</code>.
        </p>

        <h2 id="prerequisites" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Prerequisites
        </h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Python:</strong> Version <code className="font-mono text-foreground">&gt;= 3.9</code> (tested on Python 3.9, 3.10, 3.11, 3.12).</li>
          <li><strong>Core Dependencies:</strong> <code className="font-mono text-foreground">numpy</code>, <code className="font-mono text-foreground">pandas</code>, <code className="font-mono text-foreground">pyyaml</code>, <code className="font-mono text-foreground">scipy</code>.</li>
        </ul>

        <h2 id="pip-installation" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Installation with pip
        </h2>
        <CodeBlock code="pip install behaviorsim==1.0.1" language="bash" filename="terminal" />

        <h2 id="virtual-environment" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Recommended: Virtual Environment Setup
        </h2>
        <p>We recommend installing BehaviorSim inside an isolated virtual environment:</p>
        <CodeBlock
          code={`# Create virtual environment
python -m venv .venv

# Activate on Linux / macOS:
source .venv/bin/activate

# Activate on Windows (PowerShell):
.venv\\Scripts\\Activate.ps1

# Install package
pip install behaviorsim`}
          language="bash"
          filename="terminal"
        />

        <h2 id="verify-installation" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Verifying Installation
        </h2>
        <p>Verify that the package imports correctly and reports version 1.0.1:</p>
        <CodeBlock
          code={`import behaviorsim

print("BehaviorSim version:", behaviorsim.__version__)
# Output: BehaviorSim version: 1.0.1`}
          language="python"
          filename="verify.py"
        />

        <h2 id="cli-verification" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          CLI Verification
        </h2>
        <p>BehaviorSim installs a command-line utility. Check that the CLI is accessible on your PATH:</p>
        <CodeBlock code="behaviorsim --version" language="bash" filename="terminal" />
      </div>
    ),
  },

  // 3. Getting Started - Quickstart
  {
    slug: ["getting-started", "quickstart"],
    path: "/docs/getting-started/quickstart",
    title: "Quickstart Guide",
    description: "Generate your first sequential behavioral dataset in Python in under two minutes.",
    section: "Getting Started",
    version: "1.0.1",
    headings: [
      { id: "first-simulation", title: "Your First Simulation", level: 2 },
      { id: "understanding-the-code", title: "Understanding the Code", level: 2 },
      { id: "output-schema", title: "Inspecting Output Traces", level: 2 },
      { id: "deterministic-reproducibility", title: "Deterministic Reproducibility", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          This guide demonstrates how to instantiate a simulator from a built-in domain preset, generate
          multi-agent sequences, and inspect the resulting pandas DataFrame.
        </p>

        <h2 id="first-simulation" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Your First Simulation
        </h2>
        <CodeBlock
          code={`from behaviorsim import Simulator

# 1. Instantiate from the built-in finance preset
sim = Simulator.from_preset("finance")

# 2. Generate 50 interactions across 5 distinct sequence trajectories
df = sim.generate(
    num_interactions=50,
    num_sequences=5,
    seed=42
)

# 3. Print the first few rows
print(df.head())`}
          language="python"
          filename="quickstart.py"
          showLineNumbers
        />

        <h2 id="understanding-the-code" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Understanding the Code
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <code className="font-mono text-foreground">Simulator.from_preset(&quot;finance&quot;)</code>:
            Constructs a pre-calibrated simulator with states (<code className="font-mono">Stable</code>, <code className="font-mono">Active</code>, <code className="font-mono">Volatile</code>, <code className="font-mono">Drawdown</code>, <code className="font-mono">Recovered</code>, <code className="font-mono">Closed</code>), transition matrices, and feature emission rules.
          </li>
          <li>
            <code className="font-mono text-foreground">sim.generate(...)</code>: Executes the simulation loop.
            <ul className="list-circle pl-5 pt-1 space-y-1 text-xs">
              <li><code className="font-mono">num_interactions</code>: Number of steps per sequence (default: 100).</li>
              <li><code className="font-mono">num_sequences</code>: Number of independent agent trajectories (default: 1).</li>
              <li><code className="font-mono">seed</code>: Integer random seed for bitwise reproducibility.</li>
            </ul>
          </li>
        </ul>

        <h2 id="output-schema" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Inspecting Output Traces
        </h2>
        <p>The returned object is a standard <code className="font-mono text-foreground">pandas.DataFrame</code> containing:</p>
        <div className="overflow-x-auto rounded border border-border">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-elevated text-foreground border-b border-border">
              <tr>
                <th className="py-2 px-3">Column</th>
                <th className="py-2 px-3">Type</th>
                <th className="py-2 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2 px-3 font-semibold text-accent">profile</td>
                <td className="py-2 px-3">string</td>
                <td className="py-2 px-3 font-sans">Active agent archetype (e.g. &quot;balanced_investor&quot;)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-accent">sequence_id</td>
                <td className="py-2 px-3">int</td>
                <td className="py-2 px-3 font-sans">Unique trajectory identifier</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-accent">interaction_id</td>
                <td className="py-2 px-3">int</td>
                <td className="py-2 px-3 font-sans">Ordered step index (0, 1, 2, ...) within the sequence</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-accent">state</td>
                <td className="py-2 px-3">string</td>
                <td className="py-2 px-3 font-sans">Active discrete behavioral state at this step</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-accent">portfolio_value, etc.</td>
                <td className="py-2 px-3">float / int</td>
                <td className="py-2 px-3 font-sans">Observable parametric emissions sampled from active state</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="deterministic-reproducibility" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Deterministic Reproducibility
        </h2>
        <p>
          Running the script above with <code className="font-mono text-foreground">seed=42</code> will always
          generate the exact same values on any machine, making test cases and benchmark evaluations completely reliable.
        </p>
      </div>
    ),
  },

  // 4. Core Concepts - Overview
  {
    slug: ["concepts"],
    path: "/docs/concepts",
    title: "Core Concepts Overview",
    description: "Fundamental behavioral modeling abstractions in BehaviorSim.",
    section: "Core Concepts",
    version: "1.0.1",
    headings: [
      { id: "modelling-philosophy", title: "Modeling Philosophy", level: 2 },
      { id: "three-pillars", title: "The Three Pillars", level: 2 },
      { id: "relation-to-public-concepts", title: "Relation to Public Methodology", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          BehaviorSim frames behavioral generation around state-machine mechanics. Instead of modeling raw
          features directly, it models the <em>latent states</em> that produce those features.
        </p>

        <h2 id="modelling-philosophy" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Modeling Philosophy
        </h2>
        <p>
          Real systems exhibit behavioral momentum. For example, a user who is confused is likely to remain
          confused for several interactions before either requesting help or churning. BehaviorSim captures
          this using Markovian transition matrices and condition rules.
        </p>

        <h2 id="three-pillars" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          The Three Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded border border-border bg-surface space-y-2">
            <h3 className="font-semibold text-foreground text-sm">1. Discrete States</h3>
            <p className="text-xs text-foreground-subtle">
              Non-empty string identifiers representing cognitive, physical, or behavioral phases.
            </p>
          </div>
          <div className="p-4 rounded border border-border bg-surface space-y-2">
            <h3 className="font-semibold text-foreground text-sm">2. Transition Dynamics</h3>
            <p className="text-xs text-foreground-subtle">
              Row-stochastic transition probabilities and rule-based history evaluations.
            </p>
          </div>
          <div className="p-4 rounded border border-border bg-surface space-y-2">
            <h3 className="font-semibold text-foreground text-sm">3. Parametric Emissions</h3>
            <p className="text-xs text-foreground-subtle">
              Conditioned continuous and discrete distributions emitting observable metrics.
            </p>
          </div>
        </div>

        <h2 id="relation-to-public-concepts" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Further Reading
        </h2>
        <p>
          For formal mathematical definitions, visit the public{" "}
          <Link href="/concepts" className="text-accent underline">Concepts Page</Link> and{" "}
          <Link href="/methodology" className="text-accent underline">Methodology Page</Link>.
        </p>
      </div>
    ),
  },

  // 5. Core Concepts - States
  {
    slug: ["concepts", "states"],
    path: "/docs/concepts/states",
    title: "Behavioral States",
    description: "Defining and configuring discrete behavioral states in BehaviorSim.",
    section: "Core Concepts",
    version: "1.0.1",
    headings: [
      { id: "the-state-class", title: "The State Class", level: 2 },
      { id: "state-lifecycle", title: "State Lifecycle & Absorbing States", level: 2 },
      { id: "example-custom-states", title: "Example: Custom States", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          A <code className="font-mono text-foreground">State</code> in BehaviorSim represents a discrete
          behavioral status of an agent.
        </p>

        <h2 id="the-state-class" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          The State Class
        </h2>
        <p>
          The <code className="font-mono text-foreground">behaviorsim.State</code> dataclass requires a unique
          name and accepts an optional human-readable description:
        </p>
        <CodeBlock
          code={`from behaviorsim import State

active_state = State(
    name="ActiveSession",
    description="Agent is actively performing transactions"
)
idle_state = State(
    name="Idle",
    description="Agent is passive or awaiting notification"
)`}
          language="python"
          filename="states.py"
        />

        <h2 id="state-lifecycle" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          State Lifecycle &amp; Absorbing States
        </h2>
        <p>
          States can be transient or absorbing:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Transient States:</strong> States where outgoing transition probabilities sum to 1 across other states.</li>
          <li><strong>Absorbing States:</strong> States such as <code className="font-mono">Discharged</code> or <code className="font-mono">Churned</code> where transition to self equals 1.0. Once reached, the agent remains in this state for remaining steps.</li>
        </ul>

        <h2 id="example-custom-states" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Example: Custom States
        </h2>
        <CodeBlock
          code={`from behaviorsim import State, Simulator

states = [
    State("Exploring"),
    State("Comparing"),
    State("Purchased"),
    State("Exited")
]

# Initialize simulator with custom state list
sim = Simulator(states=states)`}
          language="python"
          filename="custom_states.py"
        />
      </div>
    ),
  },

  // 6. Core Concepts - Transitions
  {
    slug: ["concepts", "transitions"],
    path: "/docs/concepts/transitions",
    title: "Transitions & Dynamics",
    description: "Stationary transition probability matrices and dynamic rule evaluation.",
    section: "Core Concepts",
    version: "1.0.1",
    headings: [
      { id: "transition-matrices", title: "Transition Probability Matrices", level: 2 },
      { id: "transition-rules", title: "Dynamic Transition Rules", level: 2 },
      { id: "supported-operators", title: "Supported Operators & Aggregations", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          Transitions dictate how agents migrate between states at each interaction step.
        </p>

        <h2 id="transition-matrices" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Transition Probability Matrices
        </h2>
        <p>
          A stationary transition matrix is represented as a 2D NumPy array of shape <code className="font-mono">(K, K)</code>,
          where each row must sum to 1.0:
        </p>
        <CodeBlock
          code={`import numpy as np
from behaviorsim import Simulator, State

states = [State("A"), State("B")]

# Row 0: Transitions from A -> [A (80%), B (20%)]
# Row 1: Transitions from B -> [A (10%), B (90%)]
matrix = np.array([
    [0.8, 0.2],
    [0.1, 0.9]
])

sim = Simulator(states=states, transition_matrix=matrix)`}
          language="python"
          filename="matrix_example.py"
        />

        <h2 id="transition-rules" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Dynamic Transition Rules
        </h2>
        <p>
          Real behaviors are frequently non-stationary: an agent transitions only when a metric crosses a
          threshold. BehaviorSim supports <code className="font-mono text-foreground">TransitionRule</code> objects
          that evaluate conditions over historical feature values.
        </p>

        <h2 id="supported-operators" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Supported Operators &amp; Aggregations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 rounded border border-border bg-surface space-y-1">
            <div className="font-semibold text-xs text-foreground">Comparison Operators</div>
            <div className="font-mono text-xs text-accent">&lt;, &lt;=, &gt;, &gt;=, ==, !=</div>
          </div>
          <div className="p-3.5 rounded border border-border bg-surface space-y-1">
            <div className="font-semibold text-xs text-foreground">Historical Aggregations</div>
            <div className="font-mono text-xs text-accent">last, sum, max, mean, min</div>
          </div>
        </div>
      </div>
    ),
  },

  // 7. Generation - Overview
  {
    slug: ["generation"],
    path: "/docs/generation",
    title: "Generation Engine Overview",
    description: "How Simulator executes the simulation loop and generates sequence traces.",
    section: "Generation Engine",
    version: "1.0.1",
    headings: [
      { id: "execution-loop", title: "Execution Loop Mechanics", level: 2 },
      { id: "multi-sequence-generation", title: "Multi-Sequence Generation", level: 2 },
      { id: "export-formats", title: "Export Options", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          The <code className="font-mono text-foreground">Simulator</code> class orchestrates state progression,
          feature sampling, and trace aggregation.
        </p>

        <h2 id="execution-loop" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Execution Loop Mechanics
        </h2>
        <p>At each interaction step <code className="font-mono">t</code> in a sequence:</p>
        <ol className="list-decimal pl-5 space-y-1.5 text-xs">
          <li>Evaluate dynamic transition rules against recent interaction history.</li>
          <li>Sample the next state <code className="font-mono">s_t</code> based on transition probabilities.</li>
          <li>For the active state, sample configured feature distributions.</li>
          <li>Evaluate outcome labels or anomaly flags.</li>
          <li>Record the interaction record with sequence and step identifiers.</li>
        </ol>

        <h2 id="multi-sequence-generation" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Multi-Sequence Generation
        </h2>
        <p>
          Pass <code className="font-mono text-foreground">num_sequences</code> to generate multiple independent agent cohorts:
        </p>
        <CodeBlock
          code={`# Generates 100 sequences of 50 interactions each (total 5,000 interaction rows)
df = sim.generate(num_interactions=50, num_sequences=100, seed=123)`}
          language="python"
          filename="multi_seq.py"
        />

        <h2 id="export-formats" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Export Options
        </h2>
        <p>
          Since <code className="font-mono text-foreground">generate()</code> returns a pandas DataFrame, you can
          immediately export traces using standard pandas methods:
        </p>
        <CodeBlock
          code={`df.to_csv("traces.csv", index=False)
df.to_parquet("traces.parquet", index=False)
df.to_json("traces.json", orient="records")`}
          language="python"
          filename="export.py"
        />
      </div>
    ),
  },

  // 8. Generation - Presets
  {
    slug: ["generation", "presets"],
    path: "/docs/generation/presets",
    title: "Domain Presets Reference",
    description: "Detailed specification of the 4 verified built-in domain presets in BehaviorSim.",
    section: "Generation Engine",
    version: "1.0.1",
    headings: [
      { id: "registered-presets", title: "Registered Presets", level: 2 },
      { id: "finance-preset", title: "1. Finance Preset", level: 2 },
      { id: "healthcare-preset", title: "2. Healthcare Preset", level: 2 },
      { id: "education-preset", title: "3. Education Preset", level: 2 },
      { id: "mobile-app-preset", title: "4. Mobile App Preset", level: 2 },
      { id: "scientific-disclaimer", title: "Important Scientific Disclaimers", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          BehaviorSim provides 4 built-in domain presets accessible via{" "}
          <code className="font-mono text-foreground">Simulator.from_preset(name)</code>.
        </p>

        <h2 id="registered-presets" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Registered Presets
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          {["education", "finance", "healthcare", "mobile_app"].map((p) => (
            <div key={p} className="p-3 rounded border border-border bg-surface text-center font-semibold text-accent">
              {p}
            </div>
          ))}
        </div>

        <h2 id="finance-preset" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          1. Finance Preset (<code className="font-mono">finance</code>)
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Profile:</strong> <code className="font-mono">balanced_investor</code></li>
          <li><strong>States:</strong> <code className="font-mono">Stable</code>, <code className="font-mono">Active</code>, <code className="font-mono">Volatile</code>, <code className="font-mono">Drawdown</code>, <code className="font-mono">Recovered</code>, <code className="font-mono">Closed</code></li>
          <li><strong>Features:</strong> <code className="font-mono">portfolio_value</code>, <code className="font-mono">daily_return</code>, <code className="font-mono">transaction_count</code>, <code className="font-mono">trade_volume</code>, <code className="font-mono">volatility</code>, <code className="font-mono">drawdown</code>, <code className="font-mono">risk_alert</code></li>
        </ul>

        <h2 id="healthcare-preset" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          2. Healthcare Preset (<code className="font-mono">healthcare</code>)
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Profile:</strong> <code className="font-mono">stable_patient</code></li>
          <li><strong>States:</strong> <code className="font-mono">Baseline</code>, <code className="font-mono">Elevated</code>, <code className="font-mono">Critical</code>, <code className="font-mono">Recovery</code>, <code className="font-mono">Discharged</code></li>
          <li><strong>Features:</strong> <code className="font-mono">heart_rate_bpm</code>, <code className="font-mono">systolic_bp</code>, <code className="font-mono">spo2_pct</code>, <code className="font-mono">temperature_c</code>, <code className="font-mono">alert_triggered</code>, <code className="font-mono">mobility_score</code></li>
        </ul>

        <h2 id="education-preset" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          3. Education Preset (<code className="font-mono">education</code>)
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Profile:</strong> <code className="font-mono">average</code></li>
          <li><strong>States:</strong> <code className="font-mono">Optimal</code>, <code className="font-mono">Overload</code>, <code className="font-mono">Underload</code></li>
          <li><strong>Features:</strong> <code className="font-mono">difficulty</code>, <code className="font-mono">accuracy</code>, <code className="font-mono">nrt</code>, <code className="font-mono">retries</code>, <code className="font-mono">help_requested</code>, <code className="font-mono">confidence</code></li>
        </ul>

        <h2 id="mobile-app-preset" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          4. Mobile App Preset (<code className="font-mono">mobile_app</code>)
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Profile:</strong> <code className="font-mono">casual_browser</code></li>
          <li><strong>States:</strong> <code className="font-mono">Browsing</code>, <code className="font-mono">ActiveSession</code>, <code className="font-mono">CheckoutFlow</code>, <code className="font-mono">Idle</code>, <code className="font-mono">Churned</code></li>
          <li><strong>Features:</strong> <code className="font-mono">session_time_seconds</code>, <code className="font-mono">action_count</code>, <code className="font-mono">scroll_depth</code>, <code className="font-mono">button_clicks</code>, <code className="font-mono">notification_clicked</code>, <code className="font-mono">cart_value</code></li>
        </ul>

        <h2 id="scientific-disclaimer" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Important Scientific Disclaimers
        </h2>
        <div className="p-4 rounded border border-semantic-warning-border bg-semantic-warning-bg text-xs text-foreground-muted space-y-1.5">
          <div className="font-semibold text-semantic-warning flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            <span>Scope &amp; Validity Notice</span>
          </div>
          <p>
            The built-in presets are calibrated scenario generators designed for software testing and machine learning
            benchmarks. They carry <strong>NO clinical/medical diagnostic validity</strong>, <strong>NO financial market advice validity</strong>,
            and <strong>NO educational pedagogical efficacy certification</strong>.
          </p>
        </div>
      </div>
    ),
  },

  // 9. Interfaces - Python API
  {
    slug: ["interfaces", "python"],
    path: "/docs/interfaces/python",
    title: "Python API Reference",
    description: "Complete public Python API reference for behaviorsim==1.0.1.",
    section: "Python Library",
    version: "1.0.1",
    headings: [
      { id: "simulator-class", title: "Simulator", level: 2 },
      { id: "simulator-from-preset", title: "Simulator.from_preset()", level: 2 },
      { id: "simulator-generate", title: "Simulator.generate()", level: 2 },
      { id: "core-classes", title: "Core Classes (State, Profile)", level: 2 },
      { id: "preset-discovery", title: "Preset Discovery", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          Reference documentation for public classes and functions exported by{" "}
          <code className="font-mono text-foreground">behaviorsim</code>.
        </p>

        <h2 id="simulator-class" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Simulator
        </h2>
        <p className="font-mono text-xs bg-surface-elevated p-3 rounded border border-border">
          behaviorsim.Simulator(states, profile=None, transition_matrix=None, initial_state=None, *, profiles=None, profile_distribution=None)
        </p>
        <p>Domain-neutral simulation engine for generating synthetic behavioral traces.</p>

        <h2 id="simulator-from-preset" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Simulator.from_preset()
        </h2>
        <p className="font-mono text-xs bg-surface-elevated p-3 rounded border border-border">
          classmethod Simulator.from_preset(name: str, **kwargs: Any) -&gt; Simulator
        </p>
        <p>Construct a Simulator from a registered preset name (e.g. &apos;finance&apos;, &apos;healthcare&apos;, &apos;education&apos;, &apos;mobile_app&apos;).</p>

        <h2 id="simulator-generate" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Simulator.generate()
        </h2>
        <p className="font-mono text-xs bg-surface-elevated p-3 rounded border border-border">
          Simulator.generate(num_interactions: int = 100, num_sequences: int = 1, seed: Optional[int] = None) -&gt; pandas.DataFrame
        </p>
        <div className="overflow-x-auto rounded border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-elevated text-foreground border-b border-border">
              <tr>
                <th className="py-2 px-3">Parameter</th>
                <th className="py-2 px-3">Type</th>
                <th className="py-2 px-3">Default</th>
                <th className="py-2 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono">
              <tr>
                <td className="py-2 px-3 text-accent font-semibold">num_interactions</td>
                <td className="py-2 px-3 text-foreground">int</td>
                <td className="py-2 px-3 text-foreground-subtle">100</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Number of interaction steps per sequence</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-accent font-semibold">num_sequences</td>
                <td className="py-2 px-3 text-foreground">int</td>
                <td className="py-2 px-3 text-foreground-subtle">1</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Number of independent sequence cohorts</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-accent font-semibold">seed</td>
                <td className="py-2 px-3 text-foreground">Optional[int]</td>
                <td className="py-2 px-3 text-foreground-subtle">None</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">RNG integer seed for reproducible generation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="core-classes" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Core Classes
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong><code className="font-mono text-foreground">State(name, description=None)</code>:</strong> Discrete state representation.
          </li>
          <li>
            <strong><code className="font-mono text-foreground">Profile(name, transition_matrix=None, ...)</code>:</strong> Agent persona specifying custom priors and parameter sets.
          </li>
          <li>
            <strong><code className="font-mono text-foreground">FeatureDistribution(state, feature, distribution, params)</code>:</strong> Parametric emission specification.
          </li>
        </ul>

        <h2 id="preset-discovery" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Preset Discovery
        </h2>
        <CodeBlock
          code={`import behaviorsim.presets

presets_list = behaviorsim.presets.list_presets()
print(presets_list)
# Output: ['education', 'finance', 'healthcare', 'mobile_app']`}
          language="python"
          filename="discovery.py"
        />
      </div>
    ),
  },

  // 10. Interfaces - CLI
  {
    slug: ["interfaces", "cli"],
    path: "/docs/interfaces/cli",
    title: "Command-Line Interface (CLI)",
    description: "Using the behaviorsim command-line tool for validation and batch simulation.",
    section: "Python Library",
    version: "1.0.1",
    headings: [
      { id: "cli-overview", title: "Overview", level: 2 },
      { id: "behaviorsim-validate", title: "behaviorsim validate", level: 2 },
      { id: "behaviorsim-run", title: "behaviorsim run", level: 2 },
      { id: "cli-flags", title: "Execution Flags", level: 2 },
      { id: "yaml-config", title: "Configuration File Example", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          BehaviorSim provides a native CLI tool executable as <code className="font-mono text-foreground">behaviorsim</code>.
        </p>

        <h2 id="cli-overview" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Overview
        </h2>
        <CodeBlock code="behaviorsim --help" language="bash" filename="terminal" />

        <h2 id="behaviorsim-validate" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          1. behaviorsim validate
        </h2>
        <p>Validates a YAML or JSON configuration file against the schema before execution:</p>
        <CodeBlock code="behaviorsim validate config.yaml" language="bash" filename="terminal" />

        <h2 id="behaviorsim-run" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          2. behaviorsim run
        </h2>
        <p>Executes a simulation from a configuration file and outputs results to stdout or a file:</p>
        <CodeBlock
          code={`# Output to CSV
behaviorsim run config.yaml -o traces.csv --interactions 100 --seed 42

# Output to Apache Parquet
behaviorsim run config.yaml -o traces.parquet --sequences 50`}
          language="bash"
          filename="terminal"
        />

        <h2 id="cli-flags" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Execution Flags
        </h2>
        <div className="overflow-x-auto rounded border border-border">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-elevated text-foreground border-b border-border">
              <tr>
                <th className="py-2 px-3">Flag</th>
                <th className="py-2 px-3">Short</th>
                <th className="py-2 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2 px-3 text-accent font-semibold">--output</td>
                <td className="py-2 px-3 text-foreground">-o</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Target file path (.csv, .json, or .parquet). Default: stdout</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-accent font-semibold">--seed</td>
                <td className="py-2 px-3 text-foreground">-</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Override RNG seed integer</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-accent font-semibold">--interactions</td>
                <td className="py-2 px-3 text-foreground">-</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Number of interaction steps per sequence</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-accent font-semibold">--sequences</td>
                <td className="py-2 px-3 text-foreground">-</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Number of sequences to generate</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-accent font-semibold">--profile</td>
                <td className="py-2 px-3 text-foreground">-</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Target single profile override</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="yaml-config" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Configuration File Example
        </h2>
        <CodeBlock
          code={`# simulation.yaml
seed: 42
states:
  - name: "Active"
    description: "Engaged user"
  - name: "Idle"
    description: "Passive user"
distributions:
  - state: "Active"
    feature: "action_count"
    distribution: "poisson"
    params:
      lam: 6.0`}
          language="yaml"
          filename="simulation.yaml"
        />
      </div>
    ),
  },

  // 11. REST API - Overview
  {
    slug: ["interfaces", "rest"],
    path: "/docs/interfaces/rest",
    title: "REST API Overview & Base URL",
    description: "Architectural overview, base URL, versioning, and standards for the BehaviorSim cloud REST API.",
    section: "REST API",
    version: "1.0.0",
    headings: [
      { id: "production-base-url", title: "Base URL & HTTPS", level: 2 },
      { id: "versioning", title: "API Versioning (/v1)", level: 2 },
      { id: "request-correlation-ids", title: "Request Correlation IDs", level: 2 },
      { id: "format-and-envelopes", title: "Format & Envelopes", level: 2 },
      { id: "interactive-testing", title: "Interactive Testing", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          The BehaviorSim Cloud REST API provides hosted access to simulation execution, registered preset catalogs,
          usage quotas, and developer API key lifecycle management.
        </p>

        <h2 id="production-base-url" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Base URL &amp; HTTPS
        </h2>
        <p>All REST interactions occur exclusively over HTTPS:</p>
        <div className="p-3.5 rounded bg-surface-elevated border border-border font-mono text-xs select-all text-foreground">
          Production: <span className="font-semibold text-accent">https://api.behavioursim.vedaangsharma.in</span>
        </div>
        <p className="text-xs text-foreground-subtle">
          In local development, the API typically binds to <code className="font-mono text-foreground">http://localhost:8000</code>.
        </p>

        <h2 id="versioning" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          API Versioning (/v1)
        </h2>
        <p>
          Core simulation and management endpoints are strictly versioned under the{" "}
          <code className="font-mono text-foreground">/v1</code> prefix (for example,{" "}
          <code className="font-mono text-foreground">/v1/simulations</code> or{" "}
          <code className="font-mono text-foreground">/v1/presets</code>). Non-versioned endpoints are reserved for
          process probes (<code className="font-mono text-foreground">/health</code>,{" "}
          <code className="font-mono text-foreground">/ready</code>).
        </p>

        <h2 id="request-correlation-ids" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Request Correlation IDs (X-Request-ID)
        </h2>
        <p>
          Every response returned by the API includes a unique correlation identifier in the{" "}
          <code className="font-mono text-foreground">X-Request-ID</code> HTTP header. If you encounter an unexpected error,
          include this ID when reporting issues to allow trace identification in system logs.
        </p>

        <h2 id="format-and-envelopes" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Format &amp; Envelopes
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Request Body:</strong> Standard JSON payload (<code className="font-mono">Content-Type: application/json</code>).</li>
          <li><strong>Response Body:</strong> Standard JSON format (<code className="font-mono">Content-Type: application/json</code>).</li>
          <li><strong>Timestamps:</strong> Formatted in ISO-8601 UTC string format (e.g. <code className="font-mono">2026-09-14T00:00:00Z</code>).</li>
        </ul>

        <h2 id="interactive-testing" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Interactive Testing
        </h2>
        <p>
          Try out live requests directly in your browser using the public{" "}
          <Link href="/api" className="text-accent underline font-medium">
            Interactive API Explorer
          </Link>.
        </p>
      </div>
    ),
  },

  // 12. REST API - Authentication
  {
    slug: ["interfaces", "rest", "authentication"],
    path: "/docs/interfaces/rest/authentication",
    title: "REST Authentication & Sessions",
    description: "OAuth 2.0 provider integration and HttpOnly session cookies in BehaviorSim API.",
    section: "REST API",
    version: "1.0.0",
    headings: [
      { id: "auth-model", title: "Dual Authentication Model", level: 2 },
      { id: "oauth-flow", title: "OAuth 2.0 Web Authentication", level: 2 },
      { id: "session-cookie", title: "Session Cookie Specifications", level: 2 },
      { id: "logout", title: "Terminating Sessions (Logout)", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          BehaviorSim API implements two orthogonal authentication schemes:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Browser Sessions:</strong> Powered by OAuth (Google, GitHub) issuing an encrypted <code className="font-mono">behaviorsim_session</code> HttpOnly cookie.</li>
          <li><strong>Programmatic API Keys:</strong> Bearer tokens starting with <code className="font-mono">bs_live_</code> for backend scripts and CLI clients.</li>
        </ul>

        <h2 id="auth-model" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Dual Authentication Model
        </h2>
        <p>
          Protected routes (like <code className="font-mono">/v1/account</code> or <code className="font-mono">/v1/simulations</code>)
          accept either an authenticated browser session cookie or an Authorization Bearer header.
        </p>

        <h2 id="oauth-flow" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          OAuth 2.0 Web Flow
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
          <li>
            <strong>Initiation:</strong> Navigating to <code className="font-mono text-foreground">GET /v1/auth/&#123;provider&#125;</code> (where <code className="font-mono">provider</code> is <code className="font-mono">google</code> or <code className="font-mono">github</code>) generates a CSRF state token and redirects to the identity provider.
          </li>
          <li>
            <strong>Callback:</strong> Provider redirects back to <code className="font-mono text-foreground">GET /v1/auth/&#123;provider&#125;/callback</code> with state and code.
          </li>
          <li>
            <strong>Session Resolution:</strong> API exchanges code for user profile, seeds account if new, creates database session record, and sets <code className="font-mono text-foreground">behaviorsim_session</code> cookie.
          </li>
          <li>
            <strong>Landing Redirect:</strong> Redirects browser to the configured frontend destination (<code className="font-mono text-foreground">/account</code>).
          </li>
        </ol>

        <h2 id="session-cookie" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Session Cookie Specifications
        </h2>
        <div className="overflow-x-auto rounded border border-border">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-elevated text-foreground border-b border-border">
              <tr>
                <th className="py-2 px-3">Property</th>
                <th className="py-2 px-3">Value</th>
                <th className="py-2 px-3">Security Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2 px-3 text-accent font-semibold">Cookie Name</td>
                <td className="py-2 px-3 text-foreground">behaviorsim_session</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Identifies session token</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-accent font-semibold">HttpOnly</td>
                <td className="py-2 px-3 text-foreground">true</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Prevents JavaScript XSS extraction</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-accent font-semibold">SameSite</td>
                <td className="py-2 px-3 text-foreground">Lax</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Protects against Cross-Site Request Forgery</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-accent font-semibold">Secure</td>
                <td className="py-2 px-3 text-foreground">true (in prod)</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Encrypted in transit over HTTPS</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-accent font-semibold">Max-Age</td>
                <td className="py-2 px-3 text-foreground">604800 (7 days)</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Automatic expiration window</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="logout" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Terminating Sessions (Logout)
        </h2>
        <p>Issuing <code className="font-mono text-foreground">POST /v1/auth/logout</code> invalidates the database session and clears the client cookie:</p>
        <CodeBlock
          code={`curl -X POST https://api.behavioursim.vedaangsharma.in/v1/auth/logout \\
  -H "Accept: application/json" \\
  --cookie "behaviorsim_session=..."`}
          language="bash"
          filename="terminal"
        />
      </div>
    ),
  },

  // 13. REST API - API Keys
  {
    slug: ["interfaces", "rest", "api-keys"],
    path: "/docs/interfaces/rest/api-keys",
    title: "API Key Management & Lifecycle",
    description: "Creating, authenticating with, listing, and revoking developer API keys in BehaviorSim.",
    section: "REST API",
    version: "1.0.0",
    headings: [
      { id: "api-key-format", title: "API Key Format", level: 2 },
      { id: "authenticating-requests", title: "Authenticating Requests", level: 2 },
      { id: "api-key-lifecycle", title: "Lifecycle Operations", level: 2 },
      { id: "security-guidelines", title: "Security Best Practices", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          Developer API keys allow automated scripts, CLI executions, and backend microservices to interact
          with BehaviorSim without user intervention.
        </p>

        <div className="p-4 rounded border border-border bg-surface-elevated/40 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-foreground block">Need an API key?</span>
            <span className="text-foreground-muted">Generate, inspect, and revoke developer keys directly in your account dashboard.</span>
          </div>
          <Link
            href="/account"
            className="px-3 py-1.5 rounded bg-primary text-primary-foreground font-medium text-xs hover:opacity-90 transition-opacity shrink-0 text-center"
          >
            Manage API Keys &rarr;
          </Link>
        </div>

        <h2 id="api-key-format" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          API Key Format
        </h2>
        <p>
          All developer API keys generated by BehaviorSim use a standard deterministic prefix:
        </p>
        <div className="p-3.5 rounded bg-surface-elevated border border-border font-mono text-xs select-all text-foreground">
          Format: <span className="font-semibold text-accent">bs_live_&lt;32-char-random-secret&gt;</span>
        </div>

        <h2 id="authenticating-requests" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Authenticating Requests
        </h2>
        <p>Pass your raw API key in the <code className="font-mono text-foreground">Authorization</code> HTTP request header using the standard Bearer scheme:</p>
        <CodeBlock
          code={`curl -X POST https://api.behavioursim.vedaangsharma.in/v1/simulations \\
  -H "Authorization: Bearer bs_live_xxxxxxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"preset": "finance", "num_interactions": 50}'`}
          language="bash"
          filename="terminal"
        />

        <h2 id="api-key-lifecycle" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Lifecycle Operations
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>
            <strong>Creation (<code className="font-mono">POST /v1/api-keys</code>):</strong> Generates a key record and returns the raw secret string exactly once.
          </li>
          <li>
            <strong>Listing (<code className="font-mono">GET /v1/api-keys</code>):</strong> Returns metadata (ID, name, prefix, creation date, last used date). Raw secrets are never stored in plaintext and cannot be retrieved after creation.
          </li>
          <li>
            <strong>Revocation (<code className="font-mono">DELETE /v1/api-keys/&#123;id&#125;</code>):</strong> Immediately deactivates the key from authenticating future requests.
          </li>
        </ul>

        <h2 id="security-guidelines" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Security Best Practices
        </h2>
        <div className="p-4 rounded border border-semantic-warning-border bg-semantic-warning-bg text-xs text-foreground-muted space-y-2">
          <div className="font-semibold text-semantic-warning flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            <span>Never Commit API Keys to Public Source Repositories</span>
          </div>
          <p>
            Always load your API key from environment variables (e.g. <code className="font-mono text-foreground">BEHAVIORSIM_API_KEY</code>).
            Never hardcode API keys into client-side browser code or public GitHub repositories.
          </p>
        </div>
      </div>
    ),
  },

  // 14. REST API - Endpoints Reference
  {
    slug: ["interfaces", "rest", "endpoints"],
    path: "/docs/interfaces/rest/endpoints",
    title: "REST Endpoints Catalog",
    description: "Complete reference for all endpoints implemented in BehaviorSim API v1.",
    section: "REST API",
    version: "1.0.0",
    headings: [
      { id: "health-probes", title: "1. Health & Readiness Probes", level: 2 },
      { id: "preset-catalog", title: "2. Presets Catalog", level: 2 },
      { id: "simulation-execution", title: "3. Simulation Execution", level: 2 },
      { id: "account-and-usage", title: "4. Account & Usage Accounting", level: 2 },
      { id: "api-key-management", title: "5. API Key Management", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          Complete reference for all HTTP endpoints verified against the BehaviorSim API codebase.
        </p>

        {/* 1. Health */}
        <h2 id="health-probes" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          1. Health &amp; Readiness Probes
        </h2>

        <ApiEndpointCard
          method="GET"
          path="/health"
          title="Process Liveness Probe"
          description="Lightweight liveness check verifying the application process is running. Performs no database calls."
          auth="Public"
          responseBody={`{
  "status": "ok",
  "version": "1.0.0"
}`}
          curlExample="curl -s https://api.behavioursim.vedaangsharma.in/health"
        />

        <ApiEndpointCard
          method="GET"
          path="/ready"
          title="Service Readiness Probe"
          description="Readiness probe verifying the service can accept traffic by executing a database connectivity check."
          auth="Public"
          responseBody={`{
  "status": "ready",
  "database": "connected",
  "version": "1.0.0"
}`}
          statusCodes={[
            { code: 200, description: "Service is fully operational" },
            { code: 503, description: "Database is unavailable or connection timed out" },
          ]}
          curlExample="curl -s https://api.behavioursim.vedaangsharma.in/ready"
        />

        {/* 2. Presets */}
        <h2 id="preset-catalog" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          2. Presets Catalog
        </h2>

        <ApiEndpointCard
          method="GET"
          path="/v1/presets"
          title="List Simulation Presets"
          description="Retrieve the public catalog of all available simulation presets, supported cohorts, and states."
          auth="Public"
          responseBody={`[
  {
    "name": "education",
    "description": "Adaptive learning telemetry modeling cognitive load and mastery.",
    "available": true,
    "default_profile": "average",
    "supported_profiles": ["average", "fast_accurate", "fast_inaccurate", "slow_accurate", "slow_inaccurate"],
    "supported_states": ["Optimal", "Overload", "Underload"]
  },
  {
    "name": "finance",
    "description": "Synthetic behavioral telemetry for financial trading and risk alerts.",
    "available": true,
    "default_profile": "balanced_investor",
    "supported_profiles": ["conservative_investor", "balanced_investor", "growth_investor", "active_trader"],
    "supported_states": ["Stable", "Active", "Volatile", "Drawdown", "Recovered", "Closed"]
  }
]`}
          curlExample="curl -s https://api.behavioursim.vedaangsharma.in/v1/presets"
        />

        <ApiEndpointCard
          method="GET"
          path="/v1/presets/{preset}"
          title="Get Preset Metadata"
          description="Retrieve detailed configuration metadata for a specific preset by name or alias (e.g. 'mobile')."
          auth="Public"
          parameters={[
            { name: "preset", type: "string (path)", required: true, description: "Preset name (e.g. 'education', 'finance', 'healthcare', 'mobile_app', 'mobile')" },
          ]}
          responseBody={`{
  "name": "finance",
  "description": "Synthetic behavioral telemetry for financial trading, risk alerts, drawdowns, and portfolio volatility.",
  "available": true,
  "default_profile": "balanced_investor",
  "supported_profiles": ["conservative_investor", "balanced_investor", "growth_investor", "active_trader"],
  "supported_states": ["Stable", "Active", "Volatile", "Drawdown", "Recovered", "Closed"]
}`}
          statusCodes={[
            { code: 200, description: "Preset metadata resolved" },
            { code: 404, description: "Preset not found" },
          ]}
          curlExample="curl -s https://api.behavioursim.vedaangsharma.in/v1/presets/finance"
        />

        {/* 3. Simulations */}
        <h2 id="simulation-execution" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          3. Simulation Execution
        </h2>

        <div className="p-4 rounded border border-border bg-surface-elevated/40 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-foreground block">Test interactively in the browser</span>
            <span className="text-foreground-muted">Configure presets, execute runs, and inspect tabular data in the BehaviorSim Playground.</span>
          </div>
          <Link
            href="/playground"
            className="px-3 py-1.5 rounded bg-primary text-primary-foreground font-medium text-xs hover:opacity-90 transition-opacity shrink-0 text-center"
          >
            Launch Playground &rarr;
          </Link>
        </div>

        <ApiEndpointCard
          method="POST"
          path="/v1/simulations"
          title="Execute Behavioral Simulation"
          description="Authenticate caller, verify quota, and execute a behavioral simulation run using the BehaviorSim engine."
          auth="Session Cookie or API Key"
          rateLimit="5 req/min, 1,000 interactions/req"
          requestBody={`{
  "preset": "finance",
  "num_interactions": 10,
  "seed": 42,
  "profile": "balanced_investor"
}`}
          responseBody={`{
  "simulation_id": "sim_9f8d7c6b5a4",
  "preset": "finance",
  "num_interactions": 10,
  "seed": 42,
  "data": [
    {
      "sequence_id": 1,
      "interaction_id": 0,
      "state": "Stable",
      "portfolio_value": 1004.2,
      "daily_return": 0.0042,
      "risk_alert": 0
    }
  ],
  "metadata": {
    "behaviorsim_version": "1.0.1",
    "api_version": "1.0.0",
    "compute_ms": 28,
    "reproducible": true
  }
}`}
          statusCodes={[
            { code: 200, description: "Simulation executed successfully" },
            { code: 400, description: "Interaction limit exceeded per request" },
            { code: 401, description: "Missing or invalid credentials" },
            { code: 403, description: "Monthly interaction quota exhausted" },
            { code: 429, description: "Rate limit exceeded (5 requests/minute)" },
          ]}
          curlExample={`curl -X POST https://api.behavioursim.vedaangsharma.in/v1/simulations \\
  -H "Authorization: Bearer bs_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"preset": "finance", "num_interactions": 10, "seed": 42}'`}
        />

        {/* 4. Account & Usage */}
        <h2 id="account-and-usage" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          4. Account &amp; Usage Accounting
        </h2>

        <ApiEndpointCard
          method="GET"
          path="/v1/account"
          title="Retrieve Account Profile"
          description="Returns authenticated user profile, linked identity providers, and active subscription plan."
          auth="Session Cookie or API Key"
          responseBody={`{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "email": "user@example.com",
  "display_name": "Jane Doe",
  "is_active": true,
  "created_at": "2026-09-13T12:00:00Z",
  "authentication_methods": ["github"],
  "plan": "free"
}`}
        />

        <ApiEndpointCard
          method="GET"
          path="/v1/usage"
          title="Retrieve Monthly Quota & Usage"
          description="Returns current monthly requests, interaction consumption, plan limits, and remaining entitlements."
          auth="Session Cookie or API Key"
          responseBody={`{
  "plan": {
    "name": "free",
    "monthly_requests": 100,
    "monthly_interactions": 10000,
    "max_interactions_per_request": 1000,
    "requests_per_minute": 5,
    "max_concurrent_simulations": 1
  },
  "period": {
    "start": "2026-09-01T00:00:00Z",
    "end": "2026-10-01T00:00:00Z"
  },
  "usage": {
    "requests": 14,
    "interactions": 700
  },
  "remaining": {
    "requests": 86,
    "interactions": 9300
  }
}`}
        />

        {/* 5. API Keys */}
        <h2 id="api-key-management" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          5. API Key Management
        </h2>

        <ApiEndpointCard
          method="GET"
          path="/v1/api-keys"
          title="List API Keys"
          description="Returns all active and revoked API key metadata for the authenticated user."
          auth="Session Cookie or API Key"
          responseBody={`[
  {
    "id": "key_uuid_1",
    "name": "CI Pipeline",
    "key_prefix": "bs_live_a1b2c3",
    "is_active": true,
    "created_at": "2026-09-13T14:30:00Z",
    "last_used_at": "2026-09-13T18:45:00Z",
    "revoked_at": null
  }
]`}
        />

        <ApiEndpointCard
          method="POST"
          path="/v1/api-keys"
          title="Create Developer API Key"
          description="Generate a new API key. The raw secret string is returned exactly once in this response."
          auth="Session Cookie or API Key"
          requestBody={`{
  "name": "Local Development Key"
}`}
          responseBody={`{
  "id": "key_uuid_2",
  "name": "Local Development Key",
  "key": "bs_live_9f8e7d6c5b4a3210987654321fedcba",
  "key_prefix": "bs_live_9f8e7d",
  "created_at": "2026-09-14T00:15:00Z"
}`}
          statusCodes={[
            { code: 201, description: "Key created successfully" },
            { code: 409, description: "Maximum active API keys limit (1 on Free plan) exceeded" },
          ]}
        />

        <ApiEndpointCard
          method="DELETE"
          path="/v1/api-keys/{key_id}"
          title="Revoke Developer API Key"
          description="Immediately revokes and disables an API key. Once revoked, it cannot be reactivated."
          auth="Session Cookie or API Key"
          parameters={[
            { name: "key_id", type: "UUID (path)", required: true, description: "Unique ID of the API key to revoke" },
          ]}
          responseBody={`{
  "status": "revoked",
  "id": "key_uuid_2"
}`}
          statusCodes={[
            { code: 200, description: "Key successfully revoked" },
            { code: 404, description: "Key not found or not owned by user" },
          ]}
        />
      </div>
    ),
  },

  // 15. REST API - Errors & Status Codes
  {
    slug: ["interfaces", "rest", "errors"],
    path: "/docs/interfaces/rest/errors",
    title: "Errors & Status Codes",
    description: "Structured error response envelope, HTTP status code meanings, and request correlation IDs.",
    section: "REST API",
    version: "1.0.0",
    headings: [
      { id: "error-envelope", title: "Standard Error Envelope", level: 2 },
      { id: "status-codes", title: "HTTP Status Codes", level: 2 },
      { id: "validation-errors", title: "Validation Errors (422)", level: 2 },
      { id: "reporting-issues", title: "Reporting Issues with Request IDs", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          BehaviorSim API formats all client and server errors into a predictable JSON envelope matching
          application-level exceptions.
        </p>

        <h2 id="error-envelope" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Standard Error Envelope
        </h2>
        <CodeBlock
          code={`{
  "error": {
    "message": "Missing or invalid authentication credentials.",
    "status_code": 401,
    "details": {},
    "request_id": "req_8f7e6d5c4b3a2"
  }
}`}
          language="json"
          filename="error_response.json"
        />

        <h2 id="status-codes" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          HTTP Status Codes
        </h2>
        <div className="overflow-x-auto rounded border border-border">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-elevated text-foreground border-b border-border">
              <tr>
                <th className="py-2 px-3">Code</th>
                <th className="py-2 px-3">Meaning</th>
                <th className="py-2 px-3">Cause / Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2 px-3 font-bold text-accent">400</td>
                <td className="py-2 px-3 text-foreground font-sans">Bad Request</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Interaction count exceeds per-request limit (1,000)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-accent">401</td>
                <td className="py-2 px-3 text-foreground font-sans">Unauthorized</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Invalid or missing API key or session cookie</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-accent">403</td>
                <td className="py-2 px-3 text-foreground font-sans">Forbidden</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Monthly interactions quota exhausted or inactive user</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-accent">404</td>
                <td className="py-2 px-3 text-foreground font-sans">Not Found</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Preset name or API key ID does not exist</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-accent">409</td>
                <td className="py-2 px-3 text-foreground font-sans">Conflict</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Active API key count limit (1 on Free tier) exceeded</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-accent">422</td>
                <td className="py-2 px-3 text-foreground font-sans">Unprocessable Entity</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Request parameters failed schema validation (type mismatch)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-accent">429</td>
                <td className="py-2 px-3 text-foreground font-sans">Too Many Requests</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Sliding-window rate limit (5 req/min) exceeded; see Retry-After header</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-accent">503</td>
                <td className="py-2 px-3 text-foreground font-sans">Service Unavailable</td>
                <td className="py-2 px-3 font-sans text-foreground-muted">Database connectivity lost during readiness check</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="validation-errors" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Validation Errors (422)
        </h2>
        <p>When input validation fails, details contains an array specifying the exact parameter location:</p>
        <CodeBlock
          code={`{
  "error": {
    "message": "Invalid request parameters.",
    "status_code": 422,
    "details": {
      "errors": [
        {
          "loc": ["body", "num_interactions"],
          "msg": "Input should be greater than or equal to 1",
          "type": "greater_than_equal"
        }
      ]
    },
    "request_id": "req_10101"
  }
}`}
          language="json"
          filename="validation_error.json"
        />

        <h2 id="reporting-issues" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Reporting Issues with Request IDs
        </h2>
        <p>
          Always copy the <code className="font-mono text-foreground">request_id</code> from the error payload or the{" "}
          <code className="font-mono text-foreground">X-Request-ID</code> header when opening an issue on GitHub.
        </p>
      </div>
    ),
  },

  // 16. REST API - Rate Limits & Quotas
  {
    slug: ["interfaces", "rest", "rate-limits"],
    path: "/docs/interfaces/rest/rate-limits",
    title: "Rate Limits & Usage Quotas",
    description: "Free tier plan entitlements, sliding-window rate limiters, and Retry-After headers.",
    section: "REST API",
    version: "1.0.0",
    headings: [
      { id: "free-plan-entitlements", title: "Free Plan Entitlements", level: 2 },
      { id: "rate-limits-vs-quotas", title: "Rate Limits vs. Monthly Quotas", level: 2 },
      { id: "handling-429", title: "Handling HTTP 429 & Retry-After", level: 2 },
      { id: "monitoring-usage", title: "Monitoring Usage", level: 2 },
    ],
    content: (
      <div className="space-y-6 text-sm text-foreground-muted leading-relaxed">
        <p>
          BehaviorSim enforces fair-use rate limits and monthly quotas to ensure dependable availability.
        </p>

        <h2 id="free-plan-entitlements" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Free Plan Entitlements
        </h2>
        <p>Verified default limits for all standard developer accounts:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 rounded border border-border bg-surface space-y-1">
            <div className="text-[11px] text-foreground-subtle uppercase tracking-wider">Short-Term Rate Limit</div>
            <div className="text-xl font-bold text-foreground">5 req / min</div>
            <div className="text-[11px] text-foreground-muted">Sliding-window limiter</div>
          </div>
          <div className="p-4 rounded border border-border bg-surface space-y-1">
            <div className="text-[11px] text-foreground-subtle uppercase tracking-wider">Monthly Request Quota</div>
            <div className="text-xl font-bold text-foreground">100 req / mo</div>
            <div className="text-[11px] text-foreground-muted">Resets on 1st of month</div>
          </div>
          <div className="p-4 rounded border border-border bg-surface space-y-1">
            <div className="text-[11px] text-foreground-subtle uppercase tracking-wider">Monthly Interactions</div>
            <div className="text-xl font-bold text-foreground">10,000 / mo</div>
            <div className="text-[11px] text-foreground-muted">Total generated steps</div>
          </div>
          <div className="p-4 rounded border border-border bg-surface space-y-1">
            <div className="text-[11px] text-foreground-subtle uppercase tracking-wider">Max Per Request</div>
            <div className="text-xl font-bold text-foreground">1,000 steps</div>
            <div className="text-[11px] text-foreground-muted">Per simulation payload</div>
          </div>
          <div className="p-4 rounded border border-border bg-surface space-y-1">
            <div className="text-[11px] text-foreground-subtle uppercase tracking-wider">Concurrency</div>
            <div className="text-xl font-bold text-foreground">1 simulation</div>
            <div className="text-[11px] text-foreground-muted">Simultaneous execution</div>
          </div>
          <div className="p-4 rounded border border-border bg-surface space-y-1">
            <div className="text-[11px] text-foreground-subtle uppercase tracking-wider">Developer Keys</div>
            <div className="text-xl font-bold text-foreground">1 active key</div>
            <div className="text-[11px] text-foreground-muted">Per free user account</div>
          </div>
        </div>

        <h2 id="rate-limits-vs-quotas" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Rate Limits vs. Monthly Quotas
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>
            <strong>Rate Limit (5 req/min):</strong> Protects compute resources against bursts. Exceeding this returns <code className="font-mono text-foreground">HTTP 429 Too Many Requests</code> with a <code className="font-mono text-foreground">Retry-After</code> header.
          </li>
          <li>
            <strong>Monthly Quota (10,000 interactions):</strong> Monthly allowance. Exceeding this returns <code className="font-mono text-foreground">HTTP 403 Forbidden</code> until the next billing calendar cycle.
          </li>
        </ul>

        <h2 id="handling-429" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Handling HTTP 429 &amp; Retry-After
        </h2>
        <p>When throttled, inspect the <code className="font-mono text-foreground">Retry-After</code> header to delay subsequent attempts:</p>
        <CodeBlock
          code={`HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 48
X-Request-ID: req_rate_limit_001

{
  "error": {
    "message": "Rate limit exceeded. Maximum allowed: 5 requests per minute.",
    "status_code": 429,
    "details": {
      "code": "rate_limit_exceeded",
      "limit": 5,
      "retry_after": 48
    },
    "request_id": "req_rate_limit_001"
  }
}`}
          language="json"
          filename="rate_limit_response.json"
        />

        <h2 id="monitoring-usage" className="text-xl font-semibold tracking-tight text-foreground pt-4">
          Monitoring Usage
        </h2>
        <p>
          You can programmatically query your remaining request and interaction quotas at any time by calling{" "}
          <Link href="/docs/interfaces/rest/endpoints#account-and-usage" className="text-accent underline font-mono">
            GET /v1/usage
          </Link>.
        </p>
      </div>
    ),
  },
];

export function getDocPageBySlug(slug: string[]): DocPage | undefined {
  const path = `/docs/${slug.join("/")}`;
  return DOC_PAGES.find((page) => page.path === path);
}
