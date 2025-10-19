import { motion } from 'framer-motion'

interface BeadDividerProps {
  count?: number
  animated?: boolean
  className?: string
}

export default function BeadDivider({ count = 5, animated = true, className = '' }: BeadDividerProps) {
  const colors = ['bg-bead-black', 'bg-bead-red', 'bg-bead-green', 'bg-bead-red', 'bg-bead-black']
  
  return (
    <div className={`bead-string ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        animated ? (
          <motion.div
            key={i}
            className={`bead-dot ${colors[i % colors.length]}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ) : (
          <div key={i} className={`bead-dot ${colors[i % colors.length]}`} />
        )
      ))}
    </div>
  )
}
