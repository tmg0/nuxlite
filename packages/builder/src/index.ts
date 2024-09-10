import process from 'node:process'
import mri from 'mri'
import { farmBuilder } from './farm'
import { rsbuildBuilder } from './rsbuild'
import { viteBuilder } from './vite'

import 'dotenv/config'

const BUILDER = {
  vite: viteBuilder,
  farm: farmBuilder,
  rsbuild: rsbuildBuilder,
}

const argv = process.argv.slice(2)
const { _ } = mri(argv)
const [subCommand] = _

async function main() {
  let builder = BUILDER?.[process.env?.NUXLITE_BUILDER ?? '']

  if (!builder)
    builder = rsbuildBuilder
  if (subCommand === 'start')
    await builder.start()
  if (subCommand === 'build')
    await builder.build()
}

if (subCommand)
  main()

export {
  farmBuilder,
  rsbuildBuilder,
}
