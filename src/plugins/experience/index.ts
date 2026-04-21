import { defineCommand, text, card, list, dim } from '@commands/index'
import type { Plugin } from '@types/Plugin'
import { experienceData } from './data'

const experienceCommand = defineCommand({
  name: 'experience',
  description: 'View my work experience',
  flags: [
    { name: 'verbose', alias: 'v', type: 'boolean', description: 'Show bullet points' },
  ],
  handler: (ctx) => {
    const verbose = Boolean(ctx.parsed.flags['verbose'])

    ctx.output.push(text('Work Experience', 'bold'))
    ctx.output.push(text(''))

    for (const entry of experienceData) {
      const meta: Record<string, string> = {
        Period: entry.period,
        Tags: entry.tags.join(', '),
      }
      ctx.output.push(card(`${entry.role} @ ${entry.company}`, entry.description, meta))

      if (verbose) {
        ctx.output.push(list(entry.bullets.map((b) => `  • ${b}`)))
      }

      ctx.output.push(text(''))
    }

    if (!verbose) {
      ctx.output.push(dim("Run 'experience --verbose' to see bullet points."))
    }
  },
})

const experiencePlugin: Plugin = {
  name: 'experience',
  commands: [experienceCommand],
}

export default experiencePlugin
