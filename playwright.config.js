// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Chrome-only execution
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,           // run tests in parallel if needed
  forbidOnly: !!process.env.CI,  // fail if test.only is left
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    headless: false,              // set true in CI
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  // Run tests **only on Chromium (Chrome)**
  projects: [
    {
      name: 'chromium',
     
      use: { ...devices['Desktop Chrome'] },
    },
     {
      name: 'Firefox',
     
      use: { ...devices['Desktop Firefox'] },
    }
  ],
});
