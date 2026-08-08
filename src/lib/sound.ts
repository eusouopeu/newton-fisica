import { loadSettings } from './settings'

let ctx: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return null
    ctx = new AudioContextClass()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tone(freq: number, startOffset: number, duration: number, gain: number) {
  const audioCtx = getContext()
  if (!audioCtx) return
  const osc = audioCtx.createOscillator()
  const envelope = audioCtx.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  const t0 = audioCtx.currentTime + startOffset
  envelope.gain.setValueAtTime(0, t0)
  envelope.gain.linearRampToValueAtTime(gain, t0 + 0.02)
  envelope.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(envelope)
  envelope.connect(audioCtx.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.02)
}

function play(fn: () => void) {
  if (!loadSettings().soundEnabled) return
  try {
    fn()
  } catch {
    // audio unavailable, ignore
  }
}

export function playCorrect() {
  play(() => {
    tone(587.33, 0, 0.14, 0.08)
    tone(880, 0.08, 0.2, 0.08)
  })
}

export function playIncorrect() {
  play(() => {
    tone(220, 0, 0.22, 0.07)
  })
}

export function playComplete() {
  play(() => {
    tone(523.25, 0, 0.15, 0.07)
    tone(659.25, 0.1, 0.15, 0.07)
    tone(783.99, 0.2, 0.3, 0.08)
  })
}

export function playTick() {
  play(() => {
    tone(440, 0, 0.06, 0.03)
  })
}
