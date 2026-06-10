'use server'

import { createClient } from '@/lib/supabase/server'
import type { ExperienceLevel, Question } from '@/types/database'

const levelGuidance = {
  beginner: `Write very simple questions. Use plain language. No technical jargon.
MCQ options should be clearly distinct. Fill-in-blank answers should be single common words.
Focus on definitions and basic understanding.`,
  advanced: `Write challenging questions. Use precise technical terminology.
MCQ options should include plausible distractors that require deep understanding to distinguish.
Include questions about trade-offs, implementation details, edge cases, and "why" not just "what".
Fill-in-blank should test technical precision.`,
}

function buildQuizVariantPrompt(params: {
  lessonTitle: string
  lessonExplanation: string
  level: ExperienceLevel
}) {
  return `You are an AI educator creating quiz questions about "${params.lessonTitle}" for a ${params.level} learner.

Lesson content: ${params.lessonExplanation}

${levelGuidance[params.level as 'beginner' | 'advanced']}

Generate exactly 5 quiz questions. Mix the types: at least 2 MCQ, 1 fill_blank, 1 true_false.

Return ONLY a JSON object:
{
  "questions": [
    {
      "type": "mcq",
      "question_text": "...",
      "options": ["A", "B", "C", "D"],
      "correct_answer": "exact text of correct option",
      "explanation": "why this is correct",
      "xp_reward": 5
    },
    {
      "type": "fill_blank",
      "question_text": "sentence with ___ for the blank",
      "correct_answer": "the word that fills the blank",
      "explanation": "why",
      "xp_reward": 5
    },
    {
      "type": "true_false",
      "question_text": "a statement that is true or false",
      "correct_answer": "true or false",
      "explanation": "why",
      "xp_reward": 5
    }
  ]
}

No markdown, no code fences, valid JSON only.`
}

async function generateQuestions(prompt: string): Promise<Question[]> {
  let raw: string

  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai')
    const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = client.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: { responseMimeType: 'application/json', temperature: 0.7 },
    })
    const result = await model.generateContent(prompt)
    raw = result.response.text()
  } catch {
    const Groq = (await import('groq-sdk')).default
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY })
    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })
    raw = response.choices[0].message.content ?? '{}'
  }

  const parsed = JSON.parse(raw)
  return parsed.questions as Question[]
}

export async function getQuestionsForLevel(
  lessonId: string,
  lessonTitle: string,
  lessonExplanation: string,
  level: ExperienceLevel,
  fallbackQuestions: Question[]
): Promise<Question[]> {
  // Intermediate uses original seed questions
  if (level === 'intermediate') return fallbackQuestions

  const supabase = await createClient()

  // Check cache
  const { data: cached } = await supabase
    .from('quiz_variants')
    .select('questions')
    .eq('lesson_id', lessonId)
    .eq('level', level)
    .single()

  if (cached?.questions) {
    return (cached.questions as Question[]).map((q, i) => ({
      ...q,
      id: `variant-${i}`,
      lesson_id: lessonId,
      order_index: i,
      xp_reward: q.xp_reward ?? 5,
      options: q.options ?? null,
    }))
  }

  // Generate
  const prompt = buildQuizVariantPrompt({ lessonTitle, lessonExplanation, level })
  try {
    const questions = await generateQuestions(prompt)

    // Cache it
    supabase.from('quiz_variants').insert({
      lesson_id: lessonId,
      level,
      questions,
    }).then(() => {})

    return questions.map((q, i) => ({
      ...q,
      id: `variant-${lessonId}-${i}`,
      lesson_id: lessonId,
      order_index: i,
      xp_reward: q.xp_reward ?? 5,
      options: q.options ?? null,
    }))
  } catch {
    return fallbackQuestions
  }
}
