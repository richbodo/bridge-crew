import { existsSync } from "node:fs";

import { defineConfig, devices } from "@playwright/test";

/**
 * Local by default: Playwright starts its own dev server on :8181 against the local stack
 * (run scripts/test-infra.sh first), with canned crew replies unless E2E_LIVE_MODEL=1
 * (`bun run e2e:live`). To test a deployed instance instead, set E2E_BASE_URL, plus
 * E2E_EMAIL and E2E_PASSWORD for an account that exists there.
 */
const remoteURL = process.env["E2E_BASE_URL"];
if (!remoteURL) {
  if (!existsSync(".env")) throw new Error("No .env — run scripts/test-infra.sh first.");
  process.loadEnvFile(".env");
}

const LOCAL_PORT = 8181;
const baseURL = remoteURL ?? `http://localhost:${LOCAL_PORT}`;
const liveModel = process.env["E2E_LIVE_MODEL"] === "1";

export default defineConfig({
  testDir: "./e2e",
  testMatch: /.*\.e2e\.ts$/,
  timeout: 90_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  retries: process.env["CI"] ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL,
    viewport: { width: 1400, height: 1000 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    permissions: ["clipboard-read", "clipboard-write"],
  },
  projects: [
    { name: "setup", testMatch: /auth\.setup\.e2e\.ts$/ },
    {
      name: "signed-in",
      dependencies: ["setup"],
      testIgnore: /auth\.setup\.e2e\.ts$/,
      use: { ...devices["Desktop Chrome"], storageState: "e2e/.auth/user.json" },
    },
  ],
  ...(!remoteURL && {
    webServer: {
      command: `bunx vite dev --port ${LOCAL_PORT} --strictPort`,
      url: baseURL,
      // Always a fresh server, so the model provider below is the one under test.
      reuseExistingServer: false,
      timeout: 120_000,
      env: liveModel ? {} : { BRIDGE_CREW_MODEL_PROVIDER: "fixture" },
    },
  }),
});
