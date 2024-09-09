import process from 'node:process'
import mri from 'mri'
import { createContext } from './core'

const argv = process.argv.slice(2)
const { _ } = mri(argv)
const [cmd] = _

async function main() {
  const ctx = createContext()

  if (cmd === 'dev')
    await ctx.dev()
  if (cmd === 'build')
    await ctx.build()
}

main()
