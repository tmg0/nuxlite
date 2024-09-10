import { createRsbuild } from '@rsbuild/core'
import { defineBuilder } from './core'
import { config } from './configs/rsbuild.config'

export const rsbuildBuilder = defineBuilder(config, () => {
  const rsbuild = createRsbuild({ rsbuildConfig: config })

  return {
    async start() {
      const instance = await rsbuild
      await instance.startDevServer()
    },

    async build() {
      const instance = await rsbuild
      await instance.build()
    },
  }
})
