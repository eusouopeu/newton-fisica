import { lazy } from 'react'
import type { Topic } from '../../types'

const ForceVectors = lazy(() => import('../../components/simulations/ForceVectors'))

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
    {
      id: 'forcas-perpendiculares',
      title: 'Forças Perpendiculares e o Teorema de Pitágoras',
      description: 'Como calcular a resultante quando o ângulo entre as forças é 90°.',
      screens: [
        {
          kind: 'question',
          title: 'Empurrar e puxar de lado ao mesmo tempo — para onde vai a caixa?',
          prompt:
            'Uma pessoa empurra uma caixa para frente com 3 N enquanto outra empurra para o lado, em ângulo reto, com 4 N. A caixa não vai nem só para frente nem só para o lado. Existe algum jeito simples de calcular a força resultante nesse caso?',
          hint: 'Ângulo de 90° entre dois vetores é exatamente a situação de um triângulo retângulo.',
        },
        {
          kind: 'simulation',
          title: 'Explore o ângulo de 90°',
          instructions:
            'Ajuste o ângulo entre F₁ e F₂ para 90°. Teste F₁ = 3 N e F₂ = 4 N e veja o valor da resultante — depois compare com outros pares de valores.',
          Component: ForceVectors,
        },
        {
          kind: 'explanation',
          title: 'A 90°, a resultante é a hipotenusa do triângulo de forças',
          body: [
            'Quando duas forças são perpendiculares, elas não têm componente uma sobre a outra: toda a F₁ fica no eixo x e toda a F₂ fica no eixo y (ou vice-versa).',
            'Nesse caso especial, a fórmula geral R = √(Rx² + Ry²) se simplifica para o Teorema de Pitágoras: R = √(F₁² + F₂²).',
            'Para qualquer outro ângulo, esse atalho não vale — é preciso decompor as forças em componentes x e y antes de somar, como na fórmula geral.',
          ],
          formula: 'ângulo = 90° ⟹ R = √(F₁² + F₂²)',
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'Duas forças perpendiculares de 3 N e 4 N têm resultante de...',
              options: [
                { id: 'a', label: '7 N', correct: false },
                { id: 'b', label: '5 N', correct: true },
                { id: 'c', label: '1 N', correct: false },
              ],
              explanation: 'R = √(3² + 4²) = √(9 + 16) = √25 = 5 N — o clássico triângulo 3-4-5.',
            },
            {
              prompt: 'O atalho R = √(F₁² + F₂²) (Pitágoras) só pode ser usado quando...',
              options: [
                { id: 'a', label: 'As forças têm a mesma intensidade', correct: false },
                { id: 'b', label: 'O ângulo entre as forças é 90°', correct: true },
                { id: 'c', label: 'Uma das forças é zero', correct: false },
              ],
              explanation:
                'Só a 90° cada força fica inteiramente em um eixo, permitindo somar os quadrados diretamente. Em outros ângulos é preciso decompor em x e y.',
            },
          ],
        },
      ],
    },
  ],
}
