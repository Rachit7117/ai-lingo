import type { GeneratedQuestion } from '@/types/database'

export interface LLMProvider {
  generateRemediation(params: {
    lessonTitle: string
    lessonExplanation: string
    weakConcepts: string[]
    userLevel: string
  }): Promise<{
    explanation: string
    questions: GeneratedQuestion[]
  }>
}
