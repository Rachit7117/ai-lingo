import { LoadingScreen } from '@/components/ui/LoadingScreen'

export default function TrackLoading() {
  return (
    <LoadingScreen
      mood="thinking"
      messages={[
        'Loading your lessons…',
        'Checking your progress…',
        'Almost there…',
      ]}
    />
  )
}
