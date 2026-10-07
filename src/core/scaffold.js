import path from 'node:path';
import { copyTemplateDir, ensureDir, writeFile } from '../utils/fs.js';
import { initGit } from '../utils/git.js';
import { generateDna } from './dna-generator.js';
import { generateContracts } from './contract-gen.js';
import { estimateBudget } from './token-counter.js';
import { createSpinner, displayBudget, displayNextSteps } from '../cli/display.js';
import { STACK_LABELS } from '../cli/display.js';

/**
 * Main scaffold orchestrator.
 * Composes: base frontend + backend + styling overlay + feature overlays.
 */
export async function scaffold(config) {
  const root = path.resolve(process.cwd(), config.projectName);
  const spinner = createSpinner('Scaffolding project...');
  spinner.start();

  // 1. Create project directory
  await ensureDir(root);

  // 2. Copy base frontend template
  spinner.text = `  Setting up ${STACK_LABELS.fe[config.fe]}...`;
  await copyTemplateDir(getTemplatePath(`fe-${config.fe}`), root, config);

  // 3. Copy backend template (if any)
  if (config.be !== 'none') {
    spinner.text = `  Setting up ${STACK_LABELS.be[config.be]}...`;
    await copyTemplateDir(getTemplatePath(`be-${config.be}`), root, config);
  }

  // 4. Apply styling overlay
  spinner.text = `  Applying ${STACK_LABELS.css[config.css]} styling...`;
  await copyTemplateDir(getTemplatePath(`css-${config.css}`), root, config);

  // 5. Copy shared base files (root package.json, scripts, .gitignore, etc.)
  spinner.text = '  Writing project config...';
  await copyTemplateDir(getTemplatePath('base'), root, config);

  // 6. Apply feature overlays
  for (const feature of config.features) {
    spinner.text = `  Adding ${feature}...`;
    await copyTemplateDir(getTemplatePath(`feature-${feature}`), root, config);
  }

  // 7. Generate AI-first files (the moat)
  spinner.text = '  Generating Project DNA...';
  const dnaContent = generateDna(config);
  await writeFile(path.join(root, 'PROJECT.md'), dnaContent);

  spinner.text = '  Generating AI contracts...';
  const contracts = generateContracts(config);
  for (const [filePath, content] of Object.entries(contracts)) {
    await writeFile(path.join(root, filePath), content);
  }

  // 8. Git init
  if (config.git) {
    spinner.text = '  Initializing git...';
    await initGit(root);
  }

  spinner.succeed('  Project scaffolded!');

  // 9. Display AI Context Budget
  const budget = estimateBudget(dnaContent, contracts);
  displayBudget(budget);

  // 10. Next steps
  displayNextSteps(config);
}

function getTemplatePath(templateName) {
  return new URL(`../templates/${templateName}/`, import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
}
