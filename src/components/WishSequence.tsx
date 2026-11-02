import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CAKE_COPY } from '../data/birthdayMessages'
import { TIMING } from '../data/sceneConfig'
import { useTimeouts } from '../hooks/useTimeouts'
import AnimatedButton from './AnimatedButton'
import AnimatedTeddyBear from './AnimatedTeddyBear'
import BirthdayCake from './BirthdayCake'
import { Moon, Sparkle } from './Decor'
import TwinklingStars from './TwinklingStars'
import { ArrowRight } from 'lucide-react'

type Props = { onContinue: () => void }

/** Dimmed environment, glowing candles, bear with closed eyes, then "wish is on its way". */
export default function WishSequence({ onContinue }: Props) {
  const [sent, setSent] = useState(false)
  const { later } = useTimeouts()

  useEffect(() => {
    // After a comfortable pause the text changes. Nothing auto-advances the scene.
    later(() => setSent(true), TIMING.wishPause)
  }, [later])

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-y-auto px-4 py-6"
      style={{ background: 'radial-gradient(90% 70% at 50% 62%, #4a2f58 0%, #1d1840 55%, #0b0a26 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      role="dialog"
      aria-label="Make a wish"
    >
      <TwinklingStars count={46} seed={44} maxTop={75} shooting />
      <motion.div className="absolute right-[10%] top-[6%]" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2 }}>
        <Moon size={72} className="anim-drift" />
      </motion.div>

      <div className="relative z-10 mt-auto flex w-full max-w-[420px] flex-col items-center">
        <div className="flex w-full items-end justify-center gap-2" style={{ minHeight: 0 }}>
          <div className="w-[30%] max-w-[120px]">
            <AnimatedTeddyBear pose="idle" hat eyes="closed" label="A teddy bear with closed eyes, making a wish" />
          </div>
          <div className="w-[60%] max-w-[260px]">
            <BirthdayCake split flames glow className="h-auto w-full" />
          </div>
        </div>

        <div className="mt-5 min-h-[7.5rem] text-center" role="status" aria-live="polite">
          {!sent ? (
            <motion.div key="close" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }}>
              <h2 className="font-serif text-[clamp(1.6rem,7vw,2.4rem)] leading-tight text-moon">{CAKE_COPY.closeEyes}</h2>
              <p className="mt-2 text-[clamp(.9rem,3.6vw,1.05rem)] text-lavender">{CAKE_COPY.closeEyesSub}</p>
              <motion.button
                type="button"
                className="btn-pill btn-ghost mt-4 !bg-white/15 !text-moon !border-white/25"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4 }}
                onClick={() => setSent(true)}
              >
                {CAKE_COPY.skip} ✨
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <h2 className="font-serif text-[clamp(1.6rem,7vw,2.4rem)] leading-tight text-moon">{CAKE_COPY.onItsWay}</h2>
              <div className="mt-5 flex justify-center">
                <AnimatedButton onClick={onContinue} icon={<ArrowRight size={18} aria-hidden="true" />} pulse>
                  {CAKE_COPY.memoriesCta}
                </AnimatedButton>
              </div>
            </motion.div>
          )}
        </div>
        <Sparkle size={14} className="anim-twinkle absolute -top-3 right-6" />
      </div>
      <div className="mb-auto" />
    </motion.div>
  )
}
