import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Slider from './Slider'
import FormulaTerm from './FormulaTerm'
import { useActiveParam } from '../../hooks/useActiveParam'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { hapticTap } from '../../lib/haptics'

const POINTS = 40
const G = 10

const HEIGHT_RANGE: [number, number] = [2, 10]
const MASS_RANGE: [number, number] = [1, 10]

const SHAFT_HEIGHT_PX = 150

function FallAnimation({ height }: { height: number }) {
  const iconRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const startRef = useRef(0)
  const reducedMotion = usePrefersReducedMotion()
  const duration = Math.sqrt((2 * height) / G)

  useEffect(() => {
    if (reducedMotion) {
      if (iconRef.current) iconRef.current.style.top = `${SHAFT_HEIGHT_PX}px`
      return
    }

    startRef.current = performance.now()
    function tick(now: number) {
      const elapsed = ((now - startRef.current) / 1000) % (duration + 0.6)
      const t = Math.min(elapsed, duration)
      const fallen = 0.5 * G * t * t
      const pct = Math.min(1, fallen / height)
      if (iconRef.current) iconRef.current.style.top = `${pct * SHAFT_HEIGHT_PX}px`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [duration, height, reducedMotion])

  return (
    <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-chalk-50">
      <div
        className="absolute left-1/2 top-3 w-1 -translate-x-1/2 rounded-full bg-wood-200"
        style={{ height: SHAFT_HEIGHT_PX }}
      />
      <div
        ref={iconRef}
        className="absolute left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center text-xl"
        style={{ top: 12, willChange: 'top' }}
      >
        📦
      </div>
    </div>
  )
}

export default function EnergyConservation() {
  const [height, setHeight] = useState(6)
  const [mass, setMass] = useState(5)
  const [active, markActive] = useActiveParam()

  const totalEnergy = mass * G * height

  const data = useMemo(() => {
    const points = []
    for (let i = 0; i <= POINTS; i++) {
      const fallen = (height * i) / POINTS
      const pe = mass * G * (height - fallen)
      const ke = mass * G * fallen
      points.push({
        fallen: Number(fallen.toFixed(2)),
        pe: Number(pe.toFixed(1)),
        ke: Number(ke.toFixed(1)),
        total: Number(totalEnergy.toFixed(1)),
      })
    }
    return points
  }, [height, mass, totalEnergy])

  const speedAtGround = Math.sqrt(2 * G * height)

  const onDragStart = useCallback(() => void hapticTap(), [])

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-wood-200 bg-paper-50 shadow-[0_4px_0_0_var(--color-wood-200)]">
      <div className="border-b-2 border-wood-100 bg-paper-50 p-4">
        <div className="flex flex-col gap-3">
          <FallAnimation height={height} />
          <div className="h-52 w-full sm:h-64 lg:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc3" />
                <XAxis
                  dataKey="fallen"
                  type="number"
                  domain={[0, height]}
                  label={{ value: 'altura percorrida (m)', position: 'insideBottomRight', offset: -4 }}
                  stroke="#7d6740"
                  fontSize={12}
                />
                <YAxis
                  label={{ value: 'energia (J)', angle: -90, position: 'insideLeft' }}
                  stroke="#7d6740"
                  fontSize={12}
                />
                <Tooltip
                  formatter={(value, name) => [`${value} J`, name]}
                  labelFormatter={(v) => `${v} m percorridos`}
                  contentStyle={{
                    borderRadius: 12,
                    border: '2px solid #e3c69d',
                    fontFamily: 'Nunito Variable, sans-serif',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pe"
                  name="Potencial"
                  stroke="#2f6a4b"
                  strokeWidth={4}
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="ke"
                  name="Cinética"
                  stroke="#c2410c"
                  strokeWidth={4}
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="Total"
                  stroke="#7d6740"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2">
        <Slider
          label="Altura (h)"
          value={height}
          min={HEIGHT_RANGE[0]}
          max={HEIGHT_RANGE[1]}
          step={1}
          unit="m"
          onDragStart={() => {
            onDragStart()
            markActive('h')
          }}
          onChange={(v) => {
            setHeight(v)
            markActive('h')
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
            onDragStart()
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
          E = <FormulaTerm active={active === 'm'}>{mass}</FormulaTerm>·g·
          <FormulaTerm active={active === 'h'}>{height}</FormulaTerm> ={' '}
          <span className="font-bold text-chalk-700">{totalEnergy.toFixed(0)} J</span>
        </p>
        <p className="mt-1 font-mono text-xs text-wood-500">
          v no chão = √(2·g·h) = {speedAtGround.toFixed(1)} m/s · energia total constante em toda a
          queda
        </p>
      </div>
    </div>
  )
}
