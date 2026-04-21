import type { CommandDefinition } from './CommandDefinition'
import type { MiddlewareFn } from './Middleware'

export interface PluginContext {
  meta: Record<string, unknown>
}

export interface Plugin {
  name: string
  version?: string
  commands: CommandDefinition[]
  middleware?: MiddlewareFn[]
  init?(ctx: PluginContext): void | Promise<void>
  destroy?(): void
}
