'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

export type ByteMood = 'idle' | 'happy' | 'sad' | 'celebrating' | 'thinking' | 'excited'

interface ByteProps {
  mood?: ByteMood
  size?: number
  className?: string
}

export function Byte({ mood = 'idle', size = 120, className = '' }: ByteProps) {
  const bounceControls = useAnimationControls()
  const eyeControls = useAnimationControls()

  // Idle blink every 3s
  useEffect(() => {
    if (mood !== 'idle' && mood !== 'thinking') return
    const interval = setInterval(async () => {
      await eyeControls.start({ scaleY: 0.1, transition: { duration: 0.08 } })
      await eyeControls.start({ scaleY: 1, transition: { duration: 0.08 } })
    }, 3000)
    return () => clearInterval(interval)
  }, [mood, eyeControls])

  // Bounce on mood change
  useEffect(() => {
    if (mood === 'celebrating' || mood === 'happy' || mood === 'excited') {
      bounceControls.start({
        y: [0, -18, 0, -10, 0],
        transition: { duration: 0.6, times: [0, 0.3, 0.55, 0.75, 1] },
      })
    }
  }, [mood, bounceControls])

  const bodyColor = {
    idle: '#58CC02',
    happy: '#58CC02',
    sad: '#FF4B4B',
    celebrating: '#FFD900',
    thinking: '#1CB0F6',
    excited: '#FF9600',
  }[mood]

  const eyeShape = mood === 'sad'
    ? { rx: 6, ry: 5 }
    : mood === 'thinking'
    ? { rx: 7, ry: 4 }
    : { rx: 6, ry: 6 }

  return (
    <motion.div
      animate={bounceControls}
      className={`inline-block select-none ${className}`}
      style={{ width: size, height: size * 1.1 }}
    >
      <svg
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Antenna */}
        <motion.g
          animate={mood === 'thinking' ? { rotate: [-5, 5, -5] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ originX: '50px', originY: '20px' }}
        >
          <line x1="50" y1="10" x2="50" y2="22" stroke={bodyColor} strokeWidth="3" strokeLinecap="round" />
          <motion.circle
            cx="50" cy="7" r="5"
            fill={bodyColor}
            animate={mood === 'celebrating' || mood === 'excited'
              ? { scale: [1, 1.4, 1], fill: ['#FFD900', '#FF9600', '#FFD900'] }
              : { scale: 1 }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
        </motion.g>

        {/* Body */}
        <motion.rect
          x="18" y="22" width="64" height="62" rx="18"
          fill={bodyColor}
          animate={{ fill: bodyColor }}
          transition={{ duration: 0.3 }}
        />

        {/* Screen / face area */}
        <rect x="24" y="30" width="52" height="40" rx="12" fill="white" opacity="0.95" />

        {/* Eyes */}
        <motion.g animate={eyeControls}>
          {/* Left eye */}
          <motion.ellipse
            cx="38" cy="48"
            rx={eyeShape.rx} ry={eyeShape.ry}
            fill="#1a1a2e"
            animate={
              mood === 'happy' || mood === 'celebrating'
                ? { ry: [eyeShape.ry, 3, eyeShape.ry], scaleY: 1 }
                : mood === 'sad'
                ? { ry: 4 }
                : {}
            }
            transition={{ duration: 0.3 }}
          />
          {/* Left eye shine */}
          <circle cx="41" cy="45" r="2" fill="white" />

          {/* Right eye */}
          <motion.ellipse
            cx="62" cy="48"
            rx={eyeShape.rx} ry={eyeShape.ry}
            fill="#1a1a2e"
            animate={
              mood === 'happy' || mood === 'celebrating'
                ? { ry: [eyeShape.ry, 3, eyeShape.ry], scaleY: 1 }
                : mood === 'sad'
                ? { ry: 4 }
                : {}
            }
            transition={{ duration: 0.3 }}
          />
          {/* Right eye shine */}
          <circle cx="65" cy="45" r="2" fill="white" />
        </motion.g>

        {/* Thinking eye (spinning dots replace eyes) */}
        {mood === 'thinking' && (
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            style={{ originX: '50px', originY: '48px' }}
          >
            <circle cx="50" cy="40" r="3" fill="#1CB0F6" opacity="0.8" />
            <circle cx="58" cy="55" r="2" fill="#1CB0F6" opacity="0.5" />
            <circle cx="42" cy="55" r="2" fill="#1CB0F6" opacity="0.5" />
          </motion.g>
        )}

        {/* Mouth */}
        {mood === 'idle' && (
          <rect x="40" y="60" width="20" height="4" rx="2" fill="#1a1a2e" opacity="0.4" />
        )}
        {(mood === 'happy' || mood === 'celebrating' || mood === 'excited') && (
          <motion.path
            d="M 36 60 Q 50 72 64 60"
            stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        {mood === 'sad' && (
          <motion.path
            d="M 36 67 Q 50 58 64 67"
            stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        {mood === 'thinking' && (
          <rect x="38" y="62" width="24" height="3" rx="1.5" fill="#1CB0F6" opacity="0.5" />
        )}

        {/* Arms */}
        <motion.g
          animate={mood === 'celebrating'
            ? { rotate: [-20, 20, -20] }
            : mood === 'excited'
            ? { rotate: [-10, 10, -10] }
            : {}}
          transition={{ repeat: Infinity, duration: 0.4 }}
        >
          {/* Left arm */}
          <rect x="6" y="34" width="14" height="8" rx="4" fill={bodyColor} />
          {/* Right arm */}
          <rect x="80" y="34" width="14" height="8" rx="4" fill={bodyColor} />
        </motion.g>

        {/* Legs */}
        <rect x="32" y="80" width="14" height="18" rx="7" fill={bodyColor} />
        <rect x="54" y="80" width="14" height="18" rx="7" fill={bodyColor} />

        {/* Feet */}
        <ellipse cx="39" cy="98" rx="9" ry="5" fill={bodyColor} opacity="0.8" />
        <ellipse cx="61" cy="98" rx="9" ry="5" fill={bodyColor} opacity="0.8" />

        {/* Celebrating stars */}
        {(mood === 'celebrating' || mood === 'excited') && (
          <>
            <motion.text
              x="5" y="35" fontSize="12"
              animate={{ opacity: [0, 1, 0], y: [35, 15, 5] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
            >⭐</motion.text>
            <motion.text
              x="80" y="30" fontSize="10"
              animate={{ opacity: [0, 1, 0], y: [30, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
            >✨</motion.text>
            <motion.text
              x="55" y="20" fontSize="8"
              animate={{ opacity: [0, 1, 0], y: [20, 5, -5] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
            >⭐</motion.text>
          </>
        )}
      </svg>
    </motion.div>
  )
}
