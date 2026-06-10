import type { LLMProvider } from './provider'

export function withFallback(primary: LLMProvider, fallback: LLMProvider): LLMProvider {
  return {
    async generateRemediation(params) {
      try {
        return await primary.generateRemediation(params)
      } catch (err) {
        console.warn('[LLM] Primary provider failed, falling back:', err)
        return fallback.generateRemediation(params)
      }
    },
  }
}
