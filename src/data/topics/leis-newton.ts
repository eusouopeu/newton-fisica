import type { Topic } from '../../types'
import NewtonSecondLaw from '../../components/simulations/NewtonSecondLaw'

export const leisNewtonTopic: Topic = {
  id: 'leis-newton',
  title: 'Leis de Newton',
  subject: 'Dinâmica',
  description: 'Inércia, força resultante e ação-reação.',
  icon: 'scale',
  available: true,
  lessons: [
    {
      id: 'segunda-lei-newton',
      title: 'Segunda Lei de Newton: F = m·a',
      description: 'Como força e massa determinam a aceleração.',
      screens: [
        {
          kind: 'question',
          title: 'Por que empurrar um carrinho vazio é mais fácil?',
          prompt:
            'Você empurra um carrinho de supermercado vazio e depois um cheio, com a mesma força. Por que o vazio ganha velocidade muito mais rápido?',
          hint: 'A mesma força, aplicada em massas diferentes, produz o mesmo efeito?',
        },
        {
          kind: 'simulation',
          title: 'Explore força, massa e aceleração',
          instructions:
            'Arraste a massa do bloco e a força aplicada. Veja como a seta de força e a aceleração resultante mudam, e como isso afeta o ganho de velocidade ao longo do tempo.',
          Component: NewtonSecondLaw,
        },
        {
          kind: 'explanation',
          title: 'Força, massa e aceleração são proporcionais — mas não do mesmo jeito',
          body: [
            'A Segunda Lei de Newton diz que a aceleração de um corpo é diretamente proporcional à força resultante aplicada sobre ele.',
            'Mas a aceleração é inversamente proporcional à massa: quanto mais massa, mais "resistência" o corpo oferece à mudança de velocidade — isso é a inércia.',
            'Por isso o carrinho cheio acelera menos que o vazio com a mesma força: a massa maior "divide" o efeito da força.',
          ],
          formula: 'a = F / m  ⟺  F = m·a',
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'Se você dobrar a força aplicada mantendo a massa constante, a aceleração...',
              options: [
                { id: 'a', label: 'Dobra', correct: true },
                { id: 'b', label: 'Cai pela metade', correct: false },
                { id: 'c', label: 'Não muda', correct: false },
              ],
              explanation:
                'a = F/m: com m fixo, a é diretamente proporcional a F. Dobrar F dobra a.',
            },
            {
              prompt: 'Se você dobrar a massa mantendo a força constante, a aceleração...',
              options: [
                { id: 'a', label: 'Dobra', correct: false },
                { id: 'b', label: 'Cai pela metade', correct: true },
                { id: 'c', label: 'Não muda', correct: false },
              ],
              explanation:
                'a = F/m: com F fixo, a é inversamente proporcional a m. Dobrar m reduz a aceleração à metade.',
            },
          ],
        },
      ],
    },
  ],
}
