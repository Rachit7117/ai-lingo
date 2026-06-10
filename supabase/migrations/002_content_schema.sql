-- Learning tracks
create table public.tracks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  order_index integer not null,
  icon text not null default '🤖',
  color text not null default '#58CC02',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Lessons
create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  track_id uuid references public.tracks(id) on delete cascade not null,
  slug text not null,
  title text not null,
  explanation text not null,
  analogy text not null,
  example text not null,
  key_takeaway text not null,
  order_index integer not null,
  xp_reward integer not null default 10,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(track_id, slug)
);

-- Questions
create table public.questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  type text not null check (type in ('mcq', 'fill_blank', 'true_false')),
  question_text text not null,
  options jsonb,
  correct_answer text not null,
  explanation text not null,
  order_index integer not null,
  xp_reward integer not null default 5,
  created_at timestamptz not null default now()
);
