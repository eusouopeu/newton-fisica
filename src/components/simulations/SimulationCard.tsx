import type { ReactNode } from 'react'

interface SimulationCardProps {
  chart: ReactNode
  controls: ReactNode
  readout?: ReactNode
}

export default function SimulationCard({ chart, controls, readout }: SimulationCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-4">{chart}</div>
      <div className="grid gap-4 p-4 sm:grid-cols-2">{controls}</div>
      {readout && (
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 rounded-b-2xl">
          {readout}
        </div>
      )}
    </div>
  )
}
