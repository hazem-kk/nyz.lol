create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null check (username ~ '^[a-z0-9_]{3,20}$' and username not in ('login','dashboard','api','admin','landing','_next')),
  display_name text, bio text default '', avatar_url text, theme text default 'crimson',
  music_url text, discord_id text, links jsonb default '[]', views int default 0, created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "public read" on profiles for select using (true);
create policy "insert own" on profiles for insert with check (auth.uid() = id);
create policy "update own" on profiles for update using (auth.uid() = id) with check (auth.uid() = id);
revoke insert, update on profiles from anon, authenticated;
grant insert (id, username, display_name, avatar_url) on profiles to authenticated;
grant update (display_name, bio, avatar_url, theme, music_url, discord_id, links) on profiles to authenticated;
create function increment_views(u text) returns void language sql security definer set search_path = public
as $$ update profiles set views = views + 1 where username = u $$;
grant execute on function increment_views(text) to anon, authenticated;
