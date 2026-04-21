import { useCallback } from 'react'
import { execute } from '@core/Executor'
import { useTerminalStore } from '@store/terminalStore'
import { useHistoryStore } from '@store/historyStore'

export function useCommandExecution() {
  const setLoading = useTerminalStore((s) => s.setLoading)
  const setError = useTerminalStore((s) => s.setError)
  const setInput = useTerminalStore((s) => s.setInput)
  const pushEntry = useHistoryStore((s) => s.pushEntry)

  const run = useCallback(
    async (raw: string) => {
      if (!raw.trim()) return

      setLoading(true)
      setError(null)
      setInput('')

      try {
        const output = await execute(raw)
        pushEntry(raw, output)
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        setError(message)
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError, setInput, pushEntry]
  )

  return { run }
}
