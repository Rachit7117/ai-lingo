'use client'

import { useEffect } from 'react'
import { track } from '@/lib/posthog/events'

interface Props {
  lessonId: string
  trackId: string
  lessonTitle: string
}

export function LessonStartTracker({ lessonId, trackId, lessonTitle }: Props) {
  useEffect(() => {
    track('lesson_started', {
      track_id: trackId,
      lesson_id: lessonId,
      lesson_title: lessonTitle,
    })
  }, [lessonId, trackId, lessonTitle])

  return null
}
