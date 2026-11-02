import { motion } from 'framer-motion'
import { useId, useMemo } from 'react'

function drip(x0: number, x1: number, y: number, h: number, n: number) {
  const w = (x1 - x0) / n
  let d = `M${x0} ${y}H${x1}V${y + h}`
  for (let i = 0; i < n; i++) d += `Q${x1 - w * (i + 0.5)} ${y + h + (i % 2 ? 17 : 8)} ${x1 - w * (i + 1)} ${y + h}`
  return d + 'Z'
}

const SPRINKLES = [
  [64, 218, '#F7D98B'], [92, 226, '#9ADBC2'], [124, 214, '#C9B3EE'], [178, 224, '#F7D98B'], [212, 216, '#9ADBC2'], [238, 226, '#C9B3EE'],
  [150, 232, '#F4B7C8'], [100, 206, '#F4B7C8'], [200, 208, '#F7D98B'],
] as const

type Props = {
  /** pieces have been moved apart */
  split?: boolean
  /** candle flames lit */
  flames?: boolean
  /** extra glow around the flames */
  glow?: boolean
  className?: string
  /** SVG content rendered on top (knife, crumbs...) */
  overlay?: React.ReactNode
}

function Body({ flames, glow }: { flames: boolean; glow: boolean }) {
  return (
    <g>
      {/* bottom tier */}
      <rect x="44" y="170" width="212" height="72" rx="12" fill="#FDEFE2" />
      <rect x="44" y="214" width="212" height="28" rx="12" fill="#F6DFCB" opacity=".7" />
      <path d={drip(44, 256, 170, 24, 9)} fill="#F2709A" />
      <path d={drip(44, 256, 170, 24, 9)} fill="#fff" opacity=".12" transform="translate(0 -2)" />
      {SPRINKLES.map(([x, y, c], i) => (
        <rect key={i} x={x} y={y} width="6" height="2.600" rx="1.300" fill={c} transform={`rotate(${i * 37} ${x} ${y})`} />
      ))}
      {/* middle tier */}
      <rect x="72" y="112" width="156" height="60" rx="10" fill="#C9C1EE" />
      <rect x="72" y="150" width="156" height="22" fill="#B7AEE3" opacity=".6" />
      <path d={drip(72, 228, 112, 17, 8)} fill="#fff" />
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={86 + i * 16} cy="150" r="3" fill="#fff" />
      ))}
      {/* top tier */}
      <rect x="102" y="68" width="96" height="46" rx="9" fill="#FBDD7A" />
      <path d={drip(102, 198, 68, 14, 6)} fill="#F2709A" />
      <rect x="102" y="96" width="96" height="5" fill="#fff" opacity=".6" />
      {/* cherries + candles */}
      {[126, 174].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="66" r="9" fill="#D93B5A" />
          <ellipse cx={x - 3} cy="62" rx="2.800" ry="2" fill="#fff" opacity=".6" />
          <rect x={x - 3.500} y="30" width="7" height="34" rx="2" fill="#fff" />
          <path d={`M${x - 3.500} 40l7-4M${x - 3.500} 50l7-4M${x - 3.500} 60l7-4`} stroke={i ? '#F4B7C8' : '#9DC9EE'} strokeWidth="3" />
          {flames && (
            <g>
              {glow && <circle cx={x} cy="20" r="30" fill="url(#flameGlow)" />}
              <g className="anim-flicker" style={{ animationDelay: `${i * 0.3}s` }}>
                <ellipse cx={x} cy="22" rx="5.500" ry="10" fill="#FFB43C" />
                <ellipse cx={x} cy="24" rx="3" ry="6.500" fill="#FFE98A" />
              </g>
            </g>
          )}
        </g>
      ))}
    </g>
  )
}

/** Illustrated tiered cake built from two clipped halves so it can really separate. */
export default function BirthdayCake({ split = false, flames = true, glow = false, className = '', overlay }: Props) {
  const idL = useId()
  const idR = useId()
  const crumbs = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({ x: 150 + (i % 2 ? 1 : -1) * (10 + (i * 13) % 80), y: 170 + ((i * 29) % 70), c: ['#F7D98B', '#F4B7C8', '#C9B3EE', '#9ADBC2'][i % 4], r: i * 40 })),
    [],
  )
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <svg viewBox="0 0 300 270" className={className} role="img" aria-label={split ? 'A birthday cake, cut into two pieces' : 'A tiered birthday cake with two candles'} style={{ overflow: 'visible' }}>
      <defs>
        <clipPath id={idL}><rect x="-60" y="-40" width="210" height="340" /></clipPath>
        <clipPath id={idR}><rect x="150" y="-40" width="210" height="340" /></clipPath>
        <radialGradient id="flameGlow">
          <stop offset="0" stopColor="#FFE9A0" stopOpacity=".95" />
          <stop offset="1" stopColor="#FFB43C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* plate */}
      <ellipse cx="150" cy="248" rx="132" ry="17" fill="#B8A79B" opacity=".25" />
      <ellipse cx="150" cy="243" rx="132" ry="16" fill="#FFFFFF" />
      <ellipse cx="150" cy="241" rx="118" ry="11" fill="#F1E9E1" />

      {/* revealed interior */}
      <motion.g
        initial={false}
        animate={{ scaleX: split ? 1 : 0, opacity: split ? 1 : 0 }}
        transition={{ duration: 0.7, ease, delay: split ? 0.15 : 0 }}
        style={{ transformBox: 'view-box', transformOrigin: '150px 150px' }}
      >
        <rect x="126" y="68" width="48" height="46" fill="#FBE3A0" />
        <rect x="126" y="86" width="48" height="6" fill="#F2709A" />
        <rect x="126" y="112" width="48" height="60" fill="#D9D2F4" />
        <rect x="126" y="134" width="48" height="8" fill="#fff" />
        <rect x="126" y="170" width="48" height="72" fill="#FFF3E6" />
        <rect x="126" y="196" width="48" height="8" fill="#F4B7C8" />
        <rect x="126" y="170" width="48" height="6" fill="#F2709A" />
      </motion.g>

      <motion.g
        clipPath={`url(#${idL})`}
        initial={false}
        animate={split ? { x: -24, rotate: -3.5 } : { x: 0, rotate: 0 }}
        transition={{ duration: 0.9, ease, delay: split ? 0.1 : 0 }}
        style={{ transformBox: 'view-box', transformOrigin: '150px 242px' }}
      >
        <Body flames={flames} glow={glow} />
      </motion.g>
      <motion.g
        clipPath={`url(#${idR})`}
        initial={false}
        animate={split ? { x: 24, rotate: 3.5 } : { x: 0, rotate: 0 }}
        transition={{ duration: 0.9, ease, delay: split ? 0.1 : 0 }}
        style={{ transformBox: 'view-box', transformOrigin: '150px 242px' }}
      >
        <Body flames={flames} glow={glow} />
      </motion.g>

      {/* crumbs & sprinkles that pop out of the cut */}
      {split &&
        crumbs.map((c, i) => (
          <motion.rect
            key={i}
            x={150}
            y={190}
            width="5"
            height="2.600"
            rx="1.300"
            fill={c.c}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0.9], x: c.x - 150, y: [0, -30 - (i % 4) * 8, c.y - 190 + 24], rotate: c.r }}
            transition={{ duration: 1.1 + (i % 4) * 0.12, delay: 0.25 + i * 0.03, ease: 'easeOut' }}
          />
        ))}
      {overlay}
    </svg>
  )
}
