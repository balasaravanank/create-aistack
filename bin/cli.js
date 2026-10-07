#!/usr/bin/env node

import { createCommand } from 'commander';
import { parseArgs } from '../src/cli/args.js';
import { runPrompts } from '../src/cli/prompts.js';
import { displayBanner, displaySuccess, displayError } from '../src/cli/display.js';
import { scaffold } from '../src/core/scaffold.js';

const program = createCommand();

program
  .name('create-agent-stack')
  .description('The AI-First Project Scaffolder')
  .version('0.1.0')
  .argument('[project-name]', 'Name of the project directory')
  .option('--fe <framework>', 'Frontend framework: react, react-next, vue')
  .option('--be <framework>', 'Backend framework: express, fastapi, none')
  .option('--css <style>', 'Styling: tailwind, vanilla, shadcn')
  .option('--features <list>', 'Comma-separated features: auth,db,docker,ci,testing')
  .option('--no-interactive', 'Skip interactive prompts (use defaults for missing flags)')
  .option('--no-git', 'Skip git initialization')
  .action(async (projectName, options) => {
    try {
      displayBanner();

      const cliArgs = parseArgs(projectName, options);
      const config = cliArgs.noInteractive
        ? (await import('../src/cli/args.js')).applyDefaults(cliArgs)
        : await runPrompts(cliArgs);

      await scaffold(config);

      displaySuccess(config);
    } catch (err) {
      if (err.name === 'ExitPromptError') {
        console.log('\n👋 Cancelled. See you next time!');
        process.exit(0);
      }
      displayError(err);
      process.exit(1);
    }
  });

program
  .command('add <feature>')
  .description('Add a feature (auth, db, docker, ci, testing) to an existing aistack project')
  .action(async (feature) => {
    try {
      const { runAdd } = await import('../src/cli/commands/add.js');
      await runAdd(feature);
    } catch (err) {
      displayError(err);
      process.exit(1);
    }
  });

program
  .command('sync')
  .description('Regenerate PROJECT.md and _contracts to match current codebase')
  .action(async () => {
    try {
      const { runSync } = await import('../src/cli/commands/sync.js');
      await runSync();
    } catch (err) {
      displayError(err);
      process.exit(1);
    }
  });

program.parse();
