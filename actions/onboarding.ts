'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const level = formData.get('level') as string
  const dailyGoal = parseInt(formData.get('daily_goal') as string, 10)

  await supabase.from('profiles').update({
    experience_level: level,
    daily_goal_minutes: dailyGoal,
    onboarding_completed: true,
  }).eq('id', user.id)

  // Initialize progress rows
  await supabase.rpc('initialize_user_progress', { p_user_id: user.id })

  redirect('/learn')
}
