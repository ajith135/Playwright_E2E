import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');


import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 4 : undefined,

  reporter: 'null',
  use: {
   // Access base URL from process.env or fallback to default
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },

  /* Configure projects for major browsers */
 projects: [
    // Project 1: Authenticate before running tests
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    
    // Project 2: E2E Tests using the saved state
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Inject saved storage state into browser contexts
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'], // Ensures setup runs first
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
