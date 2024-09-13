import type { UnimportPluginOptions } from 'unimport/unplugin'

const options: Partial<UnimportPluginOptions> = {
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

export default options
