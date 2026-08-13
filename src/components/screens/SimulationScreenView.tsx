import { Suspense } from 'react'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import type { SimulationScreen } from '../../types'

interface Props {
  screen: SimulationScreen
  onNext: () => void
}

function SimulationFallback() {
  return (
    <div className="flex h-64 w-full items-center justify-center rounded-3xl border-2 border-wood-200 bg-paper-50">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-chalk-200 border-t-chalk-600" />
    </div>
  )
}

export default function SimulationScreenView({ screen, onNext }: Props) {
  const { Component } = screen
  return (
    <div className="flex flex-col gap-5 py-4">
      <div>
        <h2 className="font-display text-xl font-bold text-wood-800 sm:text-2xl">
          {screen.title}
        </h2>
        <div className="mt-2 flex items-start gap-2 rounded-2xl border-2 border-wood-200 bg-wood-50 p-3 text-sm font-semibold text-wood-700">
          <AdjustmentsHorizontalIcon className="mt-0.5 h-4 w-4 shrink-0 text-wood-500" />
          <span>{screen.instructions}</span>
        </div>
      </div>
      <Suspense fallback={<SimulationFallback />}>
        <Component />
      </Suspense>
      <button
        onClick={onNext}
        className="self-center rounded-full bg-chalk-500 px-8 py-3 font-display text-lg font-bold text-white shadow-[0_4px_0_0_var(--color-chalk-700)] transition active:translate-y-1 active:shadow-none"
      >
        Entendi, continuar
      </button>
    </div>
  )
}
