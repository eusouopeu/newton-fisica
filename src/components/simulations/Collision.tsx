import { useMemo, useState } from 'react'
import Slider from './Slider'
import { hapticTap } from '../../lib/haptics'

const MASS_RANGE: [number, number] = [1, 10]
const VELOCITY_RANGE: [number, number] = [-8, 8]

type Mode = 'elastic' | 'inelastic'

export default function Collision() {
  const [m1, setM1] = useState(4)
  const [v1, setV1] = useState(5)
  const [m2, setM2] = useState(6)
  const [v2, setV2] = useState(-2)
  const [mode, setMode] = useState<Mode>('elastic')

  const result = useMemo(() => {
    let v1f: number
    let v2f: number
    if (mode === 'elastic') {
      v1f = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2)
      v2f = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2)
    } else {
      const shared = (m1 * v1 + m2 * v2) / (m1 + m2)
      v1f = shared
      v2f = shared
    }
    const pBefore = m1 * v1 + m2 * v2
    const pAfter = m1 * v1f + m2 * v2f
    const keBefore = 0.5 * m1 * v1 ** 2 + 0.5 * m2 * v2 ** 2
    const keAfter = 0.5 * m1 * v1f ** 2 + 0.5 * m2 * v2f ** 2
    return { v1f, v2f, pBefore, pAfter, keBefore, keAfter }
  }, [m1, v1, m2, v2, mode])

  function toX(v: number, scale: number) {
    return 130 + (v / 8) * scale
  }

  const cartSize1 = 14 + m1 * 2.2
  const cartSize2 = 14 + m2 * 2.2

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-wood-200 bg-paper-50 shadow-[0_4px_0_0_var(--color-wood-200)]">
      <div className="flex items-center justify-center gap-2 border-b-2 border-wood-100 bg-paper-50 p-3">
        <button
          onClick={() => {
            setMode('elastic')
            void hapticTap()
          }}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
            mode === 'elastic'
              ? 'bg-chalk-500 text-white shadow-[0_2px_0_0_var(--color-chalk-700)]'
              : 'bg-paper-100 text-wood-500'
          }`}
        >
          Colisão elástica
        </button>
        <button
          onClick={() => {
            setMode('inelastic')
            void hapticTap()
          }}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
            mode === 'inelastic'
              ? 'bg-chalk-500 text-white shadow-[0_2px_0_0_var(--color-chalk-700)]'
              : 'bg-paper-100 text-wood-500'
          }`}
        >
          Colisão inelástica
        </button>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {[
          { label: 'Antes', va: v1, vb: v2 },
          { label: 'Depois', va: result.v1f, vb: result.v2f },
        ].map((row) => (
          <div key={row.label} className="rounded-2xl bg-chalk-50 p-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-wood-500">
              {row.label}
            </p>
            <svg viewBox="0 0 260 60" className="h-14 w-full">
              <line x1={0} y1={30} x2={260} y2={30} stroke="#e8dcc3" strokeWidth={3} />
              <rect
                x={toX(row.va, 90) - cartSize1 / 2}
                y={30 - cartSize1 / 2}
                width={cartSize1}
                height={cartSize1}
                rx={4}
                fill="#2f6a4b"
              />
              <rect
                x={toX(row.vb, 90) - cartSize2 / 2}
                y={30 - cartSize2 / 2}
                width={cartSize2}
                height={cartSize2}
                rx={4}
                fill="#c2410c"
              />
            </svg>
            <p className="mt-1 text-center font-mono text-xs text-wood-500">
              v₁ = {row.va.toFixed(1)} m/s &nbsp;·&nbsp; v₂ = {row.vb.toFixed(1)} m/s
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2">
        <Slider label="Massa 1 (m₁)" value={m1} min={MASS_RANGE[0]} max={MASS_RANGE[1]} step={1} unit="kg" onChange={setM1} />
        <Slider label="Massa 2 (m₂)" value={m2} min={MASS_RANGE[0]} max={MASS_RANGE[1]} step={1} unit="kg" onChange={setM2} />
        <Slider
          label="Velocidade 1 (v₁)"
          value={v1}
          min={VELOCITY_RANGE[0]}
          max={VELOCITY_RANGE[1]}
          step={1}
          unit="m/s"
          onChange={setV1}
        />
        <Slider
          label="Velocidade 2 (v₂)"
          value={v2}
          min={VELOCITY_RANGE[0]}
          max={VELOCITY_RANGE[1]}
          step={1}
          unit="m/s"
          onChange={setV2}
        />
      </div>
      <div className="border-t-2 border-wood-100 bg-paper-100 px-5 py-3">
        <p className="font-mono text-sm font-semibold text-wood-700">
          Momento: {result.pBefore.toFixed(1)} kg·m/s antes ={' '}
          <span className="font-bold text-chalk-700">{result.pAfter.toFixed(1)} kg·m/s depois</span>
        </p>
        <p className="mt-1 font-mono text-xs text-wood-500">
          Energia cinética: {result.keBefore.toFixed(1)} J antes → {result.keAfter.toFixed(1)} J
          depois
          {mode === 'inelastic' && ' (parte vira calor/deformação)'}
        </p>
      </div>
    </div>
  )
}
