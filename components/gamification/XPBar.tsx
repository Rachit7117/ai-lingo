import { Zap } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface XPBarProps {
  xp: number
  level?: number
}

function xpForLevel(level: number) {
  return level * 100
}

export function XPBar({ xp }: XPBarProps) {
  const level = Math.floor(xp / 100) + 1
  const xpInCurrentLevel = xp % 100
  const xpNeeded = 100

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm shrink-0">
        <Zap className="w-4 h-4 fill-yellow-500" />
        <span>{xp.toLocaleString()} XP</span>
      </div>
      <div className="flex-1 min-w-0">
        <Progress value={(xpInCurrentLevel / xpNeeded) * 100} className="h-2" />
      </div>
      <span className="text-xs text-gray-400 shrink-0">Lv.{level}</span>
    </div>
  )
}
