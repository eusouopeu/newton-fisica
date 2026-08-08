import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import type { QuestionScreen } from '../../types'

interface Props {
  screen: QuestionScreen
  onNext: () => void
}

export default function QuestionScreenView({ screen, onNext }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-chalk-300 bg-chalk-100 shadow-[0_3px_0_0_var(--color-chalk-300)]">
        <QuestionMarkCircleIcon className="h-9 w-9 text-chalk-600" />
      </div>
      <h1 className="font-display text-2xl font-bold text-wood-800 sm:text-3xl">
        {screen.title}
      </h1>
      <p className="max-w-lg text-lg leading-relaxed text-wood-600">{screen.prompt}</p>
      {screen.hint && (
        <p className="max-w-md text-sm italic text-wood-400">{screen.hint}</p>
      )}
      <button
        onClick={onNext}
        className="mt-4 rounded-full bg-chalk-500 px-8 py-3 font-display text-lg font-bold text-white shadow-[0_4px_0_0_var(--color-chalk-700)] transition active:translate-y-1 active:shadow-none"
      >
        Vamos explorar
      </button>
    </div>
  )
}
