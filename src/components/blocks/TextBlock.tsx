import type { TextBlock as TextBlockType } from '@types/OutputBlock'
import { useTypingEffect } from '@hooks/useTypingEffect'

const styleMap: Record<NonNullable<TextBlockType['style']>, string> = {
  normal:  'text-[var(--terminal-text)]',
  dim:     'text-[var(--terminal-text-2)]',
  bold:    'text-[var(--terminal-text)] font-semibold',
  success: 'text-[var(--terminal-success)]',
  warning: 'text-[var(--terminal-warning)]',
}

interface Props {
  block: TextBlockType
}

function TypewriterText({ content, style }: { content: string; style?: TextBlockType['style'] }) {
  const displayed = useTypingEffect(content)
  const cls = styleMap[style ?? 'normal']
  return <div className={`whitespace-pre-wrap text-xs leading-relaxed ${cls} min-h-[1.4em]`}>{displayed}</div>
}

export function TextBlock({ block }: Props) {
  const cls = styleMap[block.style ?? 'normal']

  if (!block.content) {
    return <div className="h-3" />
  }

  if (block.typewriter) {
    return <TypewriterText content={block.content} style={block.style} />
  }

  return (
    <div className={`whitespace-pre-wrap text-xs leading-relaxed ${cls}`}>
      {block.content}
    </div>
  )
}
