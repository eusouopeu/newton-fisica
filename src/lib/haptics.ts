import { Capacitor } from '@capacitor/core'
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'
import { loadSettings } from './settings'

function enabled(): boolean {
  return Capacitor.isNativePlatform() && loadSettings().hapticsEnabled
}

export async function hapticSuccess() {
  if (!enabled()) return
  try {
    await Haptics.notification({ type: NotificationType.Success })
  } catch {
    // haptics unavailable, ignore
  }
}

export async function hapticError() {
  if (!enabled()) return
  try {
    await Haptics.notification({ type: NotificationType.Error })
  } catch {
    // haptics unavailable, ignore
  }
}

export async function hapticTap() {
  if (!enabled()) return
  try {
    await Haptics.impact({ style: ImpactStyle.Light })
  } catch {
    // haptics unavailable, ignore
  }
}

export async function hapticCelebrate() {
  if (!enabled()) return
  try {
    await Haptics.impact({ style: ImpactStyle.Medium })
  } catch {
    // haptics unavailable, ignore
  }
}
