import type { ParsedCommand } from '@types/ParsedCommand'

type TokenizerState = 'NORMAL' | 'IN_SINGLE_QUOTE' | 'IN_DOUBLE_QUOTE'

function tokenize(input: string): string[] {
  const tokens: string[] = []
  let current = ''
  let state: TokenizerState = 'NORMAL'

  for (let i = 0; i < input.length; i++) {
    const ch = input[i]

    if (state === 'IN_SINGLE_QUOTE') {
      if (ch === "'") {
        state = 'NORMAL'
      } else {
        current += ch
      }
      continue
    }

    if (state === 'IN_DOUBLE_QUOTE') {
      if (ch === '"') {
        state = 'NORMAL'
      } else {
        current += ch
      }
      continue
    }

    // NORMAL state
    if (ch === "'") {
      state = 'IN_SINGLE_QUOTE'
    } else if (ch === '"') {
      state = 'IN_DOUBLE_QUOTE'
    } else if (ch === ' ' || ch === '\t') {
      if (current.length > 0) {
        tokens.push(current)
        current = ''
      }
    } else {
      current += ch
    }
  }

  if (current.length > 0) {
    tokens.push(current)
  }

  return tokens
}

export function parse(raw: string): ParsedCommand {
  const trimmed = raw.trim()
  const tokens = tokenize(trimmed)

  if (tokens.length === 0) {
    return { raw, command: '', subcommand: null, args: [], flags: {} }
  }

  const command = tokens[0].toLowerCase()
  const flags: Record<string, string | boolean> = {}
  const args: string[] = []
  let subcommand: string | null = null
  let firstArgSeen = false

  let i = 1
  while (i < tokens.length) {
    const token = tokens[i]

    if (token.startsWith('--')) {
      const flagName = token.slice(2)
      if (flagName.length === 0) {
        // bare '--' — treat rest as args
        i++
        while (i < tokens.length) {
          args.push(tokens[i])
          i++
        }
        break
      }
      const eqIdx = flagName.indexOf('=')
      if (eqIdx !== -1) {
        flags[flagName.slice(0, eqIdx)] = flagName.slice(eqIdx + 1)
      } else {
        // peek next token: if it's not a flag, use it as the value
        const next = tokens[i + 1]
        if (next !== undefined && !next.startsWith('-')) {
          flags[flagName] = next
          i++
        } else {
          flags[flagName] = true
        }
      }
    } else if (token.startsWith('-') && token.length > 1 && !/^\d/.test(token.slice(1))) {
      // Short flag(s): -v or -vrf
      const chars = token.slice(1)
      for (const ch of chars) {
        flags[ch] = true
      }
    } else {
      // Positional
      if (!firstArgSeen && i === 1) {
        // Could be a subcommand if it looks like a word (no special chars)
        if (/^[a-z][a-z0-9-]*$/.test(token)) {
          subcommand = token
          firstArgSeen = true
        } else {
          args.push(token)
          firstArgSeen = true
        }
      } else {
        args.push(token)
      }
    }

    i++
  }

  return { raw, command, subcommand, args, flags }
}
