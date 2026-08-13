import { Link } from 'react-router-dom'
import { ArrowLeftIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import { topics } from '../data/topics'
import { loadProgress } from '../lib/progress'

export default function FormulasPage() {
  const progress = loadProgress()

  const entries = topics
    .filter((t) => t.available)
    .flatMap((topic) =>
      topic.lessons.flatMap((lesson) => {
        const formulaScreen = lesson.screens.find(
          (s) => s.kind === 'explanation' && s.formula,
        )
        if (!formulaScreen || formulaScreen.kind !== 'explanation' || !formulaScreen.formula) {
          return []
        }
        const unlocked = progress.lessons[lesson.id]?.completed ?? false
        return [
          {
            topicTitle: topic.title,
            lessonTitle: lesson.title,
            formula: formulaScreen.formula,
            unlocked,
          },
        ]
      }),
    )

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 pb-16 pt-6 lg:max-w-3xl">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-wood-500 hover:bg-wood-100"
          aria-label="Voltar"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-display text-xl font-bold text-wood-800">Caderno de Fórmulas</h1>
          <p className="text-sm font-medium text-wood-500">
            As fórmulas desbloqueiam conforme você completa as lições.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {entries.map((entry) => (
          <div
            key={entry.lessonTitle}
            className="rounded-2xl border-2 border-wood-200 bg-paper-50 p-4 shadow-[0_3px_0_0_var(--color-wood-200)]"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-wood-400">
              {entry.topicTitle} · {entry.lessonTitle}
            </p>
            {entry.unlocked ? (
              <p className="mt-1.5 font-mono text-base font-bold text-chalk-700">
                {entry.formula}
              </p>
            ) : (
              <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-paper-500">
                <LockClosedIcon className="h-4 w-4" />
                Complete a lição para desbloquear
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
