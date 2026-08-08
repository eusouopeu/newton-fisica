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
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckBadgeIcon className="h-10 w-10 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-900">Lição concluída!</h2>
        <p className="max-w-sm text-slate-600">
          Você terminou "{lesson.title}". Continue para o próximo tópico.
        </p>
        <button
          onClick={() => navigate(`/topic/${topicId}`)}
          className="rounded-full bg-sky-600 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-sky-700 active:scale-95"
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
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
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
