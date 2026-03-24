import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve, join, dirname } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

// ─── Helpers ───

/** Recursively find all HTML files, skipping node_modules etc. */
const SKIP = new Set(['node_modules', '.git', 'dist', 'learn-d3', 'learn-django', 'learn-sql', 'audio']);
function findHTMLFiles(dir) {
  const results = [];
  let items;
  try { items = readdirSync(dir); } catch { return results; }
  for (const item of items) {
    if (SKIP.has(item)) continue;
    const full = join(dir, item);
    let stat;
    try { stat = statSync(full); } catch { continue; }
    if (stat.isDirectory()) {
      results.push(...findHTMLFiles(full));
    } else if (item.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

/** Extract all href values from anchor tags in HTML, excluding code examples */
function extractHrefs(html) {
  // First, strip content inside <code>, <pre>, and <samp> blocks so we don't
  // pick up example links (e.g. Django template href="/blog/{{ post.slug }}")
  const stripped = html
    .replace(/<code[\s>][\s\S]*?<\/code>/gi, '')
    .replace(/<pre[\s>][\s\S]*?<\/pre>/gi, '')
    .replace(/<samp[\s>][\s\S]*?<\/samp>/gi, '');

  const hrefs = [];
  const regex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(stripped)) !== null) {
    hrefs.push(match[1]);
  }
  return hrefs;
}

/** Extract nav-footer links specifically */
function extractNavFooterLinks(html) {
  const navFooterMatch = html.match(/<div class="nav-footer">([\s\S]*?)<\/div>/);
  if (!navFooterMatch) return [];
  return extractHrefs(navFooterMatch[1]);
}

/** Check if a path-based internal link resolves to an existing file or directory */
function internalLinkExists(href) {
  // Strip query strings and hash fragments
  const clean = href.split('?')[0].split('#')[0];
  if (!clean || clean === '/') return true; // root always exists

  const targetPath = resolve(ROOT, clean.replace(/^\//, ''));

  // If it points to a directory, check for index.html inside
  if (existsSync(targetPath)) {
    try {
      if (statSync(targetPath).isDirectory()) {
        return existsSync(join(targetPath, 'index.html'));
      }
    } catch { /* fall through */ }
    return true;
  }

  // Maybe it is a directory path without trailing slash — check dir + index.html
  if (existsSync(targetPath + '/index.html')) return true;

  return false;
}

// ─── Collect all HTML files ───
const allHTMLFiles = findHTMLFiles(ROOT);

// ─── 1. Every internal href link (starting with /) points to an existing file/directory ───

describe('Internal link integrity', () => {
  for (const file of allHTMLFiles) {
    const relFile = file.replace(ROOT + '/', '');
    const html = readFileSync(file, 'utf-8');
    const hrefs = extractHrefs(html);

    // Filter to internal links only (start with /)
    const internalLinks = hrefs.filter(h =>
      h.startsWith('/') &&
      !h.startsWith('//') &&      // skip protocol-relative URLs
      !h.startsWith('/#') &&      // skip hash-only root links
      !h.endsWith('.css') &&      // skip CSS (tested elsewhere)
      !h.endsWith('.js') &&       // skip JS imports
      !h.endsWith('.svg') &&      // skip SVGs
      !h.endsWith('.png') &&      // skip images
      !h.endsWith('.jpg') &&      // skip images
      !h.endsWith('.jpeg') &&     // skip images
      !h.endsWith('.mp3') &&      // skip audio
      !h.endsWith('.webp')        // skip images
    );

    // Only create tests for files that have internal links
    if (internalLinks.length > 0) {
      // Deduplicate
      const uniqueLinks = [...new Set(internalLinks)];
      for (const link of uniqueLinks) {
        it(`${relFile}: link "${link}" resolves to an existing path`, () => {
          expect(internalLinkExists(link)).toBe(true);
        });
      }
    }
  }
});

// ─── 2. Lesson nav-footer prev/next links are valid ───

describe('Lesson nav-footer link integrity', () => {
  // Collect lesson HTML files specifically
  const TRACKS = ['d3', 'django', 'sql', 'jsts', 'react', 'css-design', 'ai-llm'];
  const lessonFiles = [];

  for (const track of TRACKS) {
    const lessonsDir = resolve(ROOT, track, 'lessons');
    if (!existsSync(lessonsDir)) continue;
    const lessons = readdirSync(lessonsDir).filter(d => {
      try { return statSync(join(lessonsDir, d)).isDirectory(); } catch { return false; }
    }).sort();
    for (const lesson of lessons) {
      const htmlPath = join(lessonsDir, lesson, 'index.html');
      if (existsSync(htmlPath)) {
        lessonFiles.push({ track, lesson, path: htmlPath });
      }
    }
  }

  for (const { track, lesson, path } of lessonFiles) {
    const html = readFileSync(path, 'utf-8');
    const navLinks = extractNavFooterLinks(html);

    if (navLinks.length > 0) {
      for (const link of navLinks) {
        it(`${track}/lessons/${lesson} nav-footer link "${link}" is valid`, () => {
          expect(internalLinkExists(link)).toBe(true);
        });
      }
    }
  }
});

// ─── 3. Hub page nav links point to real pages ───

describe('Hub page nav links are valid', () => {
  const hubPages = [
    'index.html',
    'courses/index.html',
    'about/index.html',
    'feed/index.html',
    'pod/index.html',
    'd3/index.html',
    'django/index.html',
    'sql/index.html',
    'jsts/index.html',
    'react/index.html',
    'css-design/index.html',
    'ai-llm/index.html',
  ];

  for (const page of hubPages) {
    const fullPath = resolve(ROOT, page);
    if (!existsSync(fullPath)) continue;
    const html = readFileSync(fullPath, 'utf-8');

    // Extract links from <nav> sections or <header> specifically
    const navMatch = html.match(/<(?:nav|header)[\s\S]*?<\/(?:nav|header)>/gi) || [];
    const navHTML = navMatch.join('\n');
    const navHrefs = extractHrefs(navHTML).filter(h => h.startsWith('/'));

    if (navHrefs.length > 0) {
      const unique = [...new Set(navHrefs)];
      for (const link of unique) {
        it(`${page} nav link "${link}" resolves to existing path`, () => {
          expect(internalLinkExists(link)).toBe(true);
        });
      }
    }
  }
});
