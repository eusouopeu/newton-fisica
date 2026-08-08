import { useCallback, useMemo, useRef, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Slider from './Slider'
import SimulationCard from './SimulationCard'
import MotionTrack from './MotionTrack'
import FormulaTerm from './FormulaTerm'
import { useActiveParam } from '../../hooks/useActiveParam'
import { hapticTap } from '../../lib/haptics'

const DURATION = 10
const POINTS = 60

// Domínio fixo do eixo Y: cobre o pior caso de x0 ± v0·t ± 0,5·a·t² dentro
// dos limites dos sliders abaixo, para a escala nunca "pular" ao arrastar.
const X0_RANGE: [number, number] = [-8, 8]
const V0_RANGE: [number, number] = [-6, 6]
const A_RANGE: [number, number] = [-2, 2]
const Y_DOMAIN: [number, number] = [-180, 180]
const Y_TICKS = [-180, -120, -60, 0, 60, 120, 180]

export default function PositionTimeMRUV() {
  const [x0, setX0] = useState(0)
  const [v0, setV0] = useState(2)
  const [a, setA] = useState(1)
  const [ghostData, setGhostData] = useState<{ t: number; x: number }[] | null>(null)
  const [active, markActive] = useActiveParam()
  const dataRef = useRef<{ t: number; x: number }[]>([])

  const data = useMemo(() => {
    const points = []
    for (let i = 0; i <= POINTS; i++) {
      const t = (DURATION * i) / POINTS
      const x = x0 + v0 * t + 0.5 * a * t * t
      points.push({ t: Number(t.toFixed(2)), x: Number(x.toFixed(2)) })
    }
    dataRef.current = points
    return points
  }, [x0, v0, a])

  const captureGhost = useCallback(() => {
    setGhostData(dataRef.current)
    void hapticTap()
  }, [])

  const distanceAt = useCallback((t: number) => x0 + v0 * t + 0.5 * a * t * t, [x0, v0, a])
  const positionAt5s = x0 + v0 * 5 + 0.5 * a * 25

  return (
    <SimulationCard
      chart={
        <div className="flex flex-col gap-3">
          <MotionTrack distanceAt={distanceAt} duration={DURATION} icon="🚗" trackLabel="posição em tempo real" />
          <div className="h-56 w-full sm:h-72 lg:h-80">
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
                  label={{ value: 'x (m)', angle: -90, position: 'insideLeft' }}
                  stroke="#7d6740"
                  fontSize={12}
                />
                <Tooltip
                  formatter={(value) => [`${value} m`, 'posição']}
                  labelFormatter={(t) => `t = ${t}s`}
                  contentStyle={{
                    borderRadius: 12,
                    border: '2px solid #e3c69d',
                    fontFamily: 'Nunito Variable, sans-serif',
                  }}
                />
                <ReferenceLine y={0} stroke="#c2ab84" />
                {ghostData && (
                  <Line
                    data={ghostData}
                    type="monotone"
                    dataKey="x"
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
                  dataKey="x"
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
      }
      controls={
        <>
          <Slider
            label="Posição inicial (x₀)"
            value={x0}
            min={X0_RANGE[0]}
            max={X0_RANGE[1]}
            step={1}
            unit="m"
            onDragStart={() => {
              captureGhost()
              markActive('x0')
            }}
            onChange={(v) => {
              setX0(v)
              markActive('x0')
            }}
          />
          <Slider
            label="Velocidade inicial (v₀)"
            value={v0}
            min={V0_RANGE[0]}
            max={V0_RANGE[1]}
            step={0.5}
            unit="m/s"
            onDragStart={() => {
              captureGhost()
              markActive('v0')
            }}
            onChange={(v) => {
              setV0(v)
              markActive('v0')
            }}
          />
          <Slider
            label="Aceleração (a)"
            value={a}
            min={A_RANGE[0]}
            max={A_RANGE[1]}
            step={0.5}
            unit="m/s²"
            onDragStart={() => {
              captureGhost()
              markActive('a')
            }}
            onChange={(v) => {
              setA(v)
              markActive('a')
            }}
          />
        </>
      }
      readout={
        <p className="font-mono text-sm font-semibold text-wood-700">
          x(t) = <FormulaTerm active={active === 'x0'}>{x0}</FormulaTerm> +{' '}
          <FormulaTerm active={active === 'v0'}>{v0}</FormulaTerm>·t + 0,5·
          <FormulaTerm active={active === 'a'}>({a})</FormulaTerm>·t²&nbsp;&nbsp;·&nbsp;&nbsp; x(5s) ={' '}
          <span className="font-bold text-chalk-700">{positionAt5s.toFixed(1)} m</span>
        </p>
      }
    />
  )
}
