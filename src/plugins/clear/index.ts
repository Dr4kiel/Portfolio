import { defineCommand } from '@commands/defineCommand'
import type { Plugin } from '@types/Plugin'

const clearCommand = defineCommand({
  name: 'clear',
  description: 'Clear the terminal output',
  handler: (ctx) => {
    ctx.clear()
  },
})

const clearPlugin: Plugin = {
  name: 'clear',
  commands: [clearCommand],
}

export default clearPlugin
