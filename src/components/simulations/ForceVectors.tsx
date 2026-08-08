import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Slider from './Slider'
import FormulaTerm from './FormulaTerm'
import { useActiveParam } from '../../hooks/useActiveParam'
import { hapticTap } from '../../lib/haptics'

const F1_RANGE: [number, number] = [2, 15]
const F2_RANGE: [number, number] = [2, 15]
const ANGLE_RANGE: [number, number] = [0, 180]
const PX_PER_N = 8
const ORIGIN = { x: 70, y: 150 }
const ASSUMED_MASS = 5
const DURATION = 3
const MAX_TRAVEL_PX = 70

function arrowPath(x1: number, y1: number, x2: number, y2: number) {
  return { x1, y1, x2, y2 }
}

function BlockAnimation({ ux, uy, magnitude }: { ux: number; uy: number; magnitude: number }) {
  const iconRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const startRef = useRef(0)

  const acceleration = magnitude / ASSUMED_MASS
  const sMax = 0.5 * acceleration * DURATION * DURATION

  useEffect(() => {
    startRef.current = performance.now()
    function tick(now: number) {
      const elapsed = ((now - startRef.current) / 1000) % DURATION
      const s = 0.5 * acceleration * elapsed * elapsed
      const pct = sMax > 0 ? Math.min(1, s / sMax) : 0
      const px = ORIGIN.x + ux * pct * MAX_TRAVEL_PX
      const py = ORIGIN.y + uy * pct * MAX_TRAVEL_PX
      if (iconRef.current) {
        iconRef.current.style.left = `${px}px`
        iconRef.current.style.top = `${py}px`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [ux, uy, acceleration, sMax])

  return (
    <div
      ref={iconRef}
      className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-xl"
      style={{ left: ORIGIN.x, top: ORIGIN.y, willChange: 'left, top' }}
    >
      📦
    </div>
  )
}

export default function ForceVectors() {
  const [f1, setF1] = useState(10)
  const [f2, setF2] = useState(8)
  const [angle, setAngle] = useState(60)
  const [active, markActive] = useActiveParam()

  const rad = (angle * Math.PI) / 180
  const rx = f1 + f2 * Math.cos(rad)
  const ry = f2 * Math.sin(rad)
  const magnitude = Math.sqrt(rx * rx + ry * ry)
  const directionDeg = (Math.atan2(ry, rx) * 180) / Math.PI

  const ux = magnitude > 0 ? rx / magnitude : 0
  const uy = magnitude > 0 ? ry / magnitude : 0

  const f1End = useMemo(
    () => ({ x: ORIGIN.x + f1 * PX_PER_N, y: ORIGIN.y }),
    [f1],
  )
  const f2End = useMemo(
    () => ({
      x: ORIGIN.x + f2 * PX_PER_N * Math.cos(rad),
      y: ORIGIN.y - f2 * PX_PER_N * Math.sin(rad),
    }),
    [f2, rad],
  )
  const resultantEnd = useMemo(
    () => ({ x: ORIGIN.x + rx * PX_PER_N, y: ORIGIN.y - ry * PX_PER_N }),
    [rx, ry],
  )

  const captureTap = useCallback(() => {
    void hapticTap()
  }, [])

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-wood-200 bg-paper-50 shadow-[0_4px_0_0_var(--color-wood-200)]">
      <div className="border-b-2 border-wood-100 bg-white p-4">
        <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-chalk-50 sm:h-64">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 280 220"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker id="arrow-f1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#2f6a4b" />
              </marker>
              <marker id="arrow-f2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#9c6b3e" />
              </marker>
              <marker id="arrow-r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#c0392b" />
              </marker>
            </defs>

            <circle cx={ORIGIN.x} cy={ORIGIN.y} r={5} fill="#603e23" />

            {(() => {
              const p = arrowPath(ORIGIN.x, ORIGIN.y, f1End.x, f1End.y)
              return (
                <line
                  x1={p.x1}
                  y1={p.y1}
                  x2={p.x2}
                  y2={p.y2}
                  stroke="#2f6a4b"
                  strokeWidth={3.5}
                  markerEnd="url(#arrow-f1)"
                />
              )
            })()}
            <text x={f1End.x + 6} y={f1End.y - 6} fontSize={12} fontWeight={700} fill="#2f6a4b">
              F₁ = {f1}N
            </text>

            {(() => {
              const p = arrowPath(ORIGIN.x, ORIGIN.y, f2End.x, f2End.y)
              return (
                <line
                  x1={p.x1}
                  y1={p.y1}
                  x2={p.x2}
                  y2={p.y2}
                  stroke="#9c6b3e"
                  strokeWidth={3.5}
                  markerEnd="url(#arrow-f2)"
                />
              )
            })()}
            <text x={f2End.x + 6} y={f2End.y - 6} fontSize={12} fontWeight={700} fill="#9c6b3e">
              F₂ = {f2}N
            </text>

            {(() => {
              const p = arrowPath(ORIGIN.x, ORIGIN.y, resultantEnd.x, resultantEnd.y)
              return (
                <line
                  x1={p.x1}
                  y1={p.y1}
                  x2={p.x2}
                  y2={p.y2}
                  stroke="#c0392b"
                  strokeWidth={3.5}
                  strokeDasharray="6 4"
                  markerEnd="url(#arrow-r)"
                />
              )
            })()}
          </svg>
          <BlockAnimation ux={ux} uy={uy} magnitude={magnitude} />
        </div>
        <p className="mt-2 text-center text-xs font-semibold text-wood-400">
          Verde = F₁ · Marrom = F₂ · Vermelho tracejado = resultante (direção do movimento)
        </p>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2">
        <Slider
          label="Força 1 (F₁)"
          value={f1}
          min={F1_RANGE[0]}
          max={F1_RANGE[1]}
          step={1}
          unit="N"
          onDragStart={() => {
            captureTap()
            markActive('f1')
          }}
          onChange={(v) => {
            setF1(v)
            markActive('f1')
          }}
        />
        <Slider
          label="Força 2 (F₂)"
          value={f2}
          min={F2_RANGE[0]}
          max={F2_RANGE[1]}
          step={1}
          unit="N"
          onDragStart={() => {
            captureTap()
            markActive('f2')
          }}
          onChange={(v) => {
            setF2(v)
            markActive('f2')
          }}
        />
        <Slider
          label="Ângulo entre F₁ e F₂"
          value={angle}
          min={ANGLE_RANGE[0]}
          max={ANGLE_RANGE[1]}
          step={15}
          unit="°"
          onDragStart={() => {
            captureTap()
            markActive('angle')
          }}
          onChange={(v) => {
            setAngle(v)
            markActive('angle')
          }}
        />
      </div>
      <div className="border-t-2 border-wood-100 bg-paper-100 px-5 py-3">
        <p className="font-mono text-sm font-semibold text-wood-700">
          |R| = √(Rx² + Ry²) ={' '}
          <span className="font-bold text-chalk-700">{magnitude.toFixed(1)} N</span>
        </p>
        <p className="mt-1 font-mono text-xs text-wood-500">
          Rx = <FormulaTerm active={active === 'f1'}>{f1}</FormulaTerm> +{' '}
          <FormulaTerm active={active === 'f2'}>{f2}</FormulaTerm>·cos(
          <FormulaTerm active={active === 'angle'}>{angle}°</FormulaTerm>) = {rx.toFixed(1)} N &nbsp;·&nbsp; direção
          = {directionDeg.toFixed(0)}°
        </p>
      </div>
    </div>
  )
}
