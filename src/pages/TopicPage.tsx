import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, CheckCircleIcon, PlayCircleIcon, StarIcon } from '@heroicons/react/24/solid'
import { getTopic } from '../data/topics'
import { loadProgress } from '../lib/progress'

export default function TopicPage() {
  const { topicId } = useParams()
  const topic = topicId ? getTopic(topicId) : undefined

  if (!topic) return <Navigate to="/" replace />

  const progress = loadProgress()

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 pb-16 pt-6 lg:max-w-3xl">
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
          const inProgress = !completed && (lp?.completedScreens ?? 0) > 0
          const hasBadge = progress.badges.includes(lesson.id)
          return (
            <Link
              key={lesson.id}
              to={`/topic/${topic.id}/lesson/${lesson.id}`}
              className="flex items-center gap-4 rounded-2xl border-2 border-wood-200 bg-paper-50 p-4 shadow-[0_3px_0_0_var(--color-wood-200)] transition hover:border-chalk-300 hover:-translate-y-0.5 hover:shadow-[0_5px_0_0_var(--color-chalk-300)]"
            >
              {completed ? (
                <CheckCircleIcon className="h-9 w-9 shrink-0 text-amber-500" />
              ) : (
                <PlayCircleIcon className="h-9 w-9 shrink-0 text-chalk-600" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-wood-800">{lesson.title}</h3>
                  {hasBadge && <StarIcon className="h-4 w-4 shrink-0 text-amber-500" />}
                </div>
                <p className="truncate text-sm font-medium text-wood-500">
                  {lesson.description}
                </p>
                {inProgress && (
                  <span className="mt-1 inline-block rounded-full bg-chalk-100 px-2 py-0.5 text-xs font-bold text-chalk-700">
                    Continuar de onde parou
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
