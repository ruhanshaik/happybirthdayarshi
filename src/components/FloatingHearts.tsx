import { useMemo } from 'react'
import { Heart } from './Decor'

function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

type Props = {
  count?: number
  seed?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
  className?: string
}

/** Slowly rising hearts. Purely decorative, pointer-events disabled. */
export default function FloatingHearts({
  count = 10,
  seed = 7,
  colors = ['#F4B7C8', '#E88AA6', '#D8C5F2', '#F9D3DD'],
  minSize = 12,
  maxSize = 26,
  className = '',
}: Props) {
  const items = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: count }, (_, i) => ({
      left: r() * 96,
      size: minSize + r() * (maxSize - minSize),
      delay: -r() * 14,
      dur: 9 + r() * 8,
      color: colors[i % colors.length],
      opacity: 0.45 + r() * 0.4,
    }))
  }, [count, seed, colors, minSize, maxSize])

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {items.map((h, i) => (
        <span
          key={i}
          className="anim-float-up absolute bottom-[-40px]"
          style={{ left: `${h.left}%`, animationDelay: `${h.delay}s`, ['--d' as string]: `${h.dur}s`, opacity: h.opacity }}
        >
          <Heart size={h.size} color={h.color} />
        </span>
      ))}
    </div>
  )
}
