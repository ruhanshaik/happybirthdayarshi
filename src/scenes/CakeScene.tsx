import { AnimatePresence, motion } from 'framer-motion'
import { Scissors } from 'lucide-react'
import { useState } from 'react'
import AmbientBackground from '../components/AmbientBackground'
import AnimatedButton from '../components/AnimatedButton'
import AnimatedTeddyBear from '../components/AnimatedTeddyBear'
import CakeCutInteraction from '../components/CakeCutInteraction'
import { Sparkle } from '../components/Decor'
import WishSequence from '../components/WishSequence'
import { CAKE_COPY } from '../data/birthdayMessages'
import { chime } from '../hooks/audio'

type Phase = 'ready' | 'cutting' | 'cut' | 'wish'

export default function CakeScene({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('ready')
  const [trigger, setTrigger] = useState(0)
  const cut = phase === 'cut' || phase === 'wish'

  const startCut = () => {
    if (phase !== 'ready') return
    setPhase('cutting')
    setTrigger((n) => n + 1)
  }

  return (
    <section className="scene" aria-labelledby="cake-title" style={{ background: 'radial-gradient(90% 60% at 50% 40%, #FFF3C9 0%, #FBE8D4 55%, #F3DCCB 100%)' }}>
      <AmbientBackground className="!bg-transparent" hearts={6} stars={8} seed={51} />

      <div className="content relative z-10 gap-1 pt-6">
        <AnimatePresence mode="wait" initial={false}>
          {!cut ? (
            <motion.div key="t1" className="flex flex-col items-center text-center" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <p className="h-script">{CAKE_COPY.script}</p>
              <h1 id="cake-title" className="h-title mt-1 max-w-[360px]">
                {CAKE_COPY.title}
              </h1>
              <p className="body-soft mt-2 max-w-[300px]">{CAKE_COPY.hint}</p>
            </motion.div>
          ) : (
            <motion.div key="t2" className="flex flex-col items-center text-center" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <p className="h-script">{CAKE_COPY.doneScript} ✨</p>
              <h1 id="cake-title" className="h-title mt-1">
                {CAKE_COPY.done}
              </h1>
              <p className="body-soft mt-2">{CAKE_COPY.doneSub}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative mt-4 flex w-full max-w-[420px] items-end justify-center gap-1">
          <div className="w-[26%] max-w-[110px]">
            <AnimatedTeddyBear pose={cut ? 'celebrate' : 'wave'} hat label="A teddy bear in a party hat" />
          </div>
          <div className="w-[70%] max-w-[320px]">
            <CakeCutInteraction
              cut={cut}
              trigger={trigger}
              onCut={() => {
                setPhase('cut')
                chime('success')
              }}
            />
          </div>
          <Sparkle size={22} className="anim-twinkle absolute right-2 top-0" />
        </div>

        <div className="mt-5 flex min-h-[56px] items-center">
          {phase === 'ready' && (
            <AnimatedButton onClick={startCut} icon={<Scissors size={18} aria-hidden="true" />} pulse>
              {CAKE_COPY.cutCta}
            </AnimatedButton>
          )}
          {phase === 'cut' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }}>
              <AnimatedButton onClick={() => setPhase('wish')} pulse>
                {CAKE_COPY.wishCta} 🌙
              </AnimatedButton>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>{phase === 'wish' && <WishSequence onContinue={onDone} />}</AnimatePresence>
    </section>
  )
}
