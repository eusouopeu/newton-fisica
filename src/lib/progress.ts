const STORAGE_KEY = 'newton:progress'

export interface LessonProgress {
  completedScreens: number
  totalScreens: number
  completed: boolean
}

export interface ProgressState {
  lessons: Record<string, LessonProgress>
  lastActiveDate: string | null
  streak: number
  badges: string[]
}

/** Marcos de streak (em dias) que concedem medalha `streak-<dias>`. */
export const STREAK_MILESTONES = [7, 30, 100]

export function topicCompleteBadgeId(topicId: string): string {
  return `topic-${topicId}-complete`
}

export function streakBadgeId(days: number): string {
  return `streak-${days}`
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function defaultState(): ProgressState {
  return { lessons: {}, lastActiveDate: null, streak: 0, badges: [] }
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as ProgressState
    return { ...defaultState(), ...parsed }
  } catch {
    return defaultState()
  }
}

export function saveProgress(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function awardBadge(state: ProgressState, badgeId: string): ProgressState {
  if (state.badges.includes(badgeId)) return state
  return { ...state, badges: [...state.badges, badgeId] }
}

/** Concede medalhas de streak (7/30/100 dias) ainda não conquistadas. */
function applyStreakBadges(state: ProgressState): ProgressState {
  return STREAK_MILESTONES.filter((days) => state.streak >= days).reduce(
    (acc, days) => awardBadge(acc, streakBadgeId(days)),
    state,
  )
}

export function touchStreak(state: ProgressState): ProgressState {
  const today = todayISO()
  if (state.lastActiveDate === today) return state

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const wasYesterday = state.lastActiveDate === yesterday.toISOString().slice(0, 10)

  const streak = wasYesterday ? state.streak + 1 : 1
  const next = applyStreakBadges({ ...state, streak, lastActiveDate: today })
  saveProgress(next)
  return next
}

export function updateLessonProgress(
  lessonId: string,
  completedScreens: number,
  totalScreens: number,
): ProgressState {
  const state = loadProgress()
  const completed = completedScreens >= totalScreens
  const next: ProgressState = {
    ...state,
    lessons: {
      ...state.lessons,
      [lessonId]: { completedScreens, totalScreens, completed },
    },
  }
  const touched = completed ? touchStreak(next) : next
  saveProgress(touched)
  return touched
}

export function getLessonProgress(lessonId: string): LessonProgress | undefined {
  return loadProgress().lessons[lessonId]
}

/** Medalha concedida quando o quiz de uma lição é concluído sem nenhuma resposta errada. */
export function awardPerfectBadge(lessonId: string): ProgressState {
  const state = loadProgress()
  const next = awardBadge(state, lessonId)
  if (next !== state) saveProgress(next)
  return next
}

export function hasPerfectBadge(lessonId: string): boolean {
  return loadProgress().badges.includes(lessonId)
}

/**
 * Concede a medalha de "tópico completo" se todas as lições de `lessonIds`
 * estiverem marcadas como concluídas. Sem efeito (e sem gravar) caso contrário.
 */
export function checkTopicCompletion(topicId: string, lessonIds: string[]): ProgressState {
  const state = loadProgress()
  if (lessonIds.length === 0) return state
  const allDone = lessonIds.every((id) => state.lessons[id]?.completed)
  if (!allDone) return state
  const next = awardBadge(state, topicCompleteBadgeId(topicId))
  if (next !== state) saveProgress(next)
  return next
}

export function exportProgress(): string {
  return JSON.stringify(loadProgress(), null, 2)
}

/** Mescla um backup exportado anteriormente com o progresso atual (o backup tem prioridade). */
export function importProgress(json: string): ProgressState {
  const parsed = JSON.parse(json) as Partial<ProgressState>
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Arquivo de backup inválido')
  }
  const current = loadProgress()
  const next: ProgressState = {
    lessons: { ...current.lessons, ...parsed.lessons },
    lastActiveDate: parsed.lastActiveDate ?? current.lastActiveDate,
    streak: parsed.streak ?? current.streak,
    badges: Array.from(new Set([...current.badges, ...(parsed.badges ?? [])])),
  }
  saveProgress(next)
  return next
}
