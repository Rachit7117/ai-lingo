'use server'

import { createClient } from '@/lib/supabase/server'
import { geminiProvider } from '@/lib/llm/gemini'
import { groqProvider } from '@/lib/llm/groq'

async function askGemini(prompt: string): Promise<string> {
  const { GoogleGenerativeAI } = await import('@google/generative-ai')
  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = client.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: { temperature: 0.7 },
  })
  const result = await model.generateContent(prompt)
  return result.response.text()
}

async function askGroq(prompt: string): Promise<string> {
  const Groq = (await import('groq-sdk')).default
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY })
  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  })
  return response.choices[0].message.content ?? ''
}

export async function askDoubt(params: {
  question: string
  lessonTitle: string
  lessonExplanation: string
}): Promise<{ answer: string; error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { answer: '', error: 'Not authenticated' }

  const prompt = `You are Byte, a friendly AI tutor helping someone learn about "${params.lessonTitle}".

Lesson context: ${params.lessonExplanation}

The student asks: "${params.question}"

Answer in 2-4 sentences. Be clear, friendly, and use a simple analogy if it helps.
Do NOT use markdown formatting — plain text only.`

  try {
    const answer = await askGemini(prompt)
    return { answer }
  } catch {
    try {
      const answer = await askGroq(prompt)
      return { answer }
    } catch (err) {
      return { answer: '', error: 'Could not get an answer right now. Try again!' }
    }
  }
}
