import OpenAI from 'openai'
import type { LLMProvider } from './provider'
import type { GeneratedQuestion } from '@/types/database'

let _client: OpenAI | null = null
function getClient() {
  if (!_client) _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  return _client
}
const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini'

export const openaiProvider: LLMProvider = {
  async generateRemediation({ lessonTitle, lessonExplanation, weakConcepts, userLevel }) {
    const prompt = `You are an AI tutor helping a ${userLevel} learner who struggled with: "${lessonTitle}".

Their weak areas: ${weakConcepts.join(', ')}.

Original explanation: ${lessonExplanation}

Generate a JSON response with:
1. A simpler "explanation" (2-3 paragraphs, use analogies, avoid jargon)
2. "questions" array of 3 practice questions

Each question must follow this exact shape:
{
  "type": "mcq" | "fill_blank" | "true_false",
  "question_text": "...",
  "options": ["A", "B", "C", "D"] (only for mcq),
  "correct_answer": "...",
  "explanation": "why this answer is correct"
}

Respond ONLY with valid JSON. No markdown, no commentary.`

    const response = await getClient().chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const raw = JSON.parse(response.choices[0].message.content ?? '{}')
    return {
      explanation: raw.explanation as string,
      questions: raw.questions as GeneratedQuestion[],
    }
  },
}
