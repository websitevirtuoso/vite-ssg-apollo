import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    vueI18n({
      // you need to set i18n resource including paths !
      include: resolve(__dirname, './src/locales/**'),
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      // '@/': resolve(__dirname, 'src'),
      '@/': `${resolve(__dirname, './src')}/`,
    },
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
})
