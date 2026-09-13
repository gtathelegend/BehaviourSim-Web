import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Terminal,
  Layers,
  Database,
  ExternalLink,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsBreadcrumbs } from "@/components/docs/DocsBreadcrumbs";
import { DocsTableOfContents } from "@/components/docs/DocsTableOfContents";
import { DocsPagination } from "@/components/docs/DocsPagination";
import { getDocPagination } from "@/lib/docs/navigation";

export const metadata: Metadata = {
  title: "Documentation Overview — BehaviorSim",
  description:
    "Official documentation for BehaviorSim: guides, API references, mathematical concepts, domain presets, and CLI tooling for synthetic behavioral data generation.",
  alternates: {
    canonical: "https://behavioursim.vedaangsharma.in/docs",
  },
};

export default function DocsHomePage() {
  const headings = [
    { id: "what-is-behaviorsim", title: "What is BehaviorSim?", level: 2 as const },
    { id: "who-is-this-for", title: "Who is This Documentation For?", level: 2 as const },
    { id: "quick-install", title: "Quick Installation", level: 2 as const },
    { id: "documentation-topics", title: "Key Documentation Areas", level: 2 as const },
    { id: "verified-package", title: "Package Verification & Source", level: 2 as const },
  ];

  const pagination = getDocPagination("/docs");

  return (
    <div className="flex flex-col xl:flex-row gap-10 items-start">
      <div className="flex-1 min-w-0">
        <DocsBreadcrumbs items={[{ title: "Documentation", href: "/docs" }]} />

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm">
              Documentation Hub
            </Badge>
            <Badge variant="code" size="sm">
              behaviorsim==1.0.1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            BehaviorSim Documentation
          </h1>
          <p className="text-base text-foreground-muted leading-relaxed">
            Welcome to the official technical documentation for BehaviorSim—an open-source Python framework
            and cloud API for generating synthetic sequential behavioral data.
          </p>
        </div>

        <div className="space-y-8 text-sm text-foreground-muted leading-relaxed">
          {/* Section: What is BehaviorSim */}
          <div>
            <h2 id="what-is-behaviorsim" className="text-xl font-semibold tracking-tight text-foreground pt-2 mb-3">
              What is BehaviorSim?
            </h2>
            <p>
              BehaviorSim generates sequential data by modeling agents as discrete state machines. At each
              step, an agent transitions according to stochastic Markov probabilities or rule conditions, emitting
              continuous and discrete features calibrated for specific domains (finance, healthcare, education, mobile apps).
            </p>
          </div>

          {/* Section: Who is this for */}
          <div>
            <h2 id="who-is-this-for" className="text-xl font-semibold tracking-tight text-foreground pt-2 mb-3">
              Who is This Documentation For?
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Researchers:</strong> Prototyping sequential algorithms, testing Markov state estimators, and studying latent recovery.</li>
              <li><strong>Machine Learning Engineers:</strong> Building feature pipelines, testing recurrent models, and evaluating drift detection without sensitive user data.</li>
              <li><strong>Software Engineers:</strong> Stress-testing data ingestion queues, running integration suites, and seeding staging databases.</li>
            </ul>
          </div>

          {/* Section: Quick Install */}
          <div>
            <h2 id="quick-install" className="text-xl font-semibold tracking-tight text-foreground pt-2 mb-3">
              Quick Installation
            </h2>
            <CodeBlock code="pip install behaviorsim==1.0.1" language="bash" filename="terminal" />
            <p className="text-xs text-foreground-subtle mt-2">
              Requires Python &gt;= 3.9. Learn more in the{" "}
              <Link href="/docs/getting-started/installation" className="text-accent underline">
                Installation Guide
              </Link>.
            </p>
          </div>

          {/* Section: Key Areas */}
          <div>
            <h2 id="documentation-topics" className="text-xl font-semibold tracking-tight text-foreground pt-2 mb-3">
              Key Documentation Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <Link href="/docs/getting-started" className="block group">
                <Card variant="default" className="h-full group-hover:border-border-strong transition-colors">
                  <CardHeader>
                    <div className="w-7 h-7 rounded border border-border flex items-center justify-center text-accent mb-1">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>Getting Started</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                    </CardTitle>
                    <CardDescription>
                      Install the package, set up virtual environments, and generate your first simulation trace.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/docs/concepts" className="block group">
                <Card variant="default" className="h-full group-hover:border-border-strong transition-colors">
                  <CardHeader>
                    <div className="w-7 h-7 rounded border border-border flex items-center justify-center text-accent mb-1">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>Core Concepts</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                    </CardTitle>
                    <CardDescription>
                      Understand discrete states, transition matrices, condition rules, and parametric emissions.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/docs/generation/presets" className="block group">
                <Card variant="default" className="h-full group-hover:border-border-strong transition-colors">
                  <CardHeader>
                    <div className="w-7 h-7 rounded border border-border flex items-center justify-center text-accent mb-1">
                      <Database className="w-3.5 h-3.5" />
                    </div>
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>Domain Presets</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                    </CardTitle>
                    <CardDescription>
                      Explore the 4 verified presets: finance, healthcare, education, and mobile application.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/docs/interfaces/python" className="block group">
                <Card variant="default" className="h-full group-hover:border-border-strong transition-colors">
                  <CardHeader>
                    <div className="w-7 h-7 rounded border border-border flex items-center justify-center text-accent mb-1">
                      <Terminal className="w-3.5 h-3.5" />
                    </div>
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>Python API & CLI</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                    </CardTitle>
                    <CardDescription>
                      Method signatures for Simulator, State, FeatureDistribution, and behaviorsim CLI flags.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>

          {/* Section: Package Source */}
          <div className="pt-2">
            <h2 id="verified-package" className="text-xl font-semibold tracking-tight text-foreground pt-2 mb-3">
              Package Verification & Source
            </h2>
            <div className="p-4 rounded-lg border border-border bg-surface-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-foreground text-xs">BehaviorSim 1.0.1 on PyPI & GitHub</div>
                <div className="text-xs text-foreground-subtle mt-0.5">
                  Released under the permissive MIT License. Maintained by open-source contributors.
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  href="https://pypi.org/project/behaviorsim/"
                  external
                >
                  PyPI <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  href="https://github.com/gtathelegend/BehaviourSim"
                  external
                >
                  GitHub <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DocsPagination prev={pagination.prev} next={pagination.next} />
      </div>

      <DocsTableOfContents headings={headings} />
    </div>
  );
}
