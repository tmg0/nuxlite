import { build, start } from '@farmfe/core'
import { defineBuilder } from './core'
import { config } from './configs/farm.config'

export const farmBuilder = defineBuilder(config, {
  async start(ctx) {
    config.server = { ...(config.server ?? {}), ...ctx.options.server }
    await start(config as any)
  },

  async build() {
    await build(config as any)
  },
})
