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

const DURATION = 5
const POINTS = 40

// Domínio fixo: pior caso de a·t = (F/m)·t dentro dos limites dos sliders,
// para a escala do eixo Y não mudar enquanto o usuário arrasta.
const MASS_RANGE: [number, number] = [2, 10]
const FORCE_RANGE: [number, number] = [2, 20]
const Y_DOMAIN: [number, number] = [0, 55]
const Y_TICKS = [0, 10, 20, 30, 40, 50]

export default function NewtonSecondLaw() {
  const [mass, setMass] = useState(3)
  const [force, setForce] = useState(15)
  const [ghostData, setGhostData] = useState<{ t: number; v: number }[] | null>(null)
  const [active, markActive] = useActiveParam()
  const dataRef = useRef<{ t: number; v: number }[]>([])

  const acceleration = force / mass

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

  const boxSize = 28 + mass * 4
  const arrowLength = 20 + force * 4.5

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-wood-200 bg-paper-50 shadow-[0_4px_0_0_var(--color-wood-200)]">
      <div className="border-b-2 border-wood-100 bg-paper-50 p-4">
        <div className="flex h-24 items-center justify-center gap-1 overflow-x-auto">
          <svg
            width={Math.max(260, boxSize + arrowLength + 60)}
            height={110}
            viewBox={`0 0 ${Math.max(260, boxSize + arrowLength + 60)} 110`}
          >
            <line x1="0" y1="90" x2="100%" y2="90" stroke="#e3c69d" strokeWidth={3} />
            <rect
              x={20}
              y={90 - boxSize}
              width={boxSize}
              height={boxSize}
              rx={8}
              fill="#f0e0c8"
              stroke="#7a4f2c"
              strokeWidth={2.5}
            />
            <text
              x={20 + boxSize / 2}
              y={90 - boxSize / 2 + 5}
              textAnchor="middle"
              fontSize={12}
              fill="#603e23"
              fontFamily="Nunito Variable, sans-serif"
              fontWeight={700}
            >
              {mass}kg
            </text>
            <line
              x1={20 + boxSize}
              y1={90 - boxSize / 2}
              x2={20 + boxSize + arrowLength}
              y2={90 - boxSize / 2}
              stroke="#c0392b"
              strokeWidth={3.5}
              markerEnd="url(#arrowhead)"
            />
            <text
              x={20 + boxSize + arrowLength / 2}
              y={90 - boxSize / 2 - 10}
              textAnchor="middle"
              fontSize={12}
              fill="#c0392b"
              fontFamily="Nunito Variable, sans-serif"
              fontWeight={700}
            >
              F = {force}N
            </text>
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="#c0392b" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      <div className="border-b-2 border-wood-100 bg-paper-50 p-4">
        <div className="flex flex-col gap-3">
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
      </div>
      <div className="border-t-2 border-wood-100 bg-paper-100 px-5 py-3">
        <p className="font-mono text-sm font-semibold text-wood-700">
          a = F / m = <FormulaTerm active={active === 'f'}>{force}</FormulaTerm> /{' '}
          <FormulaTerm active={active === 'm'}>{mass}</FormulaTerm> ={' '}
          <span className="font-bold text-chalk-700">{acceleration.toFixed(2)} m/s²</span>
        </p>
      </div>
    </div>
  )
}
