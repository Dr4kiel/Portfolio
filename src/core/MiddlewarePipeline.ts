import type { MiddlewareFn } from '@types/Middleware'
import type { CLIContext } from '@types/CLIContext'

export class MiddlewarePipeline {
  private middleware: MiddlewareFn[] = []

  use(fn: MiddlewareFn): void {
    this.middleware.push(fn)
  }

  async run(ctx: CLIContext, final: () => Promise<void>): Promise<void> {
    const chain = [...this.middleware]

    const dispatch = async (index: number): Promise<void> => {
      if (index >= chain.length) {
        return final()
      }
      return chain[index](ctx, () => dispatch(index + 1))
    }

    return dispatch(0)
  }

  clear(): void {
    this.middleware = []
  }
}

export const pipeline = new MiddlewarePipeline()
