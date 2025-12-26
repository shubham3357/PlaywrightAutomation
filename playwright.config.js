// @ts-check

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',

  //maximum time a test can run before it is considered failed
  timeout: 15 * 1000,

  //maximum time an expect assertion can run before it is considered failed
  expect: {
    timeout: 5 * 1000,
  },

  //reporter is used to generate a report of the test results
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false,
    //screenshot for every step
    screenshot: 'on',
    //detail trace logs only for failed  cases
    trace: 'retain-on-failure'
  }
};

module.exports = config;

