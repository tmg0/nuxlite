import { defineConfig } from '@rsbuild/core'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import Unimport from 'unimport/unplugin'
import RspackVueRouterPlugin from 'rspack-plugin-vue-router'

export default defineConfig({
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
    async rspack(config) {
      config.plugins?.push(new RspackVueRouterPlugin({
        routesFolder: './app/pages',
      }))

      config.plugins?.push(Unimport.rspack({
        dts: true,
        presets: ['vue', 'vue-router'],
        dirs: [
          './app/components/**/*',
          './app/composables/**/*',
          './app/utils/**/*',
        ],
      }))
    },
  },
})
