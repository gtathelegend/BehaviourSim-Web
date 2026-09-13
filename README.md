# BehaviorSim Web

Public website, documentation hub, scientific methodology references, and authenticated developer portal for **BehaviorSim** — a Python framework for stochastic behavioral simulation and synthetic sequential data generation.

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
│   │   ├── api/            # Centralized typed API client & error handling
│   │   └── auth/           # Session context and route guards
│   └── types/              # Global TypeScript interfaces
├── .env.example            # Environment variable documentation
├── next.config.ts          # Next.js configuration & security headers
├── tailwind.config.ts      # Tailwind CSS styling tokens
└── tsconfig.json           # TypeScript configuration with @/* alias
```

## License

MIT License. See [LICENSE](LICENSE) for details.
