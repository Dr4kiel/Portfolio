export function TitleBar() {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 shrink-0"
      style={{
        backgroundColor: 'var(--terminal-surface)',
        borderBottom: '1px solid var(--terminal-border)',
      }}
    >
      {/* Traffic lights */}
      <div className="flex gap-[6px]">
        {[
          { bg: '#ff5f57', shadow: 'rgba(255,95,87,0.4)' },
          { bg: '#febc2e', shadow: 'rgba(254,188,46,0.4)' },
          { bg: '#28c840', shadow: 'rgba(40,200,64,0.4)' },
        ].map(({ bg, shadow }, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: bg, boxShadow: `0 0 6px ${shadow}` }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="flex-1 flex items-center justify-center gap-2">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: 'var(--terminal-primary)', boxShadow: '0 0 6px var(--terminal-glow)' }}
        />
        <span
          className="text-xs tracking-widest uppercase font-medium select-none"
          style={{ color: 'var(--terminal-dim)', letterSpacing: '0.12em' }}
        >
          portfolio
        </span>
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: 'var(--terminal-primary)', boxShadow: '0 0 6px var(--terminal-glow)' }}
        />
      </div>

      {/* Version badge */}
      <div
        className="text-[10px] px-2 py-0.5 rounded-full font-medium select-none"
        style={{
          color: 'var(--terminal-dim)',
          backgroundColor: 'var(--terminal-surface-2)',
          border: '1px solid var(--terminal-border)',
        }}
      >
        v1.0
      </div>
    </div>
  )
}
