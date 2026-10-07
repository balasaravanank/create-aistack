const STACK_INFO = {
  fe: {
    react: {
      label: 'React (Vite)',
      runtime: 'Vite 6.x dev server with HMR',
      structure: 'src/client/ → React app (pages, components, hooks)',
      entryPoint: 'src/client/main.tsx',
      routing: 'Client-side (add react-router-dom when needed)',
      buildOutput: 'dist/client/',
    },
    'react-next': {
      label: 'React (Next.js)',
      runtime: 'Next.js App Router with RSC',
      structure: 'src/client/app/ → Next.js App Router (layouts, pages, API routes)',
      entryPoint: 'src/client/app/layout.tsx (root layout) + page.tsx (root page)',
      routing: 'File-based routing via app/ directory',
      buildOutput: '.next/',
    },
    vue: {
      label: 'Vue (Vite)',
      runtime: 'Vite 6.x dev server with HMR',
      structure: 'src/client/ → Vue app (pages, components, composables)',
      entryPoint: 'src/client/main.ts',
      routing: 'Client-side (add vue-router when needed)',
      buildOutput: 'dist/client/',
    },
  },
  be: {
    express: {
      label: 'Express (Node.js)',
      runtime: 'Node.js with --watch flag for auto-reload',
      structure: 'src/server/ → Express app (routes, services, middleware)',
      entryPoint: 'src/server/main.js',
      port: '3001',
      apiPrefix: '/api',
      endpoints: [
        'GET  /api/health → { status: "ok", timestamp }',
      ],
    },
    fastapi: {
      label: 'FastAPI (Python)',
      runtime: 'Uvicorn with --reload for auto-reload',
      structure: 'src/server/ → FastAPI app (routes, services, models)',
      entryPoint: 'src/server/main.py',
      port: '8000',
      apiPrefix: '/api',
      endpoints: [
        'GET  /api/health → { status: "ok" }',
      ],
    },
    none: null,
  },
  css: {
    tailwind: {
      label: 'Tailwind CSS v4',
      approach: 'Utility-first CSS with CSS-first configuration',
      tokenLocation: 'src/client/styles/globals.css (@theme block)',
      note: 'Use @apply for component extraction. Design tokens in @theme.',
    },
    vanilla: {
      label: 'Vanilla CSS',
      approach: 'Design tokens via CSS custom properties (--color-*, --space-*, --text-*)',
      tokenLocation: 'src/client/styles/globals.css (:root block)',
      note: 'All tokens in :root. Dark mode by default. Component classes provided.',
    },
    shadcn: {
      label: 'shadcn/ui + Tailwind',
      approach: 'HSL CSS variables matching shadcn convention (--primary, --background, etc.)',
      tokenLocation: 'src/client/styles/globals.css (:root block) + components.json',
      note: 'Add components via: npx shadcn@latest add <component>. Uses cn() utility for class merging.',
    },
  },
};

const FEATURE_INFO = {
  auth: {
    label: 'Authentication (JWT)',
    files: [
      'src/client/hooks/useAuth.ts — Auth state management',
      'src/client/pages/Login.tsx — Login form page',
    ],
    notes: 'JWT stored in httpOnly cookie. Call login(email, password) → sets user state.',
  },
  db: {
    label: 'Database (Prisma)',
    files: [
      'src/server/db/client.js — Prisma client singleton',
    ],
    notes: 'SQLite for dev, Postgres for prod. Run: npx prisma init to generate schema.',
  },
  docker: {
    label: 'Docker',
    files: [
      'Dockerfile — Multi-stage Node.js build',
      'docker-compose.yml — Production compose config',
    ],
    notes: 'Build: docker compose build. Run: docker compose up.',
  },
  ci: {
    label: 'CI/CD (GitHub Actions)',
    files: [
      '.github/workflows/ci.yml — Lint → Test → Build pipeline',
    ],
    notes: 'Triggers on push/PR to main. Uses Node.js 20.x.',
  },
  testing: {
    label: 'Testing',
    files: [
      'tests/client/ — Vitest tests for frontend',
      'tests/server/ — Pytest tests for backend (if Python)',
    ],
    notes: 'Run: npm run test. Uses Vitest for JS, Pytest for Python.',
  },
};

/**
 * Generate PROJECT.md — the AI Project DNA.
 * This single file lets any AI tool understand the entire project in ~300 tokens.
 */
