import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import Unimport from 'unimport/unplugin'
import Components from 'unplugin-vue-components'
import VueRouter from 'unplugin-vue-router'
import { unplugin as Generator } from '../plugins/generator'
import { unplugin as Virtual } from '../plugins/virtual'
import { options } from './unplugin'

export const config = defineConfig({
  source: {
    entry: {
      index: './app/main.ts',
    },
  },

  plugins: [
    pluginVue(),
    pluginVueJsx(),
  ],

  tools: {
    rspack: {
      plugins: [
        Virtual.rspack(options.virtual),
        Generator.rspack(options.generator),

        VueRouter.rspack({
          routesFolder: './app/pages',
          dts: './.nuxlite/typed-router.d.ts',
        }),

        Components.rspack({
          dirs: ['./packages/nuxt/src/components', './app/components'],
          extensions: ['vue', 'tsx'],
          dts: './.nuxlite/components.d.ts',
          directoryAsNamespace: true,
          collapseSamePrefixes: true,
        }),

        Unimport.rspack(options.unimport),
      ],
    },
  },
})

export default config
