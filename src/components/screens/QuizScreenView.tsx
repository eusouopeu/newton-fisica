import { useState } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import type { QuizScreen } from '../../types'

interface Props {
  screen: QuizScreen
  onNext: () => void
}

export default function QuizScreenView({ screen, onNext }: Props) {
  const [index, setIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const question = screen.questions[index]
  const isLast = index === screen.questions.length - 1
  const selected = question.options.find((o) => o.id === selectedId)

  function handleContinue() {
    if (!selected) return
    if (isLast) {
      onNext()
    } else {
      setIndex((i) => i + 1)
      setSelectedId(null)
    }
  }

  return (
    <div className="flex flex-col gap-5 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">{screen.title}</h2>
        <span className="text-sm text-slate-400">
          {index + 1}/{screen.questions.length}
        </span>
      </div>
      <p className="text-lg text-slate-700">{question.prompt}</p>
      <div className="flex flex-col gap-2">
        {question.options.map((option) => {
          const isSelected = option.id === selectedId
          const showState = selectedId !== null && isSelected
          return (
            <button
              key={option.id}
              onClick={() => setSelectedId(option.id)}
              disabled={selectedId !== null}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                showState
                  ? option.correct
                    ? 'border-emerald-400 bg-emerald-50'
                    : 'border-rose-400 bg-rose-50'
                  : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50'
              } ${selectedId !== null && !isSelected ? 'opacity-50' : ''}`}
            >
              <span className="text-slate-700">{option.label}</span>
              {showState &&
                (option.correct ? (
                  <CheckCircleIcon className="h-5 w-5 shrink-0 text-emerald-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 shrink-0 text-rose-500" />
                ))}
            </button>
          )
        })}
      </div>
      {selected && (
        <div
          className={`rounded-lg p-3 text-sm ${
            selected.correct ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
          }`}
        >
          {question.explanation}
        </div>
      )}
      {selected && (
        <button
          onClick={handleContinue}
          className="self-center rounded-full bg-sky-600 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-sky-700 active:scale-95"
        >
          {isLast ? 'Concluir lição' : 'Próxima pergunta'}
        </button>
      )}
    </div>
  )
}
