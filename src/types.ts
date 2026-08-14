import type { ComponentType } from 'react'

export type ScreenKind = 'question' | 'simulation' | 'explanation' | 'quiz' | 'problem'

export interface QuizOption {
  id: string
  label: string
  correct: boolean
}

export interface QuizQuestion {
  prompt: string
  options: QuizOption[]
  explanation: string
}

export interface QuestionScreen {
  kind: 'question'
  title: string
  prompt: string
  hint?: string
}

export interface SimulationScreen {
  kind: 'simulation'
  title: string
  instructions: string
  Component: ComponentType
}

export interface ExplanationScreen {
  kind: 'explanation'
  title: string
  body: string[]
  formula?: string
}

export interface QuizScreen {
  kind: 'quiz'
  title: string
  questions: QuizQuestion[]
}

export interface ProblemGiven {
  label: string
  value: string
}

export interface ProblemScreen {
  kind: 'problem'
  title: string
  prompt: string
  givens: ProblemGiven[]
  answer: number
  unit: string
  tolerance: number
  /** Dicas reveladas progressivamente a cada tentativa errada. */
  steps: string[]
}

export type LessonScreen =
  | QuestionScreen
  | SimulationScreen
  | ExplanationScreen
  | QuizScreen
  | ProblemScreen

export interface Lesson {
  id: string
  title: string
  description: string
  screens: LessonScreen[]
}

export interface Topic {
  id: string
  title: string
  subject: 'Cinemática' | 'Dinâmica'
  description: string
  icon: string
  available: boolean
  lessons: Lesson[]
}
