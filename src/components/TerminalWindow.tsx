import { useEffect, useRef } from 'react'
import { useTerminalStore } from '@store/terminalStore'
import { useHistoryStore } from '@store/historyStore'
import { applyTheme } from '@utils/themes'
import { TitleBar } from './TitleBar'
import { OutputBuffer } from './OutputBuffer'
import { Prompt } from './Prompt'

export function TerminalWindow() {
  const theme = useTerminalStore((s) => s.theme)
  const entries = useHistoryStore((s) => s.entries)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [entries])

  return (
    <div
      className="h-screen w-screen flex items-center justify-center p-4 md:p-8 relative z-10"
      style={{ backgroundColor: 'var(--terminal-bg)' }}
    >
      <div
        className="w-full max-w-4xl flex flex-col rounded-2xl overflow-hidden font-mono text-sm"
        style={{
          height: 'min(92vh, 900px)',
          backgroundColor: 'var(--terminal-surface)',
          boxShadow: 'var(--terminal-window-shadow)',
          border: '1px solid var(--terminal-border)',
        }}
      >
        <TitleBar />

        {/* Subtle top divider glow */}
        <div
          className="h-px shrink-0"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--terminal-glow), transparent)',
          }}
        />

        <div
          className="flex-1 overflow-y-auto px-5 pt-4 pb-3"
          style={{ color: 'var(--terminal-text)' }}
        >
          <OutputBuffer />
          <Prompt />
          <div ref={bottomRef} className="h-2" />
        </div>
      </div>
    </div>
  )
}
