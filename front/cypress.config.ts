import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'nu5o3q',
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    baseUrl: 'http://localhost:4200',
  },
});