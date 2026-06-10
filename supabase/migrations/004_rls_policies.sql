-- Enable RLS
alter table public.profiles enable row level security;
alter table public.tracks enable row level security;
alter table public.lessons enable row level security;
alter table public.questions enable row level security;
alter table public.user_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.streak_log enable row level security;
alter table public.remediation_content enable row level security;

-- Profiles: users can read/update their own
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- Content: publicly readable
create policy "tracks_public_read" on public.tracks for select using (is_active = true);
create policy "lessons_public_read" on public.lessons for select using (is_active = true);
create policy "questions_public_read" on public.questions for select using (true);

-- Progress: users own their data
create policy "progress_select_own" on public.user_progress for select using (auth.uid() = user_id);
create policy "progress_insert_own" on public.user_progress for insert with check (auth.uid() = user_id);
create policy "progress_update_own" on public.user_progress for update using (auth.uid() = user_id);

-- Quiz attempts
create policy "attempts_select_own" on public.quiz_attempts for select using (auth.uid() = user_id);
create policy "attempts_insert_own" on public.quiz_attempts for insert with check (auth.uid() = user_id);

-- Streak log
create policy "streak_select_own" on public.streak_log for select using (auth.uid() = user_id);
create policy "streak_upsert_own" on public.streak_log for insert with check (auth.uid() = user_id);
create policy "streak_update_own" on public.streak_log for update using (auth.uid() = user_id);

-- Remediation
create policy "remediation_select_own" on public.remediation_content for select using (auth.uid() = user_id);
create policy "remediation_insert_own" on public.remediation_content for insert with check (auth.uid() = user_id);
