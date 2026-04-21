import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { registerPlugin, loadPlugin, setClearCallback } from '@core/index'
import { useHistoryStore } from '@store/historyStore'
import { raw, text, dim } from '@utils/outputBuilders'
import { TerminalWindow } from '@components/TerminalWindow'

import clearPlugin from '@plugins/clear/index'
import helpPlugin from '@plugins/help/index'
import easterEggsPlugin from '@plugins/easter-eggs/index'
import themePlugin from '@plugins/theme/index'

async function bootstrap() {
  setClearCallback(() => useHistoryStore.getState().clear())

  await registerPlugin(clearPlugin)
  await registerPlugin(helpPlugin)
  await registerPlugin(easterEggsPlugin)
  await registerPlugin(themePlugin)

  // Lazy plugins — Vite prefetches chunks, available before any user input
  loadPlugin(() => import('@plugins/about/index'))
  loadPlugin(() => import('@plugins/projects/index'))
  loadPlugin(() => import('@plugins/experience/index'))

  const splash = [
    raw(`<pre style="color:var(--terminal-primary);line-height:1.3;font-size:0.75rem">
 _____                   _             _
|_   _|__ _ __ _ __ ___ (_)_ __   __ _| |
  | |/ _ \\ '__| '_ \` _ \\| | '_ \\ / _\` | |
  | |  __/ |  | | | | | | | | | | (_| | |
  |_|\\___|_|  |_| |_| |_|_|_| |_|\\__,_|_|
</pre>`),
    text(''),
    text("Bienvenue, Je suis Tristan GAUTIER, Développeur Full-Stack.", undefined, true),
    dim("Type 'help' to see available commands. Type 'about' to learn more."),
    text(''),
  ]

  useHistoryStore.getState().pushEntry('', splash)

  const root = document.getElementById('root')
  if (!root) throw new Error('Root element not found')

  createRoot(root).render(
    <StrictMode>
      <TerminalWindow />
    </StrictMode>
  )
}

bootstrap()
