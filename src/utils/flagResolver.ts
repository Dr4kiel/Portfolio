import type { FlagDefinition } from '@types/CommandDefinition'

export interface ResolvedFlags {
  resolved: Record<string, string | boolean | number>
  errors: string[]
}

export function resolveFlags(
  rawFlags: Record<string, string | boolean>,
  flagDefs: FlagDefinition[] = []
): ResolvedFlags {
  const resolved: Record<string, string | boolean | number> = {}
  const errors: string[] = []

  // Build lookup maps: full name → def, alias → def
  const byName = new Map<string, FlagDefinition>()
  const byAlias = new Map<string, FlagDefinition>()
  for (const def of flagDefs) {
    byName.set(def.name, def)
    if (def.alias) byAlias.set(def.alias, def)
  }

  // Apply defaults first
  for (const def of flagDefs) {
    if (def.default !== undefined) {
      resolved[def.name] = def.default
    }
  }

  // Resolve raw flags
  for (const [key, value] of Object.entries(rawFlags)) {
    const def = byName.get(key) ?? byAlias.get(key)

    if (!def) {
      errors.push(`Unknown flag: ${key.length === 1 ? '-' : '--'}${key}`)
      continue
    }

    const resolvedKey = def.name

    if (def.type === 'boolean') {
      resolved[resolvedKey] = value === true || value === 'true'
    } else if (def.type === 'number') {
      const num = Number(value)
      if (isNaN(num)) {
        errors.push(`Flag --${def.name} expects a number, got: ${String(value)}`)
      } else {
        resolved[resolvedKey] = num
      }
    } else {
      resolved[resolvedKey] = String(value)
    }
  }

  return { resolved, errors }
}
