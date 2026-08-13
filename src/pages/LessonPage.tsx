import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getTopic } from '../data/topics'
import LessonRunner from '../components/LessonRunner'

export default function LessonPage() {
  const { topicId, lessonId } = useParams()
  const navigate = useNavigate()
  const topic = topicId ? getTopic(topicId) : undefined
  const lesson = topic?.lessons.find((l) => l.id === lessonId)

  if (!topic || !lesson) return <Navigate to="/" replace />

  return (
    <LessonRunner
      key={lesson.id}
      topicId={topic.id}
      lesson={lesson}
      topicLessonIds={topic.lessons.map((l) => l.id)}
      onBack={() => navigate(`/topic/${topic.id}`)}
    />
  )
}
