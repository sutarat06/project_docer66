const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  reporter: [
    ['html'],
    ['allure-playwright', { outputFolder: 'my-allure-results' }],
  ],
});