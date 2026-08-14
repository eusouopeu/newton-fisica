import { lazy } from 'react'
import type { Topic } from '../../types'

const Collision = lazy(() => import('../../components/simulations/Collision'))

export const impulsoMomentoTopic: Topic = {
  id: 'impulso-momento',
  title: 'Impulso e Momento',
  subject: 'Dinâmica',
  description: 'Quantidade de movimento, impulso e colisões.',
  icon: 'arrows-right-left',
  available: true,
  lessons: [
    {
      id: 'im-quantidade-de-movimento',
      title: 'Quantidade de Movimento',
      description: 'Por que um caminhão devagar é mais difícil de parar que uma bola rápida.',
      screens: [
        {
          kind: 'question',
          title: 'Massa ou velocidade — o que pesa mais?',
          prompt:
            'Um caminhão de 2000 kg anda a 5 m/s. Uma bola de 0,5 kg é arremessada a 40 m/s. Qual dos dois você imagina ser mais difícil de parar com as mãos, e por quê?',
          hint: 'Pense em uma grandeza que combine massa e velocidade ao mesmo tempo, não só uma das duas.',
        },
        {
          kind: 'simulation',
          title: 'Explore uma colisão',
          instructions:
            'Ajuste as massas e velocidades dos dois carrinhos. Note que o momento total (m₁v₁ + m₂v₂) é sempre o mesmo antes e depois da colisão, em qualquer modo.',
          Component: Collision,
        },
        {
          kind: 'explanation',
          title: 'A grandeza que combina massa e velocidade',
          body: [
            'A quantidade de movimento (ou momento linear) de um objeto é o produto da sua massa pela velocidade.',
            'Dois objetos podem ter momentos parecidos mesmo com massas e velocidades bem diferentes — é o produto que importa, não cada grandeza isolada.',
            'Em qualquer colisão, sem forças externas, o momento total do sistema antes é igual ao momento total depois: essa é a lei da conservação do momento.',
          ],
          formula: 'p = m·v        p_antes = p_depois',
        },
        {
          kind: 'problem',
          title: 'Calcule você mesmo',
          prompt: 'Um carrinho de 3 kg se move a 4 m/s. Qual é a sua quantidade de movimento, em kg·m/s?',
          givens: [
            { label: 'm', value: '3 kg' },
            { label: 'v', value: '4 m/s' },
          ],
          answer: 12,
          unit: 'kg·m/s',
          tolerance: 0.3,
          steps: ['Use p = m·v.', 'Substitua: p = 3 · 4.', 'p = 12 kg·m/s.'],
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'A quantidade de movimento de um objeto depende de...',
              options: [
                { id: 'a', label: 'Só da sua massa', correct: false },
                { id: 'b', label: 'Só da sua velocidade', correct: false },
                { id: 'c', label: 'Da massa e da velocidade juntas', correct: true },
              ],
              explanation: 'p = m·v combina as duas grandezas — nenhuma delas sozinha determina o momento.',
            },
            {
              prompt:
                'Em uma colisão sem forças externas, o que permanece constante do início ao fim?',
              options: [
                { id: 'a', label: 'A velocidade de cada objeto separadamente', correct: false },
                { id: 'b', label: 'O momento total do sistema', correct: true },
                { id: 'c', label: 'A energia cinética de cada objeto separadamente', correct: false },
              ],
              explanation:
                'O momento total do sistema se conserva sempre; já a energia cinética de cada objeto pode mudar (e a total também, se a colisão não for elástica).',
            },
          ],
        },
      ],
    },
    {
      id: 'im-colisoes',
      title: 'Colisões Elásticas e Inelásticas',
      description: 'O que muda quando os objetos grudam ou quicam um no outro.',
      screens: [
        {
          kind: 'question',
          title: 'Toda colisão perde energia?',
          prompt:
            'Duas bolinhas de bilhar se chocam e quicam. Dois carrinhos de brinquedo se chocam e ficam grudados. As duas situações conservam o momento total? E a energia cinética total?',
          hint: 'Pense no que acontece com o calor e a deformação em cada tipo de choque.',
        },
        {
          kind: 'simulation',
          title: 'Compare os dois modos',
          instructions:
            'Alterne entre "elástica" e "inelástica" com os mesmos valores de massa e velocidade. Veja como o momento total nunca muda, mas a energia cinética final cai no modo inelástico.',
          Component: Collision,
        },
        {
          kind: 'explanation',
          title: 'Momento sempre se conserva; energia cinética nem sempre',
          body: [
            'Em uma colisão elástica (como bolas de bilhar bem rígidas), o momento total e a energia cinética total se conservam.',
            'Em uma colisão perfeitamente inelástica, os objetos grudam e se movem juntos com a mesma velocidade final — o momento total ainda se conserva, mas parte da energia cinética vira calor, som e deformação.',
            'Por isso o momento é a ferramenta mais confiável para analisar qualquer colisão: ele se conserva em ambos os casos.',
          ],
          formula: 'Elástica: p e Ec conservados     Inelástica: só p conservado',
        },
        {
          kind: 'problem',
          title: 'Calcule você mesmo',
          prompt:
            'Um carrinho de 2 kg a 6 m/s colide de frente com um carrinho de 4 kg parado (0 m/s) e eles grudam. Qual é a velocidade final comum, em m/s?',
          givens: [
            { label: 'm₁', value: '2 kg' },
            { label: 'v₁', value: '6 m/s' },
            { label: 'm₂', value: '4 kg' },
            { label: 'v₂', value: '0 m/s' },
          ],
          answer: 2,
          unit: 'm/s',
          tolerance: 0.2,
          steps: [
            'Em colisão perfeitamente inelástica, use v = (m₁v₁ + m₂v₂)/(m₁+m₂).',
            'Substitua: v = (2·6 + 4·0)/(2+4) = 12/6.',
            'v = 2 m/s.',
          ],
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'Em uma colisão perfeitamente inelástica, os objetos...',
              options: [
                { id: 'a', label: 'Quicam com a mesma energia de antes', correct: false },
                { id: 'b', label: 'Grudam e se movem com a mesma velocidade final', correct: true },
                { id: 'c', label: 'Trocam de velocidade entre si', correct: false },
              ],
              explanation:
                'Na colisão perfeitamente inelástica os corpos permanecem unidos após o choque, movendo-se com uma única velocidade comum.',
            },
            {
              prompt: 'O que NUNCA muda em uma colisão sem forças externas, elástica ou não?',
              options: [
                { id: 'a', label: 'A energia cinética total', correct: false },
                { id: 'b', label: 'O momento total do sistema', correct: true },
                { id: 'c', label: 'A velocidade de cada corpo individualmente', correct: false },
              ],
              explanation:
                'O momento total se conserva em qualquer colisão sem forças externas; a energia cinética só se conserva no caso elástico.',
            },
          ],
        },
      ],
    },
  ],
}
