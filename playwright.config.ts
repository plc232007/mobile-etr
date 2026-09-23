import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  use: {
    baseURL: "http://localhost:8081",
    viewport: { width: 390, height: 844 },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "CI=1 npm run web -- --port 8081 --clear",
    url: "http://localhost:8081",
    reuseExistingServer: false,
    timeout: 120000,
  },
});
