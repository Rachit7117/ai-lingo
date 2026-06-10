'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Question } from '@/types/database'

interface Props {
  question: Question
  onAnswer: (answer: string) => void
  disabled: boolean
}

export function MCQQuestion({ question, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const options: string[] = question.options ?? []

  function handleSelect(opt: string) {
    if (disabled) return
    setSelected(opt)
    onAnswer(opt)
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6 leading-snug">{question.question_text}</h2>
      <div className="grid gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            disabled={disabled}
            className={cn(
              'w-full text-left px-5 py-4 rounded-2xl border-2 font-semibold text-sm transition-all',
              selected === opt
                ? 'border-blue-400 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50',
              disabled && selected !== opt && 'opacity-50 cursor-not-allowed'
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
