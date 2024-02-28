import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const PORT = process.env.PORT || 3000;

const baseURL = `http://localhost:${PORT}`;

const config: PlaywrightTestConfig = {
    testDir: "./e2e",
    timeout: 30 * 1000,
    expect: {
      timeout: 5000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",
    use: {
      actionTimeout: 0,
      baseURL: baseURL,
      trace: "on-first-retry",
    },
    projects: [
      {
        name: "chromium",
        use: {
          ...devices["Desktop Chrome"],
        },
      },
  
      {
        name: "firefox",
        use: {
          ...devices["Desktop Firefox"],
        },
      }
    ],
    webServer: {
      command: "yarn dev",
      url: baseURL,
      reuseExistingServer: !process.env.CI,
    },
  };
  
  export default config;
  