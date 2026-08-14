import { lazy } from 'react'
import type { ComponentType } from 'react'

export interface LabSimulation {
  id: string
  label: string
  topicTitle: string
  description: string
  Component: ComponentType
}

export const labSimulations: LabSimulation[] = [
  {
    id: 'posicao-tempo-mru',
    label: 'Posição x Tempo (MRU)',
    topicTitle: 'MRU',
    description: 'Ajuste posição inicial e velocidade e veja o gráfico x(t).',
    Component: lazy(() => import('../components/simulations/PositionTimeMRU')),
  },
  {
    id: 'posicao-tempo-mruv',
    label: 'Posição x Tempo (MRUV)',
    topicTitle: 'MRUV',
    description: 'Ajuste posição inicial, velocidade e aceleração.',
    Component: lazy(() => import('../components/simulations/PositionTimeMRUV')),
  },
  {
    id: 'segunda-lei-newton',
    label: 'Segunda Lei de Newton',
    topicTitle: 'Leis de Newton',
    description: 'Relacione força, massa e aceleração livremente.',
    Component: lazy(() => import('../components/simulations/NewtonSecondLaw')),
  },
  {
    id: 'vetores-de-forca',
    label: 'Vetores de Força',
    topicTitle: 'Forças e Vetores',
    description: 'Combine duas forças em ângulos diferentes e veja a resultante.',
    Component: lazy(() => import('../components/simulations/ForceVectors')),
  },
  {
    id: 'plano-inclinado',
    label: 'Plano Inclinado',
    topicTitle: 'Plano Inclinado',
    description: 'Varie ângulo e massa em uma rampa sem atrito.',
    Component: lazy(() => import('../components/simulations/InclinedPlane')),
  },
  {
    id: 'bloco-com-atrito',
    label: 'Bloco com Atrito',
    topicTitle: 'Atrito',
    description: 'Explore o efeito do coeficiente de atrito sobre o movimento.',
    Component: lazy(() => import('../components/simulations/FrictionBlock')),
  },
  {
    id: 'conservacao-de-energia',
    label: 'Conservação de Energia',
    topicTitle: 'Trabalho e Energia',
    description: 'Veja energia potencial virar cinética em uma queda livre.',
    Component: lazy(() => import('../components/simulations/EnergyConservation')),
  },
  {
    id: 'colisao',
    label: 'Colisões',
    topicTitle: 'Impulso e Momento',
    description: 'Compare colisões elásticas e inelásticas entre dois carrinhos.',
    Component: lazy(() => import('../components/simulations/Collision')),
  },
]
