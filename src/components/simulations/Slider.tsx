interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  color?: string
  onChange: (value: number) => void
}

export default function Slider({
  label,
  value,
  min,
  max,
  step = 0.1,
  unit = '',
  color = 'accent-sky-600',
  onChange,
}: SliderProps) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-mono tabular-nums text-slate-500">
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
        className={`w-full ${color} cursor-pointer accent-sky-600`}
      />
    </label>
  )
}
