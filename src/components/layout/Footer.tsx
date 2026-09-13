import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface text-foreground-muted text-xs">
      <Container size="default" className="py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Project Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Project
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-foreground transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/releases" className="hover:text-foreground transition-colors">
                  Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://pypi.org/project/behaviorsim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Python Package (PyPI)
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <Link href="/api" className="hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/examples" className="hover:text-foreground transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/gtathelegend/BehaviourSim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  GitHub Repository
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Scientific Foundation Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Methodology
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/concepts" className="hover:text-foreground transition-colors">
                  Markov Modeling
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-foreground transition-colors">
                  Mathematical Framework
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-foreground transition-colors">
                  Capability Matrix
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="hover:text-foreground transition-colors">
                  Domain Presets
                </Link>
              </li>
              <li>
                <a
                  href="https://api.behavioursim.vedaangsharma.in/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  API Service Status
                </a>
              </li>
            </ul>
          </div>

          {/* Project Summary */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="w-2.5 h-2.5 rounded-sm bg-accent inline-block" />
              <span>BehaviorSim</span>
            </div>
            <p className="text-xs leading-relaxed text-foreground-subtle">
              An open-source scientific framework for stochastic behavioral simulation and synthetic
              sequential data generation.
            </p>
            <div className="pt-1">
              <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-surface-elevated border border-border text-foreground-muted">
                behaviorsim==1.0.1
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with License */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-foreground-subtle">
          <div>
            Released under the{" "}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              MIT License
            </a>
            . BehaviorSim Open Source Contributors.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/gtathelegend/BehaviourSim"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="https://pypi.org/project/behaviorsim/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              PyPI
            </a>
            <span>·</span>
            <a
              href="https://api.behavioursim.vedaangsharma.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              API Base
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
