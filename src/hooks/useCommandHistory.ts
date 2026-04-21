import { useState, useCallback } from 'react'
import { useHistoryStore } from '@store/historyStore'

export function useCommandHistory() {
  const commandHistory = useHistoryStore((s) => s.commandHistory)
  const [cursor, setCursor] = useState<number | null>(null)

  const navigateUp = useCallback((): string | null => {
    if (commandHistory.length === 0) return null
    const nextCursor = cursor === null ? 0 : Math.min(cursor + 1, commandHistory.length - 1)
    setCursor(nextCursor)
    return commandHistory[nextCursor]
  }, [commandHistory, cursor])

  const navigateDown = useCallback((): string | null => {
    if (cursor === null) return null
    if (cursor === 0) {
      setCursor(null)
      return ''
    }
    const nextCursor = cursor - 1
    setCursor(nextCursor)
    return commandHistory[nextCursor]
  }, [commandHistory, cursor])

  const resetCursor = useCallback(() => {
    setCursor(null)
  }, [])

  return { navigateUp, navigateDown, resetCursor }
}
