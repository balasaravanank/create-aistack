import { input, select, checkbox } from '@inquirer/prompts';
import { applyDefaults } from './args.js';

/**
 * Run interactive prompts, pre-filling from any CLI flags already provided.
 */
export async function runPrompts(cliArgs) {
  const projectName = cliArgs.projectName || await input({
    message: 'Project name:',
    default: 'my-aistack-app',
    validate: (v) => {
      if (!/^[a-z0-9][a-z0-9._-]*$/.test(v)) {
        return 'Use lowercase letters, numbers, hyphens, dots, or underscores.';
      }
      return true;
    },
  });

  const fe = cliArgs.fe || await select({
    message: 'Frontend framework:',
    choices: [
      { value: 'react', name: 'React (Vite)    — Fast, modern, huge ecosystem' },
      { value: 'react-next', name: 'React (Next.js) — SSR, API routes, all-in-one' },
      { value: 'vue', name: 'Vue (Vite)      — Progressive, gentle learning curve' },
    ],
  });

  const showBackend = fe !== 'react-next';
  const be = cliArgs.be || (showBackend
    ? await select({
        message: 'Backend framework:',
        choices: [
          { value: 'express', name: 'Express (Node)  — Flexible, massive middleware ecosystem' },
          { value: 'fastapi', name: 'FastAPI (Python) — Fast, typed, great for ML/data' },
          { value: 'none', name: 'None             — Frontend only' },
        ],
      })
    : 'none');

  const cssChoices = [
    { value: 'tailwind', name: 'Tailwind CSS v4 — Utility-first, AI-predictable' },
    { value: 'vanilla', name: 'Vanilla CSS      — Zero deps, design tokens included' },
  ];
  if (fe.startsWith('react')) {
    cssChoices.push({ value: 'shadcn', name: 'shadcn/ui        — Beautiful components (React only)' });
  }

  const css = cliArgs.css || await select({
    message: 'Styling:',
    choices: cssChoices,
  });

  const features = cliArgs.features || await checkbox({
    message: 'Include starter features:',
    choices: [
      { value: 'auth', name: 'Authentication (JWT)', checked: true },
      { value: 'db', name: 'Database setup (SQLite dev / Postgres prod)', checked: true },
      { value: 'docker', name: 'Docker config' },
      { value: 'ci', name: 'CI/CD (GitHub Actions)' },
      { value: 'testing', name: 'Testing setup (Vitest + Pytest)', checked: true },
    ],
  });

  return applyDefaults({ projectName, fe, be, css, features, git: cliArgs.git });
}
