import { useState, useEffect, useRef } from 'react'

export function useCounter(target, duration = 800) {
  const [count, setCount] = useState(0)
  const startRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    startRef.current = null
    const step = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(eased * target))
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }
    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration])

  return count
}
