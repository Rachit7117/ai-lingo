import Groq from 'groq-sdk'
import type { LLMProvider } from './provider'
import type { GeneratedQuestion } from '@/types/database'

let _client: Groq | null = null
function getClient() {
  if (!_client) _client = new Groq({ apiKey: process.env.GROQ_API_KEY })
  return _client
}

const MODEL = 'llama-3.3-70b-versatile'

export const groqProvider: LLMProvider = {
  async generateRemediation({ lessonTitle, lessonExplanation, weakConcepts, userLevel }) {
    const prompt = `You are an AI tutor helping a ${userLevel} learner who struggled with: "${lessonTitle}".

Their weak areas: ${weakConcepts.length > 0 ? weakConcepts.join(', ') : 'general understanding'}.

Original explanation: ${lessonExplanation}

Generate a JSON object with:
1. "explanation": a simpler 2-3 paragraph explanation using analogies, avoiding jargon
2. "questions": array of exactly 3 practice questions

Each question must have this exact shape:
{
  "type": "mcq" | "fill_blank" | "true_false",
  "question_text": "...",
  "options": ["A","B","C","D"] (only for mcq, omit otherwise),
  "correct_answer": "...",
  "explanation": "why this answer is correct"
}

Respond ONLY with valid JSON. No markdown, no code fences, no commentary.`

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
