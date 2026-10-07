import chalk from 'chalk';
import ora from 'ora';

const STACK_LABELS = {
  fe: { react: 'React (Vite)', 'react-next': 'React (Next.js)', vue: 'Vue (Vite)' },
  be: { express: 'Express', fastapi: 'FastAPI', none: 'None' },
  css: { tailwind: 'Tailwind CSS v4', vanilla: 'Vanilla CSS', shadcn: 'shadcn/ui' },
};

export function displayBanner() {
  console.log('');
  console.log(chalk.bold.cyan('  ┌─────────────────────────────────────────┐'));
  console.log(chalk.bold.cyan('  │') + chalk.bold.white('  🏗️  create-aistack                     ') + chalk.bold.cyan('│'));
  console.log(chalk.bold.cyan('  │') + chalk.dim('  The AI-First Project Scaffolder        ') + chalk.bold.cyan('│'));
  console.log(chalk.bold.cyan('  └─────────────────────────────────────────┘'));
  console.log('');
}

export function displaySuccess(config) {
  const feLabel = STACK_LABELS.fe[config.fe] || config.fe;
  const beLabel = STACK_LABELS.be[config.be] || config.be;
  const cssLabel = STACK_LABELS.css[config.css] || config.css;

  console.log('');
  console.log(chalk.green.bold('  ✅ Project created!'));
  console.log('');
  console.log(chalk.dim('  Stack: ') + chalk.white(`${feLabel} + ${beLabel} + ${cssLabel}`));
  console.log('');
}

export function displayBudget(budget) {
  console.log(chalk.bold.cyan('  📊 AI Context Budget:'));
  console.log(chalk.dim('     Project DNA:     ') + chalk.white(`~${budget.dna} tokens`));
  console.log(chalk.dim('     Contracts:       ') + chalk.white(`~${budget.contracts} tokens`));
  console.log(chalk.dim('     Full codebase:   ') + chalk.white(`~${budget.codebase} tokens`));
  console.log('');
  console.log(
    chalk.bold.green(`     🎯 AI understands your project in ${budget.dna + budget.contracts} tokens`) +
    chalk.dim(` (${Math.round((1 - (budget.dna + budget.contracts) / budget.codebase) * 100)}% savings)`)
  );
  console.log('');
}

export function displayNextSteps(config) {
  console.log(chalk.bold('  📂 Next steps:'));
  console.log(chalk.cyan(`     cd ${config.projectName}`));
  console.log(chalk.cyan('     npm install'));
  if (config.be === 'fastapi') {
    console.log(chalk.cyan('     pip install -r src/server/requirements.txt'));
  }
  console.log(chalk.cyan('     npm run dev'));
  console.log('');
}

export function displayError(err) {
  console.error('');
  console.error(chalk.red.bold('  ❌ Error: ') + chalk.red(err.message));
  if (process.env.DEBUG) {
    console.error(chalk.dim(err.stack));
  }
  console.error('');
}

export function createSpinner(text) {
  return ora({ text: chalk.dim(`  ${text}`), spinner: 'dots' });
}

export { STACK_LABELS };
