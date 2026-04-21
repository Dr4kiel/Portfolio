import type { CommandDefinition, ArgDefinition, FlagDefinition } from '@types/CommandDefinition'
import type { CLIContext } from '@types/CLIContext'
import { generateHelp } from '@utils/helpGenerator'

export type CommandConfig = Omit<CommandDefinition, 'handler'> & {
  handler: (ctx: CLIContext) => void | Promise<void>
}

function validateSchema(config: CommandConfig): void {
  const flags = config.flags ?? []
  const names = new Set<string>()
  const aliases = new Set<string>()

  for (const flag of flags) {
    if (names.has(flag.name)) {
      throw new Error(`[defineCommand] Duplicate flag name: --${flag.name} in command '${config.name}'`)
    }
    names.add(flag.name)

    if (flag.alias) {
      if (aliases.has(flag.alias)) {
        throw new Error(`[defineCommand] Duplicate flag alias: -${flag.alias} in command '${config.name}'`)
      }
      aliases.add(flag.alias)
    }
  }

  const args: ArgDefinition[] = config.args ?? []
  let sawOptional = false
  for (const arg of args) {
    if (sawOptional && !arg.optional) {
      throw new Error(
        `[defineCommand] Required arg '${arg.name}' cannot follow an optional arg in command '${config.name}'`
      )
    }
    if (arg.optional) sawOptional = true
  }
}

function wrapWithHelp(
  def: CommandDefinition,
  originalHandler: (ctx: CLIContext) => void | Promise<void>
): (ctx: CLIContext) => Promise<void> {
  return async (ctx: CLIContext) => {
    if (ctx.parsed.flags['help'] === true || ctx.parsed.flags['h'] === true) {
      ctx.output.push(...generateHelp(def))
      return
    }
    await originalHandler(ctx)
  }
}

export function defineCommand(config: CommandConfig): CommandDefinition {
  validateSchema(config)

  const def: CommandDefinition = {
    name: config.name,
    description: config.description,
    args: config.args,
    flags: [
      ...(config.flags ?? []),
      { name: 'help', alias: 'h', type: 'boolean', description: 'Show this help message' } satisfies FlagDefinition,
    ],
    subcommands: config.subcommands,
    hidden: config.hidden,
    handler: async () => {},
  }

  def.handler = wrapWithHelp(def, config.handler)

  return def
}
