export interface TextBlock {
  type: 'text'
  content: string
  style?: 'normal' | 'dim' | 'bold' | 'success' | 'warning'
  typewriter?: boolean
}

export interface LinkBlock {
  type: 'link'
  label: string
  href: string
}

export interface CardBlock {
  type: 'card'
  title: string
  body: string
  meta?: Record<string, string>
}

export interface ListBlock {
  type: 'list'
  items: string[]
  ordered?: boolean
}

export interface ErrorBlock {
  type: 'error'
  message: string
  hint?: string
}

// Only for controlled ASCII art / easter eggs — must be sanitized at render time
export interface RawBlock {
  type: 'raw'
  html: string
}

export type OutputBlock =
  | TextBlock
  | LinkBlock
  | CardBlock
  | ListBlock
  | ErrorBlock
  | RawBlock
