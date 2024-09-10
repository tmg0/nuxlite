import process from 'node:process'
import { loadConfig } from 'c12'
import type { NuxliteConfig, NuxliteContext } from './types'

import 'dotenv/config'

interface Options {
  start: (ctx: NuxliteContext) => Promise<void>
  build: (ctx: NuxliteContext) => Promise<void>
}

const isFunction = (value: any): value is (() => any) => typeof value === 'function'

export const defineConfig = <T extends NuxliteConfig>(config: T) => config

export function defineBuilder<T>(config: T, options: Options | (() => Options)) {
  if (isFunction(options))
    options = options()

  return (ctx: NuxliteContext) => ({
    start: () => options.start(ctx),
    build: () => options.build(ctx),
  })
}

export async function resolveNuxliteConfig() {
  const { config } = await loadConfig<NuxliteConfig>({
    name: 'nuxlite',

    defaults: {
      builder: 'rsbuild',
      server: {
        port: Number(process.env?.NUXLITE_PORT) ?? 5173,
      },
    },
  })

  return config
}
