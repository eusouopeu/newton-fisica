import { lazy } from 'react'
import type { Topic } from '../../types'

const PositionTimeMRUV = lazy(() => import('../../components/simulations/PositionTimeMRUV'))

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
    {
      id: 'mruv-desaceleracao',
      title: 'Quando a Aceleração Freia o Movimento',
      description: 'O que acontece quando a aceleração tem sinal oposto ao da velocidade.',
      screens: [
        {
          kind: 'question',
          title: 'Frear é uma aceleração negativa ou nenhuma aceleração?',
          prompt:
            'Um carro anda para frente a 20 m/s e o motorista pisa no freio. A velocidade dele diminui até parar. Durante a freada, existe aceleração? Em que sentido?',
          hint: 'Aceleração é variação de velocidade — não importa se a velocidade está aumentando ou diminuindo.',
        },
        {
          kind: 'simulation',
          title: 'Explore a desaceleração',
          instructions:
            'Deixe a velocidade inicial positiva e arraste a aceleração para valores negativos. Observe a curva subir cada vez mais devagar, atingir um pico e depois descer — esse pico é o instante em que a velocidade passa por zero.',
          Component: PositionTimeMRUV,
        },
        {
          kind: 'explanation',
          title: 'Sinais opostos de v₀ e a significam desaceleração',
          body: [
            'Quando a aceleração tem o mesmo sinal da velocidade, o objeto ganha rapidez. Quando tem sinal oposto, o objeto perde rapidez — está freando.',
            'Se a aceleração continuar agindo depois que a velocidade chega a zero, o objeto não fica parado: ele passa a se mover no sentido contrário, agora ganhando rapidez de novo.',
            'No gráfico x(t), esse instante de velocidade zero é exatamente o topo (ou fundo) da parábola — o ponto onde a inclinação da curva é zero.',
          ],
          formula: 'v(t) = v₀ + a·t  ⟹  v = 0  quando  t = −v₀/a',
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'Um objeto tem v₀ = 4 m/s e a = −2 m/s². O que acontece com ele ao longo do tempo?',
              options: [
                { id: 'a', label: 'Acelera cada vez mais rápido para frente', correct: false },
                { id: 'b', label: 'Freia, para, e depois passa a andar para trás', correct: true },
                { id: 'c', label: 'Mantém velocidade constante', correct: false },
              ],
              explanation:
                'Com a de sinal oposto a v₀, a velocidade diminui até zero e depois muda de sinal — o objeto reverte o sentido do movimento.',
            },
            {
              prompt: 'No gráfico x(t) de um movimento que freia e depois inverte o sentido, o ponto de velocidade zero corresponde a...',
              options: [
                { id: 'a', label: 'Onde a curva cruza o eixo t', correct: false },
                { id: 'b', label: 'O vértice (topo ou fundo) da parábola', correct: true },
                { id: 'c', label: 'O início do gráfico', correct: false },
              ],
              explanation:
                'No vértice da parábola a inclinação instantânea é zero — e a inclinação do gráfico x(t) é a velocidade.',
            },
          ],
        },
      ],
    },
  ],
}
