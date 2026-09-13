# BehaviorSim Web

Public website, documentation hub, scientific methodology references, and authenticated developer portal for **BehaviorSim** - a Python framework for stochastic behavioral simulation and synthetic sequential data generation.

## Project Context

* **Core Package (PyPI)**: [`behaviorsim==1.0.1`](https://pypi.org/project/behaviorsim/)
* **Engine Repository**: [`gtathelegend/BehaviourSim`](https://github.com/gtathelegend/BehaviourSim)
* **Production API**: [`https://api.behavioursim.vedaangsharma.in`](https://api.behavioursim.vedaangsharma.in)
* **Production Website**: [`https://behavioursim.vedaangsharma.in`](https://behavioursim.vedaangsharma.in)

## Architecture Overview

The frontend is built with modern, production-grade web technologies tailored for scientific and technical software projects:

* **Framework**: Next.js 15+ (App Router) with React 19
* **Language**: TypeScript (Strict Mode)
* **Styling**: Tailwind CSS + `@tailwindcss/typography`
* **Icons**: Lucide React
* **Content & Docs**: MDX with Shiki syntax highlighting and KaTeX mathematical notation
* **Authentication**: Delegated to the BehaviorSim API (`behaviorsim_session` HttpOnly cookie)

## Asynchronous Simulation Architecture

The website integrates with the Phase 16/17 durable simulation worker architecture:

```text
User Submits Simulation
        ↓
POST /v1/simulations
        ↓
HTTP 202 Accepted { "simulation_id": "...", "status": "pending" }
        ↓
Client Polling: GET /v1/simulations/{id} (exponential backoff 1s - 2s)
        ↓
Status: "pending" (Queued) → "running" (Worker claimed)
        ↓
Terminal State:
  ├── "completed" → Renders interactive Markov telemetry visualizations
  └── "failed"    → Displays safe error envelope + retry (creates new job)
```

### Key Job Execution Properties:
* **Controlled Polling**: Initial interval of 1000ms with progressive backoff up to 2000ms.
* **Client Polling Timeout**: Bounded client-side polling with a 60-second limit. If reached, the job enters `TIMED_OUT` without falsely reporting server failure, preserving the simulation ID and allowing the user to re-check status or inspect account history.
* **Transient Network Resilience**: Recovers up to 3 consecutive network dropouts before pausing, avoiding duplicate simulation submissions.
* **Double-Submission Protection**: UI elements and submission handlers are locked during in-flight requests.
* **Transitional Compatibility**: `POST /v1/simulations?sync=true` remains supported for synchronous clients.

## Getting Started

### Prerequisites

* Node.js `>= 20.x` (verified with `v24.5.0`)
* npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/gtathelegend/BehaviourSim-Web.git
cd "BehaviourSim Web"

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Assurance

```bash
# Run unit & integration test suite
npm test

# Type check TypeScript definitions
npm run typecheck

# Lint source code
npm run lint

# Compile production bundle
npm run build
```

## Repository Structure

```text
├── public/                 # Static assets, robots.txt, sitemap
├── src/
│   ├── app/                # Next.js App Router (pages & layouts)
│   ├── components/         # Reusable UI, documentation, and layout components
│   ├── content/            # MDX content files (docs, concepts, guides)
│   ├── lib/
│   │   ├── analysis/       # Statistical, Markov state, and telemetry analysis pipelines
│   │   ├── api/            # Centralized typed API client & error handling
│   │   ├── auth/           # Session context and route guards
│   │   └── hooks/          # Custom React hooks (useSimulationJob)
│   └── types/              # Global TypeScript interfaces
├── tests/                  # Unit and integration test suites
├── .env.example            # Environment variable documentation
├── next.config.ts          # Next.js configuration & security headers
├── tailwind.config.ts      # Tailwind CSS styling tokens
└── tsconfig.json           # TypeScript configuration with @/* alias
```

## License

MIT License. See [LICENSE](LICENSE) for details.
