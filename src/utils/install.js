import { spawn } from 'node:child_process';

/**
 * Install dependencies using the specified package manager.
 */
export async function installDependencies(projectDir) {
  // Detect package manager based on user agent, default to npm
  const userAgent = process.env.npm_config_user_agent || '';
  let packageManager = 'npm';
  if (userAgent.startsWith('yarn')) {
    packageManager = 'yarn';
  } else if (userAgent.startsWith('pnpm')) {
    packageManager = 'pnpm';
  } else if (userAgent.startsWith('bun')) {
    packageManager = 'bun';
  }

  return new Promise((resolve, reject) => {
    const child = spawn(packageManager, ['install'], {
      cwd: projectDir,
      stdio: 'ignore', // Keep it clean for the spinner
      shell: true,     // Required on Windows to find npm/yarn/pnpm commands
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`${packageManager} install failed`));
        return;
      }
      resolve();
    });
  });
}
