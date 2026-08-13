import { loadSettings } from './settings'

function enabled(): boolean {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator && loadSettings().hapticsEnabled
}

function vibrate(pattern: number | number[]) {
  if (!enabled()) return
  try {
    navigator.vibrate(pattern)
  } catch {
    // vibração indisponível neste navegador, ignora
  }
}

export async function hapticSuccess() {
  vibrate([15, 30, 15])
}

export async function hapticError() {
  vibrate(80)
}

export async function hapticTap() {
  vibrate(10)
}

export async function hapticCelebrate() {
  vibrate([20, 40, 20, 40, 30])
}
