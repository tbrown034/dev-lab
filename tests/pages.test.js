import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

/** Helper: read an HTML file relative to project root */
function readHTML(relPath) {
  const full = resolve(ROOT, relPath);
  return readFileSync(full, 'utf-8');
}

// ─── Course tracks and their expected sub-pages ───
const TRACKS = ['d3', 'django', 'sql', 'jsts', 'react', 'css-design', 'ai-llm'];

const TRACK_LESSONS = {
  d3: [
    '00-syllabus', '01-fundamentals', '02-selections-data', '03-scales-axes',
    '04-shapes-bindings', '05-maps-geo', '06-transitions-interactivity',
    '07-lines-areas', '08-arcs-pies', '09-maps-geo', '10-interactivity',
    '11-d3-react', '12-capstone',
  ],
  django: [
    '06-django-quickstart', '07-models-orm', '08-views-urls', '09-templates-forms',
    '10-rest-api', '11-auth-testing-deploy', '12-capstone',
  ],
  sql: [
    '01-sql-fundamentals', '02-select-filtering', '03-joins', '04-aggregation',
    '05-subqueries', '06-window-functions', '07-data-types-constraints',
    '08-indexes-performance', '09-postgres-specific', '10-database-design',
    '11-advanced-queries', '12-capstone',
  ],
  jsts: [
    '00-syllabus', '01-engine-internals', '02-types-coercion', '03-closures-scope',
    '04-prototypes-classes', '05-async-patterns', '06-iterators-generators',
    '07-typescript-foundations', '08-ts-generics', '09-ts-advanced',
    '10-testing-patterns', '11-node-internals', '12-capstone',
  ],
  react: [
    '00-syllabus', '01-react-mental-model', '02-fiber-reconciliation',
    '03-hooks-deep-dive', '04-state-management', '05-server-components',
    '06-nextjs-app-router', '07-data-fetching', '08-performance',
    '09-forms-validation', '10-testing-react', '11-framework-comparison',
    '12-capstone',
  ],
  'css-design': [
    '00-syllabus', '01-cascade-specificity', '02-layout-mental-models',
    '03-flexbox-mastery', '04-grid-mastery', '05-custom-properties',
    '06-modern-css', '07-animation-motion', '08-tailwind-v4',
    '09-design-tokens', '10-component-systems', '11-broadcast-graphics',
    '12-capstone',
  ],
  'ai-llm': [
    '00-syllabus', '01-how-llms-work', '02-prompt-engineering', '03-claude-api',
    '04-tool-use', '05-embeddings-search', '06-rag-patterns', '07-agents',
    '08-structured-output', '09-streaming-ux', '10-eval-testing',
    '11-ethics-journalism', '12-capstone',
  ],
};

// ─── 1. Verify every course hub, lessons, games, use-cases, projects index.html exists ───

describe('Course page existence', () => {
  for (const track of TRACKS) {
    describe(track, () => {
      it(`${track}/index.html (hub) exists`, () => {
        expect(existsSync(resolve(ROOT, track, 'index.html'))).toBe(true);
      });

      it(`${track}/games/index.html exists`, () => {
        expect(existsSync(resolve(ROOT, track, 'games', 'index.html'))).toBe(true);
      });

      it(`${track}/projects/index.html exists`, () => {
        expect(existsSync(resolve(ROOT, track, 'projects', 'index.html'))).toBe(true);
      });

      it(`${track}/references/use-cases/index.html exists`, () => {
        expect(existsSync(resolve(ROOT, track, 'references', 'use-cases', 'index.html'))).toBe(true);
      });

      // Every lesson
      const lessons = TRACK_LESSONS[track] || [];
      for (const lesson of lessons) {
        it(`${track}/lessons/${lesson}/index.html exists`, () => {
          expect(existsSync(resolve(ROOT, track, 'lessons', lesson, 'index.html'))).toBe(true);
        });
      }
    });
  }
});

// ─── 1b. Standalone Python track (hub + lessons, no games/projects/references) ───

