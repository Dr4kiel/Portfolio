import type { TextBlock, LinkBlock, CardBlock, ListBlock, ErrorBlock, RawBlock } from '@types/OutputBlock'

export const text = (
  content: string,
  style?: TextBlock['style'],
  typewriter?: boolean
): TextBlock => ({ type: 'text', content, style, typewriter })

export const dim = (content: string): TextBlock => text(content, 'dim')
export const bold = (content: string): TextBlock => text(content, 'bold')
export const success = (content: string): TextBlock => text(content, 'success')
export const warning = (content: string): TextBlock => text(content, 'warning')

export const error = (message: string, hint?: string): ErrorBlock => ({
  type: 'error',
  message,
  hint,
})

export const link = (label: string, href: string): LinkBlock => ({
  type: 'link',
  label,
  href,
})

export const card = (
  title: string,
  body: string,
  meta?: Record<string, string>
): CardBlock => ({ type: 'card', title, body, meta })

export const list = (items: string[], ordered?: boolean): ListBlock => ({
  type: 'list',
  items,
  ordered,
})

export const raw = (html: string): RawBlock => ({ type: 'raw', html })
