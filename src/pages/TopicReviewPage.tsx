import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, CheckBadgeIcon, SparklesIcon } from '@heroicons/react/24/solid'
import { getTopic, getTopicReviewQuestions } from '../data/topics'
import type { QuizScreen } from '../types'
import QuizScreenView from '../components/screens/QuizScreenView'
import { awardReviewBadge } from '../lib/progress'

export default function TopicReviewPage() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const topic = topicId ? getTopic(topicId) : undefined
  const [done, setDone] = useState(false)

  const questions = useMemo(() => (topic ? getTopicReviewQuestions(topic) : []), [topic])

  if (!topic || questions.length === 0) return <Navigate to="/" replace />

  const reviewScreen: QuizScreen = {
    kind: 'quiz',
    title: `Revisão: ${topic.title}`,
    questions,
  }

  function handleNext() {
    if (topicId) awardReviewBadge(topicId)
    setDone(true)
  }

  if (done) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-4 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-chalk-300 bg-chalk-100 shadow-[0_4px_0_0_var(--color-chalk-300)]">
          <CheckBadgeIcon className="h-12 w-12 text-chalk-600" />
        </div>
        <h2 className="font-display text-2xl font-bold text-wood-800">Revisão concluída!</h2>
        <div className="flex items-center gap-2 rounded-full border-2 border-amber-300 bg-amber-50 px-4 py-2 text-amber-700 shadow-[0_3px_0_0_#fcd34d]">
          <SparklesIcon className="h-5 w-5" />
          <span className="font-display font-bold">Medalha conquistada: revisão de {topic.title}!</span>
        </div>
        <button
          onClick={() => navigate(`/topic/${topic.id}`)}
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
        <Link
          to={`/topic/${topic.id}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-wood-500 hover:bg-wood-100"
          aria-label="Voltar"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="font-display text-xl font-bold text-wood-800">Quiz de revisão</h1>
      </div>
      <QuizScreenView screen={reviewScreen} onNext={handleNext} />
    </div>
  )
}
