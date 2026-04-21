import type { ParsedCommand } from './ParsedCommand'
import type { OutputBlock } from './OutputBlock'

export interface CLIContext {
  parsed: ParsedCommand
  output: OutputBlock[]
  meta: Record<string, unknown>
  timestamp: number
  abortSignal?: AbortSignal
  clear: () => void
}
