import type { ExperienceLevel } from '@/types/database'

const levelGuidance = {
  beginner: `Use very simple language. Avoid all technical jargon.
Use everyday analogies (cooking, sports, shopping).
Assume zero prior knowledge. Short sentences. Friendly tone.`,
  intermediate: `Assume basic familiarity with technology and software concepts.
Use some technical terms but always explain them briefly.
Analogies can reference software or business contexts.
Balanced depth — not too shallow, not too deep.`,
  advanced: `Assume strong technical background (engineering or data science).
Use precise technical terminology freely.
Go deeper — mention trade-offs, edge cases, implementation details.
Analogies can reference ML, systems, or engineering concepts.
Be concise and information-dense.`,
}

export function buildVariantPrompt(params: {
  lessonTitle: string
  originalExplanation: string
  originalAnalogy: string
  originalExample: string
  originalKeyTakeaway: string
  level: ExperienceLevel
}) {
  return `You are an AI educator. Rewrite the following lesson content for a ${params.level} audience.

${levelGuidance[params.level]}

Original lesson: "${params.lessonTitle}"

Original explanation: ${params.originalExplanation}
Original analogy: ${params.originalAnalogy}
Original example: ${params.originalExample}
Original key takeaway: ${params.originalKeyTakeaway}

Rewrite for a ${params.level} learner. Return ONLY a JSON object with these exact keys:
{
  "explanation": "2-3 paragraphs rewritten for ${params.level} level",
  "analogy": "one analogy rewritten for ${params.level} level",
  "example": "one real-world example rewritten for ${params.level} level",
  "key_takeaway": "one sentence key takeaway for ${params.level} level"
}

No markdown, no code fences, valid JSON only.`
}
