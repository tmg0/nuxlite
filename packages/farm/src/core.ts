import { build as farmBuild, start } from '@farmfe/core'
import { config } from './config'

export function createContext() {
  const options = config

  async function dev() {
    await start(options as any)
  }

  async function build() {
    await farmBuild(options as any)
  }

  return {
    options,
    dev,
    build,
  }
}
