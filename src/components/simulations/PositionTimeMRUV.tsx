import { useMemo, useState } from 'react'
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

const DURATION = 10
const POINTS = 60

export default function PositionTimeMRUV() {
  const [x0, setX0] = useState(0)
  const [v0, setV0] = useState(2)
  const [a, setA] = useState(1)

  const data = useMemo(() => {
    const points = []
    for (let i = 0; i <= POINTS; i++) {
      const t = (DURATION * i) / POINTS
      const x = x0 + v0 * t + 0.5 * a * t * t
      points.push({ t: Number(t.toFixed(2)), x: Number(x.toFixed(2)) })
    }
    return points
  }, [x0, v0, a])

  const positionAt5s = x0 + v0 * 5 + 0.5 * a * 25

  return (
    <SimulationCard
      chart={
        <div className="h-64 w-full sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="t"
                label={{ value: 't (s)', position: 'insideBottomRight', offset: -4 }}
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis
                label={{ value: 'x (m)', angle: -90, position: 'insideLeft' }}
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip
                formatter={(value) => [`${value} m`, 'posição']}
                labelFormatter={(t) => `t = ${t}s`}
              />
              <ReferenceLine y={0} stroke="#cbd5e1" />
              <Line
                type="monotone"
                dataKey="x"
                stroke="#0284c7"
                strokeWidth={3}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      }
      controls={
        <>
          <Slider
            label="Posição inicial (x₀)"
            value={x0}
            min={-20}
            max={20}
            step={1}
            unit="m"
            onChange={setX0}
          />
          <Slider
            label="Velocidade inicial (v₀)"
            value={v0}
            min={-10}
            max={10}
            step={0.5}
            unit="m/s"
            onChange={setV0}
          />
          <Slider
            label="Aceleração (a)"
            value={a}
            min={-5}
            max={5}
            step={0.5}
            unit="m/s²"
            onChange={setA}
          />
        </>
      }
      readout={
        <p className="font-mono text-sm text-slate-600">
          x(t) = {x0} + {v0}·t + 0,5·({a})·t²&nbsp;&nbsp;·&nbsp;&nbsp; x(5s) ={' '}
          <span className="font-semibold text-sky-700">{positionAt5s.toFixed(1)} m</span>
        </p>
      }
    />
  )
}
