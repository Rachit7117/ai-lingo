import { LoadingScreen } from '@/components/ui/LoadingScreen'

export default function QuizLoading() {
  return (
    <LoadingScreen
      mood="excited"
      messages={[
        'Generating your quiz…',
        'Crafting questions for your level…',
        'Making it challenging…',
        'Byte is thinking hard…',
      ]}
      interval={1800}
    />
  )
}
