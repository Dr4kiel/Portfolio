import { defineCommand, text, list, error, success } from '@commands/index'
import { useTerminalStore } from '@store/terminalStore'
import type { Plugin } from '@types/Plugin'
import { themes } from '@utils/themes'
import type { ThemeName } from '@utils/themes'

const themeCommand = defineCommand({
  name: 'theme',
  description: 'Change the terminal color theme',
  args: [
    { name: 'action', description: 'Action: set | list', optional: true },
    { name: 'name', description: 'Theme name', optional: true },
  ],
  handler: (ctx) => {
    const action = ctx.parsed.args[0] ?? ctx.parsed.subcommand ?? 'list'
    const name = ctx.parsed.args[1] ?? ctx.parsed.args[0]

    if (action === 'list' || (!name && action !== 'set')) {
      const available = Object.keys(themes) as ThemeName[]
      ctx.output.push(text('Available themes:', 'bold'))
      ctx.output.push(list(available.map((t) => `  ${t}`)))
      ctx.output.push(text(''))
      ctx.output.push(text("Usage: theme set <name>", 'dim'))
      return
    }

    if (action === 'set' && name) {
      if (!(name in themes)) {
        ctx.output.push(error(`Unknown theme: ${name}`, `Available: ${Object.keys(themes).join(', ')}`))
        return
      }
      useTerminalStore.getState().setTheme(name as ThemeName)
      ctx.output.push(success(`Theme set to '${name}'.`))
      return
    }

    ctx.output.push(text("Usage: theme set <name> | theme list", 'dim'))
  },
})

const themePlugin: Plugin = {
  name: 'theme',
  commands: [themeCommand],
}

export default themePlugin
