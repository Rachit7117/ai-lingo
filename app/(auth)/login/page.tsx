import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string }>
}) {
  const { created } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🧠</div>
          <h1 className="text-2xl font-extrabold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-1">Continue your learning streak</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
          {created && (
            <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-center text-sm font-semibold text-green-700">
              🎉 Your account is created! Just log in to start learning.
            </div>
          )}

          <LoginForm />

          <p className="text-center text-sm text-gray-500">
            No account?{' '}
            <Link href="/signup" className="text-green-600 font-semibold hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
