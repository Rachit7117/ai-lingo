import { redirect } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'

export default async function OnboardingPage() {
  noStore()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // If onboarding is already done, don't show the flow again — send them in.
  // Prevents the "keeps coming back to the level/goal screens" loop.
  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_completed')
    .eq('id', user.id)
    .single()

  if (profile?.onboarding_completed) {
    redirect('/learn')
  }

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
