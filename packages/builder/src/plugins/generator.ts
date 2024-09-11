import fse from 'fs-extra'
import { createUnplugin } from 'unplugin'

export type GeneratorOptions = Record<string, string | (() => string)> | undefined

export const unplugin = createUnplugin<GeneratorOptions>((options = {}) => {
  return {
    name: 'unplugin-generator',
    enforce: 'pre',

    async buildStart() {
      await Promise.all(Object.entries(options).map(([file, content]) => {
        return (async () => {
          content = typeof content === 'string' ? content : content()
          await fse.outputFile(file, content)
        })()
      }))
    },
  }
})

export default unplugin
