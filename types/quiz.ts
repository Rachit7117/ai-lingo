import type { Question } from './database'

export interface QuizState {
  questions: Question[]
  currentIndex: number
  answers: Record<string, string>
  hearts: number
  xpEarned: number
  isComplete: boolean
  startedAt: number
}

export interface QuizResult {
  score: number
  xpEarned: number
  correctCount: number
  totalCount: number
  passed: boolean
  timeTakenMs: number
}

export interface AnswerFeedback {
  isCorrect: boolean
  explanation: string
  correctAnswer: string
}
