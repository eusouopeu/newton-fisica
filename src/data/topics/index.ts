import type { Topic } from '../../types'
import { mruTopic } from './mru'
import { mruvTopic } from './mruv'
import { leisNewtonTopic } from './leis-newton'
import { forcasVetoresTopic } from './forcas-vetores'
import { planoInclinadoTopic } from './plano-inclinado'
import { atritoTopic } from './atrito'

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
  ...comingSoon,
]

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id)
}
