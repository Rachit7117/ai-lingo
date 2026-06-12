'use server'

import { createClient } from '@/lib/supabase/server'

type OnboardingResult = { success: true } | { error: string }

export async function completeOnboarding(formData: FormData): Promise<OnboardingResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not signed in' }

  const level = formData.get('level') as string
  const dailyGoal = parseInt(formData.get('daily_goal') as string, 10)

  const { error: updateError } = await supabase.from('profiles').update({
    experience_level: level,
    daily_goal_minutes: dailyGoal,
    onboarding_completed: true,
  }).eq('id', user.id)

  // If the profile write itself fails, surface it instead of silently looping.
  if (updateError) {
    return { error: `Failed to save onboarding: ${updateError.message}` }
  }

  // Initialize progress rows. This is non-critical for completing onboarding —
  // if it fails, don't block the user. Progress is also lazily ensured elsewhere.
  const { error: rpcError } = await supabase.rpc('initialize_user_progress', { p_user_id: user.id })
  if (rpcError) {
    console.error('initialize_user_progress failed (non-fatal):', rpcError.message)
  }

  // Navigation is handled client-side (router.push) for reliable redirect.
  return { success: true }
}
