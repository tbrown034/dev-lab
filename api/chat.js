import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '../lib/system-prompts.js';

// Vercel serverless function backing /api/chat in production.
// Mirrors the Vite dev-server proxy in server/api-proxy.js — both import the
// shared prompts from lib/system-prompts.js so they never drift.
//
// Requires the ANTHROPIC_API_KEY environment variable to be set in the Vercel
// project (the SDK reads it automatically).

const client = new Anthropic();

const MODEL = 'claude-sonnet-4-20250514';
const MAX_BODY_SIZE = 100_000; // 100KB

// Best-effort, per-warm-instance rate limit. Serverless instances are
// ephemeral and not shared, so this caps a hot instance rather than a user
// globally — good enough to blunt abuse without external state.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 30;
const rateLimitMap = new Map();

function getRateLimitKey(req) {
  const fwd = req.headers['x-forwarded-for'];
  return (typeof fwd === 'string' && fwd.split(',')[0].trim())
    || req.socket?.remoteAddress
    || 'unknown';
}

function checkRateLimit(ip) {
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

// Read and JSON-parse the request body. Vercel usually populates req.body for
// JSON requests, but fall back to reading the raw stream if it doesn't.
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

  const ip = getRateLimitKey(req);
  if (!checkRateLimit(ip)) {
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
      max_tokens: 1024,
      system: buildSystemPrompt(platform, lessonContext),
      messages,
    });

    const content = response.content && response.content[0]
      ? response.content[0].text
      : 'No response generated. Try asking again.';

    res.status(200).json({ content });
  } catch (error) {
    console.error('API error:', error.message);
    const statusCode = error.status || 500;
    const userMessage = error.status === 401
      ? 'AI is not configured. The ANTHROPIC_API_KEY is missing or invalid.'
      : error.status === 429
        ? 'Rate limited. Wait a moment and try again.'
        : error.message || 'API request failed';
    res.status(statusCode).json({ error: userMessage });
  }
}
