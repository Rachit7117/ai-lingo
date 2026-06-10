import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { PostHogProvider } from '@/components/PostHogProvider'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Lingo — Learn AI the fun way',
  description: 'Master AI concepts through bite-sized lessons, quizzes, and streaks. Duolingo for AI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PostHogProvider>
          <Suspense>
            {children}
          </Suspense>
          <Toaster richColors />
        </PostHogProvider>
      </body>
    </html>
  )
}
