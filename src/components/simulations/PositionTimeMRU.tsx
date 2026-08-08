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

// Domínio fixo: pior caso de x0 ± v·t dentro dos limites dos sliders,
// para a escala do eixo Y não mudar enquanto o usuário arrasta.
const X0_RANGE: [number, number] = [-15, 15]
const V_RANGE: [number, number] = [-10, 10]
const Y_DOMAIN: [number, number] = [-120, 120]
const Y_TICKS = [-120, -80, -40, 0, 40, 80, 120]

export default function PositionTimeMRU() {
  const [x0, setX0] = useState(0)
  const [v0, setV0] = useState(4)

  const data = useMemo(() => {
    const points = []
    for (let i = 0; i <= POINTS; i++) {
      const t = (DURATION * i) / POINTS
      const x = x0 + v0 * t
      points.push({ t: Number(t.toFixed(2)), x: Number(x.toFixed(2)) })
    }
    return points
  }, [x0, v0])

  const positionAt5s = x0 + v0 * 5

  return (
    <SimulationCard
      chart={
        <div className="h-64 w-full sm:h-80">
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
            onChange={setX0}
          />
          <Slider
            label="Velocidade (v)"
            value={v0}
            min={V_RANGE[0]}
            max={V_RANGE[1]}
            step={0.5}
            unit="m/s"
            onChange={setV0}
          />
        </>
      }
      readout={
        <p className="font-mono text-sm font-semibold text-wood-700">
          x(t) = {x0} + {v0}·t &nbsp;&nbsp;·&nbsp;&nbsp; x(5s) ={' '}
          <span className="font-bold text-chalk-700">{positionAt5s.toFixed(1)} m</span>
        </p>
      }
    />
  )
}
