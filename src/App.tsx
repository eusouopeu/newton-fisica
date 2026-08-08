import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import TopicPage from './pages/TopicPage'
import LessonPage from './pages/LessonPage'

function App() {
  return (
    <HashRouter>
      <div className="min-h-full bg-slate-50">
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
