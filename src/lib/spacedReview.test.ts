import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getDueReviews, scheduleNextReview } from './spacedReview'
import { topics } from '../data/topics'

const realLessonId = topics[0].lessons[0].id

beforeEach(() => {
  localStorage.clear()
  vi.useRealTimers()
})

describe('scheduleNextReview', () => {
  it('schedules the first review 1 day out', () => {
    vi.setSystemTime(new Date('2026-08-13T12:00:00Z'))
    const state = scheduleNextReview(realLessonId)
    expect(state[realLessonId].intervalDays).toBe(1)
    expect(state[realLessonId].dueAt).toBe('2026-08-14')
  })

  it('advances the interval on each successive review', () => {
    vi.setSystemTime(new Date('2026-08-13T12:00:00Z'))
    scheduleNextReview(realLessonId)
    vi.setSystemTime(new Date('2026-08-14T12:00:00Z'))
    const state = scheduleNextReview(realLessonId)
    expect(state[realLessonId].intervalDays).toBe(3)
  })
})

describe('getDueReviews', () => {
  it('returns nothing when no lesson has been scheduled', () => {
    expect(getDueReviews()).toEqual([])
  })

  it('returns a lesson once its due date has passed', () => {
    vi.setSystemTime(new Date('2026-08-01T12:00:00Z'))
    scheduleNextReview(realLessonId)

    vi.setSystemTime(new Date('2026-08-01T18:00:00Z'))
    expect(getDueReviews()).toEqual([])

    vi.setSystemTime(new Date('2026-08-03T12:00:00Z'))
    const due = getDueReviews()
    expect(due).toHaveLength(1)
    expect(due[0].lessonId).toBe(realLessonId)
  })
})
