import { useState } from 'react'
import { CheckCircleIcon, LightBulbIcon, XCircleIcon } from '@heroicons/react/24/solid'
import type { ProblemScreen } from '../../types'
import { playCorrect, playIncorrect } from '../../lib/sound'
import { hapticError, hapticSuccess } from '../../lib/haptics'

export interface WrongProblemAttempt {
  prompt: string
  chosenValue: string
  correctValue: string
}

interface Props {
  screen: ProblemScreen
  onNext: (wrongAttempts: WrongProblemAttempt[]) => void
}

export default function ProblemScreenView({ screen, onNext }: Props) {
  const [input, setInput] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [solved, setSolved] = useState(false)
  const [lastWasWrong, setLastWasWrong] = useState(false)
  const [wrongAttempts, setWrongAttempts] = useState<WrongProblemAttempt[]>([])

  const revealedSteps = screen.steps.slice(0, attempts)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (solved) return
    const value = Number(input.replace(',', '.'))
    if (Number.isNaN(value)) return

    const correct = Math.abs(value - screen.answer) <= screen.tolerance
    if (correct) {
      void playCorrect()
      void hapticSuccess()
      setSolved(true)
      setLastWasWrong(false)
    } else {
      void playIncorrect()
      void hapticError()
      setAttempts((a) => Math.min(a + 1, screen.steps.length))
      setLastWasWrong(true)
      setWrongAttempts((prev) => [
        ...prev,
        {
          prompt: screen.prompt,
          chosenValue: `${input} ${screen.unit}`,
          correctValue: `${screen.answer} ${screen.unit}`,
        },
      ])
    }
  }

  return (
    <div className="flex flex-col gap-5 py-6">
      <h2 className="font-display text-xl font-bold text-wood-800">{screen.title}</h2>
      <p className="text-lg font-semibold text-wood-700">{screen.prompt}</p>

      {screen.givens.length > 0 && (
        <div className="flex flex-col gap-1.5 rounded-2xl border-2 border-wood-200 bg-paper-50 p-4">
          {screen.givens.map((g, i) => (
            <p key={i} className="font-mono text-sm text-wood-600">
              {g.label} = <span className="font-bold text-wood-800">{g.value}</span>
            </p>
          ))}
        </div>
      )}

      {!solved && (
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            inputMode="decimal"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Sua resposta"
            className="w-40 rounded-2xl border-2 border-wood-200 bg-paper-50 px-4 py-3 font-mono text-lg font-bold text-wood-800 focus:border-chalk-400 focus:outline-none"
          />
          <span className="font-semibold text-wood-500">{screen.unit}</span>
          <button
            type="submit"
            disabled={input.trim() === ''}
            className="rounded-full bg-chalk-500 px-6 py-3 font-display font-bold text-white shadow-[0_4px_0_0_var(--color-chalk-700)] transition active:translate-y-1 active:shadow-none disabled:opacity-40"
          >
            Conferir
          </button>
        </form>
      )}

      {lastWasWrong && !solved && (
        <div className="flex items-start gap-2 rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-800">
          <XCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
          <span>Ainda não é isso. Confira a dica abaixo e tente de novo.</span>
        </div>
      )}

      {revealedSteps.length > 0 && !solved && (
        <div className="flex flex-col gap-2">
          {revealedSteps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-2 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800"
            >
              <LightBulbIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      )}

      {solved && (
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            <span>
              Isso mesmo — {screen.answer} {screen.unit}.
            </span>
          </div>
          {screen.steps.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-wood-500">
                Resolução completa
              </h3>
              {screen.steps.map((step, i) => (
                <div
                  key={i}
                  className="rounded-2xl border-2 border-wood-200 bg-paper-50 p-3 text-sm font-semibold text-wood-700"
                >
                  {step}
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => onNext(wrongAttempts)}
            className="self-center rounded-full bg-chalk-500 px-8 py-3 font-display text-lg font-bold text-white shadow-[0_4px_0_0_var(--color-chalk-700)] transition active:translate-y-1 active:shadow-none"
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  )
}
