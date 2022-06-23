import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
    chromeWebSecurity: false,
    defaultCommandTimeout: 6000, // default value 4000
    specPattern: './src/modules/**/*.spec.ts',
    env: {
      apiUrl: 'http://127.0.0.1:4090',
      userEmail: 'info@rent.com',
      userPassword: 'mainPassword!@#$',
    },
    // supportFile: 'cypress/e2e/support/index.js',
    // fixturesFolder: 'cypress/e2e/fixtures',
    // downloadsFolder: 'cypress/e2e/downloads',
    // screenshotsFolder: 'cypress/e2e/screenshots',
    // videosFolder: 'cypress/e2e/videos',
  },
})
