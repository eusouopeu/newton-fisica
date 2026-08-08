import { useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import TopicPage from './pages/TopicPage'
import LessonPage from './pages/LessonPage'
import { initStatusBar } from './lib/statusBar'

function App() {
  useEffect(() => {
    void initStatusBar()
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:topicId" element={<TopicPage />} />
          <Route path="/topic/:topicId/lesson/:lessonId" element={<LessonPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
