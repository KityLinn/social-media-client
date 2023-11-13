const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      LOGINEMAIL: process.env.TEST_EMAIL,
      LOGINPASSWORD: process.env.TEST_PASSWORD,
    },
  },
});
