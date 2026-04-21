import type { CardBlock as CardBlockType } from '@types/OutputBlock'

interface Props {
  block: CardBlockType
}

export function CardBlock({ block }: Props) {
  return (
    <div
      className="rounded-xl overflow-hidden my-1 transition-all duration-200"
      style={{
        backgroundColor: 'var(--terminal-surface-2)',
        border: '1px solid var(--terminal-border)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.03) inset',
      }}
    >
      {/* Accent top bar */}
      <div
        className="h-px"
        style={{
          background: `linear-gradient(90deg, var(--terminal-primary), transparent)`,
          opacity: 0.6,
        }}
      />

      <div className="px-4 py-3">
        {/* Title */}
        <div
          className="text-sm font-semibold mb-1.5 flex items-center gap-2"
          style={{ color: 'var(--terminal-text)' }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: 'var(--terminal-primary)', boxShadow: '0 0 6px var(--terminal-glow)' }}
          />
          {block.title}
        </div>

        {/* Body */}
        <div
          className="text-xs leading-relaxed"
          style={{ color: 'var(--terminal-text-2)' }}
        >
          {block.body}
        </div>

        {/* Meta tags */}
        {block.meta && Object.keys(block.meta).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 pt-3" style={{ borderTop: '1px solid var(--terminal-border)' }}>
            {Object.entries(block.meta).map(([key, value]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--terminal-muted)' }}>
                  {key}
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    color: 'var(--terminal-text-2)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--terminal-border)',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
