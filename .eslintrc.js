module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
    'cypress/globals': true, // cy
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'plugin:cypress/recommended', // cy
    'prettier',
  ],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': ['off'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  plugins: [
    'cypress', // cy
    'prettier',
  ],
}
