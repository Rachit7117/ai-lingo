import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getLessonsForTrack, getUserProgressForTrack } from '@/actions/lessons'
import { LessonCard } from '@/components/learn/LessonCard'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

interface Props {
  params: Promise<{ trackSlug: string }>
}

export default async function TrackPage({ params }: Props) {
  const { trackSlug } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [lessons, progressList] = await Promise.all([
    getLessonsForTrack(trackSlug),
    getUserProgressForTrack(trackSlug),
  ])

  if (lessons.length === 0) notFound()

  const track = lessons[0]?.track

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/learn">
          <Button variant="ghost" size="sm" className="rounded-xl">
            <ChevronLeft className="w-4 h-4 mr-1" /> Tracks
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: (track?.color ?? '#58CC02') + '20' }}
        >
          {track?.icon ?? '🧠'}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{track?.title}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{track?.description}</p>
        </div>
      </div>

      <div className="space-y-3">
        {lessons.map(lesson => {
          const progress = progressList.find(p => p.lesson_id === lesson.id) ?? null
          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              progress={progress}
              trackSlug={trackSlug}
            />
          )
        })}
      </div>
    </div>
  )
}
