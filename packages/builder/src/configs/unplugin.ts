import type { UnimportPluginOptions } from 'unimport/unplugin'

const unimport: Partial<UnimportPluginOptions> = {
  dts: './.nuxlite/unimport.d.ts',

  presets: [
    'vue',
    'vue-router',
  ],

  dirs: [
    './packages/nuxt/src/composables/**/*',
    './app/composables/**/*',
    './app/utils/**/*',
  ],
}

const virtual = {
  'virtual:router': [
    'import { createRouter, createWebHistory } from \'vue-router\'',
    'import { routes } from \'vue-router/auto-routes\'',
    'import { useNuxlite } from \'@nuxlite/core\'',
    'export const router = createRouter({ history: createWebHistory(), routes: routes ?? [], })',
    'const nuxlite = useNuxlite()',
    'router.beforeEach(() => { nuxlite.processingMiddleware.value = true })',
    'router.afterEach(() => { nuxlite.processingMiddleware.value = false })',
  ].join('\n'),
}

const generator = {
  './.nuxlite/env.d.ts': `declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  // biome-ignore lint/complexity/noBannedTypes: reason
  const component: DefineComponent<unknown, unknown, any>
  export default component
}

declare module 'virtual:router' {
  import type { Router } from 'vue-router'

  const router: Router
}`,
}

export const options = {
  virtual,
  generator,
  unimport,
}
