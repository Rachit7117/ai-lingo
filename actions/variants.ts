'use server'

import { createClient } from '@/lib/supabase/server'
import { buildVariantPrompt } from '@/lib/llm/generateVariant'
import type { ExperienceLevel, Lesson } from '@/types/database'

async function generateWithGemini(prompt: string): Promise<string> {
  const { GoogleGenerativeAI } = await import('@google/generative-ai')
  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = client.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: { responseMimeType: 'application/json', temperature: 0.7 },
  })
  const result = await model.generateContent(prompt)
  return result.response.text()
}

async function generateWithGroq(prompt: string): Promise<string> {
  const Groq = (await import('groq-sdk')).default
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY })
  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })
  return response.choices[0].message.content ?? '{}'
}

export async function getLessonVariant(lesson: Lesson, level: ExperienceLevel): Promise<{
  explanation: string
  analogy: string
  example: string
  key_takeaway: string
}> {
  // Intermediate = original content, no AI needed
  if (level === 'intermediate') {
    return {
      explanation: lesson.explanation,
      analogy: lesson.analogy,
      example: lesson.example,
      key_takeaway: lesson.key_takeaway,
    }
  }

  const supabase = await createClient()

  // Check cache first
  const { data: cached } = await supabase
    .from('lesson_variants')
    .select('explanation, analogy, example, key_takeaway')
    .eq('lesson_id', lesson.id)
    .eq('level', level)
    .single()

  if (cached) return cached

  // Generate with AI
  const prompt = buildVariantPrompt({
    lessonTitle: lesson.title,
    originalExplanation: lesson.explanation,
    originalAnalogy: lesson.analogy,
    originalExample: lesson.example,
    originalKeyTakeaway: lesson.key_takeaway,
    level,
  })

  let raw: string
  try {
    raw = await generateWithGemini(prompt)
  } catch {
    try {
      raw = await generateWithGroq(prompt)
    } catch {
      // Fallback to original content if AI fails
      return {
        explanation: lesson.explanation,
        analogy: lesson.analogy,
        example: lesson.example,
        key_takeaway: lesson.key_takeaway,
      }
    }
  }

  const parsed = JSON.parse(raw)
  const variant = {
    explanation: parsed.explanation as string,
    analogy: parsed.analogy as string,
    example: parsed.example as string,
    key_takeaway: parsed.key_takeaway as string,
  }

  // Cache it for future loads (fire and forget)
  supabase.from('lesson_variants').insert({
    lesson_id: lesson.id,
    level,
    ...variant,
  }).then(() => {})

  return variant
}
