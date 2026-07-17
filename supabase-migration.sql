-- JJS Moveset Generator — Library tables
-- Run once in Supabase SQL Editor

create table if not exists codes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  character text not null default 'Unknown',
  code text not null,
  tags text[] default '{}',
  author text default 'Community',
  likes int default 0,
  copies int default 0,
  created_at timestamptz default now()
);

-- Indexes for sorting
create index if not exists codes_likes_idx on codes(likes desc);
create index if not exists codes_copies_idx on codes(copies desc);
create index if not exists codes_created_idx on codes(created_at desc);

-- Allow public read, restrict writes to service role
alter table codes enable row level security;
create policy "Public read" on codes for select using (true);
create policy "Service insert" on codes for insert with check (true);
create policy "Service update" on codes for update using (true);
