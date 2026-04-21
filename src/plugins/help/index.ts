import { defineCommand, text, list, dim } from '@commands/index'
import { generateHelp } from '@utils/helpGenerator'
import { registry } from '@core/CommandRegistry'
import type { Plugin } from '@types/Plugin'

const helpCommand = defineCommand({
  name: 'help',
  description: 'List all available commands',
  args: [{ name: 'command', description: 'Show help for a specific command', optional: true }],
  handler: (ctx) => {
    const targetName = ctx.parsed.args[0] ?? ctx.parsed.subcommand

    if (targetName) {
      const def = registry.lookup(targetName)
      if (!def) {
        ctx.output.push(text(`No command found: ${targetName}`, 'warning'))
        return
      }
      ctx.output.push(...generateHelp(def))
      return
    }

    const commands = registry.listVisible()
    const maxLen = Math.max(...commands.map((c) => c.name.length), 0)

    ctx.output.push(text('Available commands:', 'bold'))
    ctx.output.push(text(''))
    ctx.output.push(
      list(commands.map((c) => `  ${c.name.padEnd(maxLen + 2)} ${c.description}`))
    )
    ctx.output.push(text(''))
    ctx.output.push(dim("Type '<command> --help' for detailed usage."))
  },
})

const helpPlugin: Plugin = {
  name: 'help',
  commands: [helpCommand],
}

export default helpPlugin
