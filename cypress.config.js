const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Set the base URL, using an environment variable if available.
    baseUrl: process.env.BASE_URL || "http://localhost:3000",

    // Match any test file with the proper extension in the e2e directory.
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",

    // Specify the support file. Remove or update this if not needed.
    supportFile: "cypress/support/e2e.js",

    // Configure Node event listeners.
    setupNodeEvents(on, config) {
      // Example: integrate custom tasks or plugins.
      // require("./cypress/plugins/index.js")(on, config);

      // Return the modified config object.
      return config;
    }
  },

  // Set default viewport dimensions for tests.
  viewportWidth: 1280,
  viewportHeight: 720,

  // Increase the default command timeout if necessary.
  defaultCommandTimeout: 8000,

  // Define custom environment variables. These can be used in tests via Cypress.env().
  env: {
    login_url: "/login"
  },

  // Enable test retries in run mode if tests are occasionally flaky.
  retries: {
    runMode: 2,
    openMode: 0
  }
});