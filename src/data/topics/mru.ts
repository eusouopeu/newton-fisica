import { lazy } from 'react'
import type { Topic } from '../../types'

const PositionTimeMRU = lazy(() => import('../../components/simulations/PositionTimeMRU'))

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
    {
      id: 'mru-velocidade-e-sentido',
      title: 'Velocidade Negativa e Sentido do Movimento',
      description: 'O que o sinal da velocidade conta sobre a direção do movimento.',
      screens: [
        {
          kind: 'question',
          title: 'Velocidade negativa é o mesmo que estar parado?',
          prompt:
            'Um ciclista tem velocidade de −5 m/s. Ele está parado, andando devagar ou se movendo rápido? E para que lado?',
          hint: 'O sinal de menos não indica "quantidade pequena" — pense no que ele indica em relação ao sentido escolhido como positivo.',
        },
        {
          kind: 'simulation',
          title: 'Explore velocidades negativas',
          instructions:
            'Arraste a velocidade para valores negativos. Veja a reta descer em vez de subir — o objeto se move no sentido oposto ao que foi definido como positivo, e quanto mais negativa a velocidade, mais rápido ele se afasta nesse sentido.',
          Component: PositionTimeMRU,
        },
        {
          kind: 'explanation',
          title: 'O sinal indica sentido; o valor absoluto indica rapidez',
          body: [
            'Em uma trajetória retilínea, escolhemos um sentido como positivo. Velocidade positiva significa "andando nesse sentido"; negativa significa "andando no sentido oposto".',
            'O módulo |v| é a rapidez do movimento — dois objetos com v = 6 m/s e v = −6 m/s têm a mesma rapidez, só que em sentidos opostos.',
            'Por isso, no gráfico x(t), retas com inclinações de mesmo módulo e sinais opostos são "espelhadas": uma sobe, a outra desce na mesma proporção.',
          ],
          formula: 'x(t) = x₀ + v·t   (v < 0 ⇒ x diminui com o tempo)',
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'Um objeto parte de x₀ = −5 m com v = −3 m/s. Qual é sua posição em t = 4 s?',
              options: [
                { id: 'a', label: 'x = −17 m', correct: true },
                { id: 'b', label: 'x = 7 m', correct: false },
                { id: 'c', label: 'x = −5 m', correct: false },
              ],
              explanation:
                'x(4) = x₀ + v·t = −5 + (−3)·4 = −5 − 12 = −17 m: o objeto continua se afastando no sentido negativo.',
            },
            {
              prompt: 'No gráfico x(t), uma reta com inclinação negativa significa que o objeto...',
              options: [
                { id: 'a', label: 'Está acelerando', correct: false },
                { id: 'b', label: 'Está se movendo no sentido negativo da trajetória', correct: true },
                { id: 'c', label: 'Está parado', correct: false },
              ],
              explanation:
                'Inclinação negativa é velocidade negativa: a posição diminui com o tempo, ou seja, o objeto se move no sentido oposto ao positivo.',
            },
          ],
        },
      ],
    },
  ],
}
