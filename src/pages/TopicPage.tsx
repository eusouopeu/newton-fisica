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
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{topic.title}</h1>
          <p className="text-sm text-slate-500">{topic.description}</p>
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
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-sky-300 hover:shadow-sm"
            >
              {completed ? (
                <CheckCircleIcon className="h-8 w-8 shrink-0 text-emerald-500" />
              ) : (
                <PlayCircleIcon className="h-8 w-8 shrink-0 text-sky-600" />
              )}
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-slate-900">{lesson.title}</h3>
                <p className="truncate text-sm text-slate-500">{lesson.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
