import type { Topic } from '../../types'
import InclinedPlane from '../../components/simulations/InclinedPlane'

export const planoInclinadoTopic: Topic = {
  id: 'plano-inclinado',
  title: 'Plano Inclinado',
  subject: 'Dinâmica',
  description: 'Componentes da gravidade em superfícies inclinadas.',
  icon: 'triangle',
  available: true,
  lessons: [
    {
      id: 'componentes-plano-inclinado',
      title: 'Plano Inclinado sem Atrito',
      description: 'Por que a inclinação muda a aceleração, mas a massa não.',
      screens: [
        {
          kind: 'question',
          title: 'Uma bola pesada desce a rampa mais rápido que uma leve?',
          prompt:
            'Você solta uma bola de boliche e uma bolinha de gude, sem atrito, na mesma rampa e no mesmo instante. Qual chega embaixo primeiro?',
          hint: 'Pense na Segunda Lei de Newton: a = F/m. A força que puxa para baixo da rampa também depende da massa.',
        },
        {
          kind: 'simulation',
          title: 'Explore o plano inclinado',
          instructions:
            'Arraste o ângulo e a massa. Note que mudar a massa não muda a velocidade com que o bloco desce — só o ângulo importa.',
          Component: InclinedPlane,
        },
        {
          kind: 'explanation',
          title: 'A massa "cancela" no plano inclinado sem atrito',
          body: [
            'Na rampa, a gravidade se decompõe em duas componentes: uma perpendicular à rampa (equilibrada pela normal N) e uma paralela à rampa, que acelera o bloco para baixo.',
            'A componente paralela é P∥ = m·g·sen(θ). Pela Segunda Lei, a = P∥/m = m·g·sen(θ)/m = g·sen(θ) — a massa desaparece da conta!',
            'Por isso, sem atrito, objetos de massas diferentes descem a mesma rampa com a mesma aceleração — só o ângulo determina a rapidez.',
          ],
          formula: 'a = g·sen(θ)',
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'Dobrando a massa do bloco (sem atrito), a aceleração na descida...',
              options: [
                { id: 'a', label: 'Dobra', correct: false },
                { id: 'b', label: 'Não muda', correct: true },
                { id: 'c', label: 'Cai pela metade', correct: false },
              ],
              explanation: 'a = g·sen(θ) não depende da massa: ela se cancela na Segunda Lei de Newton.',
            },
            {
              prompt: 'Aumentando o ângulo θ da rampa, a aceleração do bloco...',
              options: [
                { id: 'a', label: 'Aumenta', correct: true },
                { id: 'b', label: 'Diminui', correct: false },
                { id: 'c', label: 'Não muda', correct: false },
              ],
              explanation: 'sen(θ) cresce com o ângulo (até 90°), então quanto mais inclinada a rampa, maior a aceleração.',
            },
          ],
        },
      ],
    },
  ],
}
