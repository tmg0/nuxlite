import { defineConfig } from '@farmfe/core'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import postcss from '@farmfe/js-plugin-postcss'
import Unimport from 'unimport/unplugin'

export default defineConfig({
  plugins: [postcss()],

  vitePlugins: [
    Vue(),
    VueJsx(),
    Unimport.vite({
      dts: true,
      presets: ['vue'],
      dirs: [
        './app/components/**/*',
        './app/composables/**/*',
        './app/utils/**/*',
      ],
    }),
  ],
})
