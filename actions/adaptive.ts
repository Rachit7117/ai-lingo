'use server'

import { createClient } from '@/lib/supabase/server'
import { geminiProvider } from '@/lib/llm/gemini'
import { groqProvider } from '@/lib/llm/groq'
import { withFallback } from '@/lib/llm/withFallback'

const llm = withFallback(geminiProvider, groqProvider)

export async function generateRemediation(lessonId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single()
  if (!lesson) return { error: 'Lesson not found' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('experience_level')
    .eq('id', user.id)
    .single()

  const { data: attempts } = await supabase
    .from('quiz_attempts')
    .select('answers, score')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .order('completed_at', { ascending: false })
    .limit(3)

  const weakConcepts = attempts?.flatMap(a =>
    Object.entries(a.answers as Record<string, string>)
      .filter(([_, v]) => v === 'wrong')
      .map(([k]) => k)
  ) ?? []

  const result = await llm.generateRemediation({
    lessonTitle: lesson.title,
    lessonExplanation: lesson.explanation,
    weakConcepts,
    userLevel: profile?.experience_level ?? 'beginner',
  })

  await supabase.from('remediation_content').insert({
    user_id: user.id,
    lesson_id: lessonId,
    generated_explanation: result.explanation,
    generated_questions: result.questions,
  })

  return { data: result }
}

export async function getRemediationForLesson(lessonId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('remediation_content')
    .select('*')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  return data
}
