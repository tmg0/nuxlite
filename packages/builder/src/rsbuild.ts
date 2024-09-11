import { createRsbuild } from '@rsbuild/core'
import { defu } from 'defu'
import { config } from './configs/rsbuild.config'
import { defineBuilder } from './core'

export const rsbuildBuilder = defineBuilder(config, () => {
  return {
    async start(ctx) {
      config.server = defu(ctx.options.server ?? {}, config.server)
      if (!config.html)
        config.html = {}
      config.html.title = ctx.options.app?.head?.title ?? ''
      const rsbuildConfig = defu(ctx.options.rsbuild, config)
      const rsbuild = await createRsbuild({ rsbuildConfig })
      await rsbuild.startDevServer()
    },

    async build(ctx) {
      const rsbuildConfig = defu(ctx.options.rsbuild, config)
      const rsbuild = await createRsbuild({ rsbuildConfig })
      await rsbuild.build()
    },
  }
})
