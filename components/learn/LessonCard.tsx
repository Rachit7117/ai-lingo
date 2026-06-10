import Link from 'next/link'
import { Lock, CheckCircle2, Circle, ChevronRight } from 'lucide-react'
import type { Lesson, UserProgress } from '@/types/database'
import { cn } from '@/lib/utils'

interface Props {
  lesson: Lesson
  progress: UserProgress | null
  trackSlug: string
}

export function LessonCard({ lesson, progress, trackSlug }: Props) {
  const status = progress?.status ?? 'locked'
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const isAvailable = status === 'available' || status === 'in_progress'

  const href = isLocked ? '#' : `/learn/${trackSlug}/${lesson.slug}`

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-4 p-4 rounded-2xl border-2 transition-all',
        isLocked && 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed',
        isCompleted && 'border-green-100 bg-green-50',
        isAvailable && 'border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm'
      )}
    >
      <div className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
        isLocked && 'bg-gray-100',
        isCompleted && 'bg-green-100',
        isAvailable && 'bg-blue-100'
      )}>
        {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
        {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-600" />}
        {isAvailable && <Circle className="w-5 h-5 text-blue-500" />}
      </div>

      <div className="flex-1 min-w-0">
        <p className={cn(
          'font-bold text-sm truncate',
          isLocked ? 'text-gray-400' : 'text-gray-900'
        )}>
          {lesson.title}
        </p>
        {isCompleted && progress?.best_score != null && (
          <p className="text-xs text-green-600 mt-0.5">Best score: {progress.best_score}%</p>
        )}
        {isAvailable && (
          <p className="text-xs text-blue-500 mt-0.5">+{lesson.xp_reward} XP</p>
        )}
      </div>

      {!isLocked && <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />}
    </Link>
  )
}
