import { defineConfig } from '@rsbuild/core'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import VueRouter from 'unplugin-vue-router'
import Unimport from 'unimport/unplugin'

export default defineConfig({
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
        }),

        Unimport.rspack({
          dts: true,
          presets: ['vue'],
          dirs: [
            './app/components/**/*',
            './app/composables/**/*',
            './app/utils/**/*',
          ],
        }),
      ],
    },
  },
})
