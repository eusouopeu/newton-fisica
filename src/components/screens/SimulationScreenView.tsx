import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import type { SimulationScreen } from '../../types'

interface Props {
  screen: SimulationScreen
  onNext: () => void
}

export default function SimulationScreenView({ screen, onNext }: Props) {
  const { Component } = screen
  return (
    <div className="flex flex-col gap-5 py-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">{screen.title}</h2>
        <div className="mt-2 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          <AdjustmentsHorizontalIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{screen.instructions}</span>
        </div>
      </div>
      <Component />
      <button
        onClick={onNext}
        className="self-center rounded-full bg-sky-600 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-sky-700 active:scale-95"
      >
        Entendi, continuar
      </button>
    </div>
  )
}
