import path from 'node:path'
import { createUnplugin } from 'unplugin'

export type VirtualOptions = Record<string, string | (() => string)>

const VIRTUAL_PREFIX = '/@virtual:unplugin-virtual/'

export const unplugin = createUnplugin<VirtualOptions>((options = {}) => {
  const resolvedIds = new Map<string, string>()

  return {
    name: 'unplugin-virtual',
    enforce: 'pre',

    resolveId(id, importer) {
      if (id in options)
        return VIRTUAL_PREFIX + id
      if (importer) {
        const importerNoPrefix = importer.startsWith(VIRTUAL_PREFIX)
          ? importer.slice(VIRTUAL_PREFIX.length)
          : importer
        const resolved = path.resolve(path.dirname(importerNoPrefix), id)
        if (resolvedIds.has(resolved))
          return VIRTUAL_PREFIX + resolved
      }
      return null
    },

    load(id) {
      if (id.startsWith(VIRTUAL_PREFIX)) {
        const idNoPrefix = id.slice(VIRTUAL_PREFIX.length)
        const resolvedId = idNoPrefix in options ? idNoPrefix : resolvedIds.get(idNoPrefix)
        if (resolvedId) {
          let module = options[resolvedId]
          module = typeof module === 'function' ? module() : module
          return typeof module === 'string' ? module : `export default ${JSON.stringify(module)}`
        }
      }
      return null
    },
  }
})

export default unplugin
