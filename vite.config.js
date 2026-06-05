import { defineConfig } from 'vite';
import { resolve, join } from 'path';
import { readdirSync, statSync } from 'fs';

// Directories to skip when searching for HTML entry points
const SKIP_DIRS = new Set([
  'node_modules', 'dist', '.git', '.vercel', 'public',
  'learn-d3', 'learn-django', 'learn-sql',  // old standalone dirs
  'audio', 'devlogs', 'tools', 'server', 'test-results',  // non-HTML asset/config dirs
]);

/**
 * Recursively find all index.html and standalone .html files
 * to use as Vite multi-page entry points.
 */
function findHtmlFiles(dir, base = '') {
  const entries = {};

  let items;
  try {
    items = readdirSync(dir);
  } catch {
    return entries;
  }

  for (const item of items) {
    const fullPath = join(dir, item);

    if (SKIP_DIRS.has(item)) continue;

    let stat;
    try {
      stat = statSync(fullPath);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      Object.assign(entries, findHtmlFiles(fullPath, base ? `${base}/${item}` : item));
    } else if (item.endsWith('.html')) {
      // Build a clean entry name from the relative path
      const rel = base ? `${base}/${item}` : item;
      const entryName = rel
        .replace(/\/index\.html$/, '')  // "d3/lessons/01/index.html" -> "d3/lessons/01"
        .replace(/\.html$/, '')          // "exercises/01-exercise.html" -> "exercises/01-exercise"
        .replace(/\//g, '_');            // slashes -> underscores for rollup key

      // Top-level index.html gets the key "main"
      const key = entryName === '' ? 'main' : entryName;
      entries[key] = resolve(rel);
    }
  }

  return entries;
}

/**
 * Inject Vercel Web Analytics into every built page. This is a static Vite
 * multi-page app (not Next.js), so we add the script Vercel serves at
 * /_vercel/insights/script.js rather than the @vercel/analytics/next component.
 * Build-only: the endpoint 404s locally, so we skip it in `vite dev`.
 */
function vercelAnalytics() {
  return {
    name: 'vercel-analytics',
    apply: 'build',
    transformIndexHtml() {
      return [{
        tag: 'script',
        attrs: { defer: true, src: '/_vercel/insights/script.js' },
        injectTo: 'head',
      }];
    },
  };
}

export default defineConfig(async ({ command }) => ({
  root: '.',
  server: {
    port: 3000,
    open: true,
  },
  plugins: command === 'serve'
    ? [(await import('./server/api-proxy.js')).createApiProxy()]
    : [vercelAnalytics()],
  build: {
    target: 'esnext',
    rollupOptions: {
      input: findHtmlFiles('.'),
    },
  },
}));
