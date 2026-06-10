import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getLesson } from '@/actions/lessons'
import { getQuestionsForLesson } from '@/actions/quiz'
import { QuizEngine } from '@/components/quiz/QuizEngine'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

interface Props {
  params: Promise<{ trackSlug: string; lessonSlug: string }>
}

export default async function QuizPage({ params }: Props) {
  const { trackSlug, lessonSlug } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const lesson = await getLesson(trackSlug, lessonSlug)
  if (!lesson) notFound()

  const questions = await getQuestionsForLesson(lesson.id)

  if (questions.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-3">🚧</div>
        <p className="font-semibold text-gray-600">Questions coming soon!</p>
        <Link href={`/learn/${trackSlug}`} className="mt-4 block">
          <Button variant="outline">Back to track</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/learn/${trackSlug}/${lessonSlug}`}>
          <Button variant="ghost" size="sm" className="rounded-xl">
            <ChevronLeft className="w-4 h-4 mr-1" /> {lesson.title}
          </Button>
        </Link>
      </div>

      <QuizEngine
        questions={questions}
        lessonId={lesson.id}
        lessonSlug={lessonSlug}
        lessonTitle={lesson.title}
        trackSlug={trackSlug}
      />
    </div>
  )
}
