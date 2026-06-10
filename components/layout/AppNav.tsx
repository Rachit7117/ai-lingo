'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, BarChart2, User, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/profile', label: 'Profile', icon: User },
]

export function AppNav({ streak = 0, xp = 0 }: { streak?: number; xp?: number }) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col w-64 min-h-screen border-r border-gray-100 bg-white px-4 py-6 fixed left-0 top-0">
        <div className="flex items-center gap-2 mb-8 px-2">
          <span className="text-2xl">🧠</span>
          <span className="font-bold text-xl text-gray-900">AI Lingo</span>
        </div>

        <div className="flex gap-4 mb-8 px-2">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-orange-500">
            <span className="text-base">🔥</span>
            <span>{streak}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-yellow-500">
            <Zap className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span>{xp.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                pathname === href || pathname.startsWith(href + '/')
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
        <div className="flex justify-around py-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-1 text-xs font-semibold transition-colors',
                pathname === href || pathname.startsWith(href + '/')
                  ? 'text-green-600'
                  : 'text-gray-400'
              )}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
