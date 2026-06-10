import { LoadingScreen } from '@/components/ui/LoadingScreen'

export default function LearnLoading() {
  return (
    <LoadingScreen
      mood="thinking"
      messages={[
        'Loading your learning tracks…',
        'Checking what\'s unlocked…',
        'Preparing your path…',
      ]}
    />
  )
}
