'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Question } from '@/types/database'

interface Props {
  question: Question
  onAnswer: (answer: string) => void
  disabled: boolean
}

export function FillBlankQuestion({ question, onAnswer, disabled }: Props) {
  const [value, setValue] = useState('')

  const parts = question.question_text.split('___')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!value.trim() || disabled) return
    onAnswer(value.trim())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-xl font-bold text-gray-900 mb-6 leading-snug">
        {parts[0]}
        <span className="inline-block border-b-2 border-gray-400 mx-2 min-w-[100px] text-center text-blue-600">
          {value || '___'}
        </span>
        {parts[1]}
      </div>
      <div className="flex gap-3">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your answer…"
          disabled={disabled}
          className="flex-1 rounded-xl border-2 text-base py-3"
          autoFocus
        />
        <Button
          type="submit"
          disabled={!value.trim() || disabled}
          className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl px-6"
        >
          Check
        </Button>
      </div>
    </form>
  )
}
