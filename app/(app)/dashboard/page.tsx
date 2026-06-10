import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getDashboardData } from '@/actions/progress'
import { Button } from '@/components/ui/button'
import { XPBar } from '@/components/gamification/XPBar'
import { StreakBadge } from '@/components/gamification/StreakBadge'
import { TrackCard } from '@/components/learn/TrackCard'
import { Zap, Target, BookOpen, CheckCircle2 } from 'lucide-react'
import { Byte } from '@/components/mascot/Byte'

export default async function DashboardPage() {
  const data = await getDashboardData()
  if (!data) redirect('/login')

  const { profile, progress, tracks, completedLessons, totalLessons, avgAccuracy } = data

  const stats = [
    { label: 'Total XP', value: profile?.total_xp.toLocaleString() ?? '0', icon: <Zap className="w-5 h-5 text-yellow-500" />, bg: 'bg-yellow-50' },
    { label: 'Accuracy', value: `${avgAccuracy}%`, icon: <Target className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50' },
    { label: 'Completed', value: `${completedLessons}/${totalLessons}`, icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, bg: 'bg-green-50' },
    { label: 'Streak', value: `${profile?.current_streak ?? 0}d`, icon: <span className="text-lg">🔥</span>, bg: 'bg-orange-50' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Byte mood={profile?.current_streak ?? 0 > 0 ? 'excited' : 'idle'} size={72} />
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              {getGreeting()}, {profile?.username?.split(' ')[0] ?? 'Learner'} 👋
            </h1>
            <p className="text-gray-500 mt-1">Keep your streak alive!</p>
          </div>
        </div>
        <StreakBadge streak={profile?.current_streak ?? 0} size="lg" />
      </div>

      {/* XP bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <XPBar xp={profile?.total_xp ?? 0} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4`}>
            <div className="flex items-center gap-2 mb-2">{s.icon}</div>
            <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tracks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-gray-900">Learning Tracks</h2>
          <Link href="/learn">
            <Button variant="ghost" size="sm" className="text-green-600 font-semibold">
              View all
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tracks.map((track, i) => {
            const trackProgress = progress.filter(p => (p.lesson as any)?.track?.id === track.id)
            const totalInTrack = progress.filter(p => (p.lesson as any)?.track?.id === track.id).length
            return (
              <TrackCard
                key={track.id}
                track={track}
                progress={trackProgress}
                totalLessons={totalInTrack}
                isLocked={i > 0 && tracks[i - 1] ? false : false}
              />
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-6 text-white">
        <h3 className="font-extrabold text-xl mb-1">Ready to learn?</h3>
        <p className="text-green-100 text-sm mb-4">Continue where you left off</p>
        <Link href="/learn">
          <Button className="bg-white text-green-600 hover:bg-green-50 font-bold rounded-xl">
            <BookOpen className="w-4 h-4 mr-2" /> Continue Learning
          </Button>
        </Link>
      </div>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}
