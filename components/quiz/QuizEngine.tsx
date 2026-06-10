'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Question } from '@/types/database'
import type { QuizResult } from '@/types/quiz'
import { MCQQuestion } from './MCQQuestion'
import { FillBlankQuestion } from './FillBlankQuestion'
import { TrueFalseQuestion } from './TrueFalseQuestion'
import { QuizFeedback } from './QuizFeedback'
import { QuizComplete } from './QuizComplete'
import { HeartBar } from '@/components/gamification/HeartBar'
import { Progress } from '@/components/ui/progress'
import { submitQuiz } from '@/actions/quiz'
import { track } from '@/lib/posthog/events'
import { Byte } from '@/components/mascot/Byte'
import { LoadingScreen } from '@/components/ui/LoadingScreen'

interface QuizEngineProps {
  questions: Question[]
  lessonId: string
  lessonSlug: string
  lessonTitle: string
  trackSlug: string
}

type FeedbackState = {
  isCorrect: boolean
  explanation: string
  correctAnswer: string
} | null

const MAX_HEARTS = 5
const PASS_THRESHOLD = 70

export function QuizEngine({ questions, lessonId, lessonSlug, lessonTitle, trackSlug }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hearts, setHearts] = useState(MAX_HEARTS)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [feedback, setFeedback] = useState<FeedbackState>(null)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [startedAt] = useState(Date.now())
  const [xpEarned, setXpEarned] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100

  const handleAnswer = useCallback((answer: string) => {
    if (feedback) return
    const q = questions[currentIndex]
    const isCorrect = answer.toLowerCase().trim() === q.correct_answer.toLowerCase().trim()

    setAnswers(prev => ({ ...prev, [q.id]: isCorrect ? 'correct' : 'wrong' }))

    if (isCorrect) {
      setXpEarned(prev => prev + q.xp_reward)
    } else {
      setHearts(prev => Math.max(0, prev - 1))
    }

    setFeedback({
      isCorrect,
      explanation: q.explanation,
      correctAnswer: q.correct_answer,
    })
  }, [currentIndex, questions, feedback])

  const handleNext = useCallback(async () => {
    setFeedback(null)

    const isLastQuestion = currentIndex === questions.length - 1
    const noHeartsLeft = hearts === 0 && !feedback?.isCorrect

    if (isLastQuestion || (noHeartsLeft && !feedback?.isCorrect)) {
      const correctCount = Object.values({ ...answers }).filter(v => v === 'correct').length
      const totalCount = questions.length
      const score = Math.round((correctCount / totalCount) * 100)
      const passed = score >= PASS_THRESHOLD && hearts > 0
      const timeTakenMs = Date.now() - startedAt

      const finalResult: QuizResult = {
        score,
        xpEarned: passed ? xpEarned : 0,
        correctCount,
        totalCount,
        passed,
        timeTakenMs,
      }

      setSubmitting(true)

      await submitQuiz({
        lessonId,
        score,
        xpEarned: finalResult.xpEarned,
        answers,
        passed,
      })

      track('quiz_submitted', {
        lesson_id: lessonId,
        score,
        xp_earned: finalResult.xpEarned,
        passed,
      })

      if (!passed) {
        track('concept_failed', {
          lesson_id: lessonId,
          score,
          attempts: 1,
        })
      }

      setResult(finalResult)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }, [currentIndex, questions, hearts, feedback, answers, xpEarned, lessonId, startedAt])

  if (submitting && !result) {
    return (
      <LoadingScreen
        mood="thinking"
        messages={[
          'Tallying up your score…',
          'Counting your XP…',
          'Updating your streak…',
          'Byte is grading your quiz…',
        ]}
        interval={1400}
      />
    )
  }

  if (result) {
    return (
      <QuizComplete
        result={result}
        lessonTitle={lessonTitle}
        trackSlug={trackSlug}
        lessonId={lessonId}
        lessonSlug={lessonSlug}
      />
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <Progress value={progress} className="h-3 rounded-full" />
        </div>
        <HeartBar hearts={hearts} />
      </div>

      {/* Mascot */}
      <div className="flex justify-center mb-4">
        <Byte
          mood={feedback ? (feedback.isCorrect ? 'happy' : 'sad') : 'thinking'}
          size={80}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Question {currentIndex + 1} of {questions.length}
          </div>

          {currentQuestion.type === 'mcq' && (
            <MCQQuestion question={currentQuestion} onAnswer={handleAnswer} disabled={!!feedback} />
          )}
          {currentQuestion.type === 'fill_blank' && (
            <FillBlankQuestion question={currentQuestion} onAnswer={handleAnswer} disabled={!!feedback} />
          )}
          {currentQuestion.type === 'true_false' && (
            <TrueFalseQuestion question={currentQuestion} onAnswer={handleAnswer} disabled={!!feedback} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <QuizFeedback
            feedback={feedback}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
