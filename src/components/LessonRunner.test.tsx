import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import LessonRunner from './LessonRunner'
import type { Lesson } from '../types'
import { hasPerfectBadge, loadProgress } from '../lib/progress'

const fakeLesson: Lesson = {
  id: 'test-lesson',
  title: 'Lição de Teste',
  description: 'Uma lição mínima para testar o fluxo do LessonRunner.',
  screens: [
    {
      kind: 'question',
      title: 'Pergunta de teste',
      prompt: 'Quanto é 2 + 2?',
      hint: 'Conte nos dedos.',
    },
    {
      kind: 'quiz',
      title: 'Quiz',
      questions: [
        {
          prompt: 'Quanto é 2 + 2?',
          options: [
            { id: 'a', label: '3', correct: false },
            { id: 'b', label: '4', correct: true },
          ],
          explanation: '2 + 2 = 4.',
        },
      ],
    },
  ],
}

const lessonWithProblem: Lesson = {
  id: 'problem-lesson',
  title: 'Lição com Problema',
  description: 'Lição para testar a tela de problema.',
  screens: [
    {
      kind: 'problem',
      title: 'Resolva',
      prompt: 'Quanto é 4 + 4?',
      givens: [],
      answer: 8,
      unit: '',
      tolerance: 0,
      steps: ['Some 4 + 4.'],
    },
  ],
}

beforeEach(() => {
  localStorage.clear()
})

function renderRunner(lesson: Lesson = fakeLesson, onBack = vi.fn()) {
  return render(
    <MemoryRouter>
      <LessonRunner
        topicId="topico-teste"
        lesson={lesson}
        topicLessonIds={[lesson.id]}
        onBack={onBack}
      />
    </MemoryRouter>,
  )
}

describe('LessonRunner', () => {
  it('advances from the question screen to the quiz', async () => {
    const user = userEvent.setup()
    renderRunner()

    expect(screen.getByText('Quanto é 2 + 2?')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Vamos explorar' }))

    expect(screen.getByText('Quiz')).toBeInTheDocument()
  })

  it('awards the perfect badge after a first-try correct answer', async () => {
    const user = userEvent.setup()
    renderRunner()

    await user.click(screen.getByRole('button', { name: 'Vamos explorar' }))
    await user.click(screen.getByRole('button', { name: '4' }))
    await user.click(screen.getByRole('button', { name: 'Concluir lição' }))

    expect(screen.getByText('Lição concluída!')).toBeInTheDocument()
    expect(screen.getByText(/Medalha conquistada/)).toBeInTheDocument()
    expect(hasPerfectBadge('test-lesson')).toBe(true)
  })

  it('skips the badge and lists the mistake after a wrong answer', async () => {
    const user = userEvent.setup()
    renderRunner()

    await user.click(screen.getByRole('button', { name: 'Vamos explorar' }))
    await user.click(screen.getByRole('button', { name: '3' }))
    await user.click(screen.getByRole('button', { name: 'Concluir lição' }))

    expect(screen.queryByText(/Medalha conquistada/)).not.toBeInTheDocument()
    expect(screen.getByText('Vale revisar:')).toBeInTheDocument()
    expect(hasPerfectBadge('test-lesson')).toBe(false)
  })

  it('persists lesson completion to progress storage', async () => {
    const user = userEvent.setup()
    renderRunner()

    await user.click(screen.getByRole('button', { name: 'Vamos explorar' }))
    await user.click(screen.getByRole('button', { name: '4' }))
    await user.click(screen.getByRole('button', { name: 'Concluir lição' }))

    expect(loadProgress().lessons['test-lesson'].completed).toBe(true)
  })
})

describe('LessonRunner — problem screen', () => {
  it('reveals a hint after a wrong answer, then completes on the right one', async () => {
    const user = userEvent.setup()
    renderRunner(lessonWithProblem)

    await user.type(screen.getByPlaceholderText('Sua resposta'), '7')
    await user.click(screen.getByRole('button', { name: 'Conferir' }))

    expect(screen.getByText('Some 4 + 4.')).toBeInTheDocument()

    await user.clear(screen.getByPlaceholderText('Sua resposta'))
    await user.type(screen.getByPlaceholderText('Sua resposta'), '8')
    await user.click(screen.getByRole('button', { name: 'Conferir' }))

    expect(screen.getByText(/Isso mesmo/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Continuar' }))

    expect(screen.getByText('Lição concluída!')).toBeInTheDocument()
    expect(loadProgress().lessons['problem-lesson'].completed).toBe(true)
  })
})
