'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Zap, Trophy, RotateCcw, ArrowRight } from 'lucide-react'
import type { QuizResult } from '@/types/quiz'
import { generateRemediation } from '@/actions/adaptive'
import { useState } from 'react'
import { track } from '@/lib/posthog/events'
import { Byte } from '@/components/mascot/Byte'

interface Props {
  result: QuizResult
  lessonTitle: string
  trackSlug: string
  lessonId: string
  lessonSlug: string
}

export function QuizComplete({ result, lessonTitle, trackSlug, lessonId, lessonSlug }: Props) {
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const { score, xpEarned, correctCount, totalCount, passed } = result

  async function handleGenerateRemediation() {
    setGenerating(true)
    await generateRemediation(lessonId)
    track('remediation_generated', { lesson_id: lessonId, model: 'gemini-2.0-flash' })
    setGenerated(true)
    setGenerating(false)
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex justify-center mb-4"
      >
        <Byte mood={passed ? 'celebrating' : 'sad'} size={140} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          {passed ? 'Lesson Complete!' : 'Nice try!'}
        </h1>
        <p className="text-gray-500 mb-8">
          {passed
            ? `You nailed "${lessonTitle}"`
            : `You need 70% to pass. Keep practicing!`}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="text-2xl font-extrabold text-gray-900">{score}%</div>
            <div className="text-xs text-gray-500 mt-1">Score</div>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-4">
            <div className="text-2xl font-extrabold text-yellow-500 flex items-center justify-center gap-1">
              <Zap className="w-5 h-5 fill-yellow-500" />{xpEarned}
            </div>
            <div className="text-xs text-gray-500 mt-1">XP earned</div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4">
            <div className="text-2xl font-extrabold text-blue-500">{correctCount}/{totalCount}</div>
            <div className="text-xs text-gray-500 mt-1">Correct</div>
          </div>
        </div>

        <div className="space-y-3">
          {passed ? (
            <Link href={`/learn/${trackSlug}`}>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href={`/learn/${trackSlug}/${lessonSlug}`}>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl">
                  <RotateCcw className="w-4 h-4 mr-2" /> Try Again
                </Button>
              </Link>
              {!generated && (
                <Button
                  variant="outline"
                  className="w-full font-bold py-3 rounded-xl border-2"
                  onClick={handleGenerateRemediation}
                  disabled={generating}
                >
                  {generating ? 'Generating AI help…' : '✨ Get AI Explanation'}
                </Button>
              )}
              {generated && (
                <p className="text-sm text-green-600 font-medium">
                  ✓ AI explanation generated — check the lesson page!
                </p>
              )}
            </>
          )}
          <Link href={`/learn/${trackSlug}/${lessonSlug}`}>
            <Button variant="ghost" className="w-full text-gray-500">
              Back to lesson
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
