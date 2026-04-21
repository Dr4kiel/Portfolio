import type { CLIContext } from './CLIContext'

export type NextFn = () => Promise<void>
export type MiddlewareFn = (ctx: CLIContext, next: NextFn) => Promise<void>
