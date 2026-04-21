import { describe, it, expect, vi } from 'vitest'
import { defineCommand } from './defineCommand'
import type { CLIContext } from '@types/CLIContext'

function makeCtx(flags: Record<string, string | boolean> = {}): CLIContext {
  return {
    parsed: { raw: '', command: 'test', subcommand: null, args: [], flags },
    output: [],
    meta: {},
    timestamp: Date.now(),
    clear: () => {},
  }
}

describe('defineCommand', () => {
  it('returns a valid CommandDefinition', () => {
    const cmd = defineCommand({
      name: 'test',
      description: 'Test command',
      handler: () => {},
    })
    expect(cmd.name).toBe('test')
    expect(cmd.description).toBe('Test command')
    expect(typeof cmd.handler).toBe('function')
  })

  it('auto-adds --help flag', () => {
    const cmd = defineCommand({ name: 'x', description: 'x', handler: () => {} })
    expect(cmd.flags?.some((f) => f.name === 'help')).toBe(true)
  })

  it('intercepts --help and returns help output without calling handler', async () => {
    const handler = vi.fn()
    const cmd = defineCommand({ name: 'x', description: 'x', handler })
    const ctx = makeCtx({ help: true })
    await cmd.handler(ctx)
    expect(handler).not.toHaveBeenCalled()
    expect(ctx.output.length).toBeGreaterThan(0)
  })

  it('throws on duplicate flag names', () => {
    expect(() =>
      defineCommand({
        name: 'x',
        description: 'x',
        flags: [
          { name: 'verbose', type: 'boolean' },
          { name: 'verbose', type: 'boolean' },
        ],
        handler: () => {},
      })
    ).toThrow(/Duplicate flag name/)
  })

  it('throws if required arg follows optional arg', () => {
    expect(() =>
      defineCommand({
        name: 'x',
        description: 'x',
        args: [
          { name: 'optional', optional: true },
          { name: 'required' },
        ],
        handler: () => {},
      })
    ).toThrow(/Required arg/)
  })

  it('calls handler normally when --help is not set', async () => {
    const handler = vi.fn()
    const cmd = defineCommand({ name: 'x', description: 'x', handler })
    const ctx = makeCtx()
    await cmd.handler(ctx)
    expect(handler).toHaveBeenCalledOnce()
  })
})
