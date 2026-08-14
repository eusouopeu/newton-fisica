import { lazy } from 'react'
import type { Topic } from '../../types'

const EnergyConservation = lazy(() => import('../../components/simulations/EnergyConservation'))

export const trabalhoEnergiaTopic: Topic = {
  id: 'trabalho-energia',
  title: 'Trabalho e Energia',
  subject: 'Dinâmica',
  description: 'Energia cinética, potencial e a lei da conservação de energia.',
  icon: 'bolt',
  available: true,
  lessons: [
    {
      id: 'te-energia-cinetica-potencial',
      title: 'Energia Cinética e Potencial',
      description: 'De onde vem a energia de um objeto em movimento ou em altura.',
      screens: [
        {
          kind: 'question',
          title: 'Um livro parado guarda energia?',
          prompt:
            'Um livro de 2 kg está parado em cima de uma estante a 3 m do chão. Ele não está se movendo — mesmo assim, ele tem energia armazenada? De onde ela viria?',
          hint: 'Pense no que aconteceria se o livro caísse da estante.',
        },
        {
          kind: 'simulation',
          title: 'Explore a queda livre',
          instructions:
            'Arraste a altura e a massa. Veja como a energia potencial (verde) vira energia cinética (laranja) conforme o objeto cai — a soma das duas (linha tracejada) nunca muda.',
          Component: EnergyConservation,
        },
        {
          kind: 'explanation',
          title: 'Duas formas da mesma energia',
          body: [
            'Energia potencial gravitacional é a energia "guardada" por causa da altura: quanto mais alto e mais pesado, mais energia potencial.',
            'Energia cinética é a energia do movimento: depende da massa e do quadrado da velocidade.',
            'Enquanto o objeto cai, ele perde altura (perde energia potencial) e ganha velocidade (ganha energia cinética) — a soma das duas permanece constante, sem atrito do ar.',
          ],
          formula: 'Ep = m·g·h        Ec = m·v²/2',
        },
        {
          kind: 'problem',
          title: 'Calcule você mesmo',
          prompt:
            'Uma pedra de 2 kg está a 5 m de altura. Considerando g = 10 m/s², qual é a energia potencial gravitacional dela, em joules?',
          givens: [
            { label: 'm', value: '2 kg' },
            { label: 'g', value: '10 m/s²' },
            { label: 'h', value: '5 m' },
          ],
          answer: 100,
          unit: 'J',
          tolerance: 0.5,
          steps: [
            'A fórmula da energia potencial gravitacional é Ep = m·g·h.',
            'Substitua os valores: Ep = 2 · 10 · 5.',
            'Ep = 100 J.',
          ],
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'Se a velocidade de um objeto dobra, sua energia cinética...',
              options: [
                { id: 'a', label: 'Também dobra', correct: false },
                { id: 'b', label: 'Quadruplica', correct: true },
                { id: 'c', label: 'Não muda', correct: false },
              ],
              explanation:
                'Como Ec = m·v²/2, dobrar v multiplica a energia cinética por 2² = 4, ou seja, ela quadruplica.',
            },
            {
              prompt: 'Ao cair de uma altura h sem atrito do ar, a energia total do objeto...',
              options: [
                { id: 'a', label: 'Diminui aos poucos', correct: false },
                { id: 'b', label: 'Permanece constante', correct: true },
                { id: 'c', label: 'Aumenta continuamente', correct: false },
              ],
              explanation:
                'Sem atrito, a energia potencial perdida é exatamente igual à energia cinética ganha — a energia mecânica total se conserva.',
            },
          ],
        },
      ],
    },
    {
      id: 'te-conservacao-de-energia',
      title: 'Conservação de Energia',
      description: 'Usando a energia total para prever a velocidade final de uma queda.',
      screens: [
        {
          kind: 'question',
          title: 'Dá pra saber a velocidade sem usar as equações do MRUV?',
          prompt:
            'Uma bola cai de 8 m de altura. Sem usar as fórmulas de posição e velocidade do MRUV, como você poderia descobrir com que velocidade ela chega ao chão?',
          hint: 'Pense em quanto de energia potencial ela tinha no início e para onde essa energia foi.',
        },
        {
          kind: 'simulation',
          title: 'Compare alturas diferentes',
          instructions:
            'Aumente a altura e observe como a energia cinética no fim do trajeto (onde a linha verde chega a zero) cresce — e com ela, a velocidade final mostrada embaixo do gráfico.',
          Component: EnergyConservation,
        },
        {
          kind: 'explanation',
          title: 'Igualando as energias',
          body: [
            'No instante em que o objeto toca o chão, toda a energia potencial que ele tinha no topo já virou energia cinética.',
            'Isso permite igualar as duas fórmulas — m·g·h = m·v²/2 — e isolar v, sem precisar calcular o tempo de queda.',
            'A massa aparece dos dois lados da igualdade e acaba se cancelando: a velocidade final de uma queda livre não depende da massa do objeto.',
          ],
          formula: 'm·g·h = m·v²/2  ⟹  v = √(2·g·h)',
        },
        {
          kind: 'problem',
          title: 'Calcule você mesmo',
          prompt:
            'Um objeto é solto de 20 m de altura, com g = 10 m/s². Com que velocidade, em m/s, ele chega ao chão?',
          givens: [
            { label: 'g', value: '10 m/s²' },
            { label: 'h', value: '20 m' },
          ],
          answer: 20,
          unit: 'm/s',
          tolerance: 0.5,
          steps: [
            'Use v = √(2·g·h).',
            'Substitua: v = √(2 · 10 · 20) = √400.',
            'v = 20 m/s.',
          ],
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'Por que a velocidade final da queda livre não depende da massa?',
              options: [
                { id: 'a', label: 'Porque a massa é sempre igual a 1 kg', correct: false },
                {
                  id: 'b',
                  label: 'Porque a massa aparece nos dois lados da equação de energia e se cancela',
                  correct: true,
                },
                { id: 'c', label: 'Porque a gravidade muda com a massa do objeto', correct: false },
              ],
              explanation:
                'Ao igualar m·g·h = m·v²/2, o termo m aparece dos dois lados e pode ser cancelado, restando só g, h e v.',
            },
            {
              prompt: 'Dobrando a altura de queda (mantendo o resto igual), a velocidade final...',
              options: [
                { id: 'a', label: 'Dobra também', correct: false },
                { id: 'b', label: 'Multiplica por √2', correct: true },
                { id: 'c', label: 'Fica 4 vezes maior', correct: false },
              ],
              explanation:
                'Como v = √(2·g·h), v é proporcional à raiz quadrada de h — dobrar h multiplica v por √2 ≈ 1,41.',
            },
          ],
        },
      ],
    },
  ],
}
