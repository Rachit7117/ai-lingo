'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { askDoubt } from '@/actions/doubt'
import { Byte } from '@/components/mascot/Byte'
import { X, Send, MessageCircleQuestion } from 'lucide-react'

interface Message {
  role: 'user' | 'byte'
  text: string
}

interface Props {
  lessonTitle: string
  lessonExplanation: string
}

export function DoubtButton({ lessonTitle, lessonExplanation }: Props) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'byte', text: `Hi! I'm Byte 🤖 Ask me anything about "${lessonTitle}" and I'll explain it simply!` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault()
    const q = input.trim()
    if (!q || loading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: q }])
    setLoading(true)

    const { answer, error } = await askDoubt({
      question: q,
      lessonTitle,
      lessonExplanation,
    })

    setMessages(prev => [...prev, {
      role: 'byte',
      text: error ?? answer,
    }])
    setLoading(false)
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full px-5 py-4 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100 transition-all text-blue-600 font-semibold text-sm"
      >
        <MessageCircleQuestion className="w-5 h-5 shrink-0" />
        <span>Got a doubt? Ask Byte!</span>
        <Byte mood="thinking" size={36} className="ml-auto" />
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
                <Byte mood={loading ? 'thinking' : 'happy'} size={48} />
                <div>
                  <p className="font-extrabold text-gray-900">Ask Byte</p>
                  <p className="text-xs text-gray-400">AI tutor · {lessonTitle}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="ml-auto p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.role === 'byte' && (
                      <Byte mood="happy" size={32} className="shrink-0 mt-1" />
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white rounded-tr-sm'
                        : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-2">
                    <Byte mood="thinking" size={32} className="shrink-0 mt-1" />
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1 items-center h-4">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-gray-400"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleAsk} className="px-4 py-4 border-t border-gray-100 flex gap-2">
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask anything about this lesson…"
                  disabled={loading}
                  className="flex-1 rounded-xl border-2 text-sm"
                  autoFocus
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