describe('Python track page existence', () => {
  const PYTHON_LESSONS = [
    '01-python-fundamentals', '02-python-collections', '03-python-functions',
    '04-python-oop', '05-python-data-files',
  ];
  it('python/index.html (hub) exists', () => {
    expect(existsSync(resolve(ROOT, 'python', 'index.html'))).toBe(true);
  });
  for (const lesson of PYTHON_LESSONS) {
    it(`python/lessons/${lesson}/index.html exists`, () => {
      expect(existsSync(resolve(ROOT, 'python', 'lessons', lesson, 'index.html'))).toBe(true);
    });
  }
});

// ─── 1c. In-progress tracks (landing only, lessons not yet authored) ───

describe('In-progress track hubs exist', () => {
  for (const track of ['pandas', 'r']) {
    it(`${track}/index.html (hub) exists`, () => {
      expect(existsSync(resolve(ROOT, track, 'index.html'))).toBe(true);
    });
  }
});

// ─── 2. Top-level pages exist ───

describe('Top-level page existence', () => {
  const pages = [
    'index.html',
    'courses/index.html',
    'about/index.html',
    'pod/index.html',
    'feed/index.html',
  ];
  for (const page of pages) {
    it(`${page} exists`, () => {
      expect(existsSync(resolve(ROOT, page))).toBe(true);
    });
  }
});

// ─── 3. Valid HTML structure ───

describe('HTML structure validity', () => {
  /** Collect every index.html we know about */
  const htmlFiles = [
    'index.html',
    'courses/index.html',
    'about/index.html',
    'pod/index.html',
    'feed/index.html',
  ];
  for (const track of TRACKS) {
    htmlFiles.push(`${track}/index.html`);
    htmlFiles.push(`${track}/games/index.html`);
    htmlFiles.push(`${track}/projects/index.html`);
    htmlFiles.push(`${track}/references/use-cases/index.html`);
    for (const lesson of TRACK_LESSONS[track] || []) {
      htmlFiles.push(`${track}/lessons/${lesson}/index.html`);
    }
  }

  for (const file of htmlFiles) {
    it(`${file} has valid HTML structure (DOCTYPE, html, head, body)`, () => {
      const html = readHTML(file);
      expect(html).toMatch(/<!DOCTYPE html>/i);
      expect(html).toMatch(/<html[\s>]/i);
      expect(html).toMatch(/<head[\s>]/i);
      expect(html).toMatch(/<body[\s>]/i);
    });
  }
});

// ─── 4. Every page references base.css ───

describe('CSS references', () => {
  const htmlFiles = [
    'index.html',
    'courses/index.html',
    'about/index.html',
    'pod/index.html',
    'feed/index.html',
  ];
  for (const track of TRACKS) {
    htmlFiles.push(`${track}/index.html`);
    for (const lesson of TRACK_LESSONS[track] || []) {
      htmlFiles.push(`${track}/lessons/${lesson}/index.html`);
    }
  }

  for (const file of htmlFiles) {
    it(`${file} references base.css`, () => {
      const html = readHTML(file);
      expect(html).toMatch(/href=["'][^"']*base\.css["']/);
    });
  }
});

// ─── 5. Lesson pages reference lesson.css and set --track-color ───

describe('Lesson pages reference lesson.css and set --track-color', () => {
  for (const track of TRACKS) {
    for (const lesson of TRACK_LESSONS[track] || []) {
      const file = `${track}/lessons/${lesson}/index.html`;
      it(`${file} references lesson.css`, () => {
        const html = readHTML(file);
        expect(html).toMatch(/href=["'][^"']*lesson\.css["']/);
      });

      it(`${file} sets --track-color`, () => {
        const html = readHTML(file);
        expect(html).toMatch(/--track-color\s*:/);
      });
    }
  }
});

// ─── 6. Hub pages reference shell.css ───

describe('Hub pages reference shell.css', () => {
  const hubPages = [
    'index.html',
    'courses/index.html',
    'about/index.html',
    'feed/index.html',
    'pod/index.html',
  ];
  for (const track of TRACKS) {
    hubPages.push(`${track}/index.html`);
  }

  for (const file of hubPages) {
    it(`${file} references shell.css`, () => {
      const html = readHTML(file);
      expect(html).toMatch(/href=["'][^"']*shell\.css["']/);
    });
  }
});
