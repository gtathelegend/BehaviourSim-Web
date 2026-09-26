import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Github, Code2, BookOpen } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, SITE_CONFIG } from "@/lib/seo/config";
import { getPersonSchema, getBreadcrumbListSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "About — Vedaang Sharma, Creator of BehaviourSim",
  description:
    "Vedaang Sharma is the creator and maintainer of BehaviourSim, an open-source Python framework and cloud API for reproducible synthetic sequential behavioral data generation.",
  path: "/about",
  keywords: [
    "Vedaang Sharma",
    "BehaviourSim creator",
    "BehaviourSim maintainer",
    "open-source developer",
    "synthetic data",
    "Python framework author",
  ],
});

export default function AboutPage() {
  const breadcrumbsSchema = getBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <>
      <JsonLd data={[getPersonSchema(), breadcrumbsSchema]} />

      <div className="flex flex-col">
        {/* Page Header */}
        <header className="border-b border-border bg-tech-grid py-14 sm:py-20">
          <Container size="default">
            <div className="max-w-3xl space-y-4">
              <Badge variant="default" size="md">
                Creator &amp; Maintainer
              </Badge>
              <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
                Vedaang Sharma
              </h1>
              <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
                Creator and maintainer of BehaviourSim — an open-source scientific Python framework
                and cloud API for generating reproducible synthetic sequential behavioral data.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  href={SITE_CONFIG.author.url}
                  external
                >
                  Personal Website
                  <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  href={SITE_CONFIG.author.github}
                  external
                >
                  <Github className="w-3.5 h-3.5 mr-1" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  href="https://www.linkedin.com/in/vedaangsharma2006/"
                  external
                >
                  LinkedIn
                  <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                </Button>
              </div>
            </div>
          </Container>
        </header>

        {/* About Content */}
        <section className="py-16 border-b border-border">
          <Container size="default">
            <div className="max-w-3xl space-y-10">

              {/* Creator relationship */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">BehaviourSim</h2>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  BehaviourSim is an open-source project created by Vedaang Sharma. It provides a
                  Python framework and REST API for generating controlled, reproducible synthetic
                  sequential behavioral data — enabling researchers and engineers to build and test
                  data pipelines without using real user data.
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  The project models agent behavior as discrete Markov state machines with
                  state-conditioned parametric feature emissions, and is distributed as the{" "}
                  <code className="font-mono text-foreground text-xs">behaviorsim</code> package on
                  PyPI under the MIT License.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={SITE_CONFIG.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    Source Code on GitHub
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                  <a
                    href={SITE_CONFIG.pypi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
                  >
                    Python Package on PyPI
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                  <Link
                    href="/docs"
                    className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Documentation
                  </Link>
                </div>
              </div>

              {/* Verified identities */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Links</h2>
                <ul className="space-y-2 text-sm text-foreground-muted">
                  <li>
                    <span className="text-foreground-subtle font-medium">Personal website: </span>
                    <a
                      href={SITE_CONFIG.author.url}
                      rel="author"
                      target="_blank"
                      className="text-accent hover:underline"
                    >
                      vedaangsharma.in
                      <ExternalLink className="w-3 h-3 ml-1 inline opacity-60" />
                    </a>
                  </li>
                  <li>
                    <span className="text-foreground-subtle font-medium">GitHub: </span>
                    <a
                      href={SITE_CONFIG.author.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      github.com/gtathelegend
                      <ExternalLink className="w-3 h-3 ml-1 inline opacity-60" />
                    </a>
                  </li>
                  <li>
                    <span className="text-foreground-subtle font-medium">PyPI: </span>
                    <a
                      href="https://pypi.org/user/vedaangsharma2006/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      pypi.org/user/vedaangsharma2006
                      <ExternalLink className="w-3 h-3 ml-1 inline opacity-60" />
                    </a>
                  </li>
                  <li>
                    <span className="text-foreground-subtle font-medium">LinkedIn: </span>
                    <a
                      href="https://www.linkedin.com/in/vedaangsharma2006/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      linkedin.com/in/vedaangsharma2006
                      <ExternalLink className="w-3 h-3 ml-1 inline opacity-60" />
                    </a>
                  </li>
                  <li>
                    <span className="text-foreground-subtle font-medium">Contact: </span>
                    <a
                      href={`mailto:${SITE_CONFIG.author.email}`}
                      className="text-accent hover:underline"
                    >
                      {SITE_CONFIG.author.email}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Project navigation */}
              <div className="p-5 rounded-lg border border-border bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Explore BehaviourSim</p>
                  <p className="text-xs text-foreground-muted">
                    Documentation, methodology, features, and interactive playground.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="outline" size="sm" href="/docs">
                    Documentation
                  </Button>
                  <Button variant="primary" size="sm" href="/">
                    Home
                  </Button>
                </div>
              </div>

            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
