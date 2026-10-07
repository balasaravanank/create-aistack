import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';
import ejs from 'ejs';

/**
 * Ensure a directory exists, creating it recursively if needed.
 */
export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

/**
 * Write content to a file, creating parent directories as needed.
 */
export async function writeFile(filePath, content) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, 'utf-8');
}

/**
 * Copy a template directory to the destination, processing .ejs files.
 * Skips if template directory doesn't exist (feature not implemented yet).
 */
export async function copyTemplateDir(templateDir, destDir, config) {
  if (!existsSync(templateDir)) return;

  const entries = await fs.readdir(templateDir, { withFileTypes: true, recursive: true });

  for (const entry of entries) {
    if (entry.isDirectory()) continue;

    const relativePath = path.relative(templateDir, path.join(entry.parentPath || entry.path, entry.name));
    let destPath = path.join(destDir, relativePath);

    // Read source content
    const srcPath = path.join(templateDir, relativePath);
    let content = await fs.readFile(srcPath, 'utf-8');

    // Process .ejs templates
    if (entry.name.endsWith('.ejs')) {
      destPath = destPath.replace(/\.ejs$/, '');
      content = ejs.render(content, { config, projectName: config.projectName });
    }

    // Handle dotfiles (stored as _dot_ prefix in templates)
    destPath = destPath.replace(/(_dot_)/g, '.');

    await writeFile(destPath, content);
  }
}
