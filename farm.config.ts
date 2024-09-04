import { defineConfig } from '@farmfe/core'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import postcss from '@farmfe/js-plugin-postcss'
import VueRouter from 'unplugin-vue-router/vite'
import Unimport from 'unimport/unplugin'

export default defineConfig({
  plugins: [postcss()],

  vitePlugins: [
    VueRouter({
      routesFolder: './app/pages',
    }),

    Vue(),
    VueJsx(),

    Unimport.vite({
      dts: true,
      presets: ['vue', 'vue-router'],
      dirs: [
        './app/components/**/*',
        './app/composables/**/*',
        './app/utils/**/*',
      ],
    }),
  ],
})
