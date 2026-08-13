import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  BellIcon,
  BellSlashIcon,
  BookOpenIcon,
  FireIcon,
  LockClosedIcon,
  MoonIcon,
  ShareIcon,
  SparklesIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  StarIcon,
  SunIcon,
  TrophyIcon,
} from '@heroicons/react/24/solid'
import { topics } from '../data/topics'
import { exportProgress, importProgress, loadProgress, type ProgressState } from '../lib/progress'
import {
  applyThemeMode,
  loadSettings,
  setThemeMode,
  toggleReminders,
  toggleSound,
  type Settings,
} from '../lib/settings'
import { requestReminderPermission } from '../lib/notifications'
import { hasSeenOnboarding } from '../lib/onboarding'
import TopicIcon from '../components/TopicIcon'
import Onboarding from '../components/Onboarding'

function badgeLabel(badgeId: string): string {
  const streakMatch = badgeId.match(/^streak-(\d+)$/)
  if (streakMatch) return `${streakMatch[1]} dias seguidos`

  const topicMatch = badgeId.match(/^topic-(.+)-complete$/)
  if (topicMatch) {
    const topic = topics.find((t) => t.id === topicMatch[1])
    return topic ? `${topic.title} completo` : 'Tópico completo'
  }

  for (const topic of topics) {
    const lesson = topic.lessons.find((l) => l.id === badgeId)
    if (lesson) return `${lesson.title}: sem erros`
  }
  return 'Medalha'
}

