import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import AmbientBackground from '../components/AmbientBackground'
import AnimatedEnvelope, { type EnvelopePhase } from '../components/AnimatedEnvelope'
import FallingPetals from '../components/FallingPetals'
import { ENVELOPE_COPY } from '../data/birthdayMessages'
import { TIMING } from '../data/sceneConfig'
import { chime } from '../hooks/audio'
import { useTimeouts } from '../hooks/useTimeouts'

export default function EnvelopeScene({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<EnvelopePhase>('closed')
  const started = useRef(false)
  const { later } = useTimeouts()

  const open = useCallback(() => {
    if (started.current) return // prevents repeated clicks from queueing multiple sequences
    started.current = true
    chime('soft')
    setPhase('pressed')
    later(() => setPhase('sealGone'), 450)
    later(() => setPhase('flapOpen'), 1100)
    later(() => setPhase('letterUp'), 2100)
    later(() => setPhase('unfolded'), 3300)
    later(() => {
      setPhase('message')
      chime('success')
    }, 4500)
    // message fade-in takes ~0.9s, then it stays readable for ~3s
    later(onDone, 4500 + 900 + TIMING.envelopeHold)
  }, [later, onDone])

  const intro = phase === 'closed' || phase === 'pressed' || phase === 'sealGone'

  return (
    <section className="scene" aria-labelledby="env-title">
      <AmbientBackground hearts={9} stars={12} seed={21} />
      <FallingPetals kind="petal" count={8} seed={4} />
      <div className="content relative z-10 gap-5">
        <motion.div
          className="flex flex-col items-center"
          animate={{ opacity: intro ? 1 : 0, y: intro ? 0 : -12 }}
          transition={{ duration: 0.5 }}
          aria-hidden={!intro}
        >
          <p className="h-script">{ENVELOPE_COPY.script}</p>
          <h1 id="env-title" className="h-title mt-1">
            {ENVELOPE_COPY.title}
          </h1>
          <p className="body-soft mt-2">{ENVELOPE_COPY.subtitle}</p>
        </motion.div>

        <div className="relative mt-4" style={{ marginTop: intro ? '1rem' : '8rem', transition: 'margin .8s ease' }}>
          <AnimatedEnvelope phase={phase} onOpen={open} />
        </div>

        <AnimatePresence>
          {phase === 'closed' && (
            <motion.button
              type="button"
              onClick={open}
              className="btn-pill anim-glow mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.8 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-[1]">{ENVELOPE_COPY.tapHint} ♡</span>
            </motion.button>
          )}
        </AnimatePresence>
        <span className="sr-only" role="status" aria-live="polite">
          {phase === 'message' ? ENVELOPE_COPY.letter.join(' ') : ''}
        </span>
      </div>
    </section>
  )
}
