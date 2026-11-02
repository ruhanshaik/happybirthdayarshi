import { motion } from 'framer-motion'
import { Delete, Heart as HeartIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { PIN_COPY } from '../data/birthdayMessages'
import { PIN_CODE } from '../data/sceneConfig'
import { chime } from '../hooks/audio'
import { useTimeouts } from '../hooks/useTimeouts'
import ConfettiBurst from './ConfettiBurst'
import AnimatedButton from './AnimatedButton'

type Status = 'idle' | 'wrong' | 'success'
const LEN = PIN_CODE.length

export default function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [digits, setDigits] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const { later } = useTimeouts()
  const locked = status !== 'idle'

  const addDigit = useCallback(
    (d: string) => {
      if (locked) return
      setMessage('')
      setDigits((v) => (v.length < LEN ? v + d : v))
    },
    [locked],
  )
  const backspace = useCallback(() => {
    if (locked) return
    setMessage('')
    setDigits((v) => v.slice(0, -1))
  }, [locked])
  const clear = useCallback(() => {
    if (locked) return
    setMessage('')
    setDigits('')
  }, [locked])

  const submit = useCallback(() => {
    if (locked) return
    if (digits.length < LEN) {
      setMessage(PIN_COPY.incomplete)
      return
    }
    if (digits === PIN_CODE) {
      setStatus('success')
      setMessage('')
      chime('success')
      later(onUnlock, 1300)
    } else {
      setStatus('wrong')
      setMessage(PIN_COPY.wrong)
      later(() => {
        setDigits('')
        setStatus('idle')
      }, 700)
    }
  }, [digits, locked, later, onUnlock])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const onButton = (e.target as HTMLElement | null)?.tagName === 'BUTTON'
      if (/^[0-9]$/.test(e.key)) addDigit(e.key)
      else if (e.key === 'Backspace') backspace()
      else if (e.key === 'Delete' || e.key === 'Escape') clear()
      else if (e.key === 'Enter' && !onButton) submit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [addDigit, backspace, clear, submit])

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const keyCls =
    'grid place-items-center rounded-full bg-white/80 text-plum font-serif text-2xl font-medium shadow-[0_4px_12px_rgba(118,83,111,.15)] border border-blush/50 active:bg-blush/40 disabled:opacity-50 h-[clamp(48px,7.4svh,62px)] w-[clamp(54px,17vw,68px)]'

  return (
    <div className="relative flex w-full max-w-[340px] flex-col items-center">
      <motion.div
        role="group"
        aria-label="Secret code"
        className="relative flex gap-3"
        animate={status === 'wrong' ? { x: [0, -12, 12, -9, 9, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {Array.from({ length: LEN }).map((_, i) => {
          const filled = i < digits.length
          return (
            <motion.div
              key={i}
              aria-label={`Digit ${i + 1}, ${filled ? 'filled' : 'empty'}`}
              className={`grid h-[clamp(56px,16vw,68px)] w-[clamp(46px,14vw,58px)] place-items-center rounded-2xl border-2 bg-white/85 font-serif text-3xl text-plum shadow-md ${
                status === 'wrong' ? 'border-rose bg-rose/10' : status === 'success' ? 'border-gold' : filled ? 'border-rose' : 'border-blush/70'
              }`}
              animate={
                status === 'success'
                  ? { y: [0, -10, 0], scale: [1, 1.12, 1], boxShadow: '0 0 22px rgba(216,181,116,.8)' }
                  : { scale: filled ? [1, 1.12, 1] : 1, y: 0 }
              }
              transition={{ duration: 0.4, delay: status === 'success' ? i * 0.1 : 0 }}
            >
              {filled ? <span aria-hidden="true">{digits[i]}</span> : <span aria-hidden="true" className="text-blush">·</span>}
            </motion.div>
          )
        })}
        {status === 'success' && <ConfettiBurst count={26} spread={130} />}
      </motion.div>

      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-[2.6em] text-center text-[0.95rem] font-medium ${status === 'wrong' ? 'text-rose' : 'text-plum'}`}
      >
        {status === 'success' ? 'Unlocked. Come in, my love ♡' : message}
      </p>

      <div className="mt-1 grid grid-cols-3 gap-x-[clamp(10px,3vw,16px)] gap-y-[clamp(8px,1.8svh,14px)]" role="group" aria-label="Number keypad">
        {keys.map((k) => (
          <motion.button key={k} type="button" whileTap={{ scale: 0.88 }} className={keyCls} onClick={() => addDigit(k)} aria-label={k}>
            {k}
          </motion.button>
        ))}
        <motion.button type="button" whileTap={{ scale: 0.88 }} className={`${keyCls} !text-base !font-sans !font-bold`} onClick={clear} aria-label="Clear all digits">
          Clear
        </motion.button>
        <motion.button type="button" whileTap={{ scale: 0.88 }} className={keyCls} onClick={() => addDigit('0')} aria-label="0">
          0
        </motion.button>
        <motion.button type="button" whileTap={{ scale: 0.88 }} className={keyCls} onClick={backspace} aria-label="Backspace">
          <Delete size={22} aria-hidden="true" />
        </motion.button>
      </div>

      <div className="mt-[clamp(10px,2svh,18px)]">
        <AnimatedButton onClick={submit} disabled={locked} icon={<HeartIcon size={18} fill="currentColor" aria-hidden="true" />} ariaLabel="Unlock the surprise">
          Unlock
        </AnimatedButton>
      </div>
    </div>
  )
}
