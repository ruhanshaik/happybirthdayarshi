import { motion } from 'framer-motion'
import { ENVELOPE_COPY } from '../data/birthdayMessages'
import { Heart } from './Decor'

/** The paper itself. `folded` shows a crease; the message appears once fully unfolded. */
export default function LoveLetter({ folded, messageVisible }: { folded: boolean; messageVisible: boolean }) {
  const [l1, l2, l3] = ENVELOPE_COPY.letter
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-[#FFFDF6] shadow-[0_6px_18px_rgba(89,65,60,.2)]">
      <div className="absolute inset-0 opacity-70" style={{ background: 'repeating-linear-gradient(0deg, transparent 0 27px, rgba(216,181,116,.18) 27px 28px)' }} />
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blush via-lavender to-blush" />
      <motion.div
        className="absolute inset-x-0 top-1/2 h-6 -translate-y-1/2"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0), rgba(120,90,60,.22), rgba(255,255,255,.5), rgba(0,0,0,0))' }}
        animate={{ opacity: folded ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      />
      <motion.div
        className="relative flex h-full flex-col items-center justify-center gap-1 px-5 text-center"
        initial={false}
        animate={{ opacity: messageVisible ? 1 : 0, y: messageVisible ? 0 : 10 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <Heart size={24} color="#E56B91" />
        <p className="font-serif text-[1.4rem] leading-tight text-charcoal">{l1}</p>
        <p className="mt-4 font-hand text-[1.55rem] leading-none text-plum">{l2}</p>
        <p className="font-hand text-[2.3rem] font-bold leading-none text-rose">{l3}</p>
      </motion.div>
    </div>
  )
}
