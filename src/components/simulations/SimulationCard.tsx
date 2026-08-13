import type { ReactNode } from 'react'

interface SimulationCardProps {
  chart: ReactNode
  controls: ReactNode
  readout?: ReactNode
}

export default function SimulationCard({ chart, controls, readout }: SimulationCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border-2 border-wood-200 bg-paper-50 shadow-[0_4px_0_0_var(--color-wood-200)]">
      <div className="border-b-2 border-wood-100 bg-paper-50 p-4">{chart}</div>
      <div className="grid gap-5 p-5 sm:grid-cols-2">{controls}</div>
      {readout && (
        <div className="border-t-2 border-wood-100 bg-paper-100 px-5 py-3">{readout}</div>
      )}
    </div>
  )
}
