'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { completeOnboarding } from '@/actions/onboarding'
import { track } from '@/lib/posthog/events'
import { cn } from '@/lib/utils'
import { Byte } from '@/components/mascot/Byte'

const levels = [
  { value: 'beginner', label: 'Beginner', emoji: '🌱', desc: 'New to AI — start from scratch' },
  { value: 'intermediate', label: 'Intermediate', emoji: '🚀', desc: 'Know the basics, want to go deeper' },
  { value: 'advanced', label: 'Advanced', emoji: '🧠', desc: 'Technical background, want AI mastery' },
]

const goals = [
  { value: '5', label: '5 min / day', emoji: '⚡', desc: 'Quick daily habit' },
  { value: '10', label: '10 min / day', emoji: '🎯', desc: 'Recommended' },
  { value: '20', label: '20 min / day', emoji: '🔥', desc: 'Serious learner' },
]

export function OnboardingFlow() {
  const [step, setStep] = useState(1)
  const [level, setLevel] = useState('')
  const [goal, setGoal] = useState('')
  const [loading, setLoading] = useState(false)

  function handleLevelNext() {
    if (!level) return
    track('onboarding_started', {})
    setStep(2)
  }

  async function handleComplete() {
    if (!goal) return
    setLoading(true)
    const fd = new FormData()
    fd.append('level', level)
    fd.append('daily_goal', goal)
    track('onboarding_completed', { level, daily_goal: parseInt(goal) })
    await completeOnboarding(fd)
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="flex gap-2 mb-8">
        {[1, 2].map(s => (
          <div key={s} className={cn('h-2 flex-1 rounded-full transition-all', step >= s ? 'bg-green-500' : 'bg-gray-100')} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <div className="flex justify-center mb-4">
              <Byte mood="happy" size={100} />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">What's your AI experience?</h1>
            <p className="text-gray-500 mb-6">We'll personalize your learning path.</p>
            <div className="space-y-3 mb-8">
              {levels.map(l => (
                <button
                  key={l.value}
                  onClick={() => setLevel(l.value)}
                  className={cn(
                    'w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4',
                    level === l.value ? 'border-green-400 bg-green-50' : 'border-gray-100 bg-white hover:border-gray-200'
                  )}
                >
                  <span className="text-2xl">{l.emoji}</span>
                  <div>
                    <p className="font-bold text-gray-900">{l.label}</p>
                    <p className="text-sm text-gray-500">{l.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <Button
              onClick={handleLevelNext}
              disabled={!level}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl"
            >
              Continue
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <div className="flex justify-center mb-4">
              <Byte mood="thinking" size={100} />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Set your daily goal</h1>
            <p className="text-gray-500 mb-6">Consistency beats intensity. Pick a goal you can keep.</p>
            <div className="space-y-3 mb-8">
              {goals.map(g => (
                <button
                  key={g.value}
                  onClick={() => setGoal(g.value)}
                  className={cn(
                    'w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4',
                    goal === g.value ? 'border-green-400 bg-green-50' : 'border-gray-100 bg-white hover:border-gray-200'
                  )}
                >
                  <span className="text-2xl">{g.emoji}</span>
                  <div>
                    <p className="font-bold text-gray-900">{g.label}</p>
                    <p className="text-sm text-gray-500">{g.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <Button
              onClick={handleComplete}
              disabled={!goal || loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl"
            >
              {loading ? 'Setting up…' : "Let's go! 🚀"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
