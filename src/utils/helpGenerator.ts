import type { CommandDefinition } from '@types/CommandDefinition'
import type { OutputBlock } from '@types/OutputBlock'
import { text, dim, list } from './outputBuilders'

export function generateHelp(def: CommandDefinition): OutputBlock[] {
  const blocks: OutputBlock[] = []

  // Synopsis
  const flagsSynopsis = def.flags?.length ? ' [flags]' : ''
  const argsSynopsis = def.args?.map((a) => (a.optional ? `[${a.name}]` : `<${a.name}>`)).join(' ') ?? ''
  const synopsis = [def.name, argsSynopsis, flagsSynopsis].filter(Boolean).join(' ')
  blocks.push(text(`Usage: ${synopsis}`, 'bold'))
  blocks.push(dim(def.description))

  // Subcommands
  if (def.subcommands?.length) {
    blocks.push(text(''))
    blocks.push(text('Subcommands:', 'bold'))
    blocks.push(
      list(
        def.subcommands.map(
          (s) => `  ${s.name.padEnd(16)} ${s.description}`
        )
      )
    )
  }

  // Arguments
  if (def.args?.length) {
    blocks.push(text(''))
    blocks.push(text('Arguments:', 'bold'))
    blocks.push(
      list(
        def.args.map(
          (a) =>
            `  ${(a.optional ? `[${a.name}]` : `<${a.name}>`).padEnd(18)} ${a.description ?? ''}`
        )
      )
    )
  }

  // Flags
  if (def.flags?.length) {
    blocks.push(text(''))
    blocks.push(text('Flags:', 'bold'))
    blocks.push(
      list(
        def.flags.map((f) => {
          const alias = f.alias ? `-${f.alias}, ` : '    '
          const name = `--${f.name}`
          const defaultVal = f.default !== undefined ? ` (default: ${f.default})` : ''
          return `  ${alias}${name.padEnd(16)} ${f.description ?? ''}${defaultVal}`
        })
      )
    )
  }

  return blocks
}
