import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AnimatedButton from '../components/AnimatedButton'
import AnimatedTeddyBear from '../components/AnimatedTeddyBear'
import ConfettiBurst from '../components/ConfettiBurst'
import { Balloons, Bunting, Flower, FlowerSprig, GiftBox, Sparkle } from '../components/Decor'
import FallingPetals from '../components/FallingPetals'
import FloatingHearts from '../components/FloatingHearts'
import TwinklingStars from '../components/TwinklingStars'
import { BIRTHDAY_COPY } from '../data/birthdayMessages'
import { BIRTHDAY_DATE, RECIPIENT } from '../data/sceneConfig'

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.28, delayChildren: 0.35 } },
}
const rise: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export default function BirthdayScene({ onNext }: { onNext: () => void }) {
  return (
    <section className="scene" aria-labelledby="bday-title" style={{ background: 'repeating-linear-gradient(90deg,#FBF1D6 0 34px,#E7E1F6 34px 68px)' }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(90% 60% at 50% 30%, rgba(255,255,255,.75), transparent 70%), radial-gradient(80% 50% at 50% 100%, rgba(244,183,200,.5), transparent 70%)' }} aria-hidden="true" />
      <FloatingHearts count={8} seed={31} />
      <TwinklingStars count={14} seed={8} color="#F2C46B" maxTop={60} />
      <FallingPetals kind="confetti" count={14} seed={2} />
      <ConfettiBurst count={44} seed={9} spread={220} className="!items-start pt-[28%]" />

      <motion.div className="pointer-events-none absolute inset-x-0 top-0" initial={{ y: -70 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 70, damping: 11, delay: 0.1 }} aria-hidden="true">
        <Bunting />
      </motion.div>

      <motion.div className="content relative z-10 pt-14" variants={stagger} initial="hidden" animate="show">
        <motion.p variants={rise} className="h-script">
          {BIRTHDAY_COPY.script}
        </motion.p>
        <motion.h1 id="bday-title" variants={rise} className="h-title mt-1">
          {BIRTHDAY_COPY.headline}
          <span className="relative mt-1 block font-serif italic text-rose" style={{ fontSize: 'clamp(2.8rem,15vw,5rem)', lineHeight: 1 }}>
            {RECIPIENT}!
            <Sparkle size={26} className="anim-twinkle absolute -right-6 -top-2" />
            <span className="absolute inset-x-2 bottom-0 -z-10 h-3 rounded-full bg-[#FFE79A]/80" aria-hidden="true" />
          </span>
        </motion.h1>
        <motion.div variants={rise} className="mt-4">
          <span className="pill anim-glow">
            <span className="h-2.5 w-2.5 rounded-full bg-[#7FCFAA] shadow-[0_0_8px_#7FCFAA]" aria-hidden="true" />
            {BIRTHDAY_DATE}
          </span>
        </motion.div>
        <motion.p variants={rise} className="body-soft mt-4 max-w-[330px]">
          {BIRTHDAY_COPY.support}
        </motion.p>
        <motion.div variants={rise} className="mt-5">
          <AnimatedButton onClick={onNext} icon={<ArrowRight size={18} aria-hidden="true" />} pulse>
            {BIRTHDAY_COPY.cta}
          </AnimatedButton>
        </motion.div>

        {/* illustration row: in-flow, so it can never cover the text or the button */}
        <motion.div variants={rise} className="relative mt-5 flex w-full max-w-[420px] items-end justify-center gap-1" aria-hidden="true">
          <Balloons size={clampPx(86)} className="anim-sway -mr-3" />
          <div className="relative z-[1] w-[34vw] max-w-[150px]">
            <AnimatedTeddyBear pose="wave" hat label="A happy teddy bear in a party hat" />
          </div>
          <div className="relative -ml-3 flex flex-col items-center">
            <FlowerSprig size={58} className="-mb-3" />
            <GiftBox size={clampPx(76)} className="anim-bounce" />
          </div>
          <Flower size={26} className="anim-twinkle absolute left-2 top-0" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function clampPx(n: number) {
  return Math.max(60, Math.min(n, 120))
}
