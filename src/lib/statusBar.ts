import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'

export async function initStatusBar() {
  if (!Capacitor.isNativePlatform()) return
  try {
    await StatusBar.setOverlaysWebView({ overlay: false })
    await StatusBar.setStyle({ style: Style.Light })
    await StatusBar.setBackgroundColor({ color: '#2f6a4b' })
  } catch {
    // status bar plugin unavailable on this platform, ignore
  }
}
