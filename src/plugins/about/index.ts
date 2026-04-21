import { defineCommand, text, card, list, link, dim } from '@commands/index'
import type { Plugin } from '@types/Plugin'
import { aboutData } from './data'

const aboutCommand = defineCommand({
  name: 'about',
  description: 'Learn about me',
  handler: (ctx) => {
    ctx.output.push(text(aboutData.name, 'bold'))
    ctx.output.push(dim(aboutData.role + ' · ' + aboutData.location))
    ctx.output.push(text(''))
    ctx.output.push(text(aboutData.bio, undefined, true))
    ctx.output.push(text(''))
    ctx.output.push(
      card(
        'Skills',
        aboutData.skills.join('  ·  ')
      )
    )
    ctx.output.push(text(''))
    ctx.output.push(text('Find me:', 'bold'))
    for (const s of aboutData.social) {
      ctx.output.push(link(s.label, s.href))
    }
  },
})

const aboutPlugin: Plugin = {
  name: 'about',
  commands: [aboutCommand],
}

export default aboutPlugin
