import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import BirthdayCake from './BirthdayCake'
import ConfettiBurst from './ConfettiBurst'

type Pt = { x: number; y: number }

type Props = {
  cut: boolean
  /** Fires once, when the cake has been cut. */
  onCut: () => void
  /** Incrementing this starts a scripted knife cut (used by the "Cut the Cake" button). */
  trigger?: number
  className?: string
}

const VB_W = 300
const VB_H = 270

/** Knife drawn with its TIP at (0,0), blade pointing down. */
function Knife() {
  return (
    <g>
      <rect x="-5.500" y="-148" width="11" height="44" rx="5" fill="#8E5D54" />
      <path d="M-4 -104h8v90l-4 14-4-14z" fill="#EEF1F5" stroke="#B7C0CC" strokeWidth="1.200" />
      <path d="M-2 -100v84" stroke="#fff" strokeWidth="1.500" opacity=".85" />
    </g>
  )
}

/**
 * The cake + finger/mouse swipe cutting. Drag a finger straight down through the cake and it splits.
 * The "Cut the Cake" button (via `trigger`) plays a scripted knife instead.
 */
export default function CakeCutInteraction({ cut, onCut, trigger = 0, className = '' }: Props) {
  const [scripted, setScripted] = useState(false)
  const [burst, setBurst] = useState(false)
  const [trail, setTrail] = useState<Pt[]>([])
  const [touched, setTouched] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const start = useRef<Pt | null>(null)
  const started = useRef(false)
  const done = useRef(false)

  const complete = useCallback(() => {
    if (done.current) return
    done.current = true
    started.current = true
    start.current = null
    setScripted(false)
    setTrail([])
    setBurst(true)
    onCut()
  }, [onCut])

  const runScripted = useCallback(() => {
    if (started.current || cut) return
    started.current = true
    setScripted(true)
  }, [cut])

  useEffect(() => {
    if (trigger > 0) runScripted()
  }, [trigger, runScripted])

  const toSvg = (e: React.PointerEvent): Pt => {
    const r = box.current!.getBoundingClientRect()
    return { x: ((e.clientX - r.left) / r.width) * VB_W, y: ((e.clientY - r.top) / r.height) * VB_H }
  }

  const onDown = (e: React.PointerEvent) => {
    if (cut || started.current) return
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    const p = toSvg(e)
    start.current = p
    setTouched(true)
    setTrail([p])
  }

  const onMove = (e: React.PointerEvent) => {
    const s = start.current
    if (!s) return
    const p = toSvg(e)
    setTrail((t) => [...t.slice(-45), p])
    const dy = p.y - s.y
    const dxTotal = Math.abs(p.x - s.x)
    // swipe must start near the top-middle of the cake and travel mostly downward
    if (s.y < 150 && Math.abs(s.x - 150) < 85 && dy > 105 && dxTotal < 70) complete()
  }

  const onUp = () => {
    start.current = null
    setTrail([])
  }

  const tip = trail[trail.length - 1]

  const overlay = (
    <>
      {!cut && !scripted && trail.length === 0 && <line x1="150" y1="40" x2="150" y2="244" stroke="#76536F" strokeOpacity=".5" strokeWidth="1.800" strokeDasharray="5 6" />}
      {trail.length > 1 && (
        <>
          <polyline points={trail.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#FFE9A0" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" opacity=".45" />
          <polyline points={trail.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {tip && !cut && (
        <g transform={`translate(${tip.x} ${tip.y})`}>
          <Knife />
        </g>
      )}
      {scripted && (
        <motion.g
          style={{ x: 150 }}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: [-10, 40, 240, 240], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.3, times: [0, 0.2, 0.8, 1], ease: 'easeInOut' }}
          onAnimationComplete={complete}
        >
          <Knife />
        </motion.g>
      )}
    </>
  )

  return (
    <div
      ref={box}
      className={`relative select-none ${className}`}
      style={{ touchAction: cut ? 'auto' : 'none', cursor: cut ? 'default' : 'grab' }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <BirthdayCake split={cut} overlay={overlay} className="h-auto w-full" />
      {/* animated finger hint until the first touch */}
      {!cut && !touched && !scripted && (
        <span aria-hidden="true" className="anim-finger pointer-events-none absolute left-1/2 top-[8%] text-[2.2rem]" style={{ filter: 'drop-shadow(0 3px 4px rgba(0,0,0,.25))' }}>
          👆
        </span>
      )}
      {burst && <ConfettiBurst count={44} seed={13} spread={190} className="!items-start pt-[25%]" />}
    </div>
  )
}
