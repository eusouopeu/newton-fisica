import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Rastreia qual parâmetro (slider) foi mexido por último, para destacar o
 * termo correspondente na fórmula. Limpa o destaque após um período de
 * inatividade.
 */
export function useActiveParam(idleMs = 1400) {
  const [active, setActive] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const markActive = useCallback(
    (key: string) => {
      setActive(key)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setActive(null), idleMs)
    },
    [idleMs],
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return [active, markActive] as const
}
