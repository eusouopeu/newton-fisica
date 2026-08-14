import type { QuizQuestion, Topic } from '../../types'
import { mruTopic } from './mru'
import { mruvTopic } from './mruv'
import { leisNewtonTopic } from './leis-newton'
import { forcasVetoresTopic } from './forcas-vetores'
import { planoInclinadoTopic } from './plano-inclinado'
import { atritoTopic } from './atrito'
import { trabalhoEnergiaTopic } from './trabalho-energia'
import { impulsoMomentoTopic } from './impulso-momento'

const comingSoon: Topic[] = [
  {
    id: 'projeteis',
    title: 'Lançamento de Projéteis',
    subject: 'Cinemática',
    description: 'Trajetórias, alcance e altura máxima.',
    icon: 'rocket-launch',
    available: false,
    lessons: [],
  },
]

export const topics: Topic[] = [
  mruTopic,
  mruvTopic,
  leisNewtonTopic,
  forcasVetoresTopic,
  planoInclinadoTopic,
  atritoTopic,
  trabalhoEnergiaTopic,
  impulsoMomentoTopic,
  ...comingSoon,
]

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id)
}

/** Agrega as perguntas de todas as telas de quiz das lições de um tópico, para o quiz de revisão. */
export function getTopicReviewQuestions(topic: Topic): QuizQuestion[] {
  return topic.lessons.flatMap((lesson) =>
    lesson.screens.filter((s) => s.kind === 'quiz').flatMap((s) => s.questions),
  )
}
