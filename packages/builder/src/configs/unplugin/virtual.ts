import { resolve } from 'node:path'
import process from 'node:process'
import fg from 'fast-glob'

const root = process.cwd()
const guardsFolder = resolve(root, './app/middleware/*.global.ts')

const entries = fg.sync([guardsFolder], { dot: true })

const guardImports = entries.map((entry, index) => `import m_${index} from '${entry}'`).join('\n')

const guardInjection = [
  'router.beforeEach((to, from, next) => {',
  ...entries.map((_, index) => `next(m_${index}?.(to))`),
  '})',
].join('\n')

export default {
  'virtual:router': [
    'import { createRouter, createWebHistory } from \'vue-router\'',
    'import { routes } from \'vue-router/auto-routes\'',
    'import { useNuxlite } from \'@nuxlite/core\'',
    guardImports,
    'export const router = createRouter({ history: createWebHistory(), routes: routes ?? [], })',
    'const nuxlite = useNuxlite()',
    'router.beforeEach(() => { nuxlite.processingMiddleware.value = true })',
    'router.afterEach(() => { nuxlite.processingMiddleware.value = false })',
    entries.length ? guardInjection : '',
    'export { routes }',
  ].join('\n'),
}
