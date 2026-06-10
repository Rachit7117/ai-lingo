import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { Lock } from 'lucide-react'
import type { Track, UserProgress } from '@/types/database'

interface Props {
  track: Track
  progress: UserProgress[]
  totalLessons: number
  isLocked: boolean
}

export function TrackCard({ track, progress, totalLessons, isLocked }: Props) {
  const completedCount = progress.filter(p => p.status === 'completed').length
  const progressPct = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0

  return (
    <Link
      href={isLocked ? '#' : `/learn/${track.slug}`}
      className={`block rounded-3xl border-2 p-6 transition-all hover:shadow-md ${
        isLocked
          ? 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
          : 'border-gray-100 bg-white hover:border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: track.color + '20' }}
        >
          {track.icon}
        </div>
        {isLocked && <Lock className="w-5 h-5 text-gray-300" />}
        {!isLocked && completedCount === totalLessons && totalLessons > 0 && (
          <span className="text-xl">✅</span>
        )}
      </div>

      <h3 className="font-extrabold text-gray-900 text-lg mb-1">{track.title}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{track.description}</p>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-gray-400">
          <span>{completedCount}/{totalLessons} lessons</span>
          <span>{Math.round(progressPct)}%</span>
        </div>
        <Progress value={progressPct} className="h-2" style={{ '--progress-color': track.color } as React.CSSProperties} />
      </div>
    </Link>
  )
}
