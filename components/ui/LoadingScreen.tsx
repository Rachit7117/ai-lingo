'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Byte } from '@/components/mascot/Byte'
import type { ByteMood } from '@/components/mascot/Byte'

interface LoadingScreenProps {
  messages: string[]
  mood?: ByteMood
  interval?: number
}

export function LoadingScreen({ messages, mood = 'thinking', interval = 2000 }: LoadingScreenProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (messages.length <= 1) return
    const t = setInterval(() => {
      setIndex(i => (i + 1) % messages.length)
    }, interval)
    return () => clearInterval(t)
  }, [messages.length, interval])

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-6">
      <Byte mood={mood} size={120} />
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-lg font-bold text-gray-700 text-center max-w-xs"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}