export function generateDna(config) {
  const fe = STACK_INFO.fe[config.fe];
  const be = STACK_INFO.be[config.be];
  const css = STACK_INFO.css[config.css];

  const stackParts = [fe.label, be?.label, css.label].filter(Boolean);
  const hasBackend = config.be !== 'none';

  let md = `# Project DNA

> **For AI coding agents.** Read this file FIRST before making any changes to this codebase.
> This file describes the full stack, structure, conventions, and available modules.

---

## Stack
**${stackParts.join(' + ')}**

| Layer | Technology | Runtime |
|-------|-----------|---------|
| Frontend | ${fe.label} | ${fe.runtime} |
${be ? `| Backend | ${be.label} | ${be.runtime} |\n` : ''}| Styling | ${css.label} | ${css.approach} |

---

## Project Structure

\`\`\`
${fe.structure}
${be ? be.structure + '\n' : ''}${hasBackend ? 'src/shared/    → Cross-stack contracts (schemas, types)\n' : ''}scripts/       → Dev scripts (dev server, schema sync)
${config.features.includes('testing') ? 'tests/         → Test suites (Vitest + Pytest)\n' : ''}\`\`\`

### Entry Points
| Layer | File | Purpose |
|-------|------|---------|
| Frontend | \`${fe.entryPoint}\` | App entry point |
${be ? `| Backend | \`${be.entryPoint}\` | Server entry point (port ${be.port}) |\n` : ''}| Styles | \`${css.tokenLocation}\` | Design tokens & global styles |

### Routing
- **Frontend:** ${fe.routing}
${be ? `- **API:** All endpoints under \`${be.apiPrefix}/\`` : ''}

---

## Styling: ${css.label}
${css.note}

**Token location:** \`${css.tokenLocation}\`

---
${be ? `
## API Endpoints

| Method | Path | Response |
|--------|------|----------|
${be.endpoints.map(e => {
  const [method, rest] = e.split(/\s+(.+)/);
  const [path, response] = rest.split(' → ');
  return `| \`${method}\` | \`${path.trim()}\` | \`${response.trim()}\` |`;
}).join('\n')}
${config.features.includes('auth') ? `| \`POST\` | \`/api/auth/login\` | \`{ user, token }\` |\n| \`POST\` | \`/api/auth/register\` | \`{ user, token }\` |\n| \`GET\`  | \`/api/auth/me\` | \`{ user }\` |` : ''}

### API Contract
Single source of truth: \`src/shared/api.schema.ts\`
${config.be === 'fastapi' ? 'Backend mirrors these types as Pydantic models in `src/server/models/`.' : ''}

---
` : ''}
## Commands

| Command | Purpose |
|---------|---------|
| \`npm run dev\` | Start dev server${hasBackend ? ' (frontend + backend concurrently)' : ''} |
${hasBackend && config.fe !== 'react-next' ? `| \`npm run dev:client\` | Start frontend only (port 5173) |\n| \`npm run dev:server\` | Start backend only (port ${be.port}) |\n` : ''}| \`npm run build\` | Production build → \`${fe.buildOutput}\` |
${config.features.includes('testing') ? '| `npm run test` | Run all tests |\n' : ''}
---

## Conventions

| Rule | Value | Example |
|------|-------|---------|
| File naming | kebab-case | \`user-profile.tsx\` |
| Components | PascalCase | \`UserProfile\` |
${config.be === 'fastapi' ? '| Python | snake_case | `auth_service.py` |\n' : ''}| Imports | Relative from current dir | \`./components/Button\` |
| State | Local first, lift when shared | \`useState\` → context → global |
| API calls | Via \`useFetch\` hook | \`const { data } = useFetch('/api/users')\` |

---

## AI Context Files

> **These files exist to save AI tokens.** Read them instead of scanning the full codebase.

| File | What AI Learns | Tokens |
|------|---------------|--------|
| \`PROJECT.md\` | Stack, structure, conventions, commands | ~300 |
| \`src/client/_contracts.ts\` | All frontend modules + their purposes | ~150 |
${config.be === 'express' ? '| `src/server/_contracts.js` | All backend modules + their purposes | ~100 |\n' : ''}${config.be === 'fastapi' ? '| `src/server/_contracts.py` | All backend modules + their purposes | ~100 |\n' : ''}${hasBackend ? '| `src/shared/api.schema.ts` | All API types and request/response shapes | ~80 |\n' : ''}
**Total AI context: ~${hasBackend ? '630' : '450'} tokens** (vs ~${hasBackend ? '5000+' : '3000+'} scanning raw files)

---
${config.features.length > 0 ? `
## Features Included

${config.features.map(f => {
  const info = FEATURE_INFO[f];
  if (!info) return `### ${f}`;
  return `### ${info.label}
${info.notes}

**Files:**
${info.files.map(file => `- \`${file}\``).join('\n')}`;
}).join('\n\n')}

---
` : ''}
## Environment Variables

See \`.env.example\` for all required variables with descriptions.

${hasBackend ? `| Variable | Default | Purpose |
|----------|---------|---------|
| \`PORT\` | \`${be.port}\` | Backend server port |
| \`NODE_ENV\` | \`development\` | Environment mode |
${config.features.includes('auth') ? '| `JWT_SECRET` | — | Secret for JWT signing (change in prod!) |\n' : ''}${config.features.includes('db') ? '| `DATABASE_URL` | `sqlite://./dev.db` | Database connection string |\n' : ''}` : ''}`;

  return md.trim() + '\n';
}
