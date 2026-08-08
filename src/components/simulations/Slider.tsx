interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (value: number) => void
}

export default function Slider({
  label,
  value,
  min,
  max,
  step = 0.1,
  unit = '',
  onChange,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <label className="block">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-bold text-wood-700">{label}</span>
        <span className="rounded-full bg-chalk-100 px-2.5 py-0.5 font-mono text-sm font-bold tabular-nums text-chalk-700">
          {value.toFixed(1)} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-track h-2.5 w-full cursor-pointer appearance-none rounded-full"
        style={{
          background: `linear-gradient(to right, var(--color-chalk-500) ${pct}%, var(--color-paper-300) ${pct}%)`,
        }}
      />
    </label>
  )
}
