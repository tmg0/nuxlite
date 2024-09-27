import type { NuxliteConfig, NuxliteContext } from './types'
import process from 'node:process'
import defu from 'defu'
import oxrun from 'oxrun'

import 'dotenv/config'

interface Options {
  start: (ctx: NuxliteContext) => Promise<void>
  build: (ctx: NuxliteContext) => Promise<void>
}

const isFunction = (value: any): value is (() => any) => typeof value === 'function'

export function defineBuilder<T>(config: T, options: Options | (() => Options)) {
  if (isFunction(options))
    options = options()

  return (ctx: NuxliteContext) => ({
    start: () => options.start(ctx),
    build: () => options.build(ctx),
  })
}

export async function resolveNuxliteConfig() {
  const { default: config } = await oxrun.import<{ default: NuxliteConfig }>('./nuxlite.config.ts')

  return defu(config, {
    builder: 'rsbuild',
    server: {
      port: Number(process.env.NUXLITE_PORT) || 5173,
    },
  }) as NuxliteConfig
}
