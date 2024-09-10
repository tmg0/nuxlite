import process from 'node:process'
import { type InlineConfig, createServer, build as viteBuild } from 'vite'
import { defineBuilder } from './core'
import { config } from './configs/vite.config'

const inlineConfig: InlineConfig = {
  root: process.cwd(),
  configFile: false,
  ...config,
}

export const viteBuilder = defineBuilder(inlineConfig, {
  async start(config) {
    const server = await createServer(config)
    await server.listen()
    server.printUrls()
    server.bindCLIShortcuts({ print: true })
  },

  async build(config) {
    await viteBuild(config)
  },
})
