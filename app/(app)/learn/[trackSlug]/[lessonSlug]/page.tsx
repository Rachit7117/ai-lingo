import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getLesson, markLessonStarted } from '@/actions/lessons'
import { getRemediationForLesson } from '@/actions/adaptive'
import { getLessonVariant } from '@/actions/variants'
import { getProfile } from '@/actions/progress'
import { LessonContent } from '@/components/learn/LessonContent'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Zap } from 'lucide-react'
import { LessonStartTracker } from '@/components/learn/LessonStartTracker'
import { Byte } from '@/components/mascot/Byte'
import { DoubtButton } from '@/components/learn/DoubtButton'

interface Props {
  params: Promise<{ trackSlug: string; lessonSlug: string }>
}

export default async function LessonPage({ params }: Props) {
  const { trackSlug, lessonSlug } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const lesson = await getLesson(trackSlug, lessonSlug)
  if (!lesson) notFound()

  const [profile, remediation] = await Promise.all([
    getProfile(),
    getRemediationForLesson(lesson.id),
  ])

  const level = profile?.experience_level ?? 'intermediate'
  const variant = await getLessonVariant(lesson, level)

  // Merge variant content into lesson object for display
  const lessonWithVariant = { ...lesson, ...variant }

  await markLessonStarted(lesson.id)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link href={`/learn/${trackSlug}`}>
          <Button variant="ghost" size="sm" className="rounded-xl">
            <ChevronLeft className="w-4 h-4 mr-1" /> {lesson.track?.title}
          </Button>
        </Link>
        <div className="flex items-center gap-1 text-sm font-semibold text-yellow-500 bg-yellow-50 px-3 py-1.5 rounded-full">
          <Zap className="w-4 h-4 fill-yellow-500" />
          +{lesson.xp_reward} XP
        </div>
      </div>

      {/* Byte cheering the learner on */}
      <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl px-4 py-3">
        <Byte mood="happy" size={56} />
        <p className="text-sm font-semibold text-green-700">
          Hi! I'm Byte 👋 This lesson is tailored for your <span className="capitalize">{level}</span> level. Read through, then take the quiz!
        </p>
      </div>

      <LessonContent lesson={lessonWithVariant} />

      {/* Remediation if available */}
      {remediation && (
        <div className="bg-purple-50 border-2 border-purple-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">✨</span>
            <h3 className="font-bold text-purple-900">AI-Generated Simpler Explanation</h3>
          </div>
          <p className="text-purple-800 text-sm leading-relaxed whitespace-pre-wrap">{remediation.generated_explanation}</p>
        </div>
      )}

      <DoubtButton lessonTitle={lesson.title} lessonExplanation={lesson.explanation} />

      <div className="pt-2">
        <Link href={`/learn/${trackSlug}/${lessonSlug}/quiz`}>
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-4 rounded-2xl text-lg">
            Take the Quiz →
          </Button>
        </Link>
      </div>

      <LessonStartTracker lessonId={lesson.id} trackId={lesson.track_id} lessonTitle={lesson.title} />
    </div>
  )
}
