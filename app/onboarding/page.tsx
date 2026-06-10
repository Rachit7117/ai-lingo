import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-center pt-10 mb-4">
        <span className="text-3xl">🧠</span>
        <p className="text-sm font-semibold text-gray-500 mt-1">AI Lingo</p>
      </div>
      <OnboardingFlow />
    </div>
  )
}
