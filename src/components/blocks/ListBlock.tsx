import type { ListBlock as ListBlockType } from '@types/OutputBlock'

interface Props {
  block: ListBlockType
}

export function ListBlock({ block }: Props) {
  const Tag = block.ordered ? 'ol' : 'ul'
  return (
    <Tag
      className="space-y-1 pl-0 list-none rounded-lg overflow-hidden"
      style={{
        backgroundColor: 'rgba(255,255,255,0.015)',
        border: '1px solid var(--terminal-border)',
      }}
    >
      {block.items.map((item, i) => (
        <li
          key={i}
          className="whitespace-pre-wrap text-xs leading-relaxed px-4 py-1.5 transition-colors"
          style={{
            color: 'var(--terminal-text-2)',
            borderBottom: i < block.items.length - 1 ? '1px solid var(--terminal-border)' : undefined,
          }}
        >
          {item}
        </li>
      ))}
    </Tag>
  )
}
