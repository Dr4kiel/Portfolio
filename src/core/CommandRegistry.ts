import type { CommandDefinition } from '@types/CommandDefinition'

export class CommandRegistry {
  private commands = new Map<string, CommandDefinition>()

  register(def: CommandDefinition): void {
    this.commands.set(def.name, def)
  }

  unregister(name: string): void {
    this.commands.delete(name)
  }

  lookup(name: string): CommandDefinition | null {
    return this.commands.get(name) ?? null
  }

  lookupSubcommand(name: string, subcommand: string): CommandDefinition | null {
    const cmd = this.lookup(name)
    if (!cmd?.subcommands) return null
    return cmd.subcommands.find((s) => s.name === subcommand) ?? null
  }

  // Excludes hidden:true commands and commands prefixed with __
  listVisible(): CommandDefinition[] {
    return Array.from(this.commands.values()).filter(
      (cmd) => !cmd.hidden && !cmd.name.startsWith('__')
    )
  }

  listAll(): CommandDefinition[] {
    return Array.from(this.commands.values())
  }

  clear(): void {
    this.commands.clear()
  }
}

export const registry = new CommandRegistry()
