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

export function touchStreak(state: ProgressState): ProgressState {
  const today = todayISO()
  if (state.lastActiveDate === today) return state

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const wasYesterday = state.lastActiveDate === yesterday.toISOString().slice(0, 10)

  const streak = wasYesterday ? state.streak + 1 : 1
  const next = { ...state, streak, lastActiveDate: today }
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
  if (state.badges.includes(lessonId)) return state
  const next: ProgressState = { ...state, badges: [...state.badges, lessonId] }
  saveProgress(next)
  return next
}

export function hasPerfectBadge(lessonId: string): boolean {
  return loadProgress().badges.includes(lessonId)
}
