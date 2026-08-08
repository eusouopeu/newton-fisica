import type { Topic } from '../../types'
import PositionTimeMRU from '../../components/simulations/PositionTimeMRU'

export const mruTopic: Topic = {
  id: 'mru',
  title: 'MRU',
  subject: 'Cinemática',
  description: 'Movimento Retilíneo Uniforme — velocidade constante.',
  icon: 'arrow-trending-up',
  available: true,
  lessons: [
    {
      id: 'mru-posicao-tempo',
      title: 'Posição x Tempo no MRU',
      description: 'Por que a posição cresce sempre na mesma taxa.',
      screens: [
        {
          kind: 'question',
          title: 'Dá pra prever o futuro sem calcular minuto a minuto?',
          prompt:
            'Um trem sai de uma estação a 20 m/s e nunca muda de velocidade. Sem calcular a posição segundo a segundo, como você descobriria onde ele estará daqui a 1 minuto?',
          hint: 'Pense na relação entre distância, velocidade e tempo que você já usa no dia a dia.',
        },
        {
          kind: 'simulation',
          title: 'Explore o gráfico posição x tempo',
          instructions:
            'Arraste a posição inicial e a velocidade. Note que o gráfico é sempre uma reta — só a inclinação e o ponto de partida mudam.',
          Component: PositionTimeMRU,
        },
        {
          kind: 'explanation',
          title: 'Por que a reta nunca se curva',
          body: [
            'No MRU a velocidade é constante, então a cada segundo o objeto percorre exatamente a mesma distância.',
            'Isso faz o gráfico x(t) ser sempre uma linha reta: a inclinação dessa reta é a própria velocidade.',
            'Quanto mais inclinada a reta (positiva ou negativa), maior é o módulo da velocidade.',
          ],
          formula: 'x(t) = x₀ + v·t',
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'No gráfico posição x tempo do MRU, a inclinação da reta representa...',
              options: [
                { id: 'a', label: 'A aceleração', correct: false },
                { id: 'b', label: 'A velocidade', correct: true },
                { id: 'c', label: 'A posição inicial', correct: false },
              ],
              explanation:
                'A inclinação (variação de x sobre variação de t) é, por definição, a velocidade do movimento.',
            },
            {
              prompt: 'Se v = 0 no MRU, como é o gráfico x(t)?',
              options: [
                { id: 'a', label: 'Uma parábola', correct: false },
                { id: 'b', label: 'Uma reta horizontal', correct: true },
                { id: 'c', label: 'Uma reta vertical', correct: false },
              ],
              explanation:
                'Com velocidade zero a posição não muda com o tempo, então o gráfico é uma reta horizontal em x = x₀.',
            },
          ],
        },
      ],
    },
  ],
}
