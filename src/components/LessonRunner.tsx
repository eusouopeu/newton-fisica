import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, CheckBadgeIcon, SparklesIcon, XCircleIcon } from '@heroicons/react/24/solid'
import type { Lesson } from '../types'
import ProgressBar from './ProgressBar'
import QuestionScreenView from './screens/QuestionScreenView'
import SimulationScreenView from './screens/SimulationScreenView'
import ExplanationScreenView from './screens/ExplanationScreenView'
import QuizScreenView, { type WrongQuizAnswer } from './screens/QuizScreenView'
import { awardPerfectBadge, getLessonProgress, updateLessonProgress } from '../lib/progress'
import { playComplete } from '../lib/sound'
import { hapticCelebrate } from '../lib/haptics'

interface Props {
  topicId: string
  lesson: Lesson
  onBack: () => void
}

function initialScreenIndex(lessonId: string, total: number): number {
  const saved = getLessonProgress(lessonId)
  if (!saved || saved.completed) return 0
  return Math.min(saved.completedScreens, total - 1)
}

export default function LessonRunner({ topicId, lesson, onBack }: Props) {
  const total = lesson.screens.length
  const [screenIndex, setScreenIndex] = useState(() => initialScreenIndex(lesson.id, total))
  const [done, setDone] = useState(false)
  const [earnedBadge, setEarnedBadge] = useState(false)
  const wrongAnswersRef = useRef<WrongQuizAnswer[]>([])
  const navigate = useNavigate()

  const screen = lesson.screens[screenIndex]

  function finishLesson() {
    void playComplete()
    void hapticCelebrate()
    if (wrongAnswersRef.current.length === 0) {
      awardPerfectBadge(lesson.id)
      setEarnedBadge(true)
    }
    setDone(true)
  }

  function handleNext(wrongAnswers?: WrongQuizAnswer[]) {
    if (wrongAnswers) wrongAnswersRef.current = [...wrongAnswersRef.current, ...wrongAnswers]
    const nextIndex = screenIndex + 1
    updateLessonProgress(lesson.id, nextIndex, total)
    if (nextIndex >= total) {
      finishLesson()
    } else {
      setScreenIndex(nextIndex)
    }
  }

  if (done) {
    const mistakes = wrongAnswersRef.current
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-4 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-chalk-300 bg-chalk-100 shadow-[0_4px_0_0_var(--color-chalk-300)]">
          <CheckBadgeIcon className="h-12 w-12 text-chalk-600" />
        </div>
        <h2 className="font-display text-2xl font-bold text-wood-800">Lição concluída!</h2>
        <p className="max-w-sm text-wood-600">
          Você terminou "{lesson.title}". Continue para o próximo tópico.
        </p>

        {earnedBadge && (
          <div className="flex items-center gap-2 rounded-full border-2 border-amber-300 bg-amber-50 px-4 py-2 text-amber-700 shadow-[0_3px_0_0_#fcd34d]">
            <SparklesIcon className="h-5 w-5" />
            <span className="font-display font-bold">Medalha conquistada: sem erros!</span>
          </div>
        )}

        {mistakes.length > 0 && (
          <div className="w-full text-left">
            <h3 className="mb-2 font-display font-bold text-wood-700">Vale revisar:</h3>
            <div className="flex flex-col gap-2">
              {mistakes.map((m, i) => (
                <div
                  key={i}
                  className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-sm text-rose-800"
                >
                  <div className="flex items-start gap-2 font-semibold">
                    <XCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                    <span>{m.prompt}</span>
                  </div>
                  <p className="mt-1 text-rose-700">
                    Você marcou "{m.chosenLabel}" — o certo era "{m.correctLabel}".
                  </p>
                  <p className="mt-1 text-rose-600">{m.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

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
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 pb-16 pt-6 lg:max-w-3xl">
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

      {screen.kind === 'question' && <QuestionScreenView screen={screen} onNext={() => handleNext()} />}
      {screen.kind === 'simulation' && (
        <SimulationScreenView screen={screen} onNext={() => handleNext()} />
      )}
      {screen.kind === 'explanation' && (
        <ExplanationScreenView screen={screen} onNext={() => handleNext()} />
      )}
      {screen.kind === 'quiz' && <QuizScreenView screen={screen} onNext={handleNext} />}
    </div>
  )
}
