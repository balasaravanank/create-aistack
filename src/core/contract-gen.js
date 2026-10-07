/**
 * Generate _contracts files — barrel exports with @ai-context JSDoc tags.
 * These let AI tools understand module purposes without opening every file.
 */
export function generateContracts(config) {
  const contracts = {};

  // Frontend contracts
  contracts['src/client/_contracts.ts'] = generateClientContracts(config);

  // Backend contracts
  if (config.be === 'express') {
    contracts['src/server/_contracts.js'] = generateExpressContracts(config);
  } else if (config.be === 'fastapi') {
    contracts['src/server/_contracts.py'] = generateFastapiContracts(config);
  }

  return contracts;
}

function generateClientContracts(config) {
  const lines = [
    '/**',
    ' * @ai-contracts Frontend module index',
    ' * Read this file to understand all available frontend modules.',
    ' * Each export includes an @ai-context tag describing its purpose.',
    ' */',
    '',
  ];

  // Pages
  lines.push('// === Pages (route-level components) ===');
  lines.push('/** @ai-context Landing page with hero section and feature highlights */');
  lines.push("export { default as Home } from './pages/Home';");
  if (config.features.includes('auth')) {
    lines.push('/** @ai-context Login form with email/password, handles JWT auth flow */');
    lines.push("export { default as Login } from './pages/Login';");
  }
  lines.push('');

  // Components
  lines.push('// === Components (reusable UI) ===');
  lines.push('/** @ai-context App shell with header, sidebar, and content area */');
  lines.push("export { default as Layout } from './components/Layout';");
  lines.push('/** @ai-context Styled button with variants: primary, secondary, ghost, danger */');
  lines.push("export { default as Button } from './components/Button';");
  lines.push('/** @ai-context Form input with label, validation error display, and forwarded ref */');
  lines.push("export { default as Input } from './components/Input';");
  lines.push('');

  // Hooks
  lines.push('// === Hooks (shared logic) ===');
  if (config.features.includes('auth')) {
    lines.push('/** @ai-context Auth state: { user, login, logout, isLoading }. JWT stored in httpOnly cookie */');
    lines.push("export { useAuth } from './hooks/useAuth';");
  }
  lines.push('/** @ai-context Generic fetch wrapper with loading/error states and auto-refresh */');
  lines.push("export { useFetch } from './hooks/useFetch';");

  return lines.join('\n') + '\n';
}

function generateExpressContracts(config) {
  const lines = [
    '/**',
    ' * @ai-contracts Backend module index (Express)',
    ' * Read this file to understand all available backend modules.',
    ' */',
    '',
    '// === Routes (API endpoints) ===',
    '/** @ai-context Health check endpoint: GET /api/health → { status: "ok" } */',
    "export { default as healthRoutes } from './routes/health.js';",
  ];

  if (config.features.includes('auth')) {
    lines.push('/** @ai-context Auth routes: POST /api/auth/login, POST /api/auth/register, GET /api/auth/me */');
    lines.push("export { default as authRoutes } from './routes/auth.js';");
  }

  lines.push('');
  lines.push('// === Services (business logic) ===');

  if (config.features.includes('auth')) {
    lines.push('/** @ai-context JWT token generation, password hashing (bcrypt), user validation */');
    lines.push("export { AuthService } from './services/auth-service.js';");
  }

  lines.push('');
  lines.push('// === Middleware ===');
  lines.push('/** @ai-context CORS, JSON body parser, request logging, error handler */');
  lines.push("export { applyMiddleware } from './middleware/index.js';");

  return lines.join('\n') + '\n';
}

function generateFastapiContracts(config) {
  const lines = [
    '"""',
    '@ai-contracts Backend module index (FastAPI)',
    'Read this file to understand all available backend modules.',
    '"""',
    '',
    '# === Routes (API endpoints) ===',
    '# @ai-context Health check endpoint: GET /api/health → { "status": "ok" }',
    'from .routes.health import router as health_router  # noqa: F401',
  ];

  if (config.features.includes('auth')) {
    lines.push('# @ai-context Auth routes: POST /api/auth/login, POST /api/auth/register, GET /api/auth/me');
    lines.push('from .routes.auth import router as auth_router  # noqa: F401');
  }

  lines.push('');
  lines.push('# === Services (business logic) ===');

  if (config.features.includes('auth')) {
    lines.push('# @ai-context JWT token generation, password hashing (passlib), user validation');
    lines.push('from .services.auth_service import AuthService  # noqa: F401');
  }

  lines.push('');
  lines.push('# === Models (data schemas) ===');
  lines.push('# @ai-context Pydantic models for request/response validation');
  lines.push('from .models.user import User, UserCreate, UserResponse  # noqa: F401');

  return lines.join('\n') + '\n';
}
