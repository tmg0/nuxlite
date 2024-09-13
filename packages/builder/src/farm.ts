import { build, start } from '@farmfe/core'
import { defu } from 'defu'
import { config } from './configs/farm.config'
import { defineBuilder } from './core'

export const farmBuilder = defineBuilder(config, {
  async start(ctx) {
    config.server = defu(ctx.options.server ?? {}, config.server)
    await start(defu(ctx.options.farm, config) as any)
  },

  async build(ctx) {
    await build(defu(ctx.options.farm, config) as any)
  },
})
