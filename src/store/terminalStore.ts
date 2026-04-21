import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ThemeName } from '@utils/themes'

interface TerminalState {
  input: string
  isLoading: boolean
  error: string | null
  theme: ThemeName
}

interface TerminalActions {
  setInput: (input: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setTheme: (theme: ThemeName) => void
}

export const useTerminalStore = create<TerminalState & TerminalActions>()(
  devtools(
    (set) => ({
      input: '',
      isLoading: false,
      error: null,
      theme: 'default',

      setInput: (input) => set({ input }, false, 'setInput'),
      setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
      setError: (error) => set({ error }, false, 'setError'),
      setTheme: (theme) => set({ theme }, false, 'setTheme'),
    }),
    { name: 'terminal' }
  )
)
