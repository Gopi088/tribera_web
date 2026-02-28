import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const OUT_DIR = path.join(ROOT, 'artifacts', 'screenshots');
const HOST = '127.0.0.1';
const DEFAULT_PORT = 4321;

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'desktop', width: 1920, height: 1080 },
];

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      return [full];
    })
  );
  return files.flat();
}

function routeFromIndex(indexPath) {
  const rel = path.relative(DIST_DIR, indexPath).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'/index.html'.length)}`;
  return null;
}

function slugifyRoute(route) {
  if (route === '/') return 'home';
  return route.replace(/^\/+/, '').replace(/\//g, '__').replace(/[^a-zA-Z0-9_-]/g, '_');
}

async function collectRoutes() {
  if (!(await exists(DIST_DIR))) {
    throw new Error('dist/ not found. Run "npm run build" first.');
  }
  const allFiles = await walk(DIST_DIR);
  const indexFiles = allFiles.filter((f) => f.endsWith('index.html'));
  const routes = indexFiles.map(routeFromIndex).filter(Boolean);
  routes.sort((a, b) => a.localeCompare(b));
  return [...new Set(routes)];
}

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        // Ignore while server boots.
      }
      if (Date.now() - start > timeoutMs) {
        return reject(new Error(`Preview server did not start within ${timeoutMs}ms`));
      }
      setTimeout(check, 500);
    };
    check();
  });
}

function getFreePort(startPort = DEFAULT_PORT) {
  return new Promise((resolve, reject) => {
    const tryPort = (port) => {
      const server = net.createServer();
      server.unref();
      server.on('error', () => tryPort(port + 1));
      server.listen(port, HOST, () => {
        const { port: pickedPort } = server.address();
        server.close(() => resolve(pickedPort));
      });
    };
    tryPort(startPort);
  });
}

async function main() {
  const routes = await collectRoutes();
  await fs.mkdir(OUT_DIR, { recursive: true });
  const port = await getFreePort();
  const baseUrl = `http://${HOST}:${port}`;

  console.log(`Found ${routes.length} routes in dist/`);
  console.log(`Saving screenshots to ${OUT_DIR}`);

  const preview = spawn('npm', ['run', 'preview', '--', '--host', HOST, '--port', String(port)], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  preview.stdout.on('data', (chunk) => process.stdout.write(String(chunk)));
  preview.stderr.on('data', (chunk) => process.stderr.write(String(chunk)));

  let failed = [];

  try {
    await waitForServer(baseUrl);
    const browser = await chromium.launch({ headless: true });

    for (const viewport of VIEWPORTS) {
      const vpDir = path.join(OUT_DIR, viewport.name);
      await fs.mkdir(vpDir, { recursive: true });

      for (const route of routes) {
        const page = await browser.newPage({ viewport });
        const target = `${baseUrl}${route}`;
        const file = path.join(vpDir, `${slugifyRoute(route)}.png`);

        try {
          await page.goto(target, { waitUntil: 'networkidle', timeout: 45000 });
          await page.screenshot({ path: file, fullPage: true });
          console.log(`OK   [${viewport.name}] ${route}`);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          failed.push({ viewport: viewport.name, route, message });
          console.log(`FAIL [${viewport.name}] ${route}`);
        } finally {
          await page.close();
        }
      }
    }

    await browser.close();
  } finally {
    preview.kill('SIGTERM');
  }

  if (failed.length) {
    const failPath = path.join(OUT_DIR, 'failed.json');
    await fs.writeFile(failPath, JSON.stringify(failed, null, 2));
    console.error(`Completed with ${failed.length} failures. See ${failPath}`);
    process.exitCode = 1;
    return;
  }

  console.log('Completed visual sweep with no failures.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
