import { registry } from './CommandRegistry'
import { pipeline } from './MiddlewarePipeline'
import type { Plugin } from '@types/Plugin'

const loadedPlugins = new Map<string, Plugin>()

export async function registerPlugin(plugin: Plugin): Promise<void> {
  if (loadedPlugins.has(plugin.name)) return

  await plugin.init?.({ meta: {} })

  for (const cmd of plugin.commands) {
    registry.register(cmd)
  }

  for (const mw of plugin.middleware ?? []) {
    pipeline.use(mw)
  }

  loadedPlugins.set(plugin.name, plugin)
}

export async function loadPlugin(
  importFn: () => Promise<{ default: Plugin }>
): Promise<void> {
  const mod = await importFn()
  await registerPlugin(mod.default)
}

export function destroyPlugin(name: string): void {
  const plugin = loadedPlugins.get(name)
  if (!plugin) return
  plugin.destroy?.()
  for (const cmd of plugin.commands) {
    registry.unregister(cmd.name)
  }
  loadedPlugins.delete(name)
}
