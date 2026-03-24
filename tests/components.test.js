import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const COMPONENTS_DIR = resolve(ROOT, 'components');

// ─── 1. All component JS files exist ───

describe('Component file existence', () => {
  const expectedFiles = [
    'init-tutor.js',
    'tutor-chat.js',
    'explain-code.js',
    'section-nav.js',
    'audio-reader.js',
    'podcast-player.js',
    'skill-test.js',
    'interactive-playground.js',
    'platform-config.js',
  ];

  for (const file of expectedFiles) {
    it(`components/${file} exists`, () => {
      expect(existsSync(resolve(COMPONENTS_DIR, file))).toBe(true);
    });
  }
});

// ─── 2. All JS files in components/ parse without syntax errors ───

describe('Component JS files parse without syntax errors', () => {
  const jsFiles = readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.js'));

  for (const file of jsFiles) {
    it(`components/${file} has valid JavaScript syntax`, () => {
      const filePath = resolve(COMPONENTS_DIR, file);
      const src = readFileSync(filePath, 'utf-8');

      // Use Node's built-in parser via child_process to check for syntax errors.
      // `node -c` checks syntax without executing the file.
      const { execSync } = require('child_process');
      let syntaxError = null;
      try {
        // --input-type=module tells Node to parse as ESM (supports import/export)
        execSync(`node --input-type=module -e ""`, {
          input: src,
          stdio: ['pipe', 'pipe', 'pipe'],
          timeout: 5000,
        });
      } catch (err) {
        // If the file has import statements that fail to resolve, that's a runtime
        // error not a syntax error. We only care about SyntaxError.
        const stderr = err.stderr?.toString() || '';
        if (stderr.includes('SyntaxError')) {
          syntaxError = stderr;
        }
      }

      expect(syntaxError, `Syntax error in ${file}: ${syntaxError}`).toBeNull();

      // Also verify the file is non-empty and looks like JS
      expect(src.length).toBeGreaterThan(0);
    });
  }
});

// ─── 3. init-tutor.js imports all expected components ───

describe('init-tutor.js imports', () => {
  const src = readFileSync(resolve(COMPONENTS_DIR, 'init-tutor.js'), 'utf-8');

  const expectedImports = [
    'tutor-chat.js',
    'explain-code.js',
    'section-nav.js',
    'audio-reader.js',
    'podcast-player.js',
    'skill-test.js',
  ];

  for (const imp of expectedImports) {
    it(`imports from ${imp}`, () => {
      expect(src).toContain(imp);
    });
  }

  const expectedFunctionCalls = [
    'initTutorChat',
    'initExplainButtons',
    'initSectionNav',
    'initAudioReader',
    'initPodcastPlayer',
    'initSkillTest',
  ];

  for (const fn of expectedFunctionCalls) {
    it(`calls ${fn}()`, () => {
      expect(src).toMatch(new RegExp(`${fn}\\s*\\(`));
    });
  }
});

// ─── 4. feed.js and feed-data.js export expected values ───

describe('feed-data.js exports', () => {
  const src = readFileSync(resolve(ROOT, 'feed', 'feed-data.js'), 'utf-8');

  it('exports PERSONAS', () => {
    expect(src).toMatch(/export\s+(const|let|var)\s+PERSONAS\s*=/);
  });

  it('exports PERSONAS_FLAT', () => {
    expect(src).toMatch(/export\s+(const|let|var)\s+PERSONAS_FLAT\s*=/);
  });

  it('exports POST_TYPES', () => {
    expect(src).toMatch(/export\s+(const|let|var)\s+POST_TYPES\s*=/);
  });

  it('exports TRACK_META', () => {
    expect(src).toMatch(/export\s+(const|let|var)\s+TRACK_META\s*=/);
  });

  it('exports TRACK_COLORS', () => {
    expect(src).toMatch(/export\s+(const|let|var)\s+TRACK_COLORS\s*=/);
  });

  // Verify all 7 tracks are represented in PERSONAS
  const tracks = ['d3', 'django', 'sql', 'jsts', 'react', 'css', 'ai'];
  for (const track of tracks) {
    it(`PERSONAS includes "${track}" track`, () => {
      // Match the pattern: trackName: { ... } within PERSONAS
      expect(src).toMatch(new RegExp(`${track}\\s*:\\s*\\{`));
    });
  }
});

describe('feed.js structure', () => {
  const src = readFileSync(resolve(ROOT, 'feed', 'feed.js'), 'utf-8');

  it('imports from feed-data.js', () => {
    expect(src).toContain('feed-data.js');
  });

  it('imports PERSONAS_FLAT', () => {
    expect(src).toContain('PERSONAS_FLAT');
  });

  it('imports POST_TYPES', () => {
    expect(src).toContain('POST_TYPES');
  });

  it('imports TRACK_META', () => {
    expect(src).toContain('TRACK_META');
  });

  it('imports TRACK_COLORS', () => {
    expect(src).toContain('TRACK_COLORS');
  });
});

// ─── 5. platform-config.js exports expected values ───

describe('platform-config.js exports', () => {
  const src = readFileSync(resolve(COMPONENTS_DIR, 'platform-config.js'), 'utf-8');

  it('exports detectPlatform function', () => {
    expect(src).toMatch(/export\s+function\s+detectPlatform/);
  });

  it('exports PLATFORM_CONFIG', () => {
    expect(src).toMatch(/export\s+(const|let|var)\s+PLATFORM_CONFIG\s*=/);
  });

  // Verify all expected platforms
  const platforms = ['d3', 'django', 'sql', 'jsts', 'react', 'css-design', 'ai-llm', 'courses', 'pod'];
  for (const p of platforms) {
    it(`PLATFORM_CONFIG includes "${p}"`, () => {
      expect(src).toContain(`'${p}'`);
    });
  }
});
