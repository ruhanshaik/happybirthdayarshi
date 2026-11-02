import { useId } from 'react'
import type { SVGProps } from 'react'

export type BearPose = 'idle' | 'wave' | 'celebrate' | 'heart' | 'letter' | 'gift'

type Props = {
  pose?: BearPose
  hat?: boolean
  eyes?: 'open' | 'closed'
  /** Disable idle motion (useful in static compositions). */
  still?: boolean
  label?: string
  className?: string
  hatColors?: [string, string]
  /** Spread on the root <svg>; lets the bear be nested in another SVG via x/y/width/height. */
  svgProps?: SVGProps<SVGSVGElement>
}

const DARK = '#5A3B2E'
const RIM = '#C97E35'

function Arm({ side, angle, wave, fur }: { side: 'L' | 'R'; angle: number; wave?: boolean; fur: string }) {
  const sx = side === 'L' ? 52 : 148
  const sy = 138
  return (
    <g transform={`rotate(${angle} ${sx} ${sy})`}>
      <g className={wave ? 'bear-wave' : undefined} style={{ transformBox: 'view-box', transformOrigin: `${sx}px ${sy}px` }}>
        <ellipse cx={sx} cy={sy + 24} rx="16" ry="31" fill={`url(#${fur})`} stroke={RIM} strokeOpacity=".3" strokeWidth="1.5" />
        <ellipse cx={sx} cy={sy + 46} rx="10" ry="8.500" fill="#FFE9C2" />
        <ellipse cx={sx - 4} cy={sy + 12} rx="4" ry="11" fill="#fff" opacity=".22" />
      </g>
    </g>
  )
}

function Item({ pose }: { pose: BearPose }) {
  if (pose === 'heart')
    return (
      <g transform="translate(100 170)">
        <path d="M0 22C-22 6-26-6-26-14c0-8 6-13 13-13 5 0 10 3 13 8 3-5 8-8 13-8 7 0 13 5 13 13C26-6 22 6 0 22z" fill="#E56B91" />
        <ellipse cx="-12" cy="-14" rx="5" ry="3" fill="#fff" opacity=".55" transform="rotate(-30 -12 -14)" />
      </g>
    )
  if (pose === 'letter')
    return (
      <g transform="translate(100 170) rotate(-5)">
        <rect x="-30" y="-20" width="60" height="42" rx="5" fill="#FFF6E6" stroke="#E4C894" strokeWidth="1.500" />
        <path d="M-30 -20l30 22 30-22" fill="none" stroke="#E4C894" strokeWidth="1.500" />
        <path d="M0 4c-6-4-8-7-8-9 0-2 1.500-3 3.500-3 1.800 0 3.600 1 4.500 2.600C1-6 2.700-7 4.500-7 6.500-7 8-5.500 8-5 8-3 6 0 0 4z" fill="#E56B91" />
      </g>
    )
  if (pose === 'gift')
    return (
      <g transform="translate(100 168)">
        <rect x="-24" y="-8" width="48" height="32" rx="5" fill="#F4B7C8" />
        <rect x="-27" y="-18" width="54" height="13" rx="5" fill="#F9CBD7" />
        <rect x="-4.500" y="-18" width="9" height="42" fill="#C9B3EE" />
        <path d="M0-18C-12-34-26-26-16-18zM0-18C12-34 26-26 16-18z" fill="#C9B3EE" />
      </g>
    )
  return null
}

