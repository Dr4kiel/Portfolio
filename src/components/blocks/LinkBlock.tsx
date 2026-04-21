import type { LinkBlock as LinkBlockType } from '@types/OutputBlock'

interface Props {
  block: LinkBlockType
}

export function LinkBlock({ block }: Props) {
  return (
    <a
      href={block.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 no-underline"
      style={{
        color: 'var(--terminal-primary)',
        backgroundColor: 'rgba(var(--terminal-primary-rgb), 0.08)',
        border: '1px solid rgba(var(--terminal-primary-rgb), 0.2)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.backgroundColor = 'rgba(var(--terminal-primary-rgb), 0.15)'
        el.style.boxShadow = '0 0 16px var(--terminal-glow)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.backgroundColor = 'rgba(var(--terminal-primary-rgb), 0.08)'
        el.style.boxShadow = 'none'
      }}
    >
      <span>{block.label}</span>
      <span className="opacity-60">↗</span>
    </a>
  )
}
