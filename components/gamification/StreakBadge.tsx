import { cn } from '@/lib/utils'

interface StreakBadgeProps {
  streak: number
  size?: 'sm' | 'lg'
}

export function StreakBadge({ streak, size = 'sm' }: StreakBadgeProps) {
  const isActive = streak > 0

  return (
    <div className={cn(
      'flex items-center gap-1.5 font-bold rounded-full px-3 py-1',
      size === 'lg' ? 'text-lg px-4 py-2' : 'text-sm',
      isActive ? 'text-orange-500 bg-orange-50' : 'text-gray-400 bg-gray-50'
    )}>
      <span className={cn(size === 'lg' ? 'text-2xl' : 'text-base')}>
        {isActive ? '🔥' : '💤'}
      </span>
      <span>{streak}</span>
      {size === 'lg' && <span className="font-normal text-sm ml-1">day streak</span>}
    </div>
  )
}
