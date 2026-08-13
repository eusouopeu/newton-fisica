import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import QuizScreenView from './QuizScreenView'
import type { QuizScreen } from '../../types'

const twoQuestionScreen: QuizScreen = {
  kind: 'quiz',
  title: 'Mini-quiz',
  questions: [
    {
      prompt: 'Pergunta 1',
      options: [
        { id: 'a', label: 'Errada', correct: false },
        { id: 'b', label: 'Certa', correct: true },
      ],
      explanation: 'Explicação 1',
    },
    {
      prompt: 'Pergunta 2',
      options: [
        { id: 'a', label: 'Certa 2', correct: true },
        { id: 'b', label: 'Errada 2', correct: false },
      ],
      explanation: 'Explicação 2',
    },
  ],
}

describe('QuizScreenView', () => {
  it('calls onNext with an empty list when every answer is correct', async () => {
    const user = userEvent.setup()
    const onNext = vi.fn()
    render(<QuizScreenView screen={twoQuestionScreen} onNext={onNext} />)

    await user.click(screen.getByRole('button', { name: 'Certa' }))
    expect(screen.getByText('Explicação 1')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Próxima pergunta' }))

    await user.click(screen.getByRole('button', { name: 'Certa 2' }))
    await user.click(screen.getByRole('button', { name: 'Concluir lição' }))

    expect(onNext).toHaveBeenCalledWith([])
  })

  it('records a wrong answer and still lets the user continue', async () => {
    const user = userEvent.setup()
    const onNext = vi.fn()
    render(<QuizScreenView screen={twoQuestionScreen} onNext={onNext} />)

    await user.click(screen.getByRole('button', { name: 'Errada' }))
    await user.click(screen.getByRole('button', { name: 'Próxima pergunta' }))
    await user.click(screen.getByRole('button', { name: 'Certa 2' }))
    await user.click(screen.getByRole('button', { name: 'Concluir lição' }))

    expect(onNext).toHaveBeenCalledWith([
      {
        prompt: 'Pergunta 1',
        chosenLabel: 'Errada',
        correctLabel: 'Certa',
        explanation: 'Explicação 1',
      },
    ])
  })

  it('disables the other options once one has been picked', async () => {
    const user = userEvent.setup()
    render(<QuizScreenView screen={twoQuestionScreen} onNext={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Certa' }))
    expect(screen.getByRole('button', { name: 'Errada' })).toBeDisabled()
  })
})
