# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.0] - 2026-10-07

### Added
- Interactive CLI wizard with `@inquirer/prompts`
- One-liner mode with `--fe`, `--be`, `--css`, `--features` flags
- Non-interactive mode (`--no-interactive`) for CI/scripts
- Frontend templates: React (Vite), React (Next.js)
- Backend templates: Express, FastAPI
- Styling overlays: Tailwind CSS v4, Vanilla CSS, shadcn/ui
- Optional features: Auth (JWT), Database (Prisma), Docker, CI/CD, Testing
- AI-first files: `PROJECT.md` (Project DNA), `_contracts.ts` (module index)
- AI Context Budget reporting during scaffold
- `add <feature>` subcommand to inject features post-scaffold
- `sync` subcommand to regenerate AI context from current codebase
