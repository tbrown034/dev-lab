import Anthropic from '@anthropic-ai/sdk';
import pg from 'pg';
import { buildSystemPrompt } from '../lib/system-prompts.js';

// Vercel serverless function backing /api/chat in production.
// Mirrors the Vite dev-server proxy in server/api-proxy.js — both import the
// shared prompts from lib/system-prompts.js so they never drift.
//
// Requires the ANTHROPIC_API_KEY and DATABASE_URL environment variables in the
// Vercel project (the Anthropic SDK reads the key automatically).

const client = new Anthropic();

// One model for every AI feature — Haiku keeps cost low; the tutor, Explain It
// Back, skill tests, and feed replies are all short-form and don't need a
// larger model.
const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 1024;
const MAX_BODY_SIZE = 100_000; // 100KB

const RATE_LIMIT_MAX = 30; // requests per IP per rolling hour window

// ---------------------------------------------------------------------------
// Rate limiting — Postgres-backed fixed window, shared across all serverless
// instances (the previous in-memory limiter reset on every cold start). Falls
// back to a per-instance in-memory limiter if the database is unavailable.
// ---------------------------------------------------------------------------
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 2,
});

let schemaReady = null;
function ensureSchema() {
  if (!schemaReady) {
    schemaReady = pool
      .query(`
        CREATE TABLE IF NOT EXISTS ai_rate_limit (
          ip TEXT NOT NULL,
          window_start TIMESTAMPTZ NOT NULL,
          count INT NOT NULL DEFAULT 0,
          PRIMARY KEY (ip, window_start)
        )
      `)
      .then(() =>
        // Best-effort cleanup of windows older than 2 hours; cheap and rare.
        pool.query(`DELETE FROM ai_rate_limit WHERE window_start < now() - interval '2 hours'`).catch(() => {})
      )
      .catch(err => {
        schemaReady = null; // allow a retry on the next request
        throw err;
      });
  }
  return schemaReady;
}

async function checkRateLimitDb(ip) {
  await ensureSchema();
  const { rows } = await pool.query(
    `INSERT INTO ai_rate_limit (ip, window_start, count)
     VALUES ($1, date_trunc('hour', now()), 1)
     ON CONFLICT (ip, window_start)
     DO UPDATE SET count = ai_rate_limit.count + 1
     RETURNING count`,
    [ip]
  );
  return rows[0].count <= RATE_LIMIT_MAX;
}

// In-memory fallback (per warm instance) — only used if the DB check throws.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const rateLimitMap = new Map();
function checkRateLimitMemory(ip) {
  const now = Date.now();
  let entry = rateLimitMap.get(ip);
  if (!entry) {
    entry = { timestamps: [] };
    rateLimitMap.set(ip, entry);
  }
  entry.timestamps = entry.timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (entry.timestamps.length >= RATE_LIMIT_MAX) return false;
  entry.timestamps.push(now);
  return true;
}

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  return (typeof fwd === 'string' && fwd.split(',')[0].trim())
    || req.socket?.remoteAddress
    || 'unknown';
}

// Reject requests that don't originate from our own site, which blunts the
// most casual scripted abuse (curl/bots usually omit these headers).
function isSameOrigin(req) {
  const host = req.headers['host'];
  const origin = req.headers['origin'];
  const referer = req.headers['referer'];
  if (origin) {
    try { return new URL(origin).host === host; } catch { return false; }
  }
  if (referer) {
    try { return new URL(referer).host === host; } catch { return false; }
  }
  return false;
}

async function readJsonBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'object') return req.body;
    if (typeof req.body === 'string') return JSON.parse(req.body);
  }
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > MAX_BODY_SIZE) {
      const err = new Error('Request too large');
      err.statusCode = 413;
      throw err;
    }
  }
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!isSameOrigin(req)) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  const ip = getClientIp(req);
  let allowed;
  try {
    allowed = await checkRateLimitDb(ip);
  } catch (err) {
    console.error('Rate-limit DB error, falling back to in-memory:', err.message);
    allowed = checkRateLimitMemory(ip);
  }
  if (!allowed) {
    res.status(429).json({ error: 'Too many requests. Try again in a bit.' });
    return;
  }

  let parsed;
  try {
    parsed = await readJsonBody(req);
  } catch (err) {
    if (err.statusCode === 413) {
      res.status(413).json({ error: 'Request too large' });
    } else {
      res.status(400).json({ error: 'Invalid JSON in request body' });
    }
    return;
  }

  const { messages, lessonContext, platform } = parsed;
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'messages must be a non-empty array' });
    return;
  }

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: buildSystemPrompt(platform, lessonContext),
      messages,
    });

    const content = response.content && response.content[0]
      ? response.content[0].text
      : 'No response generated. Try asking again.';

    res.status(200).json({ content });
  } catch (error) {
    // Log the real error server-side; never surface raw API text (which can
    // include billing/credit details) to students in the chat UI.
    console.error('API error:', error.status, error.message);
    res.status(error.status || 500).json({ error: friendlyAiError(error) });
  }
}

// Map an Anthropic SDK error to a safe, student-facing message. The raw
// message is logged, not returned — e.g. a 400 "credit balance is too low"
// would otherwise leak billing state into the public chat.
function friendlyAiError(error) {
  const msg = error?.message || '';
  if (error?.status === 401) return 'The AI tutor isn\'t configured right now.';
  if (error?.status === 429) return 'Rate limited. Wait a moment and try again.';
  if (error?.status === 529 || /overloaded/i.test(msg)) return 'The AI is busy right now. Try again in a moment.';
  if (error?.status === 400 && /credit balance|billing|quota/i.test(msg)) {
    return 'The AI tutor is temporarily unavailable. Please check back soon.';
  }
  return 'The AI tutor hit an error. Please try again.';
}
