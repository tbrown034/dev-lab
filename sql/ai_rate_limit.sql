-- Rate-limit table for the /api/chat endpoint.
-- api/chat.js creates this automatically (CREATE TABLE IF NOT EXISTS) on first
-- request, but this file documents the schema and can be run manually.
--
-- Fixed-window counter: one row per (ip, hour). The endpoint upserts and
-- increments per request and rejects when the count exceeds the limit.

CREATE TABLE IF NOT EXISTS ai_rate_limit (
  ip           TEXT        NOT NULL,
  window_start TIMESTAMPTZ NOT NULL,
  count        INT         NOT NULL DEFAULT 0,
  PRIMARY KEY (ip, window_start)
);

-- Old windows are purged opportunistically by the app; this index keeps the
-- cleanup delete fast if the table ever grows.
CREATE INDEX IF NOT EXISTS ai_rate_limit_window_idx ON ai_rate_limit (window_start);
