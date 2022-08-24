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
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  globals: {
    google: 'readonly', //  to make variable google available without eslint error need to define it as global object
  },
  rules: {
    'object-curly-spacing': ['error', 'always'],
    semi: ['error', 'never'],
    quotes: [2, 'single', 'avoid-escape'],
    // have to disable this rule because it is simplify naming props with API variables
    'vue/prop-name-casing': 'off',
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': ['off'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  plugins: [
    'graphql',
    'cypress', // cy
    'prettier',
  ],
}
