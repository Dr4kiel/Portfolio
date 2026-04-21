import type { ErrorBlock as ErrorBlockType } from '@types/OutputBlock'

interface Props {
  block: ErrorBlockType
}

export function ErrorBlock({ block }: Props) {
  return (
    <div
      className="rounded-lg px-4 py-3 my-1"
      style={{
        backgroundColor: 'rgba(var(--terminal-error-rgb), 0.06)',
        borderLeft: '3px solid var(--terminal-error)',
        border: '1px solid rgba(var(--terminal-error-rgb), 0.15)',
        borderLeftWidth: '3px',
      }}
    >
      <div className="flex items-start gap-2">
        <span
          className="text-xs font-bold mt-0.5 shrink-0"
          style={{ color: 'var(--terminal-error)' }}
        >
          ✗
        </span>
        <div>
          <div className="text-xs font-medium" style={{ color: 'var(--terminal-error)' }}>
            {block.message}
          </div>
          {block.hint && (
            <div className="text-xs mt-1" style={{ color: 'var(--terminal-text-2)' }}>
              {block.hint}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
