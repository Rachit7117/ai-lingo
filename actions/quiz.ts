'use server'

import { createClient } from '@/lib/supabase/server'
import type { Question } from '@/types/database'

export async function getQuestionsForLesson(lessonId: string): Promise<Question[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('questions')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('order_index')
  return data ?? []
}

export async function submitQuiz(params: {
  lessonId: string
  score: number
  xpEarned: number
  answers: Record<string, string>
  passed: boolean
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { lessonId, score, xpEarned, answers, passed } = params

  // Record attempt
  await supabase.from('quiz_attempts').insert({
    user_id: user.id,
    lesson_id: lessonId,
    score,
    xp_earned: xpEarned,
    answers,
  })

  // Update progress
  const status = passed ? 'completed' : 'available'
  const { data: existing } = await supabase
    .from('user_progress')
    .select('attempts, best_score, xp_earned')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .single()

  await supabase.from('user_progress').upsert({
    user_id: user.id,
    lesson_id: lessonId,
    status,
    attempts: (existing?.attempts ?? 0) + 1,
    best_score: Math.max(existing?.best_score ?? 0, score),
    xp_earned: passed ? Math.max(existing?.xp_earned ?? 0, xpEarned) : (existing?.xp_earned ?? 0),
    completed_at: passed ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,lesson_id' })

  // Award XP to profile
  if (passed && (existing?.best_score ?? 0) < score) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('total_xp')
      .eq('id', user.id)
      .single()
    await supabase
      .from('profiles')
      .update({ total_xp: (profile?.total_xp ?? 0) + xpEarned })
      .eq('id', user.id)
  }

  // Unlock next lesson if passed
  if (passed) {
    await unlockNextLesson(supabase, user.id, lessonId)
    await updateStreak(supabase, user.id, xpEarned)
  }

  return { success: true }
}

async function unlockNextLesson(supabase: Awaited<ReturnType<typeof import('@/lib/supabase/server').createClient>>, userId: string, lessonId: string) {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('order_index, track_id')
    .eq('id', lessonId)
    .single()
  if (!lesson) return

  const { data: nextLesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('track_id', lesson.track_id)
    .eq('order_index', lesson.order_index + 1)
    .single()

  if (nextLesson) {
    await supabase.from('user_progress').upsert({
      user_id: userId,
      lesson_id: nextLesson.id,
      status: 'available',
    }, { onConflict: 'user_id,lesson_id' })
  }
}

async function updateStreak(supabase: Awaited<ReturnType<typeof import('@/lib/supabase/server').createClient>>, userId: string, xpEarned: number) {
  const today = new Date().toISOString().split('T')[0]

  await supabase.from('streak_log').upsert({
    user_id: userId,
    date: today,
    lessons_completed: 1,
    xp_earned: xpEarned,
  }, { onConflict: 'user_id,date' })

  const { data: profile } = await supabase
    .from('profiles')
    .select('current_streak, longest_streak, last_activity_at')
    .eq('id', userId)
    .single()
  if (!profile) return

  const lastActivity = profile.last_activity_at ? new Date(profile.last_activity_at) : null
  const todayDate = new Date()
  todayDate.setHours(0, 0, 0, 0)
  const yesterdayDate = new Date(todayDate)
  yesterdayDate.setDate(yesterdayDate.getDate() - 1)

  let newStreak = profile.current_streak
  if (!lastActivity || lastActivity < yesterdayDate) {
    newStreak = 1
  } else if (lastActivity >= yesterdayDate && lastActivity < todayDate) {
    newStreak = profile.current_streak + 1
  }

  await supabase.from('profiles').update({
    current_streak: newStreak,
    longest_streak: Math.max(profile.longest_streak, newStreak),
    last_activity_at: new Date().toISOString(),
  }).eq('id', userId)
}
