import { useMemo } from 'react'
import { registry } from '@core/CommandRegistry'
import { fuzzyFilter } from '@utils/fuzzyMatch'

export function useAutocomplete(input: string) {
  const suggestions = useMemo(() => {
    const trimmed = input.trim()
    if (!trimmed || trimmed.includes(' ')) return []
    const names = registry.listVisible().map((c) => c.name)
    return fuzzyFilter(trimmed, names).slice(0, 5)
  }, [input])

  return { suggestions }
}
