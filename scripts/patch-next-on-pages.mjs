#!/usr/bin/env node
/**
 * Cloudflare Pages runs:
 *   npx @cloudflare/next-on-pages --dangerouslyUseUnsupportedNextVersion
 * That flag was removed from the CLI. Patch the package bin to ignore it.
 */
import { chmodSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const packageBin = join(
  process.cwd(),
  'node_modules/@cloudflare/next-on-pages/bin/index.js',
);

const patchedBin = `#!/usr/bin/env node
const { spawn } = require('child_process');
const { join } = require('path');

const args = process.argv.slice(2).filter(
  (arg) => arg !== '--dangerouslyUseUnsupportedNextVersion'
);

spawn(
  process.execPath,
  [
    ...process.execArgv,
    join(__dirname, '..', 'dist', 'index.js'),
    ...args,
  ],
  { stdio: 'inherit' },
).on('exit', (code) =>
  process.exit(code === undefined || code === null ? 0 : code),
);
`;

writeFileSync(packageBin, patchedBin);
chmodSync(packageBin, 0o755);

console.log('[postinstall] Patched @cloudflare/next-on-pages for Cloudflare build command');
