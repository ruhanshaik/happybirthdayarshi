import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Heart } from './Decor'

function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

const COLORS = ['#F4B7C8', '#D8C5F2', '#F7D98B', '#9ADBC2', '#F6A58C', '#E56B91']

type Props = { count?: number; seed?: number; spread?: number; hearts?: boolean; className?: string }

/** One-shot burst from the centre of its (positioned) parent. Mount it to fire it. */
export default function ConfettiBurst({ count = 36, seed = 5, spread = 170, hearts = true, className = '' }: Props) {
  const parts = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: count }, (_, i) => {
      const a = r() * Math.PI * 2
      const d = spread * (0.35 + r() * 0.75)
      return {
        x: Math.cos(a) * d,
        y: Math.sin(a) * d * 0.8 - 40,
        rot: (r() - 0.5) * 720,
        color: COLORS[i % COLORS.length],
        size: 6 + r() * 7,
        heart: hearts && i % 4 === 0,
        delay: r() * 0.12,
      }
    })
  }, [count, seed, spread, hearts])

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-30 flex items-center justify-center ${className}`}>
      {parts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute"
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 90], opacity: [1, 1, 0], scale: 1, rotate: p.rot }}
          transition={{ duration: 1.7, delay: p.delay, ease: 'easeOut', times: [0, 0.45, 1] }}
        >
          {p.heart ? (
            <Heart size={p.size + 6} color={p.color} />
          ) : (
            <span style={{ display: 'block', width: p.size, height: p.size * 0.6, background: p.color, borderRadius: 2 }} />
          )}
        </motion.span>
      ))}
    </div>
  )
}
