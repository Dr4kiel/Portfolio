import { describe, it, expect, beforeEach } from 'vitest'
import { CommandRegistry } from './CommandRegistry'
import type { CommandDefinition } from '@types/CommandDefinition'

function makeCmd(name: string, hidden = false): CommandDefinition {
  return { name, description: `${name} command`, hidden, handler: () => {} }
}

describe('CommandRegistry', () => {
  let reg: CommandRegistry

  beforeEach(() => {
    reg = new CommandRegistry()
  })

  it('registers and looks up a command', () => {
    reg.register(makeCmd('help'))
    expect(reg.lookup('help')).not.toBeNull()
    expect(reg.lookup('help')?.name).toBe('help')
  })

  it('returns null for unknown commands', () => {
    expect(reg.lookup('unknown')).toBeNull()
  })

  it('unregisters a command', () => {
    reg.register(makeCmd('about'))
    reg.unregister('about')
    expect(reg.lookup('about')).toBeNull()
  })

  it('listVisible excludes hidden commands', () => {
    reg.register(makeCmd('help'))
    reg.register(makeCmd('__secret', true))
    const visible = reg.listVisible()
    expect(visible.some((c) => c.name === 'help')).toBe(true)
    expect(visible.some((c) => c.name === '__secret')).toBe(false)
  })

  it('listVisible excludes __ prefixed commands even without hidden flag', () => {
    reg.register(makeCmd('__konami'))
    expect(reg.listVisible()).toHaveLength(0)
    expect(reg.listAll()).toHaveLength(1)
  })
})
