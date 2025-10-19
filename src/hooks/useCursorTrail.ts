import { useEffect } from 'react'

interface CursorTrailOptions {
  color?: string
  size?: number
  duration?: number
  enabled?: boolean
}

export function useCursorTrail(options: CursorTrailOptions = {}) {
  const {
    color = 'rgba(187, 10, 30, 0.5)',
    size = 8,
    duration = 500,
    enabled = true,
  } = options

  useEffect(() => {
    if (!enabled) return

    const createTrail = (e: MouseEvent) => {
      const trail = document.createElement('div')
      trail.className = 'cursor-bead'
      trail.style.left = `${e.clientX - size / 2}px`
      trail.style.top = `${e.clientY - size / 2}px`
      trail.style.width = `${size}px`
      trail.style.height = `${size}px`
      trail.style.background = color
      trail.style.animationDuration = `${duration}ms`
      
      document.body.appendChild(trail)

      setTimeout(() => {
        trail.remove()
      }, duration)
    }

    let lastTime = 0
    const throttledTrail = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime > 50) {
        createTrail(e)
        lastTime = now
      }
    }

    document.addEventListener('mousemove', throttledTrail)

    return () => {
      document.removeEventListener('mousemove', throttledTrail)
    }
  }, [color, size, duration, enabled])
}
