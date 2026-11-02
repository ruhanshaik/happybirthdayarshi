import { motion } from 'framer-motion'

type Props = { on: boolean; onToggle: () => void }

/** A wall light switch placed in the upper corner. */
export default function LightSwitch({ on, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={on ? 'Lights are on' : 'Turn on the lights'}
      className="absolute right-3 z-30 grid place-items-center"
      style={{ top: 'calc(env(safe-area-inset-top, 0px) + 10px)', width: 56, height: 80 }}
    >
      <span
        className={`relative block rounded-[14px] border-2 ${on ? 'border-gold bg-[#FFF6E0]' : 'border-white/25 bg-[#3a3260]'} shadow-lg transition-colors duration-700`}
        style={{ width: 44, height: 68 }}
      >
        {!on && <span className="anim-glow absolute inset-0 rounded-[14px]" aria-hidden="true" />}
        <motion.span
          className={`absolute left-1/2 top-1/2 block h-8 w-5 -translate-x-1/2 rounded-md ${on ? 'bg-gold' : 'bg-[#8d83c4]'}`}
          style={{ transformOrigin: '50% 50%' }}
          animate={{ y: on ? -14 : 8, rotateX: on ? -25 : 25 }}
          transition={{ type: 'spring', stiffness: 380, damping: 16 }}
        />
        <span className={`absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rounded-full ${on ? 'bg-gold' : 'bg-white/30'}`} aria-hidden="true" />
        <span className={`absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${on ? 'bg-gold/40' : 'bg-white/30'}`} aria-hidden="true" />
      </span>
    </button>
  )
}
