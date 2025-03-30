const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.spec.js",  // Asegúrate de que la ruta coincida con la estructura de tu proyecto
    setupNodeEvents(on, config) {
      // implement node event listeners here si los necesitas
    },
  },
});
