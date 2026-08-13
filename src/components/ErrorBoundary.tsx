import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Newton crashed:', error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-rose-300 bg-rose-50 text-rose-500 shadow-[0_4px_0_0_#fca5a5]">
          <ExclamationTriangleIcon className="h-9 w-9" />
        </div>
        <h1 className="font-display text-xl font-bold text-wood-800">Algo quebrou por aqui</h1>
        <p className="text-sm font-medium text-wood-500">
          Essa tela encontrou um erro inesperado. Seu progresso continua salvo — tente voltar ao
          início.
        </p>
        <button
          onClick={() => {
            this.setState({ error: null })
            window.location.hash = '#/'
          }}
          className="rounded-full bg-chalk-500 px-8 py-3 font-display text-lg font-bold text-white shadow-[0_4px_0_0_var(--color-chalk-700)] transition active:translate-y-1 active:shadow-none"
        >
          Voltar ao início
        </button>
      </div>
    )
  }
}
