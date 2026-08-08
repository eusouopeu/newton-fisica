import { useMemo, useState } from 'react'
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

const DURATION = 5
const POINTS = 40

export default function NewtonSecondLaw() {
  const [mass, setMass] = useState(4)
  const [force, setForce] = useState(8)

  const acceleration = force / mass

  const data = useMemo(() => {
    const points = []
    for (let i = 0; i <= POINTS; i++) {
      const t = (DURATION * i) / POINTS
      points.push({ t: Number(t.toFixed(2)), v: Number((acceleration * t).toFixed(2)) })
    }
    return points
  }, [acceleration])

  const boxSize = 28 + mass * 4
  const arrowLength = 20 + force * 4.5

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-4">
        <div className="flex h-24 items-center justify-center gap-1 overflow-x-auto">
          <svg
            width={Math.max(260, boxSize + arrowLength + 60)}
            height={110}
            viewBox={`0 0 ${Math.max(260, boxSize + arrowLength + 60)} 110`}
          >
            <line x1="0" y1="90" x2="100%" y2="90" stroke="#e2e8f0" strokeWidth={2} />
            <rect
              x={20}
              y={90 - boxSize}
              width={boxSize}
              height={boxSize}
              rx={6}
              fill="#e0f2fe"
              stroke="#0284c7"
              strokeWidth={2}
            />
            <text
              x={20 + boxSize / 2}
              y={90 - boxSize / 2 + 5}
              textAnchor="middle"
              fontSize={12}
              fill="#0369a1"
              fontFamily="monospace"
            >
              {mass}kg
            </text>
            <line
              x1={20 + boxSize}
              y1={90 - boxSize / 2}
              x2={20 + boxSize + arrowLength}
              y2={90 - boxSize / 2}
              stroke="#dc2626"
              strokeWidth={3}
              markerEnd="url(#arrowhead)"
            />
            <text
              x={20 + boxSize + arrowLength / 2}
              y={90 - boxSize / 2 - 10}
              textAnchor="middle"
              fontSize={12}
              fill="#dc2626"
              fontFamily="monospace"
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
                <path d="M0,0 L8,4 L0,8 Z" fill="#dc2626" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      <div className="border-b border-slate-100 p-4">
        <div className="h-56 w-full sm:h-64">
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
                label={{ value: 'v (m/s)', angle: -90, position: 'insideLeft' }}
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip
                formatter={(value) => [`${value} m/s`, 'velocidade']}
                labelFormatter={(t) => `t = ${t}s`}
              />
              <Line
                type="monotone"
                dataKey="v"
                stroke="#0284c7"
                strokeWidth={3}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2">
        <Slider
          label="Massa (m)"
          value={mass}
          min={1}
          max={20}
          step={1}
          unit="kg"
          onChange={setMass}
        />
        <Slider
          label="Força aplicada (F)"
          value={force}
          min={0}
          max={40}
          step={1}
          unit="N"
          onChange={setForce}
        />
      </div>
      <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 rounded-b-2xl">
        <p className="font-mono text-sm text-slate-600">
          a = F / m = {force} / {mass} ={' '}
          <span className="font-semibold text-sky-700">{acceleration.toFixed(2)} m/s²</span>
        </p>
      </div>
    </div>
  )
}
