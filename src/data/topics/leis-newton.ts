import { lazy } from 'react'
import type { Topic } from '../../types'

const NewtonSecondLaw = lazy(() => import('../../components/simulations/NewtonSecondLaw'))

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
    {
      id: 'forca-e-massa-juntas',
      title: 'Dobrando Força e Massa Juntas',
      description: 'O que acontece com a aceleração quando os dois mudam ao mesmo tempo.',
      screens: [
        {
          kind: 'question',
          title: 'Se tudo dobra, o resultado dobra também?',
          prompt:
            'Você empurra um carrinho com força F e ele ganha aceleração a. Agora imagine um carrinho com o dobro da massa, empurrado com o dobro da força. A aceleração desse segundo carrinho é maior, menor ou igual à do primeiro?',
          hint: 'Escreva a = F/m para os dois casos e compare — o que acontece quando você dobra o numerador e o denominador juntos?',
        },
        {
          kind: 'simulation',
          title: 'Teste força e massa proporcionalmente',
          instructions:
            'Anote a aceleração para uma massa e força quaisquer. Depois dobre as duas ao mesmo tempo (por exemplo, de 3 kg e 6 N para 6 kg e 12 N) e compare o resultado.',
          Component: NewtonSecondLaw,
        },
        {
          kind: 'explanation',
          title: 'Multiplicar F e m pelo mesmo fator não muda a aceleração',
          body: [
            'A aceleração é a razão a = F/m. Se você multiplica tanto F quanto m por um mesmo número k, a razão não muda: (k·F)/(k·m) = F/m.',
            'É por isso que, numa mesma rampa ou empurrão proporcional, um carrinho pesado e um leve podem acelerar igual — desde que a força aplicada também escale com a massa.',
            'Isso é diferente de dobrar só a força (a dobra) ou só a massa (a cai pela metade): o efeito depende de qual grandeza muda e qual fica fixa.',
          ],
          formula: 'a = F/m = (k·F)/(k·m)',
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'Um bloco de 2 kg acelera a 4 m/s² sob uma força F. Se um bloco de 4 kg recebe uma força 2F, sua aceleração é...',
              options: [
                { id: 'a', label: 'A mesma, 4 m/s²', correct: true },
                { id: 'b', label: 'O dobro, 8 m/s²', correct: false },
                { id: 'c', label: 'A metade, 2 m/s²', correct: false },
              ],
              explanation:
                'a = (2F)/(2m) = F/m — dobrar força e massa juntas mantém a aceleração igual à original.',
            },
            {
              prompt: 'Qual mudança realmente dobraria a aceleração de um bloco?',
              options: [
                { id: 'a', label: 'Dobrar apenas a força, mantendo a massa', correct: true },
                { id: 'b', label: 'Dobrar força e massa ao mesmo tempo', correct: false },
                { id: 'c', label: 'Dobrar apenas a massa, mantendo a força', correct: false },
              ],
              explanation:
                'Com m fixo, a é diretamente proporcional a F: só dobrar a força (sem mudar a massa) dobra a aceleração.',
            },
          ],
        },
      ],
    },
  ],
}
