import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  awardPerfectBadge,
  checkTopicCompletion,
  exportProgress,
  hasPerfectBadge,
  importProgress,
  loadProgress,
  streakBadgeId,
  topicCompleteBadgeId,
  touchStreak,
  updateLessonProgress,
} from './progress'

beforeEach(() => {
  localStorage.clear()
  vi.useRealTimers()
})

describe('loadProgress', () => {
  it('returns default state when nothing is stored', () => {
    expect(loadProgress()).toEqual({ lessons: {}, lastActiveDate: null, streak: 0, badges: [] })
  })

  it('recovers from corrupted storage instead of throwing', () => {
    localStorage.setItem('newton:progress', '{not valid json')
    expect(loadProgress().streak).toBe(0)
  })
})

describe('touchStreak', () => {
  it('starts the streak at 1 on first activity', () => {
    vi.setSystemTime(new Date('2026-08-13T12:00:00Z'))
    const state = touchStreak(loadProgress())
    expect(state.streak).toBe(1)
    expect(state.lastActiveDate).toBe('2026-08-13')
  })

  it('increments the streak on a consecutive day', () => {
    vi.setSystemTime(new Date('2026-08-12T12:00:00Z'))
    let state = touchStreak(loadProgress())
    vi.setSystemTime(new Date('2026-08-13T12:00:00Z'))
    state = touchStreak(state)
    expect(state.streak).toBe(2)
  })

  it('resets the streak after a missed day', () => {
    vi.setSystemTime(new Date('2026-08-10T12:00:00Z'))
    let state = touchStreak(loadProgress())
    vi.setSystemTime(new Date('2026-08-13T12:00:00Z'))
    state = touchStreak(state)
    expect(state.streak).toBe(1)
  })

  it('does not change the streak twice on the same day', () => {
    vi.setSystemTime(new Date('2026-08-13T08:00:00Z'))
    let state = touchStreak(loadProgress())
    vi.setSystemTime(new Date('2026-08-13T20:00:00Z'))
    state = touchStreak(state)
    expect(state.streak).toBe(1)
  })

  it('awards a streak badge once the milestone is reached', () => {
    let state = loadProgress()
    for (let day = 1; day <= 7; day++) {
      vi.setSystemTime(new Date(Date.UTC(2026, 7, day, 12)))
      state = touchStreak(state)
    }
    expect(state.streak).toBe(7)
    expect(state.badges).toContain(streakBadgeId(7))
  })
})

describe('updateLessonProgress', () => {
  it('marks a lesson completed once every screen is done', () => {
    const state = updateLessonProgress('lesson-1', 4, 4)
    expect(state.lessons['lesson-1']).toEqual({
      completedScreens: 4,
      totalScreens: 4,
      completed: true,
    })
  })

  it('leaves a lesson incomplete when screens remain', () => {
    const state = updateLessonProgress('lesson-1', 2, 4)
    expect(state.lessons['lesson-1'].completed).toBe(false)
  })
})

describe('perfect-lesson badges', () => {
  it('awards the badge once and de-duplicates repeat awards', () => {
    awardPerfectBadge('lesson-1')
    const state = awardPerfectBadge('lesson-1')
    expect(state.badges.filter((id) => id === 'lesson-1')).toHaveLength(1)
    expect(hasPerfectBadge('lesson-1')).toBe(true)
  })

  it('reports false for a lesson never awarded', () => {
    expect(hasPerfectBadge('never-awarded')).toBe(false)
  })
})

describe('checkTopicCompletion', () => {
  it('only awards the topic badge once every lesson is complete', () => {
    updateLessonProgress('l1', 1, 1)
    let state = checkTopicCompletion('topic-x', ['l1', 'l2'])
    expect(state.badges).not.toContain(topicCompleteBadgeId('topic-x'))

    updateLessonProgress('l2', 1, 1)
    state = checkTopicCompletion('topic-x', ['l1', 'l2'])
    expect(state.badges).toContain(topicCompleteBadgeId('topic-x'))
  })
})

describe('export / import', () => {
  it('round-trips progress through a JSON backup', () => {
    updateLessonProgress('l1', 1, 1)
    const json = exportProgress()
    localStorage.clear()
    const restored = importProgress(json)
    expect(restored.lessons.l1.completed).toBe(true)
  })

  it('merges badges from the backup instead of overwriting local ones', () => {
    awardPerfectBadge('local-only')
    const backup = JSON.stringify({
      lessons: {},
      lastActiveDate: null,
      streak: 0,
      badges: ['backup-only'],
    })
    const state = importProgress(backup)
    expect(state.badges).toEqual(expect.arrayContaining(['local-only', 'backup-only']))
  })

  it('throws on invalid backup content', () => {
    expect(() => importProgress('not json')).toThrow()
  })
})
