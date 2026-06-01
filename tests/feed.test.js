import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
// Feed content lives in public/ so Vite copies it verbatim into the build.
const FEED_DIR = resolve(ROOT, 'public', 'feed', 'content');

// ─── Known valid values ───

const KNOWN_TRACKS = ['d3', 'django', 'sql', 'jsts', 'react', 'css', 'ai', 'python', 'pandas', 'r'];

const VALID_POST_TYPES = [
  'interview', 'tip', 'hotTake', 'spotBug', 'mentalModel',
  'poll', 'til', 'thread', 'ratiod', 'eli5', 'commitMsg', 'slackPost',
];

// Build the full set of persona handles from feed-data.js by parsing the source.
// We read the JS file and extract handle values since we cannot import ESM with
// top-level side effects in a Node/Vitest context easily (the file uses window-like
// globals). Instead, we parse the handles from the source.
function extractPersonaHandles() {
  const src = readFileSync(resolve(ROOT, 'feed', 'feed-data.js'), 'utf-8');
  const handles = new Set();
  // Match handle: 'value' patterns
  const handleRegex = /handle:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = handleRegex.exec(src)) !== null) {
    handles.add(match[1]);
  }
  // Also add camelCase keys from PERSONAS — these are also valid author references
  // Match patterns like: bindData: { handle: ...
  const keyRegex = /(\w+):\s*\{\s*handle:/g;
  while ((match = keyRegex.exec(src)) !== null) {
    // Skip track-level keys (d3, django, sql, etc.)
    if (!KNOWN_TRACKS.includes(match[1])) {
      handles.add(match[1]);
    }
  }
  return handles;
}

const ALL_PERSONA_HANDLES = extractPersonaHandles();

// ─── Feed JSON files (top-level, not generated) ───

// Per-track curated files plus the generated batches (one *-gen.json per track).
const FEED_TRACK_KEYS = ['d3', 'django', 'sql', 'jsts', 'react', 'css', 'ai', 'python', 'pandas', 'r'];
const FEED_JSON_FILES = [
  ...FEED_TRACK_KEYS.map(k => `${k}.json`),
  ...FEED_TRACK_KEYS.map(k => `${k}-gen.json`),
];

/** Load and parse a feed JSON file */
function loadFeedJSON(filename) {
  const fullPath = resolve(FEED_DIR, filename);
  const raw = readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw);
}

// ─── 1. All 7 JSON files exist and are valid JSON ───

describe('Feed JSON file validity', () => {
  for (const file of FEED_JSON_FILES) {
    it(`feed/content/${file} exists`, () => {
      expect(existsSync(resolve(FEED_DIR, file))).toBe(true);
    });

    it(`feed/content/${file} is valid JSON`, () => {
      const raw = readFileSync(resolve(FEED_DIR, file), 'utf-8');
      expect(() => JSON.parse(raw)).not.toThrow();
    });

    it(`feed/content/${file} is an array of posts`, () => {
      const data = loadFeedJSON(file);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });
  }
});

// ─── 2. Each post has required fields ───

describe('Feed post required fields', () => {
  const REQUIRED_FIELDS = ['id', 'track', 'type', 'author', 'content', 'likes', 'reposts', 'comments'];

  for (const file of FEED_JSON_FILES) {
    const posts = loadFeedJSON(file);

    for (const post of posts) {
      it(`${file} post "${post.id}" has all required fields`, () => {
        for (const field of REQUIRED_FIELDS) {
          expect(post, `Missing field: ${field} in post ${post.id}`).toHaveProperty(field);
        }
      });
    }
  }
});

// ─── 3. All post IDs are unique across the entire feed ───

describe('Feed post ID uniqueness', () => {
  it('all post IDs are unique across all feed files', () => {
    const allIds = [];
    for (const file of FEED_JSON_FILES) {
      const posts = loadFeedJSON(file);
      for (const post of posts) {
        allIds.push(post.id);
      }
    }
    const uniqueIds = new Set(allIds);
    const duplicates = allIds.filter((id, i) => allIds.indexOf(id) !== i);
    expect(duplicates, `Duplicate IDs found: ${duplicates.join(', ')}`).toHaveLength(0);
    expect(uniqueIds.size).toBe(allIds.length);
  });
});

// ─── 4. All author handles exist in feed-data.js personas ───

describe('Feed author handle validation', () => {
  for (const file of FEED_JSON_FILES) {
    const posts = loadFeedJSON(file);

    for (const post of posts) {
      it(`${file} post "${post.id}" author "${post.author}" is a known persona`, () => {
        expect(
          ALL_PERSONA_HANDLES.has(post.author),
          `Unknown author handle "${post.author}" — known handles: ${[...ALL_PERSONA_HANDLES].join(', ')}`
        ).toBe(true);
      });

      // Also check comment authors
      if (Array.isArray(post.comments)) {
        for (const comment of post.comments) {
          if (comment.author) {
            it(`${file} post "${post.id}" comment author "${comment.author}" is a known persona`, () => {
              expect(
                ALL_PERSONA_HANDLES.has(comment.author),
                `Unknown comment author "${comment.author}"`
              ).toBe(true);
            });
          }
        }
      }
    }
  }
});

// ─── 5. All post types are valid ───

describe('Feed post type validation', () => {
  for (const file of FEED_JSON_FILES) {
    const posts = loadFeedJSON(file);

    for (const post of posts) {
      it(`${file} post "${post.id}" type "${post.type}" is valid`, () => {
        expect(VALID_POST_TYPES).toContain(post.type);
      });
    }
  }
});

// ─── 6. All track values match known tracks ───

describe('Feed post track validation', () => {
  for (const file of FEED_JSON_FILES) {
    const posts = loadFeedJSON(file);

    for (const post of posts) {
      it(`${file} post "${post.id}" track "${post.track}" is a known track`, () => {
        expect(KNOWN_TRACKS).toContain(post.track);
      });
    }
  }
});

// ─── 7. Post field type checks ───

describe('Feed post field types', () => {
  for (const file of FEED_JSON_FILES) {
    const posts = loadFeedJSON(file);

    for (const post of posts) {
      it(`${file} post "${post.id}" has correct field types`, () => {
        expect(typeof post.id).toBe('string');
        expect(typeof post.track).toBe('string');
        expect(typeof post.type).toBe('string');
        expect(typeof post.author).toBe('string');
        expect(typeof post.content).toBe('string');
        expect(typeof post.likes).toBe('number');
        expect(typeof post.reposts).toBe('number');
        expect(Array.isArray(post.comments)).toBe(true);
      });
    }
  }
});
