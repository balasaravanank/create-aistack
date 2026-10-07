const DEFAULTS = {
  fe: 'react',
  be: 'express',
  css: 'vanilla',
  features: [],
  git: true,
};

const VALID = {
  fe: ['react', 'react-next', 'vue'],
  be: ['express', 'fastapi', 'none'],
  css: ['tailwind', 'vanilla', 'shadcn'],
  features: ['auth', 'db', 'docker', 'ci', 'testing'],
};

/**
 * Parse CLI flags into a normalized config object.
 * Missing values are filled with defaults when --no-interactive is set.
 */
export function parseArgs(projectName, options) {
  const features = options.features
    ? options.features.split(',').map(f => f.trim().toLowerCase())
    : undefined;

  return {
    projectName: projectName || undefined,
    fe: validateOption('fe', options.fe),
    be: validateOption('be', options.be),
    css: validateOption('css', options.css),
    features: features ? features.filter(f => VALID.features.includes(f)) : undefined,
    git: options.git !== false,
    noInteractive: options.interactive === false,
  };
}

function validateOption(key, value) {
  if (!value) return undefined;
  const lower = value.toLowerCase();
  if (!VALID[key].includes(lower)) {
    throw new Error(
      `Invalid --${key} value "${value}". Valid options: ${VALID[key].join(', ')}`
    );
  }
  return lower;
}

/**
 * Fill any undefined config values with defaults (for --no-interactive mode).
 */
export function applyDefaults(config) {
  return {
    projectName: config.projectName || 'my-aistack-app',
    fe: config.fe || DEFAULTS.fe,
    be: config.be || DEFAULTS.be,
    css: config.css || DEFAULTS.css,
    features: config.features || DEFAULTS.features,
    git: config.git ?? DEFAULTS.git,
  };
}

export { VALID, DEFAULTS };
