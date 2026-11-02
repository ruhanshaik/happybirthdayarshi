import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Kind = 'fade' | 'rise' | 'iris'

const VARIANTS: Record<Kind, Variants> = {
  fade: {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, filter: 'blur(8px)', transition: { duration: 0.4, ease: 'easeIn' } },
  },
  rise: {
    initial: { opacity: 0, y: 36, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -28, scale: 0.99, transition: { duration: 0.4, ease: 'easeIn' } },
  },
  iris: {
    initial: { opacity: 0, scale: 1.08, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.96, filter: 'blur(10px)', transition: { duration: 0.45, ease: 'easeIn' } },
  },
}

export default function SceneTransition({ children, kind = 'fade' }: { children: ReactNode; kind?: Kind }) {
  return (
    <motion.div
      className="absolute inset-0"
      variants={VARIANTS[kind]}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
