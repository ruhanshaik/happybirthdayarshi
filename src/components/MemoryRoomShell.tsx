import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import AnimatedButton from './AnimatedButton'
import { MEMORY_COPY } from '../data/birthdayMessages'

type Props = {
  title: string
  message: string
  background: string
  /** ambient layer (petals, stars, leaves…) */
  ambient?: ReactNode
  /** the illustrated scene */
  children: ReactNode
  onBack: () => void
  tone?: 'light' | 'dark'
  paper?: string
  buttonVariant?: 'pink' | 'cocoa' | 'lavender'
  script: string
}

const MASK = 'radial-gradient(ellipse 74% 72% at 50% 52%, #000 58%, transparent 100%)'

export default function MemoryRoomShell({ title, message, background, ambient, children, onBack, tone = 'light', paper = '#FFFDF8', buttonVariant = 'pink', script }: Props) {
  const dark = tone === 'dark'
  return (
    <section className="scene" aria-labelledby="room-title" style={{ background }}>
      {ambient}
      <div className="content relative z-10 gap-3 pt-10">
        <motion.p className="h-script" style={{ color: dark ? '#F7D98B' : undefined }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {script}
        </motion.p>
        <motion.h1
          id="room-title"
          className="h-title !text-[clamp(1.7rem,7.4vw,2.6rem)]"
          style={{ color: dark ? '#FFF0C9' : undefined }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {title}
        </motion.h1>

        <motion.div
          className="relative w-full max-w-[min(440px,100%)]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.9, type: 'spring', stiffness: 80, damping: 13 }}
          style={{ aspectRatio: '4 / 3', WebkitMaskImage: MASK, maskImage: MASK }}
        >
          {children}
        </motion.div>

        <motion.p
          className="rounded-3xl px-5 py-4 text-center font-serif text-[clamp(1.05rem,4.4vw,1.3rem)] italic leading-snug shadow-lg"
          style={{ background: paper, color: '#59413C', maxWidth: 380 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
        >
          “{message}”
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mt-1">
          <AnimatedButton onClick={onBack} variant={buttonVariant} icon={undefined}>
            <ArrowLeft size={18} aria-hidden="true" />
            {MEMORY_COPY.back}
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  )
}
