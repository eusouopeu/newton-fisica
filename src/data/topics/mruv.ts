import type { Topic } from '../../types'
import PositionTimeMRUV from '../../components/simulations/PositionTimeMRUV'

export const mruvTopic: Topic = {
  id: 'mruv',
  title: 'MRUV',
  subject: 'Cinemática',
  description: 'Movimento Retilíneo Uniformemente Variado — posição, velocidade e aceleração.',
  icon: 'chart-line',
  available: true,
  lessons: [
    {
      id: 'mruv-posicao-tempo',
      title: 'Posição x Tempo no MRUV',
      description: 'Como a aceleração curva o gráfico de posição.',
      screens: [
        {
          kind: 'question',
          title: 'Um carro freando é igual a um em repouso?',
          prompt:
            'Dois carros estão na mesma posição e com a mesma velocidade. Um mantém velocidade constante, o outro está freando. Um segundo depois, os dois ainda estão no mesmo lugar?',
          hint: 'Pense em como a distância percorrida muda quando a velocidade também muda.',
        },
        {
          kind: 'simulation',
          title: 'Explore o gráfico posição x tempo',
          instructions:
            'Arraste os controles de posição inicial, velocidade inicial e aceleração. Observe como a curva deixa de ser uma reta quando a aceleração é diferente de zero.',
          Component: PositionTimeMRUV,
        },
        {
          kind: 'explanation',
          title: 'Por que a curva se encurva',
          body: [
            'Quando a aceleração é zero, a velocidade não muda — a posição cresce sempre na mesma taxa, e o gráfico x(t) é uma reta (isso é o MRU).',
            'Quando existe aceleração, a velocidade muda a cada instante. Isso faz a posição crescer cada vez mais rápido (ou mais devagar), e o gráfico vira uma parábola.',
            'O termo 0,5·a·t² é responsável por essa curvatura: quanto maior |a|, mais acentuada a curva.',
          ],
          formula: 'x(t) = x₀ + v₀·t + ½·a·t²',
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'Se a aceleração é positiva e a velocidade inicial também, a curva x(t)...',
              options: [
                { id: 'a', label: 'É uma reta', correct: false },
                { id: 'b', label: 'Cresce cada vez mais rápido (côncava para cima)', correct: true },
                { id: 'c', label: 'Cresce cada vez mais devagar', correct: false },
              ],
              explanation:
                'Com a > 0 e v₀ > 0, a velocidade aumenta continuamente, então a posição cresce em ritmo acelerado — a parábola abre para cima.',
            },
            {
              prompt: 'O que a equação x(t) = x₀ + v₀·t + ½·a·t² representa quando a = 0?',
              options: [
                { id: 'a', label: 'Um objeto parado', correct: false },
                { id: 'b', label: 'O MRU (velocidade constante)', correct: true },
                { id: 'c', label: 'Não é uma equação válida', correct: false },
              ],
              explanation:
                'Com a = 0, sobra x(t) = x₀ + v₀·t — exatamente a equação do Movimento Retilíneo Uniforme.',
            },
          ],
        },
      ],
    },
  ],
}
