'use server'

import { createClient } from '@/lib/supabase/server'
import type { Track, Lesson, UserProgress } from '@/types/database'

export async function getTracks(): Promise<Track[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('tracks')
    .select('*')
    .eq('is_active', true)
    .order('order_index')
  return data ?? []
}

export async function getLessonsForTrack(trackSlug: string): Promise<Lesson[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('lessons')
    .select('*, track:tracks(*)')
    .eq('tracks.slug', trackSlug)
    .eq('is_active', true)
    .order('order_index')
  return data ?? []
}

export async function getLesson(trackSlug: string, lessonSlug: string): Promise<Lesson | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('lessons')
    .select('*, track:tracks(*)')
    .eq('slug', lessonSlug)
    .eq('tracks.slug', trackSlug)
    .single()
  return data
}

export async function getUserProgressForTrack(trackSlug: string): Promise<UserProgress[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('user_progress')
    .select('*, lesson:lessons(*, track:tracks(*))')
    .eq('user_id', user.id)
    .eq('lessons.tracks.slug', trackSlug)
  return data ?? []
}

export async function markLessonStarted(lessonId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('user_progress').upsert({
    user_id: user.id,
    lesson_id: lessonId,
    status: 'in_progress',
  }, { onConflict: 'user_id,lesson_id' })
}
