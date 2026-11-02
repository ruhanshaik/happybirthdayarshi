import { motion } from 'framer-motion'
import { useId, useMemo } from 'react'
import AnimatedTeddyBear from './AnimatedTeddyBear'
import { GiftBox } from './Decor'

const SVG_PROPS = {
  viewBox: '0 0 400 700',
  preserveAspectRatio: 'xMidYMax meet' as const,
  className: 'absolute inset-0 h-full w-full',
  style: { overflow: 'visible' as const },
}

function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

const STARS = [
  [150, 235, 1.6], [172, 252, 1.2], [238, 232, 1.8], [252, 262, 1.2], [186, 224, 1.2], [160, 292, 1.4],
  [248, 300, 1.6], [142, 330, 1.2], [262, 340, 1.3], [226, 250, 1], [180, 320, 1.2], [214, 342, 1.4],
]

function Blossom({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  return (
    <g>
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx={cx + Math.cos((a * Math.PI) / 180) * r * 0.9} cy={cy + Math.sin((a * Math.PI) / 180) * r * 0.9} r={r * 0.7} fill={color} />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.55} fill="#F7D98B" />
    </g>
  )
}

/** The cozy bedroom. Back layer: furniture & walls (dimmed when dark). */
function RoomBack() {
  return (
    <svg {...SVG_PROPS} aria-hidden="true">
      <defs>
        <pattern id="wallStripes" width="56" height="40" patternUnits="userSpaceOnUse">
          <rect width="56" height="40" fill="#F9E6DB" />
          <rect width="28" height="40" fill="#F2CFD6" opacity=".7" />
        </pattern>
        <linearGradient id="floorG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFA17A" />
          <stop offset="1" stopColor="#A87A58" />
        </linearGradient>
        <linearGradient id="curtainG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8E5D84" />
          <stop offset=".5" stopColor="#B27A9A" />
          <stop offset="1" stopColor="#8E5D84" />
        </linearGradient>
      </defs>
      {/* walls & floor, extended so any viewport is filled */}
      <rect x="-2000" y="-2000" width="4400" height="2482" fill="url(#wallStripes)" />
      <rect x="-2000" y="474" width="4400" height="12" fill="#FFF8F0" />
      <rect x="-2000" y="486" width="4400" height="2400" fill="url(#floorG)" />
      {[510, 545, 590, 650].map((y) => (
        <rect key={y} x="-2000" y={y} width="4400" height="2" fill="#8D6246" opacity=".25" />
      ))}
      <ellipse cx="200" cy="622" rx="190" ry="48" fill="#E8A6B8" />
      <ellipse cx="200" cy="622" rx="168" ry="38" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2" strokeDasharray="6 6" />

      {/* window frame */}
      <path d="M118 382V282A82 82 0 0 1 282 282V382Z" fill="#FFF8EC" stroke="#D8B574" strokeWidth="3" />
      <rect x="108" y="378" width="184" height="12" rx="5" fill="#F4E5CE" stroke="#D8B574" strokeWidth="2" />
      {/* curtains */}
      <rect x="70" y="190" width="260" height="6" rx="3" fill="#D8B574" />
      <circle cx="70" cy="193" r="7" fill="#D8B574" />
      <circle cx="330" cy="193" r="7" fill="#D8B574" />
      <path d="M92 196H136C140 260 126 330 138 408H86C94 330 84 260 92 196Z" fill="url(#curtainG)" />
      <path d="M264 196H308C316 260 306 330 314 408H262C274 330 260 260 264 196Z" fill="url(#curtainG)" />
      {[106, 120, 278, 294].map((x) => (
        <path key={x} d={`M${x} 200C${x + 4} 280 ${x - 4} 340 ${x + 2} 404`} stroke="#6E4468" strokeWidth="2" opacity=".35" fill="none" />
      ))}
      <path d="M92 300q22 10 46 0" stroke="#D8B574" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M262 300q22 10 46 0" stroke="#D8B574" strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* wall frames */}
      <g>
        <rect x="18" y="226" width="58" height="72" rx="4" fill="#fff" stroke="#D8B574" strokeWidth="3" />
        <rect x="26" y="234" width="42" height="56" fill="#F9D3DD" />
        <path d="M47 270c-10-7-13-12-13-16 0-4 3-6 6-6 3 0 5 2 7 4 2-2 4-4 7-4 3 0 6 2 6 6 0 4-3 9-13 16z" fill="#E56B91" />
        <rect x="326" y="246" width="52" height="52" rx="4" fill="#fff" stroke="#D8B574" strokeWidth="3" />
        <rect x="333" y="253" width="38" height="38" fill="#D8C5F2" />
        <circle cx="352" cy="272" r="9" fill="#FFF0C9" />
        <circle cx="356" cy="269" r="8" fill="#D8C5F2" />
      </g>

      {/* bedside table */}
      <rect x="266" y="462" width="124" height="14" rx="5" fill="#B07B52" />
      <rect x="276" y="476" width="9" height="104" fill="#9A6842" />
      <rect x="371" y="476" width="9" height="104" fill="#9A6842" />
      <rect x="276" y="496" width="104" height="38" rx="5" fill="#C28D62" />
      <circle cx="328" cy="515" r="4" fill="#F1D9A0" />
      {/* lamp */}
      <ellipse cx="302" cy="460" rx="17" ry="4" fill="#D8B574" />
      <rect x="300.500" y="422" width="3" height="38" fill="#D8B574" />
      <path d="M280 426L291 394H313L324 426Z" fill="#FFE8AE" stroke="#E5C37A" strokeWidth="2" />
      {/* books */}
      <rect x="338" y="444" width="42" height="9" rx="2" fill="#D9829B" />
      <rect x="341" y="435" width="38" height="9" rx="2" fill="#8E7BC8" />
      <rect x="337" y="426" width="40" height="9" rx="2" fill="#F2C46B" />
      {/* vase and flowers */}
      <g transform="translate(266 0)">
        <path d="M13 462c-6-12-4-24 2-30h12c6 6 8 18 2 30z" fill="#F4B7C8" stroke="#fff" strokeWidth="1.500" />
        <path d="M21 432C17 410 12 400 8 392M21 432C21 408 24 396 28 386M21 432C26 412 34 402 40 396" stroke="#7FA36B" strokeWidth="2.500" fill="none" strokeLinecap="round" />
        <Blossom cx={8} cy={388} r={7} color="#F4B7C8" />
        <Blossom cx={28} cy={380} r={8} color="#D8C5F2" />
        <Blossom cx={41} cy={392} r={6.500} color="#F9D3DD" />
      </g>

      {/* teddy bears and a gift */}
      <g transform="translate(26 502)">
        <AnimatedTeddyBear pose="wave" hat label="A teddy bear in a party hat waving" svgProps={{ width: 132, height: 164 }} />
      </g>
      <g transform="translate(168 566)">
        <AnimatedTeddyBear pose="heart" label="A little teddy bear holding a heart" svgProps={{ width: 96, height: 119 }} />
      </g>
      <g transform="translate(282 596)">
        <GiftBox size={62} />
      </g>
    </svg>
  )
}

