import { Volume2, VolumeX } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { setChimesEnabled } from '../hooks/audio'

export default function SoundToggle() {
  const [on, setOn] = useState(true)
  const [error, setError] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const desiredOnRef = useRef(on)
  desiredOnRef.current = on

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      await audio.play()
      setError('')
    } catch (reason) {
      if (reason instanceof DOMException && reason.name === 'NotAllowedError') {
        setError('')
      } else {
        setError('Background music could not be played.')
      }
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const resumeAfterInteraction = (event: PointerEvent | KeyboardEvent) => {
      if (!desiredOnRef.current || (event.target instanceof Node && buttonRef.current?.contains(event.target))) return
      if (audio.paused) void play()
    }
    const handlePlay = () => {
      setOn(true)
      setChimesEnabled(true)
    }
    const handlePause = () => {
      setOn(false)
      setChimesEnabled(false)
    }
    const handleError = () => setError('Background music could not be loaded.')

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)
    window.addEventListener('pointerdown', resumeAfterInteraction)
    window.addEventListener('keydown', resumeAfterInteraction)
    void play()

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('error', handleError)
      window.removeEventListener('pointerdown', resumeAfterInteraction)
      window.removeEventListener('keydown', resumeAfterInteraction)
      audio.pause()
      setChimesEnabled(false)
    }
  }, [play])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (on) {
      audio.pause()
      setOn(false)
    }
    else void play()
  }

  return (
    <>
      <audio ref={audioRef} src="/birthday-instrumental.mp3" loop preload="auto" />
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? 'Mute music' : 'Play background music'}
        title={error || (on ? 'Mute music' : 'Play background music')}
        className="fixed left-3 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white/70 text-plum shadow-md backdrop-blur"
        style={{ top: 'calc(env(safe-area-inset-top, 0px) + 10px)' }}
      >
        {on ? <Volume2 size={20} aria-hidden="true" /> : <VolumeX size={20} aria-hidden="true" />}
      </button>
      {error && <span role="status" className="sr-only">{error}</span>}
    </>
  )
}
