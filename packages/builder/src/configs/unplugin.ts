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

const virtual = {}

export const options = {
  virtual,
  unimport,
}
