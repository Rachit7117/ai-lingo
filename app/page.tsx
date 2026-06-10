import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Zap, BookOpen, Trophy, Brain } from 'lucide-react'
import { Byte } from '@/components/mascot/Byte'

const features = [
  { icon: <BookOpen className="w-6 h-6 text-blue-500" />, title: 'Bite-sized lessons', desc: 'Concept, analogy, example — in under 5 minutes' },
  { icon: <Zap className="w-6 h-6 text-yellow-500" />, title: 'Earn XP & streaks', desc: 'Level up every day with gamified progress' },
  { icon: <Brain className="w-6 h-6 text-purple-500" />, title: 'Adaptive learning', desc: 'Struggle? AI generates a simpler explanation just for you' },
  { icon: <Trophy className="w-6 h-6 text-green-500" />, title: '3 full tracks', desc: 'AI Foundations → Generative AI → AI Agents' },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Nav */}
      <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <span className="text-2xl">🧠</span> AI Lingo
        </div>
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="ghost" className="font-semibold text-gray-600">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl px-5">Get started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-4">
          <Byte mood="excited" size={130} />
        </div>
        <div className="inline-block bg-green-100 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full mb-6">
          Free to start · No credit card needed
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Learn AI concepts<br />
          <span className="text-green-500">the Duolingo way</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
          Daily streaks, XP, quizzes, and adaptive lessons that make AI stick.
          Built for PMs, engineers, and curious minds.
        </p>
        <Link href="/signup">
          <Button className="bg-green-500 hover:bg-green-600 text-white font-extrabold text-lg px-10 py-4 rounded-2xl shadow-lg shadow-green-200">
            Start learning free →
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map(f => (
          <div key={f.title} className="bg-white rounded-3xl border border-gray-100 p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0">
              {f.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Tracks preview */}
      <section className="max-w-4xl mx-auto px-4 pb-24">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">What you'll learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji: '🧠', title: 'AI Foundations', lessons: '7 lessons', color: 'bg-green-50 border-green-100' },
            { emoji: '✨', title: 'Generative AI', lessons: '7 lessons', color: 'bg-blue-50 border-blue-100' },
            { emoji: '🤖', title: 'AI Agents', lessons: '6 lessons', color: 'bg-orange-50 border-orange-100' },
          ].map(t => (
            <div key={t.title} className={`rounded-3xl border-2 p-6 ${t.color}`}>
              <div className="text-4xl mb-3">{t.emoji}</div>
              <h3 className="font-extrabold text-gray-900">{t.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{t.lessons}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
