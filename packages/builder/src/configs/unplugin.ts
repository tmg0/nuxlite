import { genImport } from 'knitwork'
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
  '#router': [
    genImport('vue-router', ['createRouter', 'createWebHistory']),
    genImport('vue-router/auto-routes', ['routes']),
    'export const router = createRouter({ history: createWebHistory(), routes: routes ?? [], })',
  ].join('\n'),
}

export const options = {
  virtual,
  unimport,
}
