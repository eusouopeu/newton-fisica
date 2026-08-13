import { Suspense, lazy, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { applyThemeMode, loadSettings } from './lib/settings'
import { loadProgress } from './lib/progress'
import { maybeNotifyStreakReminder } from './lib/notifications'
import ErrorBoundary from './components/ErrorBoundary'

const TopicPage = lazy(() => import('./pages/TopicPage'))
const LessonPage = lazy(() => import('./pages/LessonPage'))
const FormulasPage = lazy(() => import('./pages/FormulasPage'))

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-chalk-200 border-t-chalk-600" />
    </div>
  )
}

function App() {
  useEffect(() => {
    void maybeNotifyStreakReminder(loadProgress().lastActiveDate)
  }, [])

  useEffect(() => {
    applyThemeMode(loadSettings().themeMode)
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (loadSettings().themeMode === 'system') applyThemeMode('system')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return (
    <HashRouter>
      <div
        className="min-h-full bg-paper-100"
        style={{
          paddingTop: 'var(--safe-top)',
          paddingBottom: 'var(--safe-bottom)',
          paddingLeft: 'var(--safe-left)',
          paddingRight: 'var(--safe-right)',
        }}
      >
        <ErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/formulas" element={<FormulasPage />} />
              <Route path="/topic/:topicId" element={<TopicPage />} />
              <Route path="/topic/:topicId/lesson/:lessonId" element={<LessonPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </HashRouter>
  )
}

export default App
