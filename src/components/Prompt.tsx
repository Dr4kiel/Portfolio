import { useRef, useState, useCallback } from 'react'
import { useTerminalStore } from '@store/terminalStore'
import { useCommandExecution } from '@hooks/useCommandExecution'
import { useCommandHistory } from '@hooks/useCommandHistory'
import { useAutocomplete } from '@hooks/useAutocomplete'
import { useKeyboardShortcuts } from '@hooks/useKeyboardShortcuts'
import { Cursor } from './Cursor'
import { SuggestionBar } from './SuggestionBar'

export function Prompt() {
  const input = useTerminalStore((s) => s.input)
  const setInput = useTerminalStore((s) => s.setInput)
  const isLoading = useTerminalStore((s) => s.isLoading)
  const inputRef = useRef<HTMLInputElement>(null)

  const { run } = useCommandExecution()
  const { navigateUp, navigateDown, resetCursor } = useCommandHistory()
  const { suggestions } = useAutocomplete(input)
  const [activeSuggestion, setActiveSuggestion] = useState<number | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleTab = useCallback(() => {
    if (suggestions.length === 0) return
    if (suggestions.length === 1) {
      setInput(suggestions[0] + ' ')
      setShowSuggestions(false)
      setActiveSuggestion(null)
      return
    }
    setShowSuggestions(true)
    setActiveSuggestion((prev) => {
      if (prev === null) { setInput(suggestions[0] + ' '); return 0 }
      const next = (prev + 1) % suggestions.length
      setInput(suggestions[next] + ' ')
      return next
    })
  }, [suggestions, setInput])

  const handleEnter = useCallback(() => {
    if (isLoading) return
    run(input)
    resetCursor()
    setShowSuggestions(false)
    setActiveSuggestion(null)
  }, [input, isLoading, run, resetCursor])

  useKeyboardShortcuts(inputRef, {
    onEnter: handleEnter,
    onNavigateUp: () => { setShowSuggestions(false); return navigateUp() },
    onNavigateDown: () => { setShowSuggestions(false); return navigateDown() },
    onTab: handleTab,
    onEscape: () => { setShowSuggestions(false); setActiveSuggestion(null) },
  })

  return (
    <div className="mt-2">
      {/* Separator */}
      <div
        className="h-px mb-3"
        style={{ background: 'linear-gradient(90deg, var(--terminal-border), var(--terminal-glow), var(--terminal-border))' }}
      />

      <div
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-text transition-all duration-200"
        style={{
          backgroundColor: 'var(--terminal-surface-2)',
          border: `1px solid ${isLoading ? 'var(--terminal-glow)' : 'var(--terminal-border)'}`,
          boxShadow: isLoading
            ? '0 0 0 3px var(--terminal-glow), 0 2px 8px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.3)',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Prompt badge */}
        <div
          className="shrink-0 flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium"
          style={{
            backgroundColor: 'rgba(var(--terminal-primary-rgb), 0.12)',
            color: 'var(--terminal-primary)',
            border: '1px solid rgba(var(--terminal-primary-rgb), 0.2)',
          }}
        >
          <span className="opacity-70">~</span>
          <span>❯</span>
        </div>

        {/* Input display */}
        <div className="flex-1 flex items-center min-w-0">
          <span className="whitespace-pre" style={{ color: 'var(--terminal-text)' }}>
            {input}
          </span>
          {!isLoading && <Cursor />}
          {isLoading && (
            <span
              className="ml-1 text-xs animate-pulse"
              style={{ color: 'var(--terminal-primary)' }}
            >
              ⠋ running…
            </span>
          )}
        </div>

        {/* Hint */}
        {!input && !isLoading && (
          <span className="text-xs shrink-0" style={{ color: 'var(--terminal-muted)' }}>
            type 'help'
          </span>
        )}

        {/* Hidden real input */}
        <input
          ref={inputRef}
          className="absolute opacity-0 w-0 h-0 pointer-events-none"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            resetCursor()
            setShowSuggestions(false)
            setActiveSuggestion(null)
          }}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="mt-2">
          <SuggestionBar
            suggestions={suggestions}
            activeSuggestion={activeSuggestion}
            onSelect={(s) => {
              setInput(s + ' ')
              setShowSuggestions(false)
              setActiveSuggestion(null)
              inputRef.current?.focus()
            }}
          />
        </div>
      )}
    </div>
  )
}