export default function Home() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress())
  const [settings, setSettings] = useState<Settings>(() => loadSettings())
  const [tappedLocked, setTappedLocked] = useState<string | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const [shareCopied, setShareCopied] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(() => !hasSeenOnboarding())
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  useEffect(() => {
    if (!tappedLocked) return
    const timer = setTimeout(() => setTappedLocked(null), 2500)
    return () => clearTimeout(timer)
  }, [tappedLocked])

  useEffect(() => {
    if (!shareCopied) return
    const timer = setTimeout(() => setShareCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [shareCopied])

  const completedLessons = Object.values(progress.lessons).filter((l) => l.completed).length
  const totalLessons = topics.flatMap((t) => t.lessons).length

  function cycleTheme() {
    const next = settings.themeMode === 'light' ? 'dark' : settings.themeMode === 'dark' ? 'system' : 'light'
    const updated = setThemeMode(next)
    applyThemeMode(next)
    setSettings(updated)
  }

  async function handleToggleReminders() {
    const updated = toggleReminders()
    setSettings(updated)
    if (updated.remindersEnabled) {
      const granted = await requestReminderPermission()
      if (!granted) setSettings(toggleReminders())
    }
  }

  async function handleShare() {
    const text = `Estou com uma sequência de ${progress.streak} dia${progress.streak === 1 ? '' : 's'} e ${progress.badges.length} medalha${progress.badges.length === 1 ? '' : 's'} no Newton — Física por simulação! 🔥`
    const url = `${window.location.origin}${window.location.pathname}`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Newton — Física por simulação', text, url })
      } catch {
        // usuário cancelou o compartilhamento, ignora
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${text} ${url}`)
      setShareCopied(true)
    }
  }

  function handleExport() {
    const json = exportProgress()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newton-progresso-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImportClick() {
    setImportError(null)
    fileInputRef.current?.click()
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const next = importProgress(String(reader.result))
        setProgress(next)
        setImportError(null)
      } catch {
        setImportError('Não foi possível ler esse arquivo de backup.')
      }
    }
    reader.readAsText(file)
  }

  const themeIcon =
    settings.themeMode === 'dark' ? (
      <MoonIcon className="h-5 w-5" />
    ) : settings.themeMode === 'light' ? (
      <SunIcon className="h-5 w-5" />
    ) : (
      <SunIcon className="h-5 w-5 opacity-60" />
    )

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 pb-16 pt-8 lg:max-w-3xl">
      {showOnboarding && <Onboarding onClose={() => setShowOnboarding(false)} />}
      <header className="flex items-center justify-between rounded-3xl border-2 border-chalk-700 bg-chalk-600 px-5 py-4 shadow-[0_4px_0_0_var(--color-chalk-800)]">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white">Newton</h1>
          <p className="text-sm font-semibold text-chalk-100">Física por simulação</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Link
            to="/formulas"
            aria-label="Caderno de fórmulas"
            title="Caderno de fórmulas"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-chalk-700 text-chalk-100 hover:bg-chalk-800"
          >
            <BookOpenIcon className="h-5 w-5" />
          </Link>
          <button
            onClick={cycleTheme}
            aria-label={`Tema: ${settings.themeMode === 'system' ? 'automático' : settings.themeMode === 'dark' ? 'escuro' : 'claro'}. Tocar para trocar.`}
            title="Trocar tema"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-chalk-700 text-chalk-100 hover:bg-chalk-800"
          >
            {themeIcon}
          </button>
          <button
            onClick={() => setSettings(toggleSound())}
            aria-label={settings.soundEnabled ? 'Desativar som' : 'Ativar som'}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-chalk-700 text-chalk-100 hover:bg-chalk-800"
          >
            {settings.soundEnabled ? (
              <SpeakerWaveIcon className="h-5 w-5" />
            ) : (
              <SpeakerXMarkIcon className="h-5 w-5" />
            )}
          </button>
          <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-amber-700 shadow-[0_2px_0_0_#fcd34d]">
            <StarIcon className="h-5 w-5 text-amber-500" />
            <span className="font-display font-bold">{progress.badges.length}</span>
          </div>
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

      <section className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-wood-200 bg-paper-50 px-4 py-3">
        <button
          onClick={() => void handleToggleReminders()}
          className="flex items-center gap-1.5 rounded-full border-2 border-wood-200 bg-paper-50 px-3 py-1.5 text-xs font-bold text-wood-600 hover:border-chalk-300"
        >
          {settings.remindersEnabled ? (
            <BellIcon className="h-4 w-4 text-chalk-600" />
          ) : (
            <BellSlashIcon className="h-4 w-4" />
          )}
          Lembrete diário
        </button>
        <button
          onClick={() => void handleShare()}
          className="flex items-center gap-1.5 rounded-full border-2 border-wood-200 bg-paper-50 px-3 py-1.5 text-xs font-bold text-wood-600 hover:border-chalk-300"
        >
          <ShareIcon className="h-4 w-4" />
          {shareCopied ? 'Copiado!' : 'Compartilhar'}
        </button>
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 rounded-full border-2 border-wood-200 bg-paper-50 px-3 py-1.5 text-xs font-bold text-wood-600 hover:border-chalk-300"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          Exportar progresso
        </button>
        <button
          onClick={handleImportClick}
          className="flex items-center gap-1.5 rounded-full border-2 border-wood-200 bg-paper-50 px-3 py-1.5 text-xs font-bold text-wood-600 hover:border-chalk-300"
        >
          <ArrowUpTrayIcon className="h-4 w-4" />
          Importar backup
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleImportFile}
          aria-hidden="true"
        />
        {importError && <p className="w-full text-xs font-semibold text-rose-600">{importError}</p>}
      </section>

      {progress.badges.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-wood-500">
            Medalhas
          </h2>
          <div className="flex flex-wrap gap-2">
            {progress.badges.map((badgeId) => (
              <div
                key={badgeId}
                className="flex items-center gap-1.5 rounded-full border-2 border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 shadow-[0_2px_0_0_#fcd34d]"
              >
                <SparklesIcon className="h-4 w-4 text-amber-500" />
                {badgeLabel(badgeId)}
              </div>
            ))}
          </div>
        </section>
      )}

      {(['Cinemática', 'Dinâmica'] as const).map((subject) => (
        <section key={subject} className="flex flex-col gap-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-wood-500">
            {subject}
          </h2>
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
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
                const hasBadge = lesson ? progress.badges.includes(lesson.id) : false

                const content = (
                  <div
                    className={`flex items-center gap-4 rounded-2xl border-2 p-4 transition ${
                      topic.available
                        ? 'border-wood-200 bg-paper-50 shadow-[0_3px_0_0_var(--color-wood-200)] hover:border-chalk-300 hover:-translate-y-0.5 hover:shadow-[0_5px_0_0_var(--color-chalk-300)]'
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
                        {hasBadge && <StarIcon className="h-4 w-4 shrink-0 text-amber-500" />}
                        {!topic.available && (
                          <LockClosedIcon className="h-3.5 w-3.5 text-paper-400" aria-hidden="true" />
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
                        <div
                          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-paper-200"
                          role="progressbar"
                          aria-valuenow={pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Progresso em ${topic.title}`}
                        >
                          <div
                            className="h-full rounded-full bg-chalk-500 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      )}
                      {!topic.available && tappedLocked === topic.id && (
                        <p className="mt-1 text-xs font-bold text-wood-500">
                          Em breve 🚧 — continue completando os tópicos disponíveis!
                        </p>
                      )}
                    </div>
                  </div>
                )

                return topic.available ? (
                  <Link key={topic.id} to={`/topic/${topic.id}`}>
                    {content}
                  </Link>
                ) : (
                  <button
                    key={topic.id}
                    type="button"
                    aria-disabled="true"
                    aria-label={`${topic.title}: em breve, ainda não disponível`}
                    onClick={() => setTappedLocked(topic.id)}
                    className="cursor-not-allowed text-left"
                  >
                    {content}
                  </button>
                )
              })}
          </div>
        </section>
      ))}
    </div>
  )
}
