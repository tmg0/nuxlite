import process from 'node:process'
import mri from 'mri'
import { type defineBuilder, resolveNuxliteConfig } from './core'
import { farmBuilder } from './farm'
import { rsbuildBuilder } from './rsbuild'
import { viteBuilder } from './vite'

import 'dotenv/config'

const BUILDER: Record<string, ReturnType<typeof defineBuilder>> = {
  vite: viteBuilder,
  farm: farmBuilder,
  rsbuild: rsbuildBuilder,
}

const argv = process.argv.slice(2)
const { _ } = mri(argv)
const [subCommand] = _

async function main() {
  const options = await resolveNuxliteConfig()
  const value = options.builder ?? process.env?.NUXLITE_BUILDER ?? ''
  const builder = BUILDER?.[value] ?? rsbuildBuilder

  const ctx = { options }

  if (subCommand === 'start')
    await builder(ctx).start()
  if (subCommand === 'build')
    await builder(ctx).build()
}

if (subCommand)
  main()

export * from './types'

export {
  farmBuilder,
  rsbuildBuilder,
  viteBuilder,
}
