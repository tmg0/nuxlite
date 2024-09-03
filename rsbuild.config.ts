import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import Unimport from 'unimport/unplugin'

export default {
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
}
