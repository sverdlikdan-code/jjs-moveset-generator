-- JJS Moveset Generator — Comments table migration
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/karnkpgzgmvwgioowijp/sql

CREATE TABLE IF NOT EXISTS comments (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code_id    UUID NOT NULL REFERENCES codes(id) ON DELETE CASCADE,
  text       TEXT NOT NULL CHECK (char_length(text) <= 500),
  author     TEXT NOT NULL DEFAULT 'Anonymous',
  likes      INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS comments_code_id_idx ON comments(code_id);
CREATE INDEX IF NOT EXISTS comments_created_at_idx ON comments(created_at DESC);

-- RLS: public read, authenticated insert via service role
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read comments"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "service role insert comments"
  ON comments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "service role update comments"
  ON comments FOR UPDATE
  USING (true);
