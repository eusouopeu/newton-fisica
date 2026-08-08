import type { Topic } from '../../types'
import FrictionBlock from '../../components/simulations/FrictionBlock'

export const atritoTopic: Topic = {
  id: 'atrito',
  title: 'Atrito',
  subject: 'Dinâmica',
  description: 'Atrito estático e cinético.',
  icon: 'hand-raised',
  available: true,
  lessons: [
    {
      id: 'atrito-estatico-cinetico',
      title: 'Quando o Atrito Trava e Quando Ele Deixa Deslizar',
      description: 'Força aplicada x força de atrito máxima.',
      screens: [
        {
          kind: 'question',
          title: 'Por que um armário pesado às vezes não sai do lugar?',
          prompt:
            'Você empurra um armário com força moderada e ele não se move nem um milímetro. Empurra mais forte e, de repente, ele desliza. O que mudou exatamente no momento em que ele começou a se mover?',
          hint: 'Existe uma força "escondida" resistindo ao seu empurrão — até um certo limite.',
        },
        {
          kind: 'simulation',
          title: 'Explore o limite do atrito',
          instructions:
            'Arraste a força aplicada e o coeficiente de atrito. Observe o rótulo mudar entre "travado" e "deslizando" conforme a força ultrapassa o atrito máximo.',
          Component: FrictionBlock,
        },
        {
          kind: 'explanation',
          title: 'O atrito reage à força aplicada — até um limite',
          body: [
            'Enquanto você empurra um objeto parado, o atrito estático reage com uma força igual e oposta à sua, mantendo tudo em equilíbrio — por isso o armário não se move.',
            'Esse atrito tem um valor máximo: f_máx = μ·N, onde N é a força normal (aqui, o peso do objeto) e μ é o coeficiente de atrito.',
            'Quando sua força aplicada ultrapassa f_máx, o equilíbrio quebra e o objeto passa a acelerar: a = (F − f_máx) / m.',
          ],
          formula: 'f_máx = μ·N',
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'Se a força aplicada é menor que f_máx, o objeto...',
              options: [
                { id: 'a', label: 'Acelera lentamente', correct: false },
                { id: 'b', label: 'Permanece parado', correct: true },
                { id: 'c', label: 'Desliza em velocidade constante', correct: false },
              ],
              explanation:
                'Enquanto F ≤ f_máx, o atrito estático equilibra exatamente a força aplicada e o objeto não se move.',
            },
            {
              prompt: 'Aumentar o coeficiente de atrito μ, mantendo tudo o mais igual, faz o objeto...',
              options: [
                { id: 'a', label: 'Precisar de mais força para começar a deslizar', correct: true },
                { id: 'b', label: 'Precisar de menos força para deslizar', correct: false },
                { id: 'c', label: 'Não ser afetado', correct: false },
              ],
              explanation: 'f_máx = μ·N cresce com μ, então é preciso aplicar mais força para superar o atrito.',
            },
          ],
        },
      ],
    },
  ],
}
