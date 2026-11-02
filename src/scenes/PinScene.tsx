import { motion } from 'framer-motion'
import AmbientBackground from '../components/AmbientBackground'
import { Envelope, Sparkle } from '../components/Decor'
import PinGate from '../components/PinGate'
import { PIN_COPY } from '../data/birthdayMessages'

export default function PinScene({ onUnlock }: { onUnlock: () => void }) {
  return (
    <section className="scene" aria-labelledby="pin-title">
      <AmbientBackground hearts={12} stars={14} />
      <div className="content relative z-10 gap-1 pt-8">
        <motion.div
          className="relative mb-2"
          initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 12 }}
        >
          <div className="anim-glow absolute inset-0 -m-3 rounded-full bg-gold/30 blur-xl" aria-hidden="true" />
          <Envelope size={64} className="anim-bounce relative" />
          <Sparkle size={16} className="anim-twinkle absolute -right-4 -top-2" />
          <Sparkle size={11} color="#E88AA6" className="anim-twinkle absolute -left-5 top-4" />
        </motion.div>
        <motion.h1
          id="pin-title"
          className="h-title"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          {PIN_COPY.title}
        </motion.h1>
        <motion.p
          className="body-soft mb-3 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {PIN_COPY.subtitle}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }} className="w-full flex justify-center">
          <PinGate onUnlock={onUnlock} />
        </motion.div>
      </div>
    </section>
  )
}
