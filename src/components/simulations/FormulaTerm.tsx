import type { ReactNode } from 'react'

interface FormulaTermProps {
  active: boolean
  children: ReactNode
}

/** Um trecho de fórmula que pisca em destaque quando o slider correspondente é mexido. */
export default function FormulaTerm({ active, children }: FormulaTermProps) {
  return (
    <span
      className={`rounded px-1 transition-colors duration-300 ${
        active ? 'bg-chalk-300 text-chalk-900' : ''
      }`}
    >
      {children}
    </span>
  )
}
