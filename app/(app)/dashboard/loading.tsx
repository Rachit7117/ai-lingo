import { LoadingScreen } from '@/components/ui/LoadingScreen'

export default function DashboardLoading() {
  return (
    <LoadingScreen
      mood="happy"
      messages={[
        'Loading your dashboard…',
        'Fetching your progress…',
        'Counting your XP…',
        'Checking your streak…',
      ]}
    />
  )
}
