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
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function defaultState(): ProgressState {
  return { lessons: {}, lastActiveDate: null, streak: 0 }
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
