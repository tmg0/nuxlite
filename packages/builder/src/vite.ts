import process from 'node:process'
import { defu } from 'defu'
import { createServer, type InlineConfig, build as viteBuild } from 'vite'
import { config } from './configs/vite.config'
import { defineBuilder } from './core'

const inlineConfig: InlineConfig = {
  root: process.cwd(),
  configFile: false,
  ...config,
}

export const viteBuilder = defineBuilder(inlineConfig, {
  async start(ctx) {
    inlineConfig.server = defu(ctx.options.server ?? {}, inlineConfig.server)
    const server = await createServer(defu(ctx.options.vite, inlineConfig))
    await server.listen()
    server.printUrls()
    server.bindCLIShortcuts({ print: true })
  },

  async build(ctx) {
    await viteBuild(defu(ctx.options.vite, inlineConfig))
  },
})
