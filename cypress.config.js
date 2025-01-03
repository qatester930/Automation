const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,  // Set your desired width
  viewportHeight: 720,  // Set your desired height
  defaultCommandTimeout: 25000,
  pageLoadTimeout: 60000,
  e2e: {
    baseUrl: 'https://uiredevelopment.volopa.com/',
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
      }
    },
    ozoneAPIusers:{
      Username:"mits",
      Password:"mits"
    },
    setupNodeEvents(on, config) {

    },

  },
});
