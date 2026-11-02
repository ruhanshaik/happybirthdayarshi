import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import AnimatedButton from '../components/AnimatedButton'
import AnimatedTeddyBear from '../components/AnimatedTeddyBear'
import ConfettiBurst from '../components/ConfettiBurst'
import { GiftBox, Moon, Sparkle } from '../components/Decor'
import FallingPetals from '../components/FallingPetals'
import FloatingHearts from '../components/FloatingHearts'
import TwinklingStars from '../components/TwinklingStars'
import BirthdayCake from '../components/BirthdayCake'
import { FINALE_COPY } from '../data/birthdayMessages'
import { BIRTHDAY_DATE, RECIPIENT } from '../data/sceneConfig'

const E = [0.22, 1, 0.36, 1] as const

export default function FinalScene({ onReplay, onRevisit }: { onReplay: () => void; onRevisit: () => void }) {
  return (
    <section className="scene" aria-labelledby="final-title" style={{ background: 'linear-gradient(180deg,#1B1744 0%, #3F2D6E 45%, #8A4F86 80%, #D9829B 100%)' }}>
      <TwinklingStars count={60} seed={121} maxTop={80} shooting />
      <FallingPetals kind="petal" count={12} seed={122} />
      <FallingPetals kind="gold" count={18} seed={123} />
      <FallingPetals kind="confetti" count={10} seed={124} />
      <FloatingHearts count={8} seed={125} colors={['#F4B7C8', '#D8C5F2', '#F7D98B']} />
      <ConfettiBurst count={46} seed={126} spread={230} className="!items-start pt-[32%]" />

      <motion.div className="pointer-events-none absolute right-[8%] top-[4%]" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6 }}>
        <Moon size={78} className="anim-drift" />
      </motion.div>

      <div className="content relative z-10 pt-14">
        <motion.h1
          id="final-title"
          className="text-center font-serif text-moon"
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.3, duration: 1.2, ease: E }}
          style={{ fontSize: 'clamp(1.9rem,8.6vw,3.2rem)', lineHeight: 1.1 }}
        >
          {FINALE_COPY.headline}
          <span className="relative block italic text-blush" style={{ fontSize: 'clamp(3rem,16vw,5.4rem)', lineHeight: 1.02 }}>
            {RECIPIENT}!
            <Sparkle size={28} className="anim-twinkle absolute -right-7 -top-1" />
          </span>
        </motion.h1>

        <motion.p className="mt-4 max-w-[330px] text-center font-serif text-[clamp(1.1rem,4.8vw,1.4rem)] text-white" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 1 }}>
          {FINALE_COPY.line1}
        </motion.p>
        <motion.p className="mt-2 max-w-[330px] text-center text-[clamp(.95rem,3.8vw,1.1rem)] leading-relaxed text-lavender" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.7, duration: 1 }}>
          {FINALE_COPY.line2}
        </motion.p>
        <motion.p className="mt-2 max-w-[330px] text-center font-serif text-[clamp(1.05rem,4.4vw,1.25rem)] italic text-blush" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5, duration: 1 }}>
          {FINALE_COPY.line3}
        </motion.p>

        <motion.div className="mt-4" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.8, duration: 0.8, type: 'spring' }}>
          <span className="pill anim-glow !bg-white/90">
            <span className="h-2.5 w-2.5 rounded-full bg-[#7FCFAA] shadow-[0_0_8px_#7FCFAA]" aria-hidden="true" />
            {BIRTHDAY_DATE}
          </span>
        </motion.div>

        <motion.p
          className="mt-3 font-hand text-[clamp(2rem,9vw,2.8rem)] leading-none text-gold"
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ delay: 4.6, duration: 1.6, ease: 'easeInOut' }}
          aria-label={FINALE_COPY.signature}
        >
          {FINALE_COPY.signature}
        </motion.p>

        <motion.div className="relative mt-3 flex w-full max-w-[380px] items-end justify-center gap-2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 1.2 }} aria-hidden="true">
          <div className="w-[34%] max-w-[130px]">
            <AnimatedTeddyBear pose="gift" hat label="A teddy bear holding a gift" />
          </div>
          <div className="relative w-[44%] max-w-[190px]">
            <div className="absolute inset-0 -m-6 rounded-full bg-gold/30 blur-2xl" />
            <BirthdayCake flames className="relative h-auto w-full" />
          </div>
          <GiftBox size={52} className="anim-bounce -ml-1" />
        </motion.div>

        <motion.div className="mt-6 flex flex-col items-center gap-3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 5.4, duration: 0.9 }}>
          <AnimatedButton onClick={onReplay} icon={<RotateCcw size={17} aria-hidden="true" />} pulse>
            {FINALE_COPY.replay}
          </AnimatedButton>
          <button type="button" onClick={onRevisit} className="btn-pill btn-ghost !bg-white/15 !text-moon !border-white/30 !text-[.9rem]">
            <span className="relative z-[1]">{FINALE_COPY.revisit}</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
