'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Byte } from '@/components/mascot/Byte'

interface Props {
  feedback: {
    isCorrect: boolean
    explanation: string
    correctAnswer: string
  }
  onNext: () => void
}

export function QuizFeedback({ feedback, onNext }: Props) {
  const { isCorrect, explanation, correctAnswer } = feedback

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed bottom-0 left-0 right-0 z-[60] px-6 pt-6 pb-8 border-t-2 max-h-[80vh] overflow-y-auto [padding-bottom:max(2rem,env(safe-area-inset-bottom))] ${
        isCorrect
          ? 'bg-green-50 border-green-300'
          : 'bg-red-50 border-red-300'
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start gap-3 mb-4">
          <Byte mood={isCorrect ? 'celebrating' : 'sad'} size={64} className="shrink-0 -mt-2" />
          {isCorrect ? (
            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          )}
          <div>
            <p className={`font-bold text-lg ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Correct! 🎉' : 'Not quite…'}
            </p>
            {!isCorrect && (
              <p className="text-sm text-red-600 mt-1">
                Correct answer: <span className="font-semibold">{correctAnswer}</span>
              </p>
            )}
            <p className={`text-sm mt-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {explanation}
            </p>
          </div>
        </div>
        <Button
          onClick={onNext}
          className={`w-full font-bold py-3 rounded-xl text-white ${
            isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  )
}
