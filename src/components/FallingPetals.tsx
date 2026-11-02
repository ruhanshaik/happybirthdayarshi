import { useMemo } from 'react'

function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

type Kind = 'petal' | 'leaf' | 'confetti' | 'gold'

const PALETTES: Record<Kind, string[]> = {
  petal: ['#F9C6D3', '#F4B7C8', '#FBE0E7', '#D8C5F2'],
  leaf: ['#9BBF84', '#B7D4A0', '#7FA36B', '#E8C87A'],
  confetti: ['#F4B7C8', '#D8C5F2', '#F7D98B', '#9ADBC2', '#F6A58C'],
  gold: ['#F7D98B', '#FFF0C9', '#E9C46A'],
}

type Props = { kind?: Kind; count?: number; seed?: number; className?: string }

/** Gentle falling petals / leaves / confetti / golden dust, CSS-only. */
export default function FallingPetals({ kind = 'petal', count = 14, seed = 11, className = '' }: Props) {
  const items = useMemo(() => {
    const r = rng(seed)
    const pal = PALETTES[kind]
    return Array.from({ length: count }, (_, i) => ({
      left: r() * 100,
      size: kind === 'gold' ? 3 + r() * 4 : kind === 'confetti' ? 6 + r() * 6 : 10 + r() * 10,
      delay: -r() * 14,
      dur: kind === 'confetti' ? 8 + r() * 6 : 11 + r() * 8,
      dx: (r() - 0.5) * 120,
      color: pal[i % pal.length],
      rot: r() * 360,
    }))
  }, [kind, count, seed])

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {items.map((p, i) => (
        <span
          key={i}
          className="anim-fall absolute top-0"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            ['--d' as string]: `${p.dur}s`,
            ['--dx' as string]: `${p.dx}px`,
          }}
        >
          <span
            style={{
              display: 'block',
              width: p.size,
              height: kind === 'confetti' ? p.size * 1.6 : kind === 'gold' ? p.size : p.size * 0.7,
              background: p.color,
              borderRadius: kind === 'petal' ? '60% 40% 60% 40%' : kind === 'leaf' ? '0 80% 0 80%' : kind === 'gold' ? '50%' : '2px',
              transform: `rotate(${p.rot}deg)`,
              opacity: kind === 'gold' ? 0.85 : 0.8,
              boxShadow: kind === 'gold' ? '0 0 8px rgba(247,217,139,.9)' : undefined,
            }}
          />
        </span>
      ))}
    </div>
  )
}
