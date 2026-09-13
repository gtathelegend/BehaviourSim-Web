import Link from "next/link";
import { Terminal, BookOpen, Layers, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-semibold text-sm tracking-tight flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-sky-600 inline-block" />
              <span>BehaviorSim</span>
              <span className="text-[10px] font-mono font-normal px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                v1.0.1
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-5 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              <span className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">
                Docs
              </span>
              <span className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">
                Concepts
              </span>
              <span className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">
                Methodology
              </span>
              <span className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">
                API Reference
              </span>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <a
              href="https://github.com/gtathelegend/BehaviourSim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              GitHub
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <span className="px-3 py-1.5 rounded bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-medium hover:opacity-90 transition-opacity cursor-pointer">
              Account
            </span>
          </div>
        </div>
      </header>

      {/* Main Hero & Scientific Foundation */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-900/50">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            Scientific Open-Source Simulation Engine
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight text-zinc-900 dark:text-zinc-50">
            Stochastic behavioral simulation and synthetic sequential data.
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            BehaviorSim provides mathematically rigorous Markov modeling, probabilistic state
            transitions, and realistic synthetic behavioral sequences for researchers, engineers, and
            system designers.
          </p>

          {/* Quick Install Banner */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-800 dark:text-zinc-200 select-all">
              <span className="text-zinc-400 select-none">$</span>
              <span>pip install behaviorsim==1.0.1</span>
            </div>
            <a
              href="https://github.com/gtathelegend/BehaviourSim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs transition-colors"
            >
              View Repository
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Technical Architecture Matrix */}
        <div className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Probabilistic State Engines
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Formulate deterministic or stochastic transition matrices with Dirichlet priors and
              controllable behavioral entropy across temporal horizons.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Terminal className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Python Library & CLI
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Integrate directly into Python workflows via native classes or execute parameterized
              simulations through the standardized command-line tool.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-8 h-8 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Cloud Simulation API
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Offload compute-intensive or distributed trace generation to the dedicated REST API at{" "}
              <code className="text-[11px] font-mono px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                api.behavioursim.vedaangsharma.in
              </code>
              .
            </p>
          </div>
        </div>

        {/* Phase 0 Status Banner */}
        <div className="mt-16 p-4 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              <strong>Phase 0 Foundation Active:</strong> Documentation engine, methodology papers, and
              account portal arriving in subsequent phases.
            </span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500 self-start sm:self-auto">
            Stack: Next.js 15 · TS · Tailwind
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            BehaviorSim Open Source Project · Released under the{" "}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              MIT License
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://pypi.org/project/behaviorsim/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              PyPI v1.0.1
            </a>
            <span>·</span>
            <a
              href="https://github.com/gtathelegend/BehaviourSim"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="https://api.behavioursim.vedaangsharma.in/health"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              API Status
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
