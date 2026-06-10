'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUp } from '@/actions/auth'
import { track } from '@/lib/posthog/events'
import { LoadingScreen } from '@/components/ui/LoadingScreen'

export function SignupForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const result = await signUp(fd)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      track('signup_completed', { method: 'email' })
    }
  }

  return (
    <>
      {loading && (
        <LoadingScreen
          mood="celebrating"
          messages={['Setting up your account…', 'Building your learning path…', 'Byte is getting excited to meet you…']}
          interval={1500}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" type="text" placeholder="Ada Lovelace" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="Min 8 characters" minLength={8} required />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl" disabled={loading}>
        {loading ? 'Creating account…' : 'Create Account'}
      </Button>
      </form>
    </>
  )
}
