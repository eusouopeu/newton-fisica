import { LightBulbIcon } from '@heroicons/react/24/solid'
import type { ExplanationScreen } from '../../types'

interface Props {
  screen: ExplanationScreen
  onNext: () => void
}

export default function ExplanationScreenView({ screen, onNext }: Props) {
  return (
    <div className="flex flex-col items-center gap-5 py-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-wood-300 bg-wood-100 shadow-[0_3px_0_0_var(--color-wood-300)]">
        <LightBulbIcon className="h-9 w-9 text-wood-600" />
      </div>
      <h2 className="font-display text-2xl font-bold text-wood-800">{screen.title}</h2>
      <div className="max-w-lg space-y-3 text-left text-wood-600">
        {screen.body.map((paragraph, i) => (
          <p key={i} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      {screen.formula && (
        <div className="rounded-2xl border-2 border-chalk-300 bg-chalk-50 px-6 py-3 font-mono text-lg font-bold text-chalk-800">
          {screen.formula}
        </div>
      )}
      <button
        onClick={onNext}
        className="mt-2 rounded-full bg-chalk-500 px-8 py-3 font-display text-lg font-bold text-white shadow-[0_4px_0_0_var(--color-chalk-700)] transition active:translate-y-1 active:shadow-none"
      >
        Testar meu entendimento
      </button>
    </div>
  )
}
