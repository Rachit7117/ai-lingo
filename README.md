# AI Lingo — Duolingo for AI Concepts

A gamified learning platform that teaches AI concepts through bite-sized lessons, quizzes, XP, streaks, and adaptive AI-generated remediation.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Supabase (Postgres + Auth) |
| Analytics | PostHog |
| AI | OpenAI API (configurable via env) |
| Hosting | Vercel |

---

## Setup

### 1. Clone and install

```bash
git clone <repo>
cd ai-lingo
npm install
```

### 2. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in:

| Variable | Where to get it |
|----------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog → Project Settings → API Keys |
| `NEXT_PUBLIC_POSTHOG_HOST` | Default: `https://us.i.posthog.com` |
| `OPENAI_API_KEY` | platform.openai.com → API Keys |
| `OPENAI_MODEL` | Default: `gpt-4o-mini` |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` locally |

### 3. Supabase setup

Run each file in `supabase/migrations/` in order via the SQL editor:

1. `001_auth_profiles.sql`
2. `002_content_schema.sql`
3. `003_progress_schema.sql`
4. `004_rls_policies.sql`

Then run `supabase/seed.sql` to populate 3 tracks, 20 lessons, and questions.

#### Google OAuth (optional)

1. Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID
2. Add `https://<supabase-project>.supabase.co/auth/v1/callback` to redirect URIs
3. Supabase → Authentication → Providers → Google → enter Client ID and Secret

### 4. Run locally

```bash
npm run dev
```

---

## Deploy to Vercel

```bash
vercel
```

Add all env vars in Vercel → Project → Settings → Environment Variables.
Set `NEXT_PUBLIC_APP_URL` to your Vercel URL.

---

## Switching LLM Providers

The LLM layer is abstracted in `lib/llm/provider.ts`. To swap to Anthropic:

1. Create `lib/llm/anthropic.ts` implementing the `LLMProvider` interface
2. Update `actions/adaptive.ts` to import your new provider

No other changes needed.
