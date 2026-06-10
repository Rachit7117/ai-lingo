import { createClient } from '@/lib/supabase/server'
import { getTracks } from '@/actions/lessons'
import { getDashboardData } from '@/actions/progress'
import { TrackCard } from '@/components/learn/TrackCard'
import { redirect } from 'next/navigation'

export default async function LearnPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [tracks, dashData] = await Promise.all([getTracks(), getDashboardData()])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Learning Tracks</h1>
        <p className="text-gray-500 mt-1">Complete tracks in order to unlock new ones.</p>
      </div>

      {tracks.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-4xl mb-3">📚</div>
          <p className="font-semibold">No tracks available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map((track, i) => {
            const trackProgress = (dashData?.progress ?? []).filter(
              p => (p.lesson as any)?.track?.id === track.id
            )
            const totalInTrack = trackProgress.length
            const prevTrackComplete = i === 0 || (() => {
              const prev = tracks[i - 1]
              const prevProgress = (dashData?.progress ?? []).filter(p => (p.lesson as any)?.track?.id === prev.id)
              return prevProgress.every(p => p.status === 'completed')
            })()

            return (
              <TrackCard
                key={track.id}
                track={track}
                progress={trackProgress}
                totalLessons={totalInTrack}
                isLocked={!prevTrackComplete}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
