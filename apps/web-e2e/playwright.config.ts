import * as dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

dotenv.config();

const targetPort = process.env.PORT || 3000;
const targetUrl = process.env.TARGET_URL || `http://127.0.0.1:${targetPort}`;
const isCI = !!process.env.CI;
const baseOutputDir = 'reports';

// Reference: https://playwright.dev/docs/test-configuration
export default defineConfig({
  // Each test is given 30 seconds.
  timeout: 30000,

  testDir: 'src',

  fullyParallel: true,

  // Fail the build on CI if you test.only found in source code.
  forbidOnly: isCI,

  // Retry on CI only.
  retries: isCI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: isCI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ['html', { outputFolder: `${baseOutputDir}/report` }],
    ['json', { outputFile: `${baseOutputDir}/report/result.json` }],
  ],

  // expect options
  expect: {
    // wait till `expect`ed result is given
    timeout: 5000,
  },

  use: {
    // Target URL to reach when `await page.goto('/')`.
    baseURL: targetUrl,

    headless: true,

    trace: 'on-first-retry',

    viewport: { width: 1280, height: 720 },

    video: {
      mode: 'on-first-retry',
      size: { width: 640, height: 480 },
    },

    contextOptions: {
      ignoreHTTPSErrors: true,
      recordVideo: {
        dir: `${baseOutputDir}/videos/`,
      },
    },
  },

  // Run your local dev server before starting the tests.
  webServer: {
    command: 'pnpm --filter web dev',
    url: targetUrl,
    reuseExistingServer: !isCI,
    timeout: 120 * 1000,
  },

  outputDir: baseOutputDir,
  snapshotDir: `${baseOutputDir}/snapshots/`,

  // Configure projects for major browsers.

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'safari',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
    // {
    //   name: 'android',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    {
      name: 'iphone',
      use: devices['iPhone 12'],
    },
  ],
});
