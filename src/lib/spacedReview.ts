import { topics } from '../data/topics'

const STORAGE_KEY = 'newton:review'

export interface ReviewEntry {
  lastReviewedAt: string
  intervalDays: number
  dueAt: string
}

export type ReviewState = Record<string, ReviewEntry>

/** Intervalos (em dias) usados a cada repetição sucessiva, estilo SM-2 simplificado. */
const INTERVAL_STEPS = [1, 3, 7, 16, 35]

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function addDaysISO(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function loadState(): ReviewState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as ReviewState
  } catch {
    return {}
  }
}

function saveState(state: ReviewState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

/** Agenda a próxima revisão de uma lição, avançando o intervalo a cada repetição. */
export function scheduleNextReview(lessonId: string): ReviewState {
  const state = loadState()
  const current = state[lessonId]
  const stepIndex = current
    ? Math.min(INTERVAL_STEPS.indexOf(current.intervalDays) + 1, INTERVAL_STEPS.length - 1)
    : 0
  const intervalDays = INTERVAL_STEPS[Math.max(stepIndex, 0)]
  const next: ReviewState = {
    ...state,
    [lessonId]: {
      lastReviewedAt: todayISO(),
      intervalDays,
      dueAt: addDaysISO(intervalDays),
    },
  }
  saveState(next)
  return next
}

export interface DueReview {
  lessonId: string
  topicId: string
  lessonTitle: string
  topicTitle: string
}

/** Lições cuja data de revisão já venceu, com dados suficientes para linkar. */
export function getDueReviews(): DueReview[] {
  const state = loadState()
  const today = todayISO()
  const due: DueReview[] = []

  for (const topic of topics) {
    for (const lesson of topic.lessons) {
      const entry = state[lesson.id]
      if (entry && entry.dueAt <= today) {
        due.push({
          lessonId: lesson.id,
          topicId: topic.id,
          lessonTitle: lesson.title,
          topicTitle: topic.title,
        })
      }
    }
  }
  return due
}
