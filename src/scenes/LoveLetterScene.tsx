import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AmbientBackground from '../components/AmbientBackground'
import AnimatedButton from '../components/AnimatedButton'
import AnimatedTeddyBear from '../components/AnimatedTeddyBear'
import { FlowerSprig, Heart } from '../components/Decor'
import { LETTERS_COPY, LOVE_LETTERS } from '../data/birthdayMessages'

const TAPES = ['#F4B7C8', '#D8C5F2', '#B7D4A0', '#F7D98B', '#F4B7C8']

export default function LoveLetterScene({ onNext }: { onNext: () => void }) {
  return (
    <section className="scene" aria-labelledby="letters-title">
      <AmbientBackground hearts={9} stars={10} seed={101} />
      <FlowerSprig size={74} className="pointer-events-none absolute -left-4 top-28 rotate-[20deg] opacity-70" />
      <FlowerSprig size={64} tone="lavender" className="pointer-events-none absolute -right-4 top-[46%] -rotate-[20deg] opacity-70" />

      <div className="relative z-10 mx-auto flex w-full max-w-[440px] flex-col items-center gap-5 pb-6 pt-10">
        <motion.div className="flex flex-col items-center text-center" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="w-[96px]">
            <AnimatedTeddyBear pose="letter" label="A teddy bear holding a love letter" />
          </div>
          <h1 id="letters-title" className="h-title mt-2 !text-[clamp(1.7rem,7.6vw,2.6rem)]">
            {LETTERS_COPY.title}
          </h1>
          <p className="body-soft mt-1">{LETTERS_COPY.subtitle}</p>
        </motion.div>

        <ol className="flex w-full list-none flex-col gap-6 p-0">
          {LOVE_LETTERS.map((l, i) => (
            <motion.li
              key={l.id}
              className="paper-card relative px-6 pb-6 pt-7"
              style={{ rotate: i % 2 ? 0.8 : -0.8 }}
              initial={{ opacity: 0, y: 46, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: i === 0 ? 0.4 : 0 }}
            >
              <span className="tape -top-2.5 left-1/2 -translate-x-1/2" style={{ background: `repeating-linear-gradient(135deg, ${TAPES[i]} 0 6px, rgba(255,255,255,.7) 6px 12px)` }} aria-hidden="true" />
              <span className="absolute -left-2 -top-3 grid h-9 w-9 place-items-center rounded-full bg-rose font-hand text-xl font-bold text-white shadow-md" aria-hidden="true">
                {l.id}
              </span>
              <p className="font-serif text-[clamp(1.02rem,4.2vw,1.2rem)] leading-[1.65] text-charcoal">{l.text}</p>
              <div className="mt-3 flex items-center justify-end gap-2 text-rose">
                <span className="font-hand text-[1.35rem]">Raja</span>
                <Heart size={16} color="#E56B91" />
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-2">
          <AnimatedButton onClick={onNext} icon={<ArrowRight size={18} aria-hidden="true" />} pulse>
            {LETTERS_COPY.cta}
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  )
}
