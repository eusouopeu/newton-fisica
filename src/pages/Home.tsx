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
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 pb-16 pt-8">
      <header className="flex items-center justify-between rounded-3xl border-2 border-chalk-700 bg-chalk-600 px-5 py-4 shadow-[0_4px_0_0_var(--color-chalk-800)]">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white">Newton</h1>
          <p className="text-sm font-semibold text-chalk-100">Física por simulação</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-wood-100 px-3 py-1.5 text-wood-700 shadow-[0_2px_0_0_var(--color-wood-300)]">
            <FireIcon className="h-5 w-5 text-orange-500" />
            <span className="font-display font-bold">{progress.streak}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-paper-50 px-3 py-1.5 text-chalk-700 shadow-[0_2px_0_0_var(--color-paper-300)]">
            <TrophyIcon className="h-5 w-5 text-amber-500" />
            <span className="font-display font-bold">
              {completedLessons}/{totalLessons}
            </span>
          </div>
        </div>
      </header>

      {(['Cinemática', 'Dinâmica'] as const).map((subject) => (
        <section key={subject} className="flex flex-col gap-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-wood-500">
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
                const isComplete = lessonProgress?.completed ?? false

                const content = (
                  <div
                    className={`flex items-center gap-4 rounded-2xl border-2 p-4 transition ${
                      topic.available
                        ? 'border-wood-200 bg-white shadow-[0_3px_0_0_var(--color-wood-200)] hover:border-chalk-300 hover:-translate-y-0.5 hover:shadow-[0_5px_0_0_var(--color-chalk-300)]'
                        : 'border-paper-300 bg-paper-100'
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        topic.available
                          ? isComplete
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-chalk-100 text-chalk-600'
                          : 'bg-paper-300 text-paper-500'
                      }`}
                    >
                      <TopicIcon icon={topic.icon} className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-display font-bold ${
                            topic.available ? 'text-wood-800' : 'text-paper-500'
                          }`}
                        >
                          {topic.title}
                        </h3>
                        {!topic.available && (
                          <LockClosedIcon className="h-3.5 w-3.5 text-paper-400" />
                        )}
                      </div>
                      <p
                        className={`truncate text-sm font-medium ${
                          topic.available ? 'text-wood-500' : 'text-paper-400'
                        }`}
                      >
                        {topic.description}
                      </p>
                      {topic.available && (
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-paper-200">
                          <div
                            className="h-full rounded-full bg-chalk-500 transition-all"
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
