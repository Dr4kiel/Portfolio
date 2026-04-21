import { parse } from '@utils/tokenizer'
import { resolveFlags } from '@utils/flagResolver'
import { generateHelp } from '@utils/helpGenerator'
import { didYouMean } from '@utils/fuzzyMatch'
import { error as errorBlock } from '@utils/outputBuilders'
import { registry } from './CommandRegistry'
import { pipeline } from './MiddlewarePipeline'
import type { OutputBlock } from '@types/OutputBlock'
import type { CLIContext } from '@types/CLIContext'

let clearCallback: (() => void) | null = null

export function setClearCallback(fn: () => void): void {
  clearCallback = fn
}

export async function execute(raw: string): Promise<OutputBlock[]> {
  const trimmed = raw.trim()
  if (!trimmed) return []

  const parsed = parse(trimmed)
  if (!parsed.command) return []

  // Look up command (try subcommand first if present)
  let def = registry.lookup(parsed.command)

  if (!def) {
    const visible = registry.listVisible().map((c) => c.name)
    const suggestion = didYouMean(parsed.command, visible)
    const hint = suggestion ? `Did you mean '${suggestion}'?` : `Type 'help' to see available commands.`
    return [errorBlock(`Command not found: ${parsed.command}`, hint)]
  }

  // If a subcommand is present and exists, use it
  if (parsed.subcommand) {
    const subDef = registry.lookupSubcommand(parsed.command, parsed.subcommand)
    if (subDef) {
      def = subDef
    } else {
      // subcommand not found, treat as a positional arg
      parsed.args.unshift(parsed.subcommand)
      parsed.subcommand = null
    }
  }

  // Intercept --help before executing
  if (parsed.flags['help'] === true || parsed.flags['h'] === true) {
    return generateHelp(def)
  }

  // Resolve and validate flags
  const { resolved, errors } = resolveFlags(parsed.flags, def.flags ?? [])
  if (errors.length > 0) {
    return errors.map((e) => errorBlock(e, `Run '${parsed.command} --help' for usage.`))
  }

  // Replace raw flags with resolved ones
  parsed.flags = resolved as Record<string, string | boolean>

  const ctx: CLIContext = {
    parsed,
    output: [],
    meta: {},
    timestamp: Date.now(),
    clear: () => clearCallback?.(),
  }

  try {
    await pipeline.run(ctx, async () => {
      await def!.handler(ctx)
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    ctx.output.push(errorBlock(`Error: ${message}`))
  }

  return ctx.output
}
