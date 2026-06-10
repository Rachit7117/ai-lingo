import { GoogleGenerativeAI } from '@google/generative-ai'
import type { LLMProvider } from './provider'
import type { GeneratedQuestion } from '@/types/database'

let _client: GoogleGenerativeAI | null = null
function getClient() {
  if (!_client) _client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  return _client
}

const MODEL = 'gemini-2.0-flash'

function buildPrompt(params: {
  lessonTitle: string
  lessonExplanation: string
  weakConcepts: string[]
  userLevel: string
}) {
  return `You are an AI tutor helping a ${params.userLevel} learner who struggled with: "${params.lessonTitle}".

Their weak areas: ${params.weakConcepts.length > 0 ? params.weakConcepts.join(', ') : 'general understanding'}.

Original explanation: ${params.lessonExplanation}

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
}

export const geminiProvider: LLMProvider = {
  async generateRemediation(params) {
    const model = getClient().getGenerativeModel({
      model: MODEL,
      generationConfig: { responseMimeType: 'application/json', temperature: 0.7 },
    })

    const result = await model.generateContent(buildPrompt(params))
    const raw = JSON.parse(result.response.text())
    return {
      explanation: raw.explanation as string,
      questions: raw.questions as GeneratedQuestion[],
    }
  },
}
