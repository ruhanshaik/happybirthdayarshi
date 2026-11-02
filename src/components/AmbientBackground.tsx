import type { ReactNode } from 'react'
import FloatingHearts from './FloatingHearts'
import TwinklingStars from './TwinklingStars'

type Props = { children?: ReactNode; hearts?: number; stars?: number; className?: string; seed?: number }

const BOKEH = [
  { l: '8%', t: '14%', s: 90, c: 'rgba(244,183,200,.55)', d: 11 },
  { l: '72%', t: '10%', s: 120, c: 'rgba(216,197,242,.55)', d: 14 },
  { l: '60%', t: '60%', s: 100, c: 'rgba(247,217,139,.45)', d: 13 },
  { l: '-6%', t: '66%', s: 130, c: 'rgba(216,197,242,.5)', d: 16 },
]

/** Warm cream paper backdrop: drifting bokeh, twinkling gold stars and soft hearts. */
export default function AmbientBackground({ children, hearts = 8, stars = 18, className = '', seed = 7 }: Props) {
  return (
    <div className={`paper-bg paper-grain absolute inset-0 overflow-hidden ${className}`}>
      {BOKEH.map((b, i) => (
        <span key={i} aria-hidden="true" className="anim-bokeh pointer-events-none absolute rounded-full blur-2xl" style={{ left: b.l, top: b.t, width: b.s, height: b.s, background: b.c, ['--d' as string]: `${b.d}s`, animationDelay: `${-i * 3}s` }} />
      ))}
      <FloatingHearts count={hearts} seed={seed} />
      <TwinklingStars count={stars} seed={seed + 2} color="#F2C46B" maxSize={14} />
      {children}
    </div>
  )
}
