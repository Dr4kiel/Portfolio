interface Props {
  suggestions: string[]
  activeSuggestion: number | null
  onSelect: (s: string) => void
}

export function SuggestionBar({ suggestions, activeSuggestion, onSelect }: Props) {
  if (suggestions.length === 0) return null

  return (
    <div
      className="flex gap-1.5 px-2 py-2 rounded-lg flex-wrap"
      style={{
        backgroundColor: 'var(--terminal-surface)',
        border: '1px solid var(--terminal-border)',
      }}
    >
      <span className="text-[10px] self-center mr-1" style={{ color: 'var(--terminal-muted)' }}>
        tab
      </span>
      {suggestions.map((s, i) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all duration-150 cursor-pointer"
          style={
            i === activeSuggestion
              ? {
                  backgroundColor: 'rgba(var(--terminal-primary-rgb), 0.2)',
                  color: 'var(--terminal-primary)',
                  border: '1px solid rgba(var(--terminal-primary-rgb), 0.4)',
                  boxShadow: '0 0 12px var(--terminal-glow)',
                }
              : {
                  backgroundColor: 'var(--terminal-surface-2)',
                  color: 'var(--terminal-text-2)',
                  border: '1px solid var(--terminal-border)',
                }
          }
        >
          {s}
        </button>
      ))}
    </div>
  )
}
