import { loadSettings } from './settings'

function supported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window
}

export async function requestReminderPermission(): Promise<boolean> {
  if (!supported()) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false
  try {
    const result = await Notification.requestPermission()
    return result === 'granted'
  } catch {
    return false
  }
}

/**
 * Mostra um lembrete se o usuário ainda não esteve ativo hoje. Como o app é um
 * site estático (sem servidor de push), isso só funciona enquanto o navegador
 * consegue rodar o service worker — não é um alarme garantido às 20h como um
 * app nativo faria, mas cobre o caso comum de reabrir a aba/PWA depois de um tempo.
 */
export async function maybeNotifyStreakReminder(lastActiveDate: string | null) {
  if (!supported() || Notification.permission !== 'granted') return
  if (!loadSettings().remindersEnabled) return

  const today = new Date().toISOString().slice(0, 10)
  if (lastActiveDate === today) return

  const icon = `${import.meta.env.BASE_URL}icons/icon-192.webp`
  const body = 'Faça uma lição rápida no Newton para manter sua sequência viva.'
  const title = 'Não perca sua sequência! 🔥'

  try {
    const registration = await navigator.serviceWorker?.getRegistration()
    if (registration) {
      await registration.showNotification(title, { body, icon })
    } else {
      new Notification(title, { body, icon })
    }
  } catch {
    // notificações indisponíveis neste navegador, ignora
  }
}
