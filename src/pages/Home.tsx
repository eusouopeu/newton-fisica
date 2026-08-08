import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FireIcon, LockClosedIcon, TrophyIcon } from '@heroicons/react/24/solid'
import { topics } from '../data/topics'
import { loadProgress, type ProgressState } from '../lib/progress'
import TopicIcon from '../components/TopicIcon'

export default function Home() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress())

  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  const completedLessons = Object.values(progress.lessons).filter((l) => l.completed).length
  const totalLessons = topics.flatMap((t) => t.lessons).length

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pb-16 pt-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Newton</h1>
          <p className="text-sm text-slate-500">Física por simulação</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-orange-700">
            <FireIcon className="h-5 w-5" />
            <span className="font-semibold">{progress.streak}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-sky-700">
            <TrophyIcon className="h-5 w-5" />
            <span className="font-semibold">
              {completedLessons}/{totalLessons}
            </span>
          </div>
        </div>
      </header>

      {(['Cinemática', 'Dinâmica'] as const).map((subject) => (
        <section key={subject} className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            {subject}
          </h2>
          <div className="flex flex-col gap-3">
            {topics
              .filter((t) => t.subject === subject)
              .map((topic) => {
                const lesson = topic.lessons[0]
                const lessonProgress = lesson ? progress.lessons[lesson.id] : undefined
                const pct = lessonProgress
                  ? Math.round(
                      (lessonProgress.completedScreens / lessonProgress.totalScreens) * 100,
                    )
                  : 0

                const content = (
                  <div
                    className={`flex items-center gap-4 rounded-2xl border p-4 transition ${
                      topic.available
                        ? 'border-slate-200 bg-white hover:border-sky-300 hover:shadow-sm'
                        : 'border-slate-100 bg-slate-50'
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        topic.available ? 'bg-sky-100 text-sky-600' : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      <TopicIcon icon={topic.icon} className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-medium ${
                            topic.available ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {topic.title}
                        </h3>
                        {!topic.available && <LockClosedIcon className="h-3.5 w-3.5 text-slate-300" />}
                      </div>
                      <p
                        className={`truncate text-sm ${
                          topic.available ? 'text-slate-500' : 'text-slate-300'
                        }`}
                      >
                        {topic.description}
                      </p>
                      {topic.available && (
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-sky-500 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )

                return topic.available ? (
                  <Link key={topic.id} to={`/topic/${topic.id}`}>
                    {content}
                  </Link>
                ) : (
                  <div key={topic.id} className="cursor-not-allowed">
                    {content}
                  </div>
                )
              })}
          </div>
        </section>
      ))}
    </div>
  )
}
