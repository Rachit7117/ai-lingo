import { redirect } from 'next/navigation'
import { getDashboardData } from '@/actions/progress'
import { signOut } from '@/actions/auth'
import { StreakBadge } from '@/components/gamification/StreakBadge'
import { XPBar } from '@/components/gamification/XPBar'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LogOut, Zap, Target, BookOpen, Trophy } from 'lucide-react'

export default async function ProfilePage() {
  const data = await getDashboardData()
  if (!data) redirect('/login')

  const { profile, tracks, progress, completedLessons, totalLessons, avgAccuracy } = data

  const level = Math.floor((profile?.total_xp ?? 0) / 100) + 1

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-2xl font-extrabold text-white">
              {(profile?.username ?? 'L')[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900">{profile?.username ?? 'Learner'}</h1>
              <p className="text-sm text-gray-500 capitalize">{profile?.experience_level} level</p>
              <p className="text-sm font-semibold text-purple-600 mt-0.5">Level {level}</p>
            </div>
          </div>
          <StreakBadge streak={profile?.current_streak ?? 0} size="lg" />
        </div>
        <XPBar xp={profile?.total_xp ?? 0} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Total XP', value: (profile?.total_xp ?? 0).toLocaleString(), icon: <Zap className="w-5 h-5 text-yellow-500" />, bg: 'bg-yellow-50' },
          { label: 'Best streak', value: `${profile?.longest_streak ?? 0} days`, icon: <span className="text-lg">🔥</span>, bg: 'bg-orange-50' },
          { label: 'Quiz accuracy', value: `${avgAccuracy}%`, icon: <Target className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'Lessons done', value: `${completedLessons}/${totalLessons}`, icon: <BookOpen className="w-5 h-5 text-green-500" />, bg: 'bg-green-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4`}>
            {s.icon}
            <div className="text-2xl font-extrabold text-gray-900 mt-2">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Track progress */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-extrabold text-gray-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" /> Track Progress
        </h2>
        {tracks.map(track => {
          const tp = progress.filter(p => (p.lesson as any)?.track?.id === track.id)
          const completed = tp.filter(p => p.status === 'completed').length
          const total = tp.length
          const pct = total > 0 ? (completed / total) * 100 : 0
          return (
            <div key={track.id}>
              <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                <span>{track.icon} {track.title}</span>
                <span className="text-gray-400">{completed}/{total}</span>
              </div>
              <Progress value={pct} className="h-2" />
            </div>
          )
        })}
      </div>

      {/* Sign out */}
      <form action={signOut}>
        <Button type="submit" variant="outline" className="w-full rounded-xl font-semibold text-red-500 border-red-200 hover:bg-red-50">
          <LogOut className="w-4 h-4 mr-2" /> Sign out
        </Button>
      </form>
    </div>
  )
}
