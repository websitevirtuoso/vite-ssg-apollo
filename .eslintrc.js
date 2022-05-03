module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    'cypress/globals': true // cy
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:cypress/recommended', // cy
    'prettier'
  ],
  rules: {
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'cypress', // cy
    'prettier'
  ]
}
