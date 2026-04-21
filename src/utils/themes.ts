export type ThemeName = 'default' | 'emerald' | 'cyan' | 'rose' | 'amber'

export interface Theme {
  primary: string
  primaryRgb: string
  dim: string
  muted: string
  bg: string
  surface: string
  surface2: string
  text: string
  text2: string
  error: string
  errorRgb: string
  warning: string
  success: string
  glow: string
}

export const themes: Record<ThemeName, Theme> = {
  default: {
    primary: '#a78bfa',
    primaryRgb: '167, 139, 250',
    dim: '#52525b',
    muted: '#3f3f46',
    bg: '#07070a',
    surface: '#0e0e12',
    surface2: '#141418',
    text: '#e4e4e7',
    text2: '#a1a1aa',
    error: '#f87171',
    errorRgb: '248, 113, 113',
    warning: '#fb923c',
    success: '#4ade80',
    glow: 'rgba(167, 139, 250, 0.12)',
  },
  emerald: {
    primary: '#34d399',
    primaryRgb: '52, 211, 153',
    dim: '#4b5563',
    muted: '#374151',
    bg: '#060c0a',
    surface: '#0a120e',
    surface2: '#101a14',
    text: '#ecfdf5',
    text2: '#6ee7b7',
    error: '#f87171',
    errorRgb: '248, 113, 113',
    warning: '#fbbf24',
    success: '#34d399',
    glow: 'rgba(52, 211, 153, 0.12)',
  },
  cyan: {
    primary: '#22d3ee',
    primaryRgb: '34, 211, 238',
    dim: '#475569',
    muted: '#334155',
    bg: '#05080f',
    surface: '#090e18',
    surface2: '#0e1520',
    text: '#e0f2fe',
    text2: '#7dd3fc',
    error: '#f87171',
    errorRgb: '248, 113, 113',
    warning: '#fbbf24',
    success: '#4ade80',
    glow: 'rgba(34, 211, 238, 0.12)',
  },
  rose: {
    primary: '#fb7185',
    primaryRgb: '251, 113, 133',
    dim: '#57534e',
    muted: '#44403c',
    bg: '#0a0607',
    surface: '#120a0c',
    surface2: '#1a1010',
    text: '#fff1f2',
    text2: '#fda4af',
    error: '#fb7185',
    errorRgb: '251, 113, 133',
    warning: '#fb923c',
    success: '#4ade80',
    glow: 'rgba(251, 113, 133, 0.12)',
  },
  amber: {
    primary: '#fbbf24',
    primaryRgb: '251, 191, 36',
    dim: '#57534e',
    muted: '#44403c',
    bg: '#090700',
    surface: '#100d00',
    surface2: '#181200',
    text: '#fef9c3',
    text2: '#fde68a',
    error: '#f87171',
    errorRgb: '248, 113, 113',
    warning: '#fb923c',
    success: '#4ade80',
    glow: 'rgba(251, 191, 36, 0.12)',
  },
}

export function applyTheme(name: ThemeName): void {
  const t = themes[name]
  const r = document.documentElement
  r.style.setProperty('--terminal-primary', t.primary)
  r.style.setProperty('--terminal-primary-rgb', t.primaryRgb)
  r.style.setProperty('--terminal-dim', t.dim)
  r.style.setProperty('--terminal-muted', t.muted)
  r.style.setProperty('--terminal-bg', t.bg)
  r.style.setProperty('--terminal-surface', t.surface)
  r.style.setProperty('--terminal-surface-2', t.surface2)
  r.style.setProperty('--terminal-text', t.text)
  r.style.setProperty('--terminal-text-2', t.text2)
  r.style.setProperty('--terminal-error', t.error)
  r.style.setProperty('--terminal-error-rgb', t.errorRgb)
  r.style.setProperty('--terminal-warning', t.warning)
  r.style.setProperty('--terminal-success', t.success)
  r.style.setProperty('--terminal-glow', t.glow)
  r.style.setProperty(
    '--terminal-window-shadow',
    `0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.7), 0 32px 80px rgba(0,0,0,0.5), 0 0 80px ${t.glow}`
  )
  document.body.style.backgroundColor = t.bg
  document.body.style.color = t.text
}
