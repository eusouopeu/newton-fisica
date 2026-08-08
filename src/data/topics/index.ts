import type { Topic } from '../../types'
import { mruTopic } from './mru'
import { mruvTopic } from './mruv'
import { leisNewtonTopic } from './leis-newton'

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
  {
    id: 'forcas-vetores',
    title: 'Forças e Vetores',
    subject: 'Dinâmica',
    description: 'Composição e decomposição de forças.',
    icon: 'arrows-pointing-out',
    available: false,
    lessons: [],
  },
  {
    id: 'plano-inclinado',
    title: 'Plano Inclinado',
    subject: 'Dinâmica',
    description: 'Componentes da gravidade em superfícies inclinadas.',
    icon: 'triangle',
    available: false,
    lessons: [],
  },
  {
    id: 'atrito',
    title: 'Atrito',
    subject: 'Dinâmica',
    description: 'Atrito estático e cinético.',
    icon: 'hand-raised',
    available: false,
    lessons: [],
  },
]

export const topics: Topic[] = [
  mruTopic,
  mruvTopic,
  leisNewtonTopic,
  ...comingSoon,
]

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id)
}
