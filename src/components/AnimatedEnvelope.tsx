import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Flower, FlowerSprig, Heart, Sparkle } from './Decor'
import LoveLetter from './LoveLetter'

export type EnvelopePhase = 'closed' | 'pressed' | 'sealGone' | 'flapOpen' | 'letterUp' | 'unfolded' | 'message'

const ORDER: EnvelopePhase[] = ['closed', 'pressed', 'sealGone', 'flapOpen', 'letterUp', 'unfolded', 'message']
const at = (p: EnvelopePhase, target: EnvelopePhase) => ORDER.indexOf(p) >= ORDER.indexOf(target)

const W = 300
const H = 200
const FH = 116 // flap height
const LH = 320 // letter height
const EASE = [0.22, 1, 0.36, 1] as const

function useFitScale(pad = 32) {
  const [s, setS] = useState(1)
  useEffect(() => {
    const f = () => setS(Math.min(1, (window.innerWidth - pad) / W))
    f()
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [pad])
  return s
}

type Props = { phase: EnvelopePhase; onOpen: () => void }

/**
 * A reliable 2D "flip" envelope: the outer flap folds up and over (outer face squashes to nothing,
 * then the inner face unfolds above), the folded letter slides out, then unfolds and the envelope falls away.
 */
export default function AnimatedEnvelope({ phase, onOpen }: Props) {
  const scale = useFitScale()
  const open = at(phase, 'flapOpen')
  const letterUp = at(phase, 'letterUp')
  const unfolded = at(phase, 'unfolded')
  const interactive = phase === 'closed'
  const fall = { opacity: unfolded ? 0 : 1, y: unfolded ? 70 : 0, scale: unfolded ? 0.94 : 1 }
  const fallT = { duration: 0.9, ease: 'easeInOut' as const }

  return (
    <div style={{ width: W * scale, height: H * scale }} className="relative">
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left' }} className="absolute left-0 top-0">
        <motion.div
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : -1}
          aria-label={interactive ? 'Open the envelope' : undefined}
          onClick={interactive ? onOpen : undefined}
          onKeyDown={(e) => {
            if (interactive && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              onOpen()
            }
          }}
          className={`absolute inset-0 ${interactive ? 'cursor-pointer' : ''}`}
          animate={
            phase === 'closed'
              ? { y: [0, -8, 0], rotate: [-1, 1, -1] }
              : phase === 'pressed'
                ? { scale: [1, 0.94, 1.04, 1], rotate: [0, -3, 3, 0], y: 0 }
                : { y: 0, rotate: 0, scale: 1 }
          }
          transition={phase === 'closed' ? { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.45 }}
        >
          {/* golden glow behind the letter */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-16 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,226,150,.75), rgba(255,226,150,0) 65%)', zIndex: 0 }}
            animate={{ opacity: open ? 1 : phase === 'closed' ? 0.35 : 0.5, scale: open ? 1.2 : 1 }}
            transition={{ duration: 1.2 }}
          />
          {/* ground shadow */}
          <motion.div className="absolute -bottom-3 left-6 right-6 h-5 rounded-[50%] bg-cocoa/25 blur-md" animate={{ opacity: unfolded ? 0 : 1 }} />

          {/* back */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ background: 'linear-gradient(160deg,#F9E8C9,#EBCF9F)', boxShadow: '0 16px 30px rgba(89,65,60,.22)', zIndex: 1 }}
            animate={fall}
            transition={fallT}
          />

          {/* inner face of the flap: unfolds upward AFTER the outer face has folded away */}
          <motion.div
            className="absolute left-0"
            style={{
              top: -FH,
              width: W,
              height: FH,
              zIndex: 2,
              transformOrigin: '50% 100%',
              clipPath: 'polygon(0 100%, 100% 100%, 50% 0)',
              background: 'linear-gradient(0deg,#DDB878,#EBCF9F)',
            }}
            initial={false}
            animate={{ scaleY: open ? 1 : 0, ...(unfolded ? { opacity: 0, y: 70 } : { opacity: 1, y: 0 }) }}
            transition={{ scaleY: { duration: 0.5, delay: open ? 0.38 : 0, ease: 'easeOut' }, opacity: fallT, y: fallT }}
          />

          {/* the letter: folded in the pocket → slides up → unfolds */}
          <motion.div
            className="absolute"
            style={{ left: 20, width: 260, height: LH, top: -(LH - H), zIndex: 3, transformOrigin: '50% 100%' }}
            initial={false}
            animate={{
              scaleY: unfolded ? 1 : 0.46,
              y: unfolded ? -90 : letterUp ? -132 : 0,
            }}
            transition={{ duration: unfolded ? 1.1 : 0.95, ease: EASE }}
          >
            <LoveLetter folded={!unfolded} messageVisible={at(phase, 'message')} />
          </motion.div>

          {/* front pocket */}
          <motion.svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0" style={{ zIndex: 4, pointerEvents: 'none' }} animate={fall} transition={fallT} aria-hidden="true">
            <defs>
              <linearGradient id="envSide" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#F6E1BC" />
                <stop offset="1" stopColor="#E9CB98" />
              </linearGradient>
              <linearGradient id="envBottom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FAEBCF" />
                <stop offset="1" stopColor="#EBCF9F" />
              </linearGradient>
            </defs>
            <path d={`M0 6 L${W / 2} ${FH} L0 ${H}Z`} fill="url(#envSide)" />
            <path d={`M${W} 6 L${W / 2} ${FH} L${W} ${H}Z`} fill="url(#envSide)" />
            <path d={`M0 ${H} L${W / 2} ${FH - 8} L${W} ${H}Z`} fill="url(#envBottom)" />
            <path d={`M0 ${H} L${W / 2} ${FH - 8} L${W} ${H}`} fill="none" stroke="#D8B574" strokeOpacity=".5" strokeWidth="1.500" />
            <rect x="0.750" y="0.750" width={W - 1.5} height={H - 1.5} rx="12" fill="none" stroke="#D8B574" strokeOpacity=".45" />
          </motion.svg>
          <motion.div className="pointer-events-none absolute" style={{ left: 8, bottom: 6, zIndex: 5 }} animate={fall} transition={fallT}>
            <FlowerSprig size={64} className="-rotate-12" />
          </motion.div>
          <motion.div className="pointer-events-none absolute" style={{ right: 8, bottom: 6, zIndex: 5 }} animate={fall} transition={fallT}>
            <FlowerSprig size={56} tone="lavender" className="rotate-12" />
          </motion.div>

          {/* outer face of the flap: folds up and disappears */}
          <motion.div
            className="absolute left-0 top-0"
            style={{
              width: W,
              height: FH,
              zIndex: 6,
              transformOrigin: '50% 0%',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: 'linear-gradient(180deg,#FCEFD6,#F0D6A6)',
              filter: 'drop-shadow(0 3px 2px rgba(89,65,60,.2))',
            }}
            initial={false}
            animate={{ scaleY: open ? 0 : 1, ...(unfolded ? { opacity: 0 } : { opacity: 1 }) }}
            transition={{ scaleY: { duration: 0.42, ease: 'easeIn' }, opacity: fallT }}
          />

          {/* ribbon + seal */}
          <motion.div
            className="pointer-events-none absolute"
            style={{ left: W / 2 - 52, top: FH - 54, width: 104, height: 104, zIndex: 7 }}
            initial={false}
            animate={at(phase, 'sealGone') ? { opacity: 0, scale: 1.7, y: -26, rotate: 14 } : { opacity: 1, scale: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <svg viewBox="0 0 104 104" width="104" height="104" aria-hidden="true">
              <path d="M52 56C34 60 20 80 18 98c14-2 24-10 34-28z" fill="#B9A0E3" />
              <path d="M52 56C70 60 84 80 86 98c-14-2-24-10-34-28z" fill="#C9B3EE" />
              <path d="M52 52C30 28 14 40 22 54c8 12 22 4 30-2z" fill="#C9B3EE" />
              <path d="M52 52C74 28 90 40 82 54c-8 12-22 4-30-2z" fill="#B9A0E3" />
              <circle cx="52" cy="54" r="12" fill="#A58CD6" />
              <circle cx="52" cy="56" r="17" fill="#B8456C" />
              <path d="M52 66C43 60 40 56 40 52c0-3 2-5 5-5 3 0 5 1.500 7 4 2-2.500 4-4 7-4 3 0 5 2 5 5 0 4-3 8-12 14z" fill="#E97A9C" />
              <path d="M44 50q3-3 6-1" stroke="#fff" strokeOpacity=".6" strokeWidth="1.600" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* sparkle burst when the seal breaks */}
          {at(phase, 'sealGone') && !open && <SealBurst />}
        </motion.div>

        {at(phase, 'message') && <Rewards />}
        {phase === 'closed' && (
          <>
            <Sparkle size={18} className="anim-twinkle absolute -left-3 top-0" />
            <Sparkle size={13} color="#E88AA6" className="anim-twinkle absolute -right-2 top-1" />
            <Sparkle size={11} className="anim-twinkle absolute right-10 -top-4" />
          </>
        )}
      </div>
    </div>
  )
}

