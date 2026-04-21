export interface ParsedCommand {
  raw: string
  command: string
  subcommand: string | null
  args: string[]
  flags: Record<string, string | boolean>
}
