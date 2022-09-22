import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
import stylelint from 'vite-plugin-stylelint'
import eslint from '@modyqyw/vite-plugin-eslint'
// https://github.com/rollup/plugins/tree/master/packages/graphql
import graphql from '@rollup/plugin-graphql'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const mdiJs = await import('@mdi/js')
  return {
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
      eslint(),
      stylelint(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          // custom
          {
            '@mdi/js': Object.keys(mdiJs).filter((v) => v.startsWith('mdi')),
            '@casl/vue': [
              // named imports
              'useAbility', // import { useAbility } from '@casl/vue',
            ],
            '@vue/apollo-composable': [
              // named imports
              'useQuery',
              'useMutation',
              'useApolloClient', // import { useQuery, useMutation, useApolloClient } from '@vue/apollo-composable',
            ],
            'vee-validate': [
              // named imports
              'useField', // import { useField } from 'vee-validate',
            ],
            dayjs: [
              // default imports
              ['default', 'dayjs'], // import { default as dayjs } from 'dayjs',
            ],
          },
        ],
        vueTemplate: true,
        dts: './src/types/auto-imports.d.ts',
      }),
      // https://github.com/antfu/unplugin-vue-components
      graphql(),
    ],
    // https://github.com/antfu/vite-ssg
    // ssgOptions: {
    //   script: 'async',
    //   formatting: 'minify',
    //   format: 'cjs',
    //   // onFinished() { generateSitemap() },
    // },
    define: { 'process.env': {} },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      // fast-deep-equal doesnt have default export
      // https://github.com/vitejs/vite/issues/2679
      include: ['@apollo/client/core', 'fast-deep-equal'],
      exclude: ['@apollo/client'],
    },
    // build: {
    //   rollupOptions: {
    //     external: [
    //       'react', // ignore react stuff, need this to fix error while build project
    //     ],
    //   },
    // },
  }
})
