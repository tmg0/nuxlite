import { createRsbuild } from '@rsbuild/core'
import { config } from './config'

export function createContext() {
  const rsbuild = createRsbuild({
    rsbuildConfig: config,
  })

  async function dev() {
    const instance = await rsbuild
    await instance.startDevServer()
  }

  async function build() {
    const instance = await rsbuild
    await instance.build()
  }

  return {
    rsbuild,
    dev,
    build,
  }
}
