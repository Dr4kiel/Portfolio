import type { RawBlock as RawBlockType } from '@types/OutputBlock'

function sanitize(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+\s*=/gi, ' data-blocked=')
    .replace(/javascript:/gi, '')
}

interface Props {
  block: RawBlockType
}

export function RawBlock({ block }: Props) {
  return (
    <div
      className="font-mono text-xs rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'rgba(255,255,255,0.02)',
        border: '1px solid var(--terminal-border)',
      }}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: sanitize(block.html) }}
    />
  )
}
