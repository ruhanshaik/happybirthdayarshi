import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import LightSwitch from '../components/LightSwitch'
import MagicalRoom from '../components/MagicalRoom'
import { ROOM_COPY } from '../data/birthdayMessages'
import { TIMING } from '../data/sceneConfig'
import { chime } from '../hooks/audio'
import { useTimeouts } from '../hooks/useTimeouts'

export default function RoomScene({ onDone }: { onDone: () => void }) {
  const [lit, setLit] = useState(false)
  const [magic, setMagic] = useState(false)
  const used = useRef(false)
  const { later } = useTimeouts()

  const turnOn = useCallback(() => {
    if (used.current) return
    used.current = true
    setLit(true)
    chime('success')
    later(() => setMagic(true), 3000)
    later(onDone, 3000 + TIMING.roomAfterLight)
  }, [later, onDone])

  return (
    <section className="absolute inset-0 overflow-hidden" aria-labelledby="room-title">
      <MagicalRoom lit={lit} />
      <LightSwitch on={lit} onToggle={turnOn} />

      <div className="pointer-events-none absolute inset-x-0 z-20 flex justify-center px-4" style={{ top: 'calc(env(safe-area-inset-top, 0px) + 84px)' }}>
        <motion.div
          className="pointer-events-auto flex max-w-[360px] flex-col items-center rounded-3xl px-5 py-4 text-center backdrop-blur-[3px]"
          animate={{
            backgroundColor: lit ? 'rgba(255,249,242,.82)' : 'rgba(18,14,48,.45)',
            boxShadow: lit ? '0 10px 30px rgba(89,65,60,.18)' : '0 10px 30px rgba(0,0,0,.3)',
          }}
          transition={{ duration: 1.6 }}
        >
          <AnimatePresence mode="wait">
            {!magic ? (
              <motion.div key="a" exit={{ opacity: 0, y: -8 }} className="flex flex-col items-center">
                <h1
                  id="room-title"
                  className="font-serif text-[clamp(1.45rem,6.4vw,2.2rem)] leading-tight transition-colors duration-[1600ms]"
                  style={{ color: lit ? '#29252A' : '#FFF0C9' }}
                >
                  {ROOM_COPY.title}
                </h1>
                <p className="mt-1 text-[clamp(.88rem,3.4vw,1.02rem)] transition-colors duration-[1600ms]" style={{ color: lit ? '#76536F' : 'rgba(255,240,201,.82)' }}>
                  {ROOM_COPY.subtitle}
                </p>
                {!lit && (
                  <motion.button
                    type="button"
                    onClick={turnOn}
                    className="btn-pill btn-gold anim-glow mt-3"
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <span className="relative z-[1]">{ROOM_COPY.switchLabel} ✨</span>
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <motion.p
                key="b"
                role="status"
                className="font-serif text-[clamp(1.4rem,6vw,2rem)] italic text-plum"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                {ROOM_COPY.after}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
