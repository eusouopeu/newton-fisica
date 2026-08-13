const STORAGE_KEY = 'newton:settings'

export type ThemeMode = 'system' | 'light' | 'dark'

export interface Settings {
  soundEnabled: boolean
  hapticsEnabled: boolean
  themeMode: ThemeMode
  remindersEnabled: boolean
}

function defaultSettings(): Settings {
  return {
    soundEnabled: true,
    hapticsEnabled: true,
    themeMode: 'system',
    remindersEnabled: false,
  }
}

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultSettings()
    return { ...defaultSettings(), ...(JSON.parse(raw) as Settings) }
  } catch {
    return defaultSettings()
  }
}

export function saveSettings(settings: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function toggleSound(): Settings {
  const next = { ...loadSettings() }
  next.soundEnabled = !next.soundEnabled
  saveSettings(next)
  return next
}

export function setThemeMode(mode: ThemeMode): Settings {
  const next = { ...loadSettings(), themeMode: mode }
  saveSettings(next)
  return next
}

export function toggleReminders(): Settings {
  const next = { ...loadSettings() }
  next.remindersEnabled = !next.remindersEnabled
  saveSettings(next)
  return next
}

export function applyThemeMode(mode: ThemeMode) {
  if (typeof document === 'undefined') return
  const prefersDark =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const isDark = mode === 'dark' || (mode === 'system' && prefersDark)
  document.documentElement.classList.toggle('dark', isDark)

  const meta = document.querySelector('meta[name="theme-color"]')
  meta?.setAttribute('content', isDark ? '#181d17' : '#2f6a4b')
}
