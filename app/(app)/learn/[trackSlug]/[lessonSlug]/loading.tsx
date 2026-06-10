import { LoadingScreen } from '@/components/ui/LoadingScreen'

export default function LessonLoading() {
  return (
    <LoadingScreen
      mood="thinking"
      messages={[
        'Tailoring this lesson for your level…',
        'Personalizing your content…',
        'Byte is getting ready…',
        'Almost done customizing…',
      ]}
      interval={1800}
    />
  )
}
