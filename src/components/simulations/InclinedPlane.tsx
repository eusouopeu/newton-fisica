import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Slider from './Slider'
import FormulaTerm from './FormulaTerm'
import { useActiveParam } from '../../hooks/useActiveParam'
import { hapticTap } from '../../lib/haptics'

const DURATION = 3
const POINTS = 40
const G = 10

const ANGLE_RANGE: [number, number] = [5, 45]
const MASS_RANGE: [number, number] = [2, 10]
const Y_DOMAIN: [number, number] = [0, 22]
const Y_TICKS = [0, 5, 10, 15, 20]

const RAMP_LENGTH_PX = 220
const RAMP_ORIGIN = { x: 24, y: 24 }

function RampAnimation({ angleDeg, sAt, sMax }: { angleDeg: number; sAt: (t: number) => number; sMax: number }) {
  const iconRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const startRef = useRef(0)
  const rad = (angleDeg * Math.PI) / 180

  useEffect(() => {
    startRef.current = performance.now()
    function tick(now: number) {
      const elapsed = ((now - startRef.current) / 1000) % DURATION
      const s = sAt(elapsed)
      const pct = sMax > 0 ? Math.min(1, s / sMax) : 0
      const px = RAMP_ORIGIN.x + pct * RAMP_LENGTH_PX * Math.cos(rad)
      const py = RAMP_ORIGIN.y + pct * RAMP_LENGTH_PX * Math.sin(rad)
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
  }, [rad, sAt, sMax])

  const endX = RAMP_ORIGIN.x + RAMP_LENGTH_PX * Math.cos(rad)
  const endY = RAMP_ORIGIN.y + RAMP_LENGTH_PX * Math.sin(rad)

  return (
    <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-chalk-50">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 280 170" preserveAspectRatio="xMinYMin meet">
        <line
          x1={RAMP_ORIGIN.x}
          y1={RAMP_ORIGIN.y}
          x2={endX}
          y2={endY}
          stroke="#7a4f2c"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <line x1={RAMP_ORIGIN.x - 14} y1={endY} x2={endX + 14} y2={endY} stroke="#c2ab84" strokeWidth={3} />
      </svg>
      <div
        ref={iconRef}
        className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-xl"
        style={{ left: RAMP_ORIGIN.x, top: RAMP_ORIGIN.y, willChange: 'left, top' }}
      >
        📦
      </div>
    </div>
  )
}

export default function InclinedPlane() {
  const [angle, setAngle] = useState(30)
  const [mass, setMass] = useState(5)
  const [ghostData, setGhostData] = useState<{ t: number; v: number }[] | null>(null)
  const [active, markActive] = useActiveParam()
  const dataRef = useRef<{ t: number; v: number }[]>([])

  const rad = (angle * Math.PI) / 180
  const acceleration = G * Math.sin(rad)
  const normalForce = mass * G * Math.cos(rad)
  const weightAlongRamp = mass * G * Math.sin(rad)

  const data = useMemo(() => {
    const points = []
    for (let i = 0; i <= POINTS; i++) {
      const t = (DURATION * i) / POINTS
      points.push({ t: Number(t.toFixed(2)), v: Number((acceleration * t).toFixed(2)) })
    }
    dataRef.current = points
    return points
  }, [acceleration])

  const captureGhost = useCallback(() => {
    setGhostData(dataRef.current)
    void hapticTap()
  }, [])

  const sAt = useCallback((t: number) => 0.5 * acceleration * t * t, [acceleration])
  const sMax = 0.5 * acceleration * DURATION * DURATION

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-wood-200 bg-paper-50 shadow-[0_4px_0_0_var(--color-wood-200)]">
      <div className="border-b-2 border-wood-100 bg-white p-4">
        <div className="flex flex-col gap-3">
          <RampAnimation angleDeg={angle} sAt={sAt} sMax={sMax} />
          <div className="h-52 w-full sm:h-64 lg:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc3" />
                <XAxis
                  dataKey="t"
                  type="number"
                  domain={[0, DURATION]}
                  label={{ value: 't (s)', position: 'insideBottomRight', offset: -4 }}
                  stroke="#7d6740"
                  fontSize={12}
                />
                <YAxis
                  domain={Y_DOMAIN}
                  ticks={Y_TICKS}
                  allowDataOverflow
                  label={{ value: 'v (m/s)', angle: -90, position: 'insideLeft' }}
                  stroke="#7d6740"
                  fontSize={12}
                />
                <Tooltip
                  formatter={(value) => [`${value} m/s`, 'velocidade']}
                  labelFormatter={(t) => `t = ${t}s`}
                  contentStyle={{
                    borderRadius: 12,
                    border: '2px solid #e3c69d',
                    fontFamily: 'Nunito Variable, sans-serif',
                  }}
                />
                {ghostData && (
                  <Line
                    data={ghostData}
                    type="monotone"
                    dataKey="v"
                    stroke="#c2ab84"
                    strokeWidth={2}
                    strokeDasharray="5 4"
                    dot={false}
                    isAnimationActive={false}
                    legendType="none"
                  />
                )}
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="#2f6a4b"
                  strokeWidth={4}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {ghostData && (
            <p className="text-center text-xs font-semibold text-wood-400">
              Linha tracejada = valor antes do ajuste
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2">
        <Slider
          label="Ângulo (θ)"
          value={angle}
          min={ANGLE_RANGE[0]}
          max={ANGLE_RANGE[1]}
          step={1}
          unit="°"
          onDragStart={() => {
            captureGhost()
            markActive('theta')
          }}
          onChange={(v) => {
            setAngle(v)
            markActive('theta')
          }}
        />
        <Slider
          label="Massa (m)"
          value={mass}
          min={MASS_RANGE[0]}
          max={MASS_RANGE[1]}
          step={1}
          unit="kg"
          onDragStart={() => {
            captureGhost()
            markActive('m')
          }}
          onChange={(v) => {
            setMass(v)
            markActive('m')
          }}
        />
      </div>
      <div className="border-t-2 border-wood-100 bg-paper-100 px-5 py-3">
        <p className="font-mono text-sm font-semibold text-wood-700">
          a = g·sen(<FormulaTerm active={active === 'theta'}>{angle}°</FormulaTerm>) ={' '}
          <span className="font-bold text-chalk-700">{acceleration.toFixed(2)} m/s²</span>
        </p>
        <p className="mt-1 font-mono text-xs text-wood-500">
          N = <FormulaTerm active={active === 'm'}>{mass}</FormulaTerm>·g·cos(θ) = {normalForce.toFixed(1)} N
          &nbsp;·&nbsp; P∥ = m·g·sen(θ) = {weightAlongRamp.toFixed(1)} N
        </p>
      </div>
    </div>
  )
}