/** Front layer: the night sky stays visible even when the room is dark. */
function RoomFront({ lit }: { lit: boolean }) {
  const clipId = useId()
  const moonMask = useId()
  const skyId = useId()
  const moonGlow = useId()
  const lampGlow = useId()
  return (
    <svg {...SVG_PROPS} aria-hidden="true" style={{ ...SVG_PROPS.style, pointerEvents: 'none' }}>
      <defs>
        <clipPath id={clipId}>
          <path d="M130 372V282A70 70 0 0 1 270 282V372Z" />
        </clipPath>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#090d2b" />
          <stop offset=".6" stopColor="#2a2260" />
          <stop offset="1" stopColor="#6a4486" />
        </linearGradient>
        <mask id={moonMask}>
          <rect width="100" height="100" fill="#fff" />
          <circle cx="66" cy="38" r="32" fill="#000" />
        </mask>
        <radialGradient id={moonGlow}>
          <stop offset="0" stopColor="#9db4ff" stopOpacity=".38" />
          <stop offset="1" stopColor="#9db4ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={lampGlow}>
          <stop offset="0" stopColor="#FFE7A0" stopOpacity=".95" />
          <stop offset=".45" stopColor="#FFD27A" stopOpacity=".4" />
          <stop offset="1" stopColor="#FFD27A" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* moonlight spill on the wall */}
      <circle cx="200" cy="320" r="260" fill={`url(#${moonGlow})`} style={{ opacity: lit ? 0.15 : 1, transition: 'opacity 2s' }} />
      <g clipPath={`url(#${clipId})`}>
        <rect x="120" y="200" width="160" height="180" fill={`url(#${skyId})`} />
        {STARS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#FFF8DC" className="anim-twinkle" style={{ animationDelay: `${-i * 0.37}s`, ['--d' as string]: `${2 + (i % 4) * 0.7}s`, transformBox: 'fill-box', transformOrigin: 'center' }} />
        ))}
        <g transform="translate(168 236) scale(.62)">
          <circle cx="46" cy="54" r="38" fill="#FFF0C9" mask={`url(#${moonMask})`} style={{ filter: 'drop-shadow(0 0 8px rgba(255,240,201,.9))' }} />
        </g>
        <path d="M120 362C150 336 176 350 204 340 232 330 252 344 280 332V380H120Z" fill="#1c1747" />
        <path d="M120 372C156 352 188 366 222 354 250 346 266 356 280 352V380H120Z" fill="#120f35" />
      </g>
      <path d="M130 372V282A70 70 0 0 1 270 282V372Z" fill="none" stroke="#FFF8EC" strokeWidth="2.500" />
      <path d="M200 212V372M130 300H270" stroke="#FFF8EC" strokeWidth="4" opacity=".92" />
      <path d="M142 380L150 214" stroke="#fff" strokeOpacity=".12" strokeWidth="14" />

      {/* lamp glow (only when lit) */}
      <circle cx="302" cy="418" r="130" fill={`url(#${lampGlow})`} style={{ opacity: lit ? 1 : 0, transition: 'opacity 2.2s ease .4s', mixBlendMode: 'screen' }} />
    </svg>
  )
}

