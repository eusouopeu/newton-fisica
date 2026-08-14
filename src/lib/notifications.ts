import { loadSettings } from './settings'
import { getDueReviews } from './spacedReview'

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

/**
 * Notifica sobre lições vencidas para revisão espaçada. Mesma limitação da
 * função acima: só dispara enquanto o app/aba está aberto, não é um alarme
 * garantido em segundo plano.
 */
export async function maybeNotifyDueReviews() {
  if (!supported() || Notification.permission !== 'granted') return
  if (!loadSettings().remindersEnabled) return

  const due = getDueReviews()
  if (due.length === 0) return

  const icon = `${import.meta.env.BASE_URL}icons/icon-192.webp`
  const title = 'Hora de revisar! 🧠'
  const body =
    due.length === 1
      ? `"${due[0].lessonTitle}" está pedindo uma revisão rápida.`
      : `${due.length} lições estão pedindo uma revisão rápida.`

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
