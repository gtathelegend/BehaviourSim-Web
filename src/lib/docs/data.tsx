import React from "react";
import Link from "next/link";
import { DocPage } from "./types";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { AlertCircle, Terminal, CheckCircle2, ShieldAlert } from "lucide-react";

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
          <li><strong>State Machine & Transition Rules:</strong> Manages state migration, transition probabilities, and temporal inertia.</li>
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
          State Lifecycle & Absorbing States
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
          Supported Operators & Aggregations
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
            <span>Scope & Validity Notice</span>
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
    section: "Interfaces",
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
    section: "Interfaces",
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
];

export function getDocPageBySlug(slug: string[]): DocPage | undefined {
  const path = `/docs/${slug.join("/")}`;
  return DOC_PAGES.find((page) => page.path === path);
}
