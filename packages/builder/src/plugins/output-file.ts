import fse from 'fs-extra'
import { createUnplugin } from 'unplugin'

export type OutputFileOptions = Record<string, string | (() => string)> | undefined

export const unplugin = createUnplugin<OutputFileOptions>((options = {}) => {
  return {
    name: 'unplugin-output-file',
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
