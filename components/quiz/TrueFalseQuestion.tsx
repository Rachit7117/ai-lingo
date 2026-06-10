'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Question } from '@/types/database'

interface Props {
  question: Question
  onAnswer: (answer: string) => void
  disabled: boolean
}

export function TrueFalseQuestion({ question, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  function handleSelect(value: string) {
    if (disabled) return
    setSelected(value)
    onAnswer(value)
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6 leading-snug">{question.question_text}</h2>
      <div className="grid grid-cols-2 gap-4">
        {(['true', 'false'] as const).map((val) => (
          <button
            key={val}
            onClick={() => handleSelect(val)}
            disabled={disabled}
            className={cn(
              'py-6 rounded-2xl border-2 font-bold text-lg capitalize transition-all',
              selected === val
                ? val === 'true'
                  ? 'border-green-400 bg-green-50 text-green-700'
                  : 'border-red-400 bg-red-50 text-red-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50',
              disabled && selected !== val && 'opacity-50 cursor-not-allowed'
            )}
          >
            {val === 'true' ? '✓ True' : '✗ False'}
          </button>
        ))}
      </div>
    </div>
  )
}