/** A soft, plush teddy bear with gradient fur, glossy eyes, blinking, head-tilt and a real hello wave. */
export default function AnimatedTeddyBear({
  pose = 'idle',
  hat = false,
  eyes = 'open',
  still = false,
  label = 'A cute teddy bear',
  className,
  hatColors = ['#F9B8CB', '#A9D8EE'],
  svgProps,
}: Props) {
  const uid = useId()
  const fur = `${uid}fur`
  const belly = `${uid}belly`
  const muz = `${uid}muz`
  const ear = `${uid}ear`
  const holding = pose === 'heart' || pose === 'letter' || pose === 'gift'
  const bodyMotion = still ? '' : pose === 'celebrate' ? 'anim-bounce' : 'anim-breathe'
  const waving = pose === 'wave' && !still

  return (
    <svg
      viewBox="0 0 200 248"
      width="100%"
      height="100%"
      role="img"
      aria-label={label}
      className={className}
      style={{ overflow: 'visible', filter: 'drop-shadow(0 5px 5px rgba(120,70,20,.22))' }}
      {...svgProps}
    >
      <defs>
        <radialGradient id={fur} cx="38%" cy="28%" r="85%">
          <stop offset="0" stopColor="#FFD79A" />
          <stop offset=".55" stopColor="#F0AE5E" />
          <stop offset="1" stopColor="#DE9140" />
        </radialGradient>
        <radialGradient id={belly} cx="50%" cy="35%" r="75%">
          <stop offset="0" stopColor="#FFF1D4" />
          <stop offset="1" stopColor="#FAD9A2" />
        </radialGradient>
        <radialGradient id={muz} cx="50%" cy="35%" r="70%">
          <stop offset="0" stopColor="#FFF6E4" />
          <stop offset="1" stopColor="#FBE0B4" />
        </radialGradient>
        <radialGradient id={ear} cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#FAB9BE" />
          <stop offset="1" stopColor="#F29AA6" />
        </radialGradient>
      </defs>

      <g transform="translate(0 18)">
        <ellipse cx="100" cy="226" rx="64" ry="8" fill="#6b4020" opacity=".16" />

        <g className={bodyMotion} style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}>
          {/* feet */}
          {[64, 136].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy="206" rx="28" ry="21" fill={`url(#${fur})`} stroke={RIM} strokeOpacity=".3" strokeWidth="1.500" />
              <ellipse cx={x} cy="209" rx="14" ry="10.500" fill="#F7A3B3" />
              {[-8, 0, 8].map((dx) => (
                <circle key={dx} cx={x + dx} cy={197 + Math.abs(dx) * -0.1} r="3.600" fill="#F7A3B3" />
              ))}
            </g>
          ))}

          {/* body */}
          <ellipse cx="100" cy="164" rx="55" ry="57" fill={`url(#${fur})`} stroke={RIM} strokeOpacity=".3" strokeWidth="1.500" />
          <ellipse cx="100" cy="174" rx="35" ry="39" fill={`url(#${belly})`} />
          <ellipse cx="82" cy="146" rx="9" ry="14" fill="#fff" opacity=".2" transform="rotate(20 82 146)" />

          {/* arms */}
          {pose === 'idle' && (
            <>
              <Arm side="L" angle={10} fur={fur} />
              <Arm side="R" angle={-10} fur={fur} />
            </>
          )}
          {pose === 'wave' && (
            <>
              <Arm side="L" angle={10} fur={fur} />
              <Arm side="R" angle={-146} fur={fur} wave={waving} />
            </>
          )}
          {pose === 'celebrate' && (
            <>
              <Arm side="L" angle={152} fur={fur} />
              <Arm side="R" angle={-152} fur={fur} />
            </>
          )}

          <Item pose={pose} />
          {holding && (
            <>
              <Arm side="L" angle={-40} fur={fur} />
              <Arm side="R" angle={40} fur={fur} />
            </>
          )}

          {/* little bow */}
          <g transform="translate(100 150)">
            <path d="M0 0C-14-12-26-8-24 2-22 10-10 8 0 0zM0 0C14-12 26-8 24 2 22 10 10 8 0 0z" fill="#F4A5BE" stroke="#E27C9F" strokeWidth="1" strokeOpacity=".6" />
            <circle r="5" fill="#E27C9F" />
          </g>

          {/* head */}
          <g className={still ? '' : 'anim-tilt'} style={{ transformBox: 'fill-box', transformOrigin: '50% 92%' }}>
            {[46, 154].map((x, i) => (
              <g key={x} className={still ? '' : 'bear-ear'} style={{ animationDelay: `${i * 0.6}s` }}>
                <circle cx={x} cy="52" r="26" fill={`url(#${fur})`} stroke={RIM} strokeOpacity=".3" strokeWidth="1.500" />
                <circle cx={x} cy="54" r="15" fill={`url(#${ear})`} />
              </g>
            ))}
            <ellipse cx="100" cy="94" rx="68" ry="60" fill={`url(#${fur})`} stroke={RIM} strokeOpacity=".3" strokeWidth="1.500" />
            <ellipse cx="74" cy="56" rx="22" ry="9" fill="#fff" opacity=".28" transform="rotate(-18 74 56)" />
            <path d="M96 36q4-12 12-6" stroke="#D88A3C" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".7" />
            <ellipse cx="100" cy="117" rx="32" ry="25" fill={`url(#${muz})`} />
            <ellipse cx="55" cy="116" rx="12" ry="8" fill="#F28FA6" opacity=".5" />
            <ellipse cx="145" cy="116" rx="12" ry="8" fill="#F28FA6" opacity=".5" />
            <path d="M91 104q9-6 18 0 0 9-9 11-9-2-9-11z" fill={DARK} />
            <ellipse cx="96" cy="105" rx="3.500" ry="1.800" fill="#fff" opacity=".55" />
            <path d="M100 114v5M100 119q-7 8-15 2M100 119q7 8 15 2" stroke={DARK} strokeWidth="3" fill="none" strokeLinecap="round" />
            {eyes === 'open' ? (
              <g className={still ? '' : 'anim-blink'}>
                <ellipse cx="71" cy="92" rx="8.500" ry="10" fill={DARK} />
                <ellipse cx="129" cy="92" rx="8.500" ry="10" fill={DARK} />
                <circle cx="68.500" cy="87.500" r="3.400" fill="#fff" />
                <circle cx="126.500" cy="87.500" r="3.400" fill="#fff" />
                <circle cx="74" cy="96" r="1.600" fill="#fff" opacity=".8" />
                <circle cx="132" cy="96" r="1.600" fill="#fff" opacity=".8" />
              </g>
            ) : (
              <g stroke={DARK} strokeWidth="4" fill="none" strokeLinecap="round">
                <path d="M61 94q10 10 20 0" />
                <path d="M119 94q10 10 20 0" />
              </g>
            )}
          </g>

          {hat && (
            <g transform="rotate(-9 100 44)">
              <path d="M66 50L100-18l34 68z" fill={hatColors[0]} stroke="#fff" strokeWidth="2.500" strokeLinejoin="round" />
              <path d="M79 28l42 9M72 40l56 12" stroke={hatColors[1]} strokeWidth="6" strokeLinecap="round" opacity=".9" />
              <circle cx="100" cy="-18" r="9" fill="#FFF3F6" />
              <ellipse cx="100" cy="51" rx="36" ry="7" fill="#fff" opacity=".9" />
            </g>
          )}
        </g>
      </g>
    </svg>
  )
}
