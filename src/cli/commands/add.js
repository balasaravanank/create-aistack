import path from 'path';
import fs from 'fs/promises';
import chalk from 'chalk';
import ora from 'ora';
import { copyTemplateDir } from '../../utils/fs.js';

const VALID_FEATURES = ['auth', 'db', 'docker', 'ci', 'testing'];

export async function runAdd(feature) {
  if (!VALID_FEATURES.includes(feature)) {
    throw new Error(`Invalid feature: ${feature}. Valid options are: ${VALID_FEATURES.join(', ')}`);
  }

  const spinner = ora(`Adding ${feature} to your project...`).start();

  try {
    const cwd = process.cwd();
    
    // Safety check: Ensure they are in an aistack project
    try {
      await fs.access(path.join(cwd, 'PROJECT.md'));
    } catch {
      throw new Error('Not an aistack project. Could not find PROJECT.md in the current directory.');
    }

    const templatePath = path.resolve(
      new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'), 
      '../../../templates', 
      `feature-${feature}`
    );

    // Instead of full EJS rendering, we will just copy the files over.
    // For a fully robust "add", we might need to know the config. 
    // We can infer backend from presence of src/server/main.py vs main.js
    let be = 'none';
    let fe = 'react'; // default assumption
    try {
      await fs.access(path.join(cwd, 'src/server/main.py'));
      be = 'fastapi';
    } catch {
      try {
        await fs.access(path.join(cwd, 'src/server/main.js'));
        be = 'express';
      } catch {}
    }

    // Pass inferred config to copyTemplateDir so EJS rendering works if needed
    await copyTemplateDir(templatePath, cwd, {
      projectName: path.basename(cwd),
      fe, be, css: 'vanilla', features: [feature]
    });

    spinner.succeed(chalk.green(`Successfully added ${feature} feature!`));
    console.log(chalk.gray(`\nNote: You may need to run 'npm install' or 'pip install' if the feature added new dependencies.`));
    console.log(chalk.blue(`Tip: Run 'npx create-aistack sync' to update your AI context files!`));

  } catch (err) {
    spinner.fail(chalk.red('Failed to add feature.'));
    throw err;
  }
}
