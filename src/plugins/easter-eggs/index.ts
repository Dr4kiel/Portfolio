import { defineCommand, text, raw, dim } from '@commands/index'
import type { Plugin } from '@types/Plugin'
import { matrixAscii, sudoMessage, whoamiText, konamiMessage } from './data'

const matrixCommand = defineCommand({
  name: '__matrix',
  description: 'Hidden: matrix effect',
  hidden: true,
  handler: (ctx) => {
    ctx.output.push(raw(matrixAscii))
    ctx.output.push(dim('Wake up, Neo...'))
  },
})

const sudoCommand = defineCommand({
  name: '__sudo',
  description: 'Hidden: sudo attempt',
  hidden: true,
  handler: (ctx) => {
    ctx.output.push(raw(sudoMessage))
  },
})

const whoamiCommand = defineCommand({
  name: '__whoami',
  description: 'Hidden: who am I really',
  hidden: true,
  handler: (ctx) => {
    ctx.output.push(text(whoamiText, undefined, true))
  },
})

const konamiCommand = defineCommand({
  name: '__konami',
  description: 'Hidden: konami code',
  hidden: true,
  handler: (ctx) => {
    ctx.output.push(text(konamiMessage, 'success'))
  },
})

const easterEggsPlugin: Plugin = {
  name: 'easter-eggs',
  commands: [matrixCommand, sudoCommand, whoamiCommand, konamiCommand],
}

export default easterEggsPlugin
