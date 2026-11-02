type Ctx = AudioContext

let ctx: Ctx | null = null
let master: GainNode | null = null
let enabled = false

function ensure(): Ctx | null {
  if (ctx) return ctx
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  ctx = new AC()
  master = ctx.createGain()
  master.gain.value = 1
  master.connect(ctx.destination)
  return ctx
}

function tone(freq: number, when: number, dur: number, vol: number, type: OscillatorType = 'sine') {
  if (!ctx || !master) return
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = type
  o.frequency.value = freq
  g.gain.setValueAtTime(0.0001, when)
  g.gain.exponentialRampToValueAtTime(vol, when + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur)
  o.connect(g).connect(master)
  o.start(when)
  o.stop(when + dur + 0.05)
}

export function setChimesEnabled(value: boolean) {
  enabled = value
}

/** Subtle interaction sound; silent unless the background music is playing. */
export function chime(kind: 'success' | 'soft' = 'soft') {
  if (!enabled) return
  ensure()
  if (!ctx || !master) return
  const t = ctx.currentTime + 0.01
  if (kind === 'success') {
    ;[784, 988, 1319].forEach((f, i) => tone(f, t + i * 0.12, 0.9, 0.12, 'sine'))
  } else {
    tone(1046.5, t, 0.6, 0.08)
  }
}