const RAYS = [
  '100,0 8,100 22,100',
  '100,0 32,100 44,100',
  '100,0 56,100 66,100',
  '100,0 76,100 82,100',
  '100,0 0,72 0,84',
]

function Dust() {
  const items = useMemo(() => {
    const r = rng(9)
    return Array.from({ length: 26 }, () => ({ left: 8 + r() * 86, top: 4 + r() * 70, size: 2 + r() * 3, dur: 5 + r() * 6, delay: -r() * 8 }))
  }, [])
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5]">
      {items.map((d, i) => (
        <span
          key={i}
          className="anim-dust absolute rounded-full bg-moon"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size, boxShadow: '0 0 8px 2px rgba(255,240,201,.9)', animationDelay: `${d.delay}s`, ['--d' as string]: `${d.dur}s` }}
        />
      ))}
    </div>
  )
}

export default function MagicalRoom({ lit }: { lit: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F2CFD6]">
      <RoomBack />

      {/* darkness: layered gradients, not just a flat colour */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-[2]"
        style={{ background: 'radial-gradient(120% 90% at 55% 36%, rgba(30,24,80,.78) 0%, rgba(14,10,38,.92) 55%, rgba(6,4,20,.97) 100%)' }}
        initial={false}
        animate={{ opacity: lit ? 0 : 1 }}
        transition={{ duration: 2.4, ease: 'easeInOut', delay: lit ? 0.5 : 0 }}
      />
      {/* a mid-tone plum wash that lingers while the warm light is arriving */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-[2]"
        style={{ background: 'linear-gradient(200deg, rgba(255,204,128,0) 0%, rgba(118,83,111,.35) 100%)' }}
        initial={false}
        animate={{ opacity: lit ? 1 : 0 }}
        transition={{ duration: 3 }}
      />

      <div className="absolute inset-0 z-[3]">
        <RoomFront lit={lit} />
      </div>

      {/* warm light from the upper-right corner */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[4]"
        style={{ mixBlendMode: 'screen', transformOrigin: '100% 0%' }}
        initial={false}
        animate={{ opacity: lit ? 1 : 0, scale: lit ? 1 : 0.4 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
      >
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 100% 0%, rgba(255,232,170,.95) 0%, rgba(255,214,140,.55) 22%, rgba(255,200,120,0) 62%)' }} />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ filter: 'blur(5px)' }}>
          {RAYS.map((p, i) => (
            <polygon key={i} points={p} fill="rgba(255,236,180,.28)" className="anim-twinkle" style={{ animationDelay: `${-i * 0.9}s`, ['--d' as string]: '6s', transformBox: 'fill-box', transformOrigin: '100% 0%' }} />
          ))}
        </svg>
      </motion.div>
      {lit && <Dust />}
    </div>
  )
}
