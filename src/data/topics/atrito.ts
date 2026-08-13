import { lazy } from 'react'
import type { Topic } from '../../types'

const FrictionBlock = lazy(() => import('../../components/simulations/FrictionBlock'))

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
    {
      id: 'apos-comecar-a-deslizar',
      title: 'Depois que Começa a Deslizar: o Excesso de Força Vira Aceleração',
      description: 'O que sobra da força depois de vencer o atrito.',
      screens: [
        {
          kind: 'question',
          title: 'Depois de vencer o atrito, o objeto anda em velocidade constante?',
          prompt:
            'Você finalmente empurra o armário forte o bastante e ele começa a deslizar. Se você continuar empurrando com a mesma força, ele vai manter uma velocidade constante ou vai continuar ganhando velocidade?',
          hint: 'Pense na Segunda Lei de Newton aplicada à força que "sobra" depois de descontar o atrito.',
        },
        {
          kind: 'simulation',
          title: 'Explore a força além do atrito máximo',
          instructions:
            'Aumente a força bem além do necessário para vencer o atrito e observe o gráfico de velocidade — a inclinação dessa reta é a aceleração.',
          Component: FrictionBlock,
        },
        {
          kind: 'explanation',
          title: 'Só o excesso de força acelera o objeto',
          body: [
            'Enquanto o objeto desliza, o atrito continua agindo, sempre se opondo ao movimento, com valor máximo f_máx = μ·N.',
            'A força resultante é a sua força aplicada menos o atrito: F_resultante = F − f_máx. É só essa sobra que, pela Segunda Lei, produz aceleração.',
            'Se F = f_máx exatamente, a resultante é zero e o objeto desliza em velocidade constante. Só quando F > f_máx o objeto ganha velocidade continuamente.',
          ],
          formula: 'a = (F − f_máx) / m,  com f_máx = μ·N',
        },
        {
          kind: 'quiz',
          title: 'Mini-quiz',
          questions: [
            {
              prompt: 'Um objeto já deslizando recebe uma força exatamente igual a f_máx. Ele...',
              options: [
                { id: 'a', label: 'Continua acelerando', correct: false },
                { id: 'b', label: 'Desliza em velocidade constante', correct: true },
                { id: 'c', label: 'Para instantaneamente', correct: false },
              ],
              explanation:
                'Com F = f_máx, a força resultante é zero, então a aceleração também é zero — a velocidade que ele já tinha se mantém.',
            },
            {
              prompt: 'Se você aumenta a força aplicada bem acima de f_máx, a aceleração do objeto...',
              options: [
                { id: 'a', label: 'Aumenta, proporcional ao excesso de força', correct: true },
                { id: 'b', label: 'Fica igual, o atrito absorve tudo', correct: false },
                { id: 'c', label: 'Diminui', correct: false },
              ],
              explanation:
                'a = (F − f_máx)/m: quanto maior o excesso de força sobre o atrito máximo, maior a aceleração resultante.',
            },
          ],
        },
      ],
    },
  ],
}
