const STORAGE_KEY = 'newton:settings'

export interface Settings {
  soundEnabled: boolean
  hapticsEnabled: boolean
}

function defaultSettings(): Settings {
  return { soundEnabled: true, hapticsEnabled: true }
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
