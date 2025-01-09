const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://uiredevelopment.volopa.com/',
    viewportWidth: 1280,  // Set your desired width
    viewportHeight: 720,  // Set your desired height
    chromeWebSecurity: false,
    defaultCommandTimeout: 50000,
    pageLoadTimeout: 60000,
    experimentalMemoryManagement: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Volopa Automation Report - [datetime]',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: true,
      reportFilename: "Report-[datetime]-report",
      timestamp: "longDate"
    },
    retries: {
      runMode: 0,
      openMode: 0
    },
    users: {
      user1: {
        username: "qwerty_admin_1",
        password: "testTest1"
      },
      user2: {
        username: "qwerty_admin_2",
        password: "testTest1"
      },
      user3: {
        username: "testnew@volopa.com",
        password: "testTest1"
      },
      user4: {
        username: "carmenTestingBWA3@gmail.com",
        password: "testTest1"
      }
    },
    ozoneAPIusers: {
      Username: "mits",
      Password: "mits"
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },

  },
});
