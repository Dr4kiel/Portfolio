import type { CLIContext } from './CLIContext'

export interface ArgDefinition {
  name: string
  description?: string
  optional?: boolean
}

export interface FlagDefinition {
  name: string
  alias?: string
  type: 'boolean' | 'string' | 'number'
  description?: string
  default?: string | boolean | number
}

export interface CommandDefinition {
  name: string
  description: string
  args?: ArgDefinition[]
  flags?: FlagDefinition[]
  subcommands?: CommandDefinition[]
  hidden?: boolean
  handler: (ctx: CLIContext) => void | Promise<void>
}
