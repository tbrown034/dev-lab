import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

// ─── Helpers ───

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

const allHTMLFiles = findHTMLFiles(ROOT);

// ─── 1. All pages have a lang attribute on <html> ───

describe('HTML lang attribute', () => {
  for (const file of allHTMLFiles) {
    const relFile = file.replace(ROOT + '/', '');

    it(`${relFile} has lang attribute on <html>`, () => {
      const html = readFileSync(file, 'utf-8');
      // Match <html with a lang attribute somewhere in the tag
      expect(html).toMatch(/<html[^>]+lang=["'][^"']+["']/i);
    });
  }
});

// ─── 2. All pages have a meta viewport tag ───

describe('Meta viewport tag', () => {
  for (const file of allHTMLFiles) {
    const relFile = file.replace(ROOT + '/', '');

    it(`${relFile} has a meta viewport tag`, () => {
      const html = readFileSync(file, 'utf-8');
      expect(html).toMatch(/<meta[^>]+name=["']viewport["'][^>]*>/i);
    });
  }
});

// ─── 3. All pages have a <title> tag ───

describe('Title tag', () => {
  for (const file of allHTMLFiles) {
    const relFile = file.replace(ROOT + '/', '');

    it(`${relFile} has a <title> tag with content`, () => {
      const html = readFileSync(file, 'utf-8');
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      expect(titleMatch, 'Missing <title> tag').not.toBeNull();
      expect(titleMatch[1].trim().length, 'Empty <title> tag').toBeGreaterThan(0);
    });
  }
});

// ─── 4. Theme toggle buttons have aria-label ───

describe('Theme toggle aria-label', () => {
  for (const file of allHTMLFiles) {
    const relFile = file.replace(ROOT + '/', '');
    const html = readFileSync(file, 'utf-8');

    // Only test files that have a theme toggle
    if (html.includes('theme-toggle')) {
      it(`${relFile} theme toggle has aria-label`, () => {
        // Find all theme-toggle buttons and verify they have aria-label
        const toggleMatches = html.match(/<button[^>]*class=["'][^"']*theme-toggle[^"']*["'][^>]*>/gi) || [];
        for (const match of toggleMatches) {
          expect(match).toMatch(/aria-label=["'][^"']+["']/i);
        }
        // Also handle case where class appears after aria-label
        const toggleMatches2 = html.match(/<button[^>]*aria-label[^>]*class=["'][^"']*theme-toggle[^"']*["'][^>]*>/gi) || [];
        // At least one pattern should match if theme-toggle exists as a button
        const totalMatches = toggleMatches.length + toggleMatches2.length;
        if (totalMatches === 0) {
          // theme-toggle might be in CSS or JS, not necessarily a button in HTML
          // Check if it exists as a class on a button element at all
          const hasButton = html.match(/<button[^>]*theme-toggle[^>]*>/i);
          if (hasButton) {
            // If it is a button, it should have aria-label
            expect(hasButton[0]).toMatch(/aria-label/i);
          }
        }
      });
    }
  }
});

// ─── 5. All <img> tags have alt attributes ───

describe('Image alt attributes', () => {
  // Collect pages that have real (non-code-example) <img> tags
  const pagesWithImages = [];

  for (const file of allHTMLFiles) {
    const relFile = file.replace(ROOT + '/', '');
    const html = readFileSync(file, 'utf-8');

    // Strip <script> blocks and <code>/<pre> blocks before extracting <img> tags,
    // since those may contain example HTML (e.g. Django template code snippets)
    const stripped = html
      .replace(/<script[\s>][\s\S]*?<\/script>/gi, '')
      .replace(/<code[\s>][\s\S]*?<\/code>/gi, '')
      .replace(/<pre[\s>][\s\S]*?<\/pre>/gi, '');

    const imgTags = stripped.match(/<img[^>]*>/gi) || [];
    if (imgTags.length > 0) {
      pagesWithImages.push({ relFile, imgTags });
    }
  }

  if (pagesWithImages.length === 0) {
    it('no content-level <img> tags found across the site (all images are in code examples)', () => {
      expect(true).toBe(true);
    });
  } else {
    for (const { relFile, imgTags } of pagesWithImages) {
      it(`${relFile} — all ${imgTags.length} img tag(s) have alt attributes`, () => {
        for (const img of imgTags) {
          expect(img, `Missing alt attribute: ${img}`).toMatch(/alt=["']/i);
        }
      });
    }
  }
});

// ─── 6. All pages have a charset meta tag ───

describe('Charset meta tag', () => {
  for (const file of allHTMLFiles) {
    const relFile = file.replace(ROOT + '/', '');

    it(`${relFile} has charset meta tag`, () => {
      const html = readFileSync(file, 'utf-8');
      expect(html).toMatch(/<meta[^>]+charset=["']?[^"'>]+["']?[^>]*>/i);
    });
  }
});

// ─── 7. Heading hierarchy: every lesson/content page should have at least one h1 ───
// Note: Hub index pages (d3/index.html, sql/index.html, etc.) intentionally use
// the logo element as their visual title rather than an <h1>. We test lesson pages
// and standalone content pages for h1 presence.

describe('Heading hierarchy — h1 present on lesson/content pages', () => {
  const lessonFiles = allHTMLFiles.filter(f => f.includes('/lessons/'));

  for (const file of lessonFiles) {
    const relFile = file.replace(ROOT + '/', '');

    it(`${relFile} has at least one <h1>`, () => {
      const html = readFileSync(file, 'utf-8');
      expect(html).toMatch(/<h1[\s>]/i);
    });
  }
});

// ─── 8. Interactive elements: links have discernible text or aria-label ───

describe('Links have accessible text', () => {
  // Spot-check key pages (hub + courses)
  const keyPages = [
    'index.html',
    'courses/index.html',
    'd3/index.html',
    'django/index.html',
    'sql/index.html',
  ];

  for (const page of keyPages) {
    const fullPath = resolve(ROOT, page);
    if (!existsSync(fullPath)) continue;

    it(`${page} has no completely empty <a> tags without aria-label`, () => {
      const html = readFileSync(fullPath, 'utf-8');
      // Find <a...></a> patterns (empty links)
      const emptyLinks = html.match(/<a[^>]*>\s*<\/a>/gi) || [];

      for (const link of emptyLinks) {
        // Empty links must have an aria-label or title
        const hasAccessibleName = /aria-label=["'][^"']+["']/i.test(link) || /title=["'][^"']+["']/i.test(link);
        expect(hasAccessibleName, `Empty link without accessible name: ${link}`).toBe(true);
      }
    });
  }
});
