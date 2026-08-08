import type { ComponentType } from 'react'

export type ScreenKind = 'question' | 'simulation' | 'explanation' | 'quiz'

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

export type LessonScreen =
  | QuestionScreen
  | SimulationScreen
  | ExplanationScreen
  | QuizScreen

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
