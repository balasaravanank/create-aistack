import { execSync } from 'node:child_process';

/**
 * Initialize a git repository and create an initial commit.
 */
export async function initGit(projectDir) {
  try {
    execSync('git init', { cwd: projectDir, stdio: 'ignore' });
    execSync('git add -A', { cwd: projectDir, stdio: 'ignore' });
    execSync('git commit -m "Initial scaffold via create-aistack"', {
      cwd: projectDir,
      stdio: 'ignore',
    });
  } catch {
    // Git not installed or init failed — not critical, skip silently
  }
}
