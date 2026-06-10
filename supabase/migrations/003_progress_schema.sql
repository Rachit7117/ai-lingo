-- User progress per lesson
create table public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  status text not null default 'locked' check (status in ('locked', 'available', 'in_progress', 'completed')),
  xp_earned integer not null default 0,
  attempts integer not null default 0,
  best_score integer not null default 0,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

-- Quiz attempts
create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  score integer not null,
  xp_earned integer not null default 0,
  answers jsonb not null default '{}',
  completed_at timestamptz not null default now()
);

-- Daily streak log
create table public.streak_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  lessons_completed integer not null default 0,
  xp_earned integer not null default 0,
  unique(user_id, date)
);

-- AI-generated remediation content
create table public.remediation_content (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  generated_explanation text not null,
  generated_questions jsonb not null default '[]',
  created_at timestamptz not null default now()
);

-- Initialize progress rows for a user when they complete onboarding
create or replace function public.initialize_user_progress(p_user_id uuid)
returns void as $$
declare
  v_lesson record;
  v_track_order integer;
  v_lesson_order integer;
begin
  for v_lesson in
    select l.id, l.order_index, t.order_index as track_order
    from lessons l
    join tracks t on t.id = l.track_id
    where l.is_active = true
    order by t.order_index, l.order_index
  loop
    insert into user_progress (user_id, lesson_id, status)
    values (
      p_user_id,
      v_lesson.id,
      case when v_lesson.track_order = 1 and v_lesson.order_index = 1 then 'available' else 'locked' end
    )
    on conflict (user_id, lesson_id) do nothing;
  end loop;
end;
$$ language plpgsql security definer;
