<p align="center">
  <img src="https://img.shields.io/npm/v/create-aistack?style=flat-square&color=6366f1" alt="npm version" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square" alt="node" />
</p>

<h1 align="center">🏗️ create-aistack</h1>
<p align="center"><strong>The AI-First Project Scaffolder</strong></p>
<p align="center">Scaffold full-stack projects that AI coding agents understand in <strong>~500 tokens</strong> instead of ~5000.</p>

---

## Why?

Every scaffolder today generates code for **humans** to read. None generate code optimized for **AI agents** to understand.

In 2026, developers spend **30-50% of their AI tokens** just giving context:
- *"Here's my folder structure..."*
- *"I'm using Express with this middleware..."*
- *"My auth works like this..."*

**`create-aistack` eliminates that tax.** Every scaffolded project ships with machine-readable **Project DNA** that any AI tool can read in ~500 tokens instead of scanning 50+ files.

---

## Quick Start

```bash
# Interactive mode (friendly wizard)
npx create-aistack

# One-liner mode (fast, scriptable)
npx create-aistack my-app --fe=react --be=fastapi --css=tailwind

# AI agent mode (zero prompts)
npx create-aistack my-app --fe=react --be=express --css=vanilla --no-interactive
```

---

## Stack Combos

Mix and match any frontend × backend × styling:

### Frontend

| Option | Flag | Description |
|--------|------|-------------|
| **React (Vite)** | `--fe=react` | Fast HMR, huge ecosystem, Vite-powered |
| **React (Next.js)** | `--fe=react-next` | SSR, App Router, built-in API routes |
| **Vue (Vite)** | `--fe=vue` | Progressive, gentle learning curve |

### Backend

| Option | Flag | Description |
|--------|------|-------------|
| **Express** | `--be=express` | Node.js, flexible, massive middleware ecosystem |
| **FastAPI** | `--be=fastapi` | Python, typed, great for ML/data pipelines |
| **None** | `--be=none` | Frontend only (or use Next.js API routes) |

### Styling

| Option | Flag | Description |
|--------|------|-------------|
| **Tailwind CSS v4** | `--css=tailwind` | Utility-first, AI-predictable classes |
| **Vanilla CSS** | `--css=vanilla` | Zero deps, design tokens via CSS custom properties |
| **shadcn/ui** | `--css=shadcn` | Beautiful components, HSL tokens (React only) |

### Optional Features

| Feature | Flag | What You Get |
|---------|------|-------------|
| **Auth** | `auth` | JWT login/logout, useAuth hook, Login page |
| **Database** | `db` | Prisma client setup, SQLite dev / Postgres prod |
| **Docker** | `docker` | Dockerfile + docker-compose.yml |
| **CI/CD** | `ci` | GitHub Actions workflow (lint, test, build) |
| **Testing** | `testing` | Vitest (frontend) + Pytest (Python backend) |

```bash
# Pick features with --features flag
npx create-aistack my-app --fe=react --be=express --features=auth,db,testing
```

---

## 🧠 The AI-First Difference

This is what makes `create-aistack` unique. Every scaffolded project includes three AI-optimized files that no other scaffolder generates:

### 1. `PROJECT.md` — Project DNA

A single file that tells any AI everything about your project:

```markdown
# Project DNA
## Stack: React (Vite) + FastAPI + Tailwind CSS v4
## Structure:
  src/client/    → React app (pages, components, hooks)
  src/server/    → FastAPI app (routes, services, models)
  src/shared/    → Shared type contracts
## API Contract: src/shared/api.schema.ts
## Auth: JWT via FastAPI, stored in httpOnly cookie
## Commands: dev, build, test, lint
```

**Result:** AI reads **one file (~200 tokens)** instead of scanning your entire codebase (~5000 tokens).

### 2. `_contracts.ts` — Module Index

Barrel exports with `@ai-context` tags that describe every module's purpose:

```typescript
/** @ai-context Landing page with hero section and feature highlights */
export { default as Home } from './pages/Home';

/** @ai-context Auth state: { user, login, logout }. JWT in httpOnly cookie */
export { useAuth } from './hooks/useAuth';

/** @ai-context Styled button with variants: primary, secondary, ghost, danger */
export { default as Button } from './components/Button';
```

**Result:** AI reads **30 tokens** instead of opening 15 files (~3000 tokens).

### 3. AI Context Budget

During scaffolding, you see exactly how token-efficient your project is:

```
📊 AI Context Budget:
   Project DNA:     ~180 tokens
   Contracts:       ~240 tokens
   Full codebase:   ~4,200 tokens

   🎯 AI understands your project in 420 tokens (90% savings)
```

---

## Generated Project Structure

```
my-app/
├── PROJECT.md              ← 🧠 AI Project DNA
├── package.json
├── .env.example
├── .gitignore
├── README.md
│
├── src/
│   ├── client/             ← Frontend
│   │   ├── _contracts.ts   ← 🧠 AI module index
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── Login.tsx       (if auth)
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Layout.tsx
│   │   ├── hooks/
│   │   │   ├── useFetch.ts
│   │   │   └── useAuth.ts     (if auth)
│   │   └── styles/
│   │       └── globals.css
│   │
│   ├── server/             ← Backend (Express or FastAPI)
│   │   ├── _contracts.js   ← 🧠 AI module index
│   │   ├── main.js / main.py
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── models/
│   │
│   └── shared/             ← Cross-stack contracts
│       └── api.schema.ts
│
├── scripts/
│   └── dev.js              ← Concurrent dev servers
├── tests/                      (if testing)
├── Dockerfile                  (if docker)
├── docker-compose.yml          (if docker)
└── .github/workflows/ci.yml   (if ci)
```

---

## CLI Reference

```
Usage: create-aistack [options] [project-name]

Arguments:
  project-name         Name of the project directory

Options:
  -V, --version        Output version number
  --fe <framework>     Frontend: react, react-next, vue
  --be <framework>     Backend: express, fastapi, none
  --css <style>        Styling: tailwind, vanilla, shadcn
  --features <list>    Comma-separated: auth,db,docker,ci,testing
  --no-interactive     Skip prompts (use defaults for missing flags)
  --no-git             Skip git initialization
  -h, --help           Display help
```

---

## Works With Every AI Tool

The generated `PROJECT.md` and `_contracts` files work with:

- ✅ **Claude Code** / Claude
- ✅ **Gemini CLI** / Google Antigravity
- ✅ **GitHub Copilot** / Copilot Chat
- ✅ **Cursor**
- ✅ **Aider**
- ✅ **Any AI that reads files**

Just paste `PROJECT.md` into your first prompt and the AI instantly knows your stack, structure, and conventions.

---

## Contributing

```bash
git clone https://github.com/your-username/create-aistack
cd create-aistack
npm install
node bin/cli.js my-test-app   # Test locally
```

---

## License

MIT © 2026
