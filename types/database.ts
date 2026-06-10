export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'
export type LessonStatus = 'locked' | 'available' | 'in_progress' | 'completed'
export type QuestionType = 'mcq' | 'fill_blank' | 'true_false'

export interface Profile {
  id: string
  username: string | null
  avatar_url: string | null
  experience_level: ExperienceLevel
  daily_goal_minutes: number
  total_xp: number
  current_streak: number
  longest_streak: number
  last_activity_at: string | null
  onboarding_completed: boolean
  created_at: string
}

export interface Track {
  id: string
  slug: string
  title: string
  description: string
  order_index: number
  icon: string
  color: string
  is_active: boolean
}

export interface Lesson {
  id: string
  track_id: string
  slug: string
  title: string
  explanation: string
  analogy: string
  example: string
  key_takeaway: string
  order_index: number
  xp_reward: number
  is_active: boolean
  track?: Track
}

export interface Question {
  id: string
  lesson_id: string
  type: QuestionType
  question_text: string
  options: string[] | null
  correct_answer: string
  explanation: string
  order_index: number
  xp_reward: number
}

export interface UserProgress {
  id: string
  user_id: string
  lesson_id: string
  status: LessonStatus
  xp_earned: number
  attempts: number
  best_score: number
  completed_at: string | null
  lesson?: Lesson
}

export interface QuizAttempt {
  id: string
  user_id: string
  lesson_id: string
  score: number
  xp_earned: number
  answers: Record<string, string>
  completed_at: string
}

export interface StreakLog {
  id: string
  user_id: string
  date: string
  lessons_completed: number
  xp_earned: number
}

export interface RemediationContent {
  id: string
  user_id: string
  lesson_id: string
  generated_explanation: string
  generated_questions: GeneratedQuestion[]
  created_at: string
}

export interface GeneratedQuestion {
  type: QuestionType
  question_text: string
  options?: string[]
  correct_answer: string
  explanation: string
}
