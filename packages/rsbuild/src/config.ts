import { defineConfig } from '@rsbuild/core'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import Unimport from 'unimport/unplugin'
import VueRouter from 'unplugin-vue-router'
import Components from 'unplugin-vue-components'

export const config = defineConfig({
  html: {
    template: './index.html',
  },

  source: {
    entry: {
      index: './app/index.ts',
    },
  },

  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginVue(),
    pluginVueJsx(),
  ],

  tools: {
    rspack: {
      plugins: [
        VueRouter.rspack({
          routesFolder: './app/pages',
          dts: './.nuxlite/typed-router.d.ts',
        }),

        Components.rspack({
          dirs: ['./app/components'],
          extensions: ['vue', 'tsx'],
          dts: './.nuxlite/components.d.ts',
          directoryAsNamespace: true,
          collapseSamePrefixes: true,
        }),

        Unimport.rspack({
          dts: './.nuxlite/unimport.d.ts',
          presets: ['vue', 'vue-router'],
          dirs: [
            './app/composables/**/*',
            './app/utils/**/*',
          ],
        }),
      ],
    },
  },
})

export default config
