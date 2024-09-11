import { defineConfig } from '@farmfe/core'
import postcss from '@farmfe/js-plugin-postcss'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unimport from 'unimport/unplugin'
import Components from 'unplugin-vue-components'
import VueRouter from 'unplugin-vue-router'
import { unplugin as Virtual } from '../plugins/virtual'
import { options } from './unplugin'

export const config = defineConfig({
  plugins: [postcss()],

  vitePlugins: [
    VueRouter.vite({
      routesFolder: './app/pages',
      dts: './.nuxlite/typed-router.d.ts',
    }),

    Vue(),
    VueJsx(),

    Virtual.vite(options.virtual),

    Components.vite({
      dirs: ['./packages/nuxt/src/components', './app/components'],
      extensions: ['vue', 'tsx'],
      dts: './.nuxlite/components.d.ts',
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
    }),

    Unimport.vite(options.unimport),
  ],
})

export default config