function SealBurst() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute" style={{ left: W / 2, top: FH, zIndex: 8 }}>
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2
        return (
          <motion.span
            key={i}
            className="absolute"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
            animate={{ x: Math.cos(a) * 80, y: Math.sin(a) * 60 - 10, opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {i % 2 ? <Heart size={14} color="#E88AA6" /> : <Sparkle size={14} />}
          </motion.span>
        )
      })}
    </div>
  )
}

function Rewards() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute z-10" style={{ left: 0, top: -80, width: W, height: H + 80 }}>
      {Array.from({ length: 16 }, (_, i) => {
        const x = ((i * 53) % 100) / 100
        return (
          <motion.span
            key={i}
            className="absolute"
            style={{ left: `${x * 100}%`, top: '80%' }}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], y: [-10, -170 - (i % 4) * 30], x: [(i % 2 ? 1 : -1) * 6, (i % 2 ? 1 : -1) * 34], scale: 1, rotate: (i % 2 ? 1 : -1) * 40 }}
            transition={{ duration: 3 + (i % 3) * 0.4, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
          >
            {i % 3 === 0 ? <Flower size={18} color="#F9C6D3" /> : <Heart size={14 + (i % 3) * 4} color={i % 2 ? '#E88AA6' : '#D8C5F2'} />}
          </motion.span>
        )
      })}
    </div>
  )
}
