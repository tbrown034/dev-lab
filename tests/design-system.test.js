import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

function readFile(relPath) {
  return readFileSync(resolve(ROOT, relPath), 'utf-8');
}

// ─── 1. Core CSS files exist ───

describe('Core CSS file existence', () => {
  it('assets/base.css exists', () => {
    expect(existsSync(resolve(ROOT, 'assets', 'base.css'))).toBe(true);
  });

  it('assets/shell.css exists', () => {
    expect(existsSync(resolve(ROOT, 'assets', 'shell.css'))).toBe(true);
  });

  it('assets/lesson.css exists', () => {
    expect(existsSync(resolve(ROOT, 'assets', 'lesson.css'))).toBe(true);
  });
});

// ─── 2. base.css contains all required CSS custom properties ───

describe('base.css design tokens', () => {
  const css = readFile('assets/base.css');

  // Neutrals
  const neutralVars = ['--bg', '--surface', '--surface-2', '--border', '--border-hover', '--text', '--text-dim', '--text-muted', '--header-bg'];
  for (const v of neutralVars) {
    it(`defines ${v}`, () => {
      expect(css).toContain(v);
    });
  }

  // Track accents
  const accentVars = ['--accent-d3', '--accent-django', '--accent-sql', '--accent-jsts', '--accent-react', '--accent-css', '--accent-ai'];
  for (const v of accentVars) {
    it(`defines ${v}`, () => {
      expect(css).toContain(v);
    });
  }

  // Semantic colors
  const semanticVars = ['--success', '--warning', '--error', '--info'];
  for (const v of semanticVars) {
    it(`defines ${v}`, () => {
      expect(css).toContain(v);
    });
  }

  // Typography
  const fontVars = ['--serif', '--sans', '--mono'];
  for (const v of fontVars) {
    it(`defines ${v}`, () => {
      expect(css).toContain(v);
    });
  }

  // Motion
  it('defines --ease-out-expo', () => {
    expect(css).toContain('--ease-out-expo');
  });

  // Noise
  it('defines --noise-opacity', () => {
    expect(css).toContain('--noise-opacity');
  });

  // Light theme
  it('defines [data-theme="light"] overrides', () => {
    expect(css).toMatch(/\[data-theme=["']light["']\]/);
  });
});

// ─── 3. shell.css contains expected patterns ───

describe('shell.css structure', () => {
  const css = readFile('assets/shell.css');

  it('defines header styles', () => {
    expect(css).toMatch(/header\s*\{/);
  });

  it('defines .header-inner', () => {
    expect(css).toContain('.header-inner');
  });

  it('defines .logo styles', () => {
    expect(css).toContain('.logo');
  });

  it('defines nav styles', () => {
    expect(css).toMatch(/nav\s*\{/);
  });

  it('defines .theme-toggle styles', () => {
    expect(css).toContain('.theme-toggle');
  });
});

// ─── 4. lesson.css contains expected patterns ───

describe('lesson.css structure', () => {
  const css = readFile('assets/lesson.css');

  it('references --track-color', () => {
    expect(css).toContain('--track-color');
  });

  it('defines .header styles', () => {
    expect(css).toMatch(/\.header\s*\{/);
  });

  it('defines .content styles', () => {
    expect(css).toMatch(/\.content\s*\{/);
  });
});

// ─── 5. Hub pages use the shared section-header pattern ───

describe('Hub pages use section-header pattern', () => {
  const hubPages = [
    'd3/index.html',
    'django/index.html',
    'sql/index.html',
    'jsts/index.html',
    'react/index.html',
    'css-design/index.html',
    'ai-llm/index.html',
    'courses/index.html',
  ];

  for (const page of hubPages) {
    it(`${page} uses section-header class`, () => {
      const html = readFile(page);
      expect(html).toContain('section-header');
    });
  }
});

// ─── 6. Theme toggle exists on all top-level and hub pages ───

describe('Theme toggle on key pages', () => {
  const pages = [
    'index.html',
    'courses/index.html',
    'about/index.html',
    'd3/index.html',
    'django/index.html',
    'sql/index.html',
    'jsts/index.html',
    'react/index.html',
    'css-design/index.html',
    'ai-llm/index.html',
  ];

  for (const page of pages) {
    it(`${page} has a theme toggle button`, () => {
      const html = readFile(page);
      expect(html).toMatch(/class=["'][^"']*theme-toggle[^"']*["']/);
    });
  }
});

// ─── 7. Consistent track color assignments ───

describe('Track color consistency', () => {
  const TRACK_COLORS = {
    d3: '#f97316',
    django: '#22c55e',
    sql: '#3b82f6',
    jsts: '#eab308',
    react: '#06b6d4',
    'css-design': '#a855f7',
    'ai-llm': '#f472b6',
  };

  const css = readFile('assets/base.css');

  for (const [track, color] of Object.entries(TRACK_COLORS)) {
    const varName = track === 'css-design' ? '--accent-css' : track === 'ai-llm' ? '--accent-ai' : `--accent-${track}`;
    it(`base.css defines ${varName}: ${color}`, () => {
      expect(css).toContain(color);
      expect(css).toContain(varName);
    });
  }
});
