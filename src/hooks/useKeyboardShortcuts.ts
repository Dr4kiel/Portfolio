import { useEffect } from 'react'
import { useHistoryStore } from '@store/historyStore'
import { useTerminalStore } from '@store/terminalStore'

interface Handlers {
  onEnter: () => void
  onNavigateUp: () => string | null
  onNavigateDown: () => string | null
  onTab: () => void
  onEscape: () => void
}

export function useKeyboardShortcuts(
  inputRef: React.RefObject<HTMLInputElement | null>,
  handlers: Handlers
) {
  const setInput = useTerminalStore((s) => s.setInput)
  const clear = useHistoryStore((s) => s.clear)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handlers.onEnter()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const val = handlers.onNavigateUp()
        if (val !== null) setInput(val)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        const val = handlers.onNavigateDown()
        if (val !== null) setInput(val)
      } else if (e.key === 'Tab') {
        e.preventDefault()
        handlers.onTab()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        handlers.onEscape()
      } else if (e.ctrlKey && e.key === 'l') {
        e.preventDefault()
        clear()
      } else if (e.ctrlKey && e.key === 'c') {
        e.preventDefault()
        setInput('')
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handlers, setInput, clear])

  // Focus the hidden input whenever anything is clicked
  useEffect(() => {
    const onClick = () => inputRef.current?.focus()
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [inputRef])
}
