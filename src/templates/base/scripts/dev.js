import { spawn } from 'node:child_process';

/** Start frontend and backend dev servers concurrently. */
const client = spawn('npm', ['run', 'dev:client'], {
  stdio: 'inherit',
  shell: true,
});

const server = spawn('npm', ['run', 'dev:server'], {
  stdio: 'inherit',
  shell: true,
});

process.on('SIGINT', () => {
  client.kill();
  server.kill();
  process.exit(0);
});
