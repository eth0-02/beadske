import { motion } from 'framer-motion'

export default function Loading() {
  const beadColors = ['bg-bead-black', 'bg-bead-red', 'bg-bead-green', 'bg-bead-red', 'bg-bead-black']

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex gap-2">
        {beadColors.map((color, i) => (
          <motion.div
            key={i}
            className={`w-4 h-4 rounded-full ${color}`}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
