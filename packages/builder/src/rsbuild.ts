import { createRsbuild } from '@rsbuild/core'
import { defineBuilder } from './core'
import { config } from './configs/rsbuild.config'

export const rsbuildBuilder = defineBuilder(config, () => {
  return {
    async start(ctx) {
      config.server = { ...(config.server ?? {}), ...ctx.options.server }
      const rsbuild = await createRsbuild({ rsbuildConfig: config })
      await rsbuild.startDevServer()
    },

    async build() {
      const rsbuild = await createRsbuild({ rsbuildConfig: config })
      await rsbuild.build()
    },
  }
})
