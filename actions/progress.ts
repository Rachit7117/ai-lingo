'use server'

import { createClient } from '@/lib/supabase/server'
import type { Profile, UserProgress, Track } from '@/types/database'

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  return data
}

export async function getDashboardData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const [profileRes, progressRes, tracksRes, attemptsRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('user_progress').select('*, lesson:lessons(*, track:tracks(*))').eq('user_id', user.id),
    supabase.from('tracks').select('*').eq('is_active', true).order('order_index'),
    supabase.from('quiz_attempts').select('score, xp_earned, completed_at').eq('user_id', user.id).order('completed_at', { ascending: false }).limit(20),
  ])

  const profile = profileRes.data as Profile | null
  const progress = (progressRes.data ?? []) as UserProgress[]
  const tracks = (tracksRes.data ?? []) as Track[]
  const attempts = attemptsRes.data ?? []

  const completedLessons = progress.filter(p => p.status === 'completed').length
  const totalLessons = progress.length
  const avgAccuracy = attempts.length > 0
    ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length)
    : 0

  return {
    profile,
    progress,
    tracks,
    completedLessons,
    totalLessons,
    avgAccuracy,
  }
}
