import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import type { QuestionScreen } from '../../types'

interface Props {
  screen: QuestionScreen
  onNext: () => void
}

export default function QuestionScreenView({ screen, onNext }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-100">
        <QuestionMarkCircleIcon className="h-8 w-8 text-sky-600" />
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{screen.title}</h1>
      <p className="max-w-lg text-lg leading-relaxed text-slate-600">{screen.prompt}</p>
      {screen.hint && <p className="max-w-md text-sm italic text-slate-400">{screen.hint}</p>}
      <button
        onClick={onNext}
        className="mt-4 rounded-full bg-sky-600 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-sky-700 active:scale-95"
      >
        Vamos explorar
      </button>
    </div>
  )
}
