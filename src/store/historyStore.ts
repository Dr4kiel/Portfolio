import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { OutputBlock } from '@types/OutputBlock'

export interface HistoryEntry {
  id: string
  command: string
  output: OutputBlock[]
  timestamp: number
}

interface HistoryState {
  commandHistory: string[]
  entries: HistoryEntry[]
}

interface HistoryActions {
  pushEntry: (command: string, output: OutputBlock[]) => void
  clear: () => void
}

export const useHistoryStore = create<HistoryState & HistoryActions>()(
  devtools(
    (set) => ({
      commandHistory: [],
      entries: [],

      pushEntry: (command, output) =>
        set(
          (state) => ({
            commandHistory: command.trim()
              ? [command, ...state.commandHistory].slice(0, 100)
              : state.commandHistory,
            entries: [
              ...state.entries,
              {
                id: typeof crypto.randomUUID === 'function'
                  ? crypto.randomUUID()
                  : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`,
                command,
                output,
                timestamp: Date.now(),
              },
            ],
          }),
          false,
          'pushEntry'
        ),

      // Clears visible output but preserves commandHistory for ↑/↓ navigation
      clear: () => set({ entries: [] }, false, 'clear'),
    }),
    { name: 'history' }
  )
)
