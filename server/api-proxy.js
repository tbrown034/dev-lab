import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { buildSystemPrompt } from '../lib/system-prompts.js';

// Load .env manually — Vite's env loading only applies to client-side code,
// not server middleware (unlike Next.js which auto-loads process.env)
function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), '.env');
    const envContent = readFileSync(envPath, 'utf-8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed.slice(eqIndex + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env file doesn't exist — that's fine, key might be set in shell
  }
}
loadEnv();

const client = new Anthropic();

const MAX_BODY_SIZE = 100_000; // 100KB limit

// ---------------------------------------------------------------------------
// Rate limiting — per-IP, sliding window
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 30; // max requests per window per IP
const rateLimitMap = new Map();

function getRateLimitKey(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.socket?.remoteAddress
    || 'unknown';
}

// Convert Node's plain headers object into a Fetch Headers instance so
// Better Auth can read the session cookie.
function toHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) value.forEach(v => headers.append(key, v));
    else if (value != null) headers.set(key, value);
  }
  return headers;
}

function checkRateLimit(ip) {
  const now = Date.now();
  let entry = rateLimitMap.get(ip);
  if (!entry) {
    entry = { timestamps: [] };
    rateLimitMap.set(ip, entry);
  }
  // Drop timestamps outside the window
  entry.timestamps = entry.timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (entry.timestamps.length >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.timestamps.push(now);
  return true;
}

// Clean up stale entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    entry.timestamps = entry.timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (entry.timestamps.length === 0) rateLimitMap.delete(ip);
  }
}, 10 * 60 * 1000);

export function createApiProxy() {
  return {
    name: 'dev-lab-proxy',
    async configureServer(server) {
      // Lazy-import auth so it doesn't block vite build (pg + better-auth are Node-only)
      const { toNodeHandler } = await import('better-auth/node');
      const { auth } = await import('../lib/auth.js');
      const authHandler = toNodeHandler(auth);

      // Better Auth routes — mount at root so Better Auth handles its own path matching
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/auth')) {
          return authHandler(req, res);
        }
        next();
      });

      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        // Require sign-in — same enforcement as the production function.
        const session = await auth.api.getSession({ headers: toHeaders(req.headers) }).catch(() => null);
        if (!session) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Please sign in to use the AI tutor.', authRequired: true }));
          return;
        }

        // Rate limit per authenticated user, not per IP.
        const rlKey = `u:${session.user?.id || getRateLimitKey(req)}`;
        if (!checkRateLimit(rlKey)) {
          res.statusCode = 429;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'You\'ve hit the hourly limit. Try again in a bit.' }));
          return;
        }

        let body = '';
        let tooLarge = false;
        req.on('data', chunk => {
          body += chunk;
          if (body.length > MAX_BODY_SIZE) tooLarge = true;
        });
        req.on('end', async () => {
          if (tooLarge) {
            res.statusCode = 413;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Request too large' }));
            return;
          }

          try {
            let parsed;
            try {
              parsed = JSON.parse(body);
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid JSON in request body' }));
              return;
            }

            const { messages, lessonContext, platform } = parsed;

            if (!Array.isArray(messages) || messages.length === 0) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'messages must be a non-empty array' }));
              return;
            }

            const systemPrompt = buildSystemPrompt(platform, lessonContext);

            const response = await client.messages.create({
              model: 'claude-haiku-4-5-20251001',
              max_tokens: 1024,
              system: systemPrompt,
              messages: messages,
            });

            const content = response.content && response.content[0]
              ? response.content[0].text
              : 'No response generated. Try asking again.';

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ content }));
          } catch (error) {
            console.error('API error:', error.status, error.message);
            // Dev parity with api/chat.js: in dev, surface the key-config hint
            // since that's the common local failure; never leak raw API text.
            const userMessage = error.status === 401
              ? 'Invalid API key. Check your ANTHROPIC_API_KEY in .env'
              : error.status === 429
                ? 'Rate limited. Wait a moment and try again.'
                : error.status === 529 || /overloaded/i.test(error.message || '')
                  ? 'The AI is busy right now. Try again in a moment.'
                  : error.status === 400 && /credit balance|billing|quota/i.test(error.message || '')
                    ? 'The AI tutor is temporarily unavailable. Please check back soon.'
                    : 'The AI tutor hit an error. Please try again.';

            res.statusCode = error.status || 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: userMessage }));
          }
        });
      });
    },
  };
}
