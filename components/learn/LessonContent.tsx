import { BookOpen, Lightbulb, Code2, Star } from 'lucide-react'
import type { Lesson } from '@/types/database'

interface Props {
  lesson: Lesson
}

export function LessonContent({ lesson }: Props) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{lesson.title}</h1>
        <div className="h-1 w-16 rounded-full bg-green-400" />
      </div>

      <Section
        icon={<BookOpen className="w-5 h-5 text-blue-500" />}
        title="Explanation"
        color="blue"
      >
        <p className="text-gray-700 leading-relaxed">{lesson.explanation}</p>
      </Section>

      <Section
        icon={<Lightbulb className="w-5 h-5 text-yellow-500" />}
        title="Analogy"
        color="yellow"
      >
        <p className="text-gray-700 leading-relaxed italic">"{lesson.analogy}"</p>
      </Section>

      <Section
        icon={<Code2 className="w-5 h-5 text-purple-500" />}
        title="Real World Example"
        color="purple"
      >
        <p className="text-gray-700 leading-relaxed">{lesson.example}</p>
      </Section>

      <Section
        icon={<Star className="w-5 h-5 text-green-500" />}
        title="Key Takeaway"
        color="green"
      >
        <p className="text-gray-700 font-semibold leading-relaxed">{lesson.key_takeaway}</p>
      </Section>
    </div>
  )
}

function Section({
  icon, title, color, children
}: {
  icon: React.ReactNode
  title: string
  color: 'blue' | 'yellow' | 'purple' | 'green'
  children: React.ReactNode
}) {
  const borderColors = {
    blue: 'border-blue-200 bg-blue-50',
    yellow: 'border-yellow-200 bg-yellow-50',
    purple: 'border-purple-200 bg-purple-50',
    green: 'border-green-200 bg-green-50',
  }

  return (
    <div className={`rounded-2xl border-2 p-5 ${borderColors[color]}`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-bold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  )
}
