import { describe, it, expect } from 'vitest'
import { parse } from './tokenizer'

describe('tokenizer', () => {
  it('parses a simple command', () => {
    const r = parse('help')
    expect(r.command).toBe('help')
    expect(r.subcommand).toBeNull()
    expect(r.args).toEqual([])
    expect(r.flags).toEqual({})
  })

  it('returns empty command for blank input', () => {
    expect(parse('').command).toBe('')
    expect(parse('   ').command).toBe('')
  })

  it('parses a long flag as boolean', () => {
    const r = parse('projects --verbose')
    expect(r.command).toBe('projects')
    expect(r.flags['verbose']).toBe(true)
  })

  it('parses a long flag with value', () => {
    const r = parse('projects --filter react')
    expect(r.flags['filter']).toBe('react')
  })

  it('parses a short flag', () => {
    const r = parse('projects -v')
    expect(r.flags['v']).toBe(true)
  })

  it('parses multiple short flags', () => {
    const r = parse('cmd -vf')
    expect(r.flags['v']).toBe(true)
    expect(r.flags['f']).toBe(true)
  })

  it('parses quoted string as a single arg', () => {
    const r = parse('about --name "John Doe"')
    expect(r.flags['name']).toBe('John Doe')
  })

  it('parses single-quoted string', () => {
    const r = parse("about --name 'Jane Doe'")
    expect(r.flags['name']).toBe('Jane Doe')
  })

  it('detects subcommand', () => {
    const r = parse('theme set amber')
    expect(r.command).toBe('theme')
    expect(r.subcommand).toBe('set')
    expect(r.args).toContain('amber')
  })

  it('parses flag with = syntax', () => {
    const r = parse('cmd --filter=typescript')
    expect(r.flags['filter']).toBe('typescript')
  })
})
