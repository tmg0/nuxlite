import { defineConfig } from '@farmfe/core'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import postcss from '@farmfe/js-plugin-postcss'
import VueRouter from 'unplugin-vue-router/vite'
import Unimport from 'unimport/unplugin'
import Components from 'unplugin-vue-components'

export const config = defineConfig({
  plugins: [postcss()],

  vitePlugins: [
    VueRouter({
      routesFolder: './app/pages',
      dts: './.nuxlite/typed-router.d.ts',
    }),

    Vue(),
    VueJsx(),

    Components.vite({
      dirs: ['./app/components'],
      extensions: ['vue', 'tsx'],
      dts: './.nuxlite/components.d.ts',
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
    }),

    Unimport.vite({
      dts: './.nuxlite/unimport.d.ts',
      presets: ['vue', 'vue-router'],
      dirs: [
        './app/components/**/*',
        './app/composables/**/*',
        './app/utils/**/*',
      ],
    }),
  ],
})
