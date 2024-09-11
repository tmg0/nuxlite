import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unimport from 'unimport/unplugin'
import Components from 'unplugin-vue-components'
import VueRouter from 'unplugin-vue-router'
import { defineConfig } from 'vite'
import { unplugin as Virtual } from '../plugins/virtual'
import { options } from './unplugin'

export const config = defineConfig({
  plugins: [
    Virtual.vite(options.virtual),

    VueRouter.vite({
      routesFolder: './app/pages',
      dts: './.nuxlite/typed-router.d.ts',
    }),

    Vue(),
    VueJsx(),

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
