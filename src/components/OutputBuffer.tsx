import { useHistoryStore } from '@store/historyStore'
import type { HistoryEntry } from '@store/historyStore'
import type { OutputBlock } from '@types/OutputBlock'
import { TextBlock } from './blocks/TextBlock'
import { LinkBlock } from './blocks/LinkBlock'
import { CardBlock } from './blocks/CardBlock'
import { ListBlock } from './blocks/ListBlock'
import { ErrorBlock } from './blocks/ErrorBlock'
import { RawBlock } from './blocks/RawBlock'

function Block({ block }: { block: OutputBlock }) {
  switch (block.type) {
    case 'text':  return <TextBlock block={block} />
    case 'link':  return <LinkBlock block={block} />
    case 'card':  return <CardBlock block={block} />
    case 'list':  return <ListBlock block={block} />
    case 'error': return <ErrorBlock block={block} />
    case 'raw':   return <RawBlock block={block} />
  }
}

function EntryGroup({ entry }: { entry: HistoryEntry }) {
  const isBootstrap = entry.command === ''

  return (
    <div className="block-in mb-4">
      {/* Command echo — skip for the boot splash */}
      {!isBootstrap && (
        <div
          className="flex items-center gap-2 mb-2 py-1"
          style={{ borderBottom: '1px solid var(--terminal-border)' }}
        >
          <span
            className="text-xs font-bold"
            style={{ color: 'var(--terminal-primary)' }}
          >
            ❯
          </span>
          <span style={{ color: 'var(--terminal-text-2)' }} className="text-xs">
            {entry.command}
          </span>
          <span
            className="ml-auto text-[10px] tabular-nums"
            style={{ color: 'var(--terminal-muted)' }}
          >
            {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      )}

      {/* Output blocks */}
      <div className="space-y-2">
        {entry.output.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </div>
  )
}

export function OutputBuffer() {
  const entries = useHistoryStore((s) => s.entries)

  return (
    <div className="space-y-1">
      {entries.map((entry) => (
        <EntryGroup key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
