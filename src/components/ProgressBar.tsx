interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100)
  return (
    <div
      className="h-4 w-full overflow-hidden rounded-full border-2 border-wood-200 bg-paper-200"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progresso da lição"
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-chalk-500 to-chalk-400 transition-all duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
