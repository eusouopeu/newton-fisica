import { Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, BeakerIcon } from '@heroicons/react/24/solid'
import { labSimulations } from '../data/labSimulations'

export default function LabPage() {
  const [selectedId, setSelectedId] = useState(labSimulations[0].id)
  const selected = labSimulations.find((s) => s.id === selectedId) ?? labSimulations[0]
  const SimComponent = selected.Component

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 pb-16 pt-6 lg:max-w-3xl">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-wood-500 hover:bg-wood-100"
          aria-label="Voltar"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <BeakerIcon className="h-6 w-6 text-chalk-600" />
          <div>
            <h1 className="font-display text-xl font-bold text-wood-800">Laboratório livre</h1>
            <p className="text-sm font-medium text-wood-500">
              Mexa em qualquer simulação sem lição, sem pontuação, só para explorar.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {labSimulations.map((sim) => (
          <button
            key={sim.id}
            onClick={() => setSelectedId(sim.id)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              sim.id === selectedId
                ? 'bg-chalk-500 text-white shadow-[0_2px_0_0_var(--color-chalk-700)]'
                : 'border-2 border-wood-200 bg-paper-50 text-wood-600 hover:border-chalk-300'
            }`}
          >
            {sim.label}
          </button>
        ))}
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-wood-500">
          {selected.description} <span className="text-wood-400">— de {selected.topicTitle}</span>
        </p>
        <Suspense
          fallback={
            <div className="flex h-52 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-chalk-200 border-t-chalk-600" />
            </div>
          }
        >
          <SimComponent />
        </Suspense>
      </div>
    </div>
  )
}
