import { describe, it, expect, vi } from 'vitest'
import { MiddlewarePipeline } from './MiddlewarePipeline'
import type { CLIContext } from '@types/CLIContext'

function makeCtx(): CLIContext {
  return {
    parsed: { raw: 'test', command: 'test', subcommand: null, args: [], flags: {} },
    output: [],
    meta: {},
    timestamp: Date.now(),
    clear: () => {},
  }
}

describe('MiddlewarePipeline', () => {
  it('calls the final handler when no middleware', async () => {
    const pipeline = new MiddlewarePipeline()
    const ctx = makeCtx()
    const final = vi.fn().mockResolvedValue(undefined)
    await pipeline.run(ctx, final)
    expect(final).toHaveBeenCalledOnce()
  })

  it('runs middleware in order before handler', async () => {
    const pipeline = new MiddlewarePipeline()
    const order: number[] = []

    pipeline.use(async (_ctx, next) => {
      order.push(1)
      await next()
      order.push(3)
    })

    const ctx = makeCtx()
    await pipeline.run(ctx, async () => {
      order.push(2)
    })

    expect(order).toEqual([1, 2, 3])
  })

  it('stops execution when next() is not called', async () => {
    const pipeline = new MiddlewarePipeline()
    const final = vi.fn()

    pipeline.use(async (_ctx, _next) => {
      // intentionally not calling next
    })

    const ctx = makeCtx()
    await pipeline.run(ctx, final)
    expect(final).not.toHaveBeenCalled()
  })

  it('middleware can modify ctx', async () => {
    const pipeline = new MiddlewarePipeline()
    pipeline.use(async (ctx, next) => {
      ctx.meta['touched'] = true
      await next()
    })

    const ctx = makeCtx()
    await pipeline.run(ctx, async () => {})
    expect(ctx.meta['touched']).toBe(true)
  })
})
