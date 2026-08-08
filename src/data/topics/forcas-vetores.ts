import type { Topic } from '../../types'
import ForceVectors from '../../components/simulations/ForceVectors'

export const forcasVetoresTopic: Topic = {
  id: 'forcas-vetores',
  title: 'Forças e Vetores',
  subject: 'Dinâmica',
  description: 'Composição e decomposição de forças.',
  icon: 'arrows-pointing-out',
  available: true,
  lessons: [
    {
      id: 'composicao-de-forcas',
      title: 'Composição de Forças',
      description: 'Como duas forças se somam em uma força resultante.',
      screens: [
        {
          kind: 'question',
          title: 'Duas pessoas empurrando na mesma direção é igual a empurrar em direções diferentes?',
          prompt:
            'Duas pessoas empurram uma caixa com a mesma força cada uma. Se elas empurram lado a lado, a caixa anda mais rápido do que se uma empurra de um jeito e a outra de outro. Por quê?',
          hint: 'Força tem direção, não só intensidade — pense em como duas setas se somam.',
        },
        {
          kind: 'simulation',
          title: 'Explore a força resultante',
          instructions:
            'Arraste a intensidade de F₁, F₂ e o ângulo entre elas. Veja a seta vermelha (resultante) mudar de tamanho e direção — é para lá que a caixa acelera.',
          Component: ForceVectors,
        },
        {
          kind: 'explanation',
          title: 'Forças se somam como vetores, não como números',
          body: [
            'Quando duas forças empurram na mesma direção (ângulo 0°), elas se somam totalmente: a resultante é a soma das intensidades.',
            'Quando empurram em direções opostas (ângulo 180°), elas se cancelam parcial ou totalmente: a resultante é a diferença.',
            'Em qualquer ângulo intermediário, a resultante é a "diagonal" do paralelogramo formado pelas duas forças — por isso decompomos cada força em componentes x e y antes de somar.',
          ],
          formula: 'Rx = F₁x + F₂x   Ry = F₁y + F₂y   |R| = √(Rx² + Ry²)',
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'Se F₁ e F₂ têm a mesma intensidade e apontam em direções opostas (180°), a resultante é...',
              options: [
                { id: 'a', label: 'O dobro de cada força', correct: false },
                { id: 'b', label: 'Zero', correct: true },
                { id: 'c', label: 'A metade de cada força', correct: false },
              ],
              explanation:
                'Forças de mesma intensidade e direções opostas se cancelam completamente: a resultante tem módulo zero.',
            },
            {
              prompt: 'Para calcular a resultante de duas forças em ângulo, o primeiro passo é...',
              options: [
                { id: 'a', label: 'Somar as intensidades diretamente', correct: false },
                { id: 'b', label: 'Decompor cada força em componentes x e y', correct: true },
                { id: 'c', label: 'Ignorar a força menor', correct: false },
              ],
              explanation:
                'Como forças são vetores, é preciso decompor cada uma em x e y antes de somar componente a componente.',
            },
          ],
        },
      ],
    },
  ],
}
