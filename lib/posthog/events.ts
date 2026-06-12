'use client'

import { posthog } from './client'

type EventMap = {
  signup_completed:       { method: 'email' | 'google' }
  login_completed:        { method: 'email' | 'google' }
  onboarding_started:     Record<string, never>
  onboarding_completed:   { level: string; daily_goal: number }
  lesson_started:         { track_id: string; lesson_id: string; lesson_title: string }
  lesson_completed:       { lesson_id: string; time_spent_ms: number }
  quiz_started:           { lesson_id: string; question_count: number }
  quiz_submitted:         { lesson_id: string; score: number; xp_earned: number; passed: boolean }
  concept_failed:         { lesson_id: string; score: number; attempts: number }
  remediation_generated:  { lesson_id: string; model: string }
  streak_updated:         { new_streak: number; previous_streak: number }
  dashboard_viewed:       { total_xp: number; streak: number }
}

export function track<E extends keyof EventMap>(event: E, props: EventMap[E]) {
  // Analytics must never break the user flow — swallow any error.
  try {
    posthog.capture(event, props)
  } catch (e) {
    console.warn('posthog capture failed:', e)
  }
}

export function identify(userId: string, traits?: Record<string, unknown>) {
  try {
    posthog.identify(userId, traits)
  } catch (e) {
    console.warn('posthog identify failed:', e)
  }
}

export function reset() {
  try {
    posthog.reset()
  } catch (e) {
    console.warn('posthog reset failed:', e)
  }
}
