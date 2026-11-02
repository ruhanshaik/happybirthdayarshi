import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  title: string
  caption: string
  art: ReactNode
  tilt?: number
  tape?: string
  delay?: number
  onOpen: () => void
}

/** A scrapbook card. A real button so keyboard + touch + mouse all work. */
export default function MemoryCard({ title, caption, art, tilt = 0, tape = '#D8C5F2', delay = 0, onOpen }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="paper-card group relative flex w-full items-center gap-3 p-3 text-left"
      style={{ rotate: tilt, borderRadius: 22 }}
      initial={{ opacity: 0, y: 40, rotate: tilt * 3 }}
      animate={{ opacity: 1, y: 0, rotate: tilt }}
      transition={{ delay, duration: 0.8, type: 'spring', stiffness: 90, damping: 14 }}
      whileHover={{ y: -4, rotate: 0, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`${title}. Open this memory room.`}
    >
      <span className="tape -top-2 left-8" style={{ rotate: '-6deg', background: `repeating-linear-gradient(135deg, ${tape} 0 6px, rgba(255,255,255,.7) 6px 12px)` }} aria-hidden="true" />
      <span className="block h-[clamp(78px,12svh,104px)] w-[clamp(92px,28vw,124px)] shrink-0 overflow-hidden rounded-xl shadow-inner">{art}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-hand text-[1.2rem] leading-none text-rose">{caption}</span>
        <span className="mt-1 block font-serif text-[clamp(1.05rem,4.4vw,1.35rem)] font-medium leading-tight text-charcoal">{title}</span>
        <span className="mt-1 inline-block text-[.82rem] font-bold text-plum underline decoration-blush decoration-2 underline-offset-4">Open →</span>
      </span>
    </motion.button>
  )
}
