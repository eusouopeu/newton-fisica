import { useCallback, useMemo, useRef, useState } from 'react'
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
import MotionTrack from './MotionTrack'
import FormulaTerm from './FormulaTerm'
import { useActiveParam } from '../../hooks/useActiveParam'
import { hapticTap } from '../../lib/haptics'

const DURATION = 4
const POINTS = 40
const G = 10
const MASS = 5

const FORCE_RANGE: [number, number] = [0, 30]
const MU_RANGE: [number, number] = [0, 1]
const Y_DOMAIN: [number, number] = [0, 26]
const Y_TICKS = [0, 5, 10, 15, 20, 25]

export default function FrictionBlock() {
  const [force, setForce] = useState(10)
  const [mu, setMu] = useState(0.3)
  const [ghostData, setGhostData] = useState<{ t: number; v: number }[] | null>(null)
  const [active, markActive] = useActiveParam()
  const dataRef = useRef<{ t: number; v: number }[]>([])

  const normalForce = MASS * G
  const maxFriction = mu * normalForce
  const isMoving = force > maxFriction
  const acceleration = isMoving ? (force - maxFriction) / MASS : 0

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

  const distanceAt = useCallback((t: number) => 0.5 * acceleration * t * t, [acceleration])

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-wood-200 bg-paper-50 shadow-[0_4px_0_0_var(--color-wood-200)]">
      <div className="border-b-2 border-wood-100 bg-white p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                isMoving ? 'bg-chalk-100 text-chalk-700' : 'bg-wood-100 text-wood-600'
              }`}
            >
              {isMoving ? '🏃 Deslizando' : '🔒 Travado pelo atrito'}
            </span>
          </div>
          <MotionTrack distanceAt={distanceAt} duration={DURATION} icon="📦" trackLabel="movimento em tempo real" />
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
          label="Força aplicada (F)"
          value={force}
          min={FORCE_RANGE[0]}
          max={FORCE_RANGE[1]}
          step={1}
          unit="N"
          onDragStart={() => {
            captureGhost()
            markActive('f')
          }}
          onChange={(v) => {
            setForce(v)
            markActive('f')
          }}
        />
        <Slider
          label="Coeficiente de atrito (μ)"
          value={mu}
          min={MU_RANGE[0]}
          max={MU_RANGE[1]}
          step={0.05}
          onDragStart={() => {
            captureGhost()
            markActive('mu')
          }}
          onChange={(v) => {
            setMu(v)
            markActive('mu')
          }}
        />
      </div>
      <div className="border-t-2 border-wood-100 bg-paper-100 px-5 py-3">
        <p className="font-mono text-sm font-semibold text-wood-700">
          f_máx = <FormulaTerm active={active === 'mu'}>{mu.toFixed(2)}</FormulaTerm>·{MASS}·10 ={' '}
          <span className="font-bold text-chalk-700">{maxFriction.toFixed(1)} N</span>
        </p>
        <p className="mt-1 font-mono text-xs text-wood-500">
          F aplicada = <FormulaTerm active={active === 'f'}>{force}</FormulaTerm> N &nbsp;·&nbsp; massa fixa: {MASS}{' '}
          kg
        </p>
      </div>
    </div>
  )
}
