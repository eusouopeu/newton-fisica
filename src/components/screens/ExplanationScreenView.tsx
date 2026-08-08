import { LightBulbIcon } from '@heroicons/react/24/solid'
import type { ExplanationScreen } from '../../types'

interface Props {
  screen: ExplanationScreen
  onNext: () => void
}

export default function ExplanationScreenView({ screen, onNext }: Props) {
  return (
    <div className="flex flex-col items-center gap-5 py-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
        <LightBulbIcon className="h-8 w-8 text-amber-600" />
      </div>
      <h2 className="text-2xl font-semibold text-slate-900">{screen.title}</h2>
      <div className="max-w-lg space-y-3 text-left text-slate-600">
        {screen.body.map((paragraph, i) => (
          <p key={i} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      {screen.formula && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-3 font-mono text-lg text-slate-800">
          {screen.formula}
        </div>
      )}
      <button
        onClick={onNext}
        className="mt-2 rounded-full bg-sky-600 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-sky-700 active:scale-95"
      >
        Testar meu entendimento
      </button>
    </div>
  )
}
