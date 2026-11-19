# nyz.lol

Next.js + Supabase bio-link platform: Discord/Google login, claimable usernames, dashboard, public pages at nyz.lol/name, view counter, links, music, live Discord status.

## Setup
1. **Supabase**: create a free project at supabase.com. SQL Editor > paste `supabase/schema.sql` > Run.
2. **Keys**: Project Settings > API. Copy the URL and anon key into a new file `.env.local` (see `.env.example`).
3. **Google login**: Google Cloud Console > create OAuth client (Web). Authorized redirect URI: `https://YOUR-PROJECT.supabase.co/auth/v1/callback`. Paste client ID/secret in Supabase > Authentication > Providers > Google.
4. **Discord login**: discord.com/developers > New Application > OAuth2. Add the same redirect URI. Paste client ID/secret in Supabase > Providers > Discord.
5. **Supabase > Authentication > URL Configuration**: Site URL `http://localhost:3000` for now, and add `http://localhost:3000/**` to Redirect URLs.
6. Run: `npm install` then `npm run dev`, open http://localhost:3000.

## Deploy
Push to GitHub, import on vercel.com, add the two env vars, then add nyz.lol under Domains. Afterwards change Supabase Site URL to `https://nyz.lol` and add `https://nyz.lol/**` to Redirect URLs.

Live Discord status uses the free Lanyard API: the user must join discord.gg/lanyard and enter their Discord user ID in the dashboard.
