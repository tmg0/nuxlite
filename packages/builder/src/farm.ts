import { build, start } from '@farmfe/core'
import { defineBuilder } from './core'
import { config } from './configs/farm.config'

export const farmBuilder = defineBuilder(config as any, {
  start,
  build,
})
