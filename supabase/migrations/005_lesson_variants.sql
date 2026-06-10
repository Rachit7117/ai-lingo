-- Stores AI-generated level-specific lesson content
create table public.lesson_variants (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  explanation text not null,
  analogy text not null,
  example text not null,
  key_takeaway text not null,
  created_at timestamptz not null default now(),
  unique(lesson_id, level)
);

-- Publicly readable (content is not user-specific)
alter table public.lesson_variants enable row level security;
create policy "variants_public_read" on public.lesson_variants for select using (true);
create policy "variants_service_insert" on public.lesson_variants for insert with check (true);
