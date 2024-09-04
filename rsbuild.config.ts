import { defineConfig } from '@rsbuild/core'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import { RspackVirtualModulePlugin } from 'rspack-plugin-virtual-module'
import Unimport from 'unimport/unplugin'
import { resolveOptions } from 'unplugin-vue-router/options'
import { createRoutesContext } from 'unplugin-vue-router'

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
      const { scanPages, generateRoutes } = createRoutesContext(resolveOptions({
        routesFolder: './app/pages',
      }))

      await scanPages()

      config.plugins?.push(new RspackVirtualModulePlugin({
        'vue-router/auto-routes': generateRoutes(),
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
