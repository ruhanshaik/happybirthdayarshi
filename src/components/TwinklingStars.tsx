import { useMemo } from 'react'
import { Sparkle } from './Decor'

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
  color?: string
  maxTop?: number
  minSize?: number
  maxSize?: number
  /** add occasional shooting stars (night scenes) */
  shooting?: boolean
  className?: string
}

/** Real-feeling stars: each one blinks on its own rhythm, with a soft glow. */
export default function TwinklingStars({ count = 28, seed = 3, color = '#FFF0C9', maxTop = 100, minSize = 6, maxSize = 16, shooting = false, className = '' }: Props) {
  const stars = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: count }, () => ({
      left: r() * 100,
      top: r() * maxTop,
      size: minSize + r() * (maxSize - minSize),
      delay: -r() * 5,
      dur: 1.6 + r() * 3.4,
    }))
  }, [count, seed, maxTop, minSize, maxSize])

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="anim-twinkle absolute"
          style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s`, ['--d' as string]: `${s.dur}s`, filter: `drop-shadow(0 0 4px ${color})` }}
        >
          <Sparkle size={s.size} color={color} />
        </span>
      ))}
      {shooting && (
        <>
          <span className="shoot" style={{ left: '78%', top: '8%', ['--d' as string]: '7s', animationDelay: '1s' }} />
          <span className="shoot" style={{ left: '95%', top: '28%', ['--d' as string]: '11s', animationDelay: '5s' }} />
        </>
      )}
    </div>
  )
}
