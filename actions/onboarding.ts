'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const level = formData.get('level') as string
  const dailyGoal = parseInt(formData.get('daily_goal') as string, 10)

  const { error: updateError } = await supabase.from('profiles').update({
    experience_level: level,
    daily_goal_minutes: dailyGoal,
    onboarding_completed: true,
  }).eq('id', user.id)

  // If the profile write itself fails, surface it instead of silently looping.
  if (updateError) {
    throw new Error(`Failed to save onboarding: ${updateError.message}`)
  }

  // Initialize progress rows. This is non-critical for completing onboarding —
  // if it fails, don't block the user. Progress is also lazily ensured elsewhere.
  const { error: rpcError } = await supabase.rpc('initialize_user_progress', { p_user_id: user.id })
  if (rpcError) {
    console.error('initialize_user_progress failed (non-fatal):', rpcError.message)
  }

  redirect('/learn')
}
