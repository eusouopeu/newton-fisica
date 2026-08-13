import { beforeEach, describe, expect, it } from 'vitest'
import { loadSettings, setThemeMode, toggleReminders, toggleSound } from './settings'

beforeEach(() => {
  localStorage.clear()
})

describe('loadSettings', () => {
  it('returns defaults when nothing is stored', () => {
    expect(loadSettings()).toEqual({
      soundEnabled: true,
      hapticsEnabled: true,
      themeMode: 'system',
      remindersEnabled: false,
    })
  })
})

describe('toggleSound', () => {
  it('flips soundEnabled and persists it', () => {
    expect(toggleSound().soundEnabled).toBe(false)
    expect(loadSettings().soundEnabled).toBe(false)
    expect(toggleSound().soundEnabled).toBe(true)
  })
})

describe('setThemeMode', () => {
  it('persists the chosen theme mode', () => {
    setThemeMode('dark')
    expect(loadSettings().themeMode).toBe('dark')
  })
})

describe('toggleReminders', () => {
  it('flips remindersEnabled and persists it', () => {
    expect(toggleReminders().remindersEnabled).toBe(true)
    expect(loadSettings().remindersEnabled).toBe(true)
    expect(toggleReminders().remindersEnabled).toBe(false)
  })
})
