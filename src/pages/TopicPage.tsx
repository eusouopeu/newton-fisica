import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, CheckCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import { getTopic } from '../data/topics'
import { loadProgress } from '../lib/progress'

export default function TopicPage() {
  const { topicId } = useParams()
  const topic = topicId ? getTopic(topicId) : undefined

  if (!topic) return <Navigate to="/" replace />

  const progress = loadProgress()

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 pb-16 pt-6">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-wood-500 hover:bg-wood-100"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-display text-xl font-bold text-wood-800">{topic.title}</h1>
          <p className="text-sm font-medium text-wood-500">{topic.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {topic.lessons.map((lesson) => {
          const lp = progress.lessons[lesson.id]
          const completed = lp?.completed ?? false
          return (
            <Link
              key={lesson.id}
              to={`/topic/${topic.id}/lesson/${lesson.id}`}
              className="flex items-center gap-4 rounded-2xl border-2 border-wood-200 bg-white p-4 shadow-[0_3px_0_0_var(--color-wood-200)] transition hover:border-chalk-300 hover:-translate-y-0.5 hover:shadow-[0_5px_0_0_var(--color-chalk-300)]"
            >
              {completed ? (
                <CheckCircleIcon className="h-9 w-9 shrink-0 text-amber-500" />
              ) : (
                <PlayCircleIcon className="h-9 w-9 shrink-0 text-chalk-600" />
              )}
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-bold text-wood-800">{lesson.title}</h3>
                <p className="truncate text-sm font-medium text-wood-500">
                  {lesson.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
