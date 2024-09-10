import process from 'node:process'
import mri from 'mri'
import { farmBuilder } from './farm'
import { rsbuildBuilder } from './rsbuild'

const argv = process.argv.slice(2)
const { _ } = mri(argv)
const [subCommand] = _

async function main() {
  if (subCommand === 'start')
    await rsbuildBuilder.start()
  if (subCommand === 'build')
    await rsbuildBuilder.build()
}

if (subCommand)
  main()

export {
  farmBuilder,
  rsbuildBuilder,
}
