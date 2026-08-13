import { useState } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import type { QuizScreen } from '../../types'
import { playCorrect, playIncorrect } from '../../lib/sound'
import { hapticError, hapticSuccess } from '../../lib/haptics'

export interface WrongQuizAnswer {
  prompt: string
  chosenLabel: string
  correctLabel: string
  explanation: string
}

interface Props {
  screen: QuizScreen
  onNext: (wrongAnswers: WrongQuizAnswer[]) => void
}

export default function QuizScreenView({ screen, onNext }: Props) {
  const [index, setIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [wrongAnswers, setWrongAnswers] = useState<WrongQuizAnswer[]>([])

  const question = screen.questions[index]
  const isLast = index === screen.questions.length - 1
  const selected = question.options.find((o) => o.id === selectedId)

  function handleSelect(optionId: string) {
    setSelectedId(optionId)
    const option = question.options.find((o) => o.id === optionId)
    if (option?.correct) {
      void playCorrect()
      void hapticSuccess()
    } else {
      void playIncorrect()
      void hapticError()
      const correctOption = question.options.find((o) => o.correct)
      setWrongAnswers((prev) => [
        ...prev,
        {
          prompt: question.prompt,
          chosenLabel: option?.label ?? '',
          correctLabel: correctOption?.label ?? '',
          explanation: question.explanation,
        },
      ])
    }
  }

  function handleContinue() {
    if (!selected) return
    if (isLast) {
      onNext(wrongAnswers)
    } else {
      setIndex((i) => i + 1)
      setSelectedId(null)
    }
  }

  return (
    <div className="flex flex-col gap-5 py-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-wood-800">{screen.title}</h2>
        <span className="rounded-full bg-wood-100 px-3 py-1 text-sm font-bold text-wood-500">
          {index + 1}/{screen.questions.length}
        </span>
      </div>
      <p className="text-lg font-semibold text-wood-700">{question.prompt}</p>
      <div className="flex flex-col gap-2.5">
        {question.options.map((option) => {
          const isSelected = option.id === selectedId
          const showState = selectedId !== null && isSelected
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={selectedId !== null}
              className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3.5 text-left font-semibold transition ${
                showState
                  ? option.correct
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-800 shadow-[0_3px_0_0_#6ee7b7]'
                    : 'border-rose-400 bg-rose-50 text-rose-800 shadow-[0_3px_0_0_#fca5a5]'
                  : 'border-wood-200 bg-paper-50 text-wood-700 shadow-[0_3px_0_0_var(--color-wood-200)] hover:border-chalk-300 hover:bg-chalk-50'
              } ${selectedId !== null && !isSelected ? 'opacity-50' : ''}`}
            >
              <span>{option.label}</span>
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
          className={`rounded-2xl border-2 p-3 text-sm font-semibold ${
            selected.correct
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-rose-200 bg-rose-50 text-rose-800'
          }`}
        >
          {question.explanation}
        </div>
      )}
      {selected && (
        <button
          onClick={handleContinue}
          className="self-center rounded-full bg-chalk-500 px-8 py-3 font-display text-lg font-bold text-white shadow-[0_4px_0_0_var(--color-chalk-700)] transition active:translate-y-1 active:shadow-none"
        >
          {isLast ? 'Concluir lição' : 'Próxima pergunta'}
        </button>
      )}
    </div>
  )
}
