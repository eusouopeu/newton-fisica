import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'
import type { Lesson } from '../types'
import ProgressBar from './ProgressBar'
import QuestionScreenView from './screens/QuestionScreenView'
import SimulationScreenView from './screens/SimulationScreenView'
import ExplanationScreenView from './screens/ExplanationScreenView'
import QuizScreenView from './screens/QuizScreenView'
import { updateLessonProgress } from '../lib/progress'

interface Props {
  topicId: string
  lesson: Lesson
  onBack: () => void
}

export default function LessonRunner({ topicId, lesson, onBack }: Props) {
  const [screenIndex, setScreenIndex] = useState(0)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  const total = lesson.screens.length
  const screen = lesson.screens[screenIndex]

  function handleNext() {
    const nextIndex = screenIndex + 1
    updateLessonProgress(lesson.id, nextIndex, total)
    if (nextIndex >= total) {
      setDone(true)
    } else {
      setScreenIndex(nextIndex)
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-chalk-300 bg-chalk-100 shadow-[0_4px_0_0_var(--color-chalk-300)]">
          <CheckBadgeIcon className="h-12 w-12 text-chalk-600" />
        </div>
        <h2 className="font-display text-2xl font-bold text-wood-800">Lição concluída!</h2>
        <p className="max-w-sm text-wood-600">
          Você terminou "{lesson.title}". Continue para o próximo tópico.
        </p>
        <button
          onClick={() => navigate(`/topic/${topicId}`)}
          className="rounded-full bg-chalk-500 px-8 py-3 font-display text-lg font-bold text-white shadow-[0_4px_0_0_var(--color-chalk-700)] transition active:translate-y-1 active:shadow-none"
        >
          Voltar ao tópico
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 pb-16 pt-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-wood-500 hover:bg-wood-100"
          aria-label="Voltar"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <ProgressBar current={screenIndex} total={total} />
      </div>

      {screen.kind === 'question' && <QuestionScreenView screen={screen} onNext={handleNext} />}
      {screen.kind === 'simulation' && (
        <SimulationScreenView screen={screen} onNext={handleNext} />
      )}
      {screen.kind === 'explanation' && (
        <ExplanationScreenView screen={screen} onNext={handleNext} />
      )}
      {screen.kind === 'quiz' && <QuizScreenView screen={screen} onNext={handleNext} />}
    </div>
  )
}
