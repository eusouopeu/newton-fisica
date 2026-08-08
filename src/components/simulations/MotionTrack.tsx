import { useEffect, useMemo, useRef } from 'react'

interface MotionTrackProps {
  /** Posição (m) ao longo da pista em função do tempo (s). Pode ser negativa. */
  distanceAt: (t: number) => number
  /** Duração de um ciclo da animação, em segundos (normalmente igual à do gráfico). */
  duration: number
  icon: string
  trackLabel?: string
}

const SAMPLES = 40

/** Pista horizontal animada: um ícone se move em tempo real seguindo distanceAt(t), em loop. */
export default function MotionTrack({ distanceAt, duration, icon, trackLabel }: MotionTrackProps) {
  const iconRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const startRef = useRef<number>(0)

  const range = useMemo(() => {
    let max = 0.5
    for (let i = 0; i <= SAMPLES; i++) {
      const t = (duration * i) / SAMPLES
      max = Math.max(max, Math.abs(distanceAt(t)))
    }
    return max
  }, [distanceAt, duration])

  useEffect(() => {
    startRef.current = performance.now()

    function tick(now: number) {
      const elapsed = ((now - startRef.current) / 1000) % duration
      const dist = distanceAt(elapsed)
      const pct = Math.max(-1, Math.min(1, dist / range))
      if (iconRef.current) {
        iconRef.current.style.left = `${50 + pct * 44}%`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [distanceAt, duration, range])

  return (
    <div className="relative h-16 w-full overflow-hidden rounded-2xl bg-chalk-50">
      {trackLabel && (
        <span className="absolute left-2 top-1.5 text-[10px] font-bold uppercase tracking-wide text-chalk-500">
          {trackLabel}
        </span>
      )}
      <div className="absolute left-3 right-3 top-1/2 h-1 -translate-y-1/2 rounded-full bg-chalk-200" />
      <div
        ref={iconRef}
        className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-2xl"
        style={{ left: '50%', willChange: 'left' }}
      >
        {icon}
      </div>
    </div>
  )
}
