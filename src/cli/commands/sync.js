import path from 'path';
import fs from 'fs/promises';
import chalk from 'chalk';
import ora from 'ora';
import { generateDna } from '../../core/dna-generator.js';
import { generateContracts } from '../../core/contract-gen.js';

export async function runSync() {
  const spinner = ora('Analyzing project and syncing AI context...').start();

  try {
    const cwd = process.cwd();
    
    // 1. Infer current stack by probing directories
    let fe = 'react'; // default
    let be = 'none';
    let css = 'vanilla';
    const features = [];

    // Probe Backend
    try {
      await fs.access(path.join(cwd, 'src/server/main.py'));
      be = 'fastapi';
    } catch {
      try {
        await fs.access(path.join(cwd, 'src/server/main.js'));
        be = 'express';
      } catch {}
    }

    // Probe Frontend (React vs Next.js)
    try {
      await fs.access(path.join(cwd, 'src/client/app/layout.tsx'));
      fe = 'react-next';
    } catch {}

    // Probe Styling
    try {
      await fs.access(path.join(cwd, 'components.json'));
      css = 'shadcn';
    } catch {
      try {
        const globalCss = await fs.readFile(path.join(cwd, 'src/client/styles/globals.css'), 'utf-8');
        if (globalCss.includes('@theme') || globalCss.includes('tailwindcss')) {
          css = 'tailwind';
        }
      } catch {}
    }

    // Probe Features
    try { await fs.access(path.join(cwd, 'Dockerfile')); features.push('docker'); } catch {}
    try { await fs.access(path.join(cwd, '.github/workflows/ci.yml')); features.push('ci'); } catch {}
    try { await fs.access(path.join(cwd, 'tests')); features.push('testing'); } catch {}
    try { await fs.access(path.join(cwd, 'src/server/db')); features.push('db'); } catch {}
    try { await fs.access(path.join(cwd, 'src/client/hooks/useAuth.ts')); features.push('auth'); } catch {}

    const config = { fe, be, css, features };

    // 2. Regenerate PROJECT.md
    const dna = generateDna(config);
    await fs.writeFile(path.join(cwd, 'PROJECT.md'), dna, 'utf-8');

    // 3. Regenerate contracts based on actual files
    const contracts = generateContracts(config);
    for (const [relativePath, content] of Object.entries(contracts)) {
      await fs.writeFile(path.join(cwd, relativePath), content, 'utf-8');
    }

    spinner.succeed(chalk.green('AI Context successfully synced!'));
    
    console.log(chalk.gray('\nAnalyzed stack:'));
    console.log(`  Frontend: ${fe}`);
    console.log(`  Backend:  ${be}`);
    console.log(`  Styling:  ${css}`);
    console.log(`  Features: ${features.join(', ') || 'none'}\n`);
    
    console.log(chalk.blue('PROJECT.md and _contracts have been updated to reflect your current codebase.'));
  } catch (err) {
    spinner.fail(chalk.red('Failed to sync AI context.'));
    throw err;
  }
}
