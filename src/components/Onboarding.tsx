import { useState } from 'react'
import {
  BeakerIcon,
  ChartBarIcon,
  FireIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid'
import { markOnboarded } from '../lib/onboarding'

interface Step {
  icon: typeof BeakerIcon
  title: string
  body: string
}

const STEPS: Step[] = [
  {
    icon: BeakerIcon,
    title: 'Bem-vindo ao Newton',
    body: 'Aprenda Física movendo controles, não decorando fórmulas. Cada lição parte de uma pergunta do dia a dia.',
  },
  {
    icon: ChartBarIcon,
    title: 'Pergunta → simulação → explicação → quiz',
    body: 'Você tenta prever o resultado, testa arrastando sliders numa simulação de verdade, lê a explicação e confirma com um mini-quiz.',
  },
  {
    icon: FireIcon,
    title: 'Sequência e medalhas',
    body: 'Complete pelo menos uma lição por dia para manter sua sequência (streak) viva, e ganhe medalhas por acertar tudo ou completar um tópico inteiro.',
  },
  {
    icon: SparklesIcon,
    title: 'Seu progresso, seu controle',
    body: 'Tudo fica salvo neste navegador. Exporte um backup quando quiser e alterne entre tema claro e escuro no ícone do topo.',
  },
]

export default function Onboarding({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const isLast = step === STEPS.length - 1
  const current = STEPS[step]
  const Icon = current.icon

  function finish() {
    markOnboarded()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl border-2 border-wood-200 bg-paper-50 p-6 text-center shadow-[0_6px_0_0_var(--color-wood-200)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-chalk-300 bg-chalk-100 text-chalk-600 shadow-[0_4px_0_0_var(--color-chalk-300)]">
          <Icon className="h-9 w-9" />
        </div>
        <h2 className="font-display text-xl font-bold text-wood-800">{current.title}</h2>
        <p className="text-sm font-medium text-wood-600">{current.body}</p>

        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? 'w-5 bg-chalk-500' : 'w-1.5 bg-paper-300'
              }`}
            />
          ))}
        </div>

        <div className="mt-2 flex w-full items-center justify-between gap-3">
          <button
            onClick={finish}
            className="text-sm font-bold text-wood-400 hover:text-wood-600"
          >
            Pular
          </button>
          <button
            onClick={() => (isLast ? finish() : setStep((s) => s + 1))}
            className="rounded-full bg-chalk-500 px-6 py-2.5 font-display font-bold text-white shadow-[0_3px_0_0_var(--color-chalk-700)] transition active:translate-y-1 active:shadow-none"
          >
            {isLast ? 'Vamos lá!' : 'Próximo'}
          </button>
        </div>
      </div>
    </div>
  )
}
