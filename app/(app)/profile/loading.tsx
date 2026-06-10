import { LoadingScreen } from '@/components/ui/LoadingScreen'

export default function ProfileLoading() {
  return (
    <LoadingScreen
      mood="happy"
      messages={['Loading your profile…', 'Fetching your stats…']}
    />
  )
}
