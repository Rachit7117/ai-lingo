interface HeartBarProps {
  hearts: number
  maxHearts?: number
}

export function HeartBar({ hearts, maxHearts = 5 }: HeartBarProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxHearts }).map((_, i) => (
        <span key={i} className={`text-xl transition-all duration-300 ${i < hearts ? '' : 'opacity-20 grayscale'}`}>
          ❤️
        </span>
      ))}
    </div>
  )
}
