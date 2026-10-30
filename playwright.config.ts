import { existsSync } from "node:fs";

import { defineConfig, devices } from "@playwright/test";

/**
 * Two ways to run:
 *   - Local stack (when scripts/test-infra.sh has written .env.localdev): Playwright starts its
 *     own dev server against local Supabase on :8181, with canned crew replies unless
 *     E2E_LIVE_MODEL=1 (`bun run e2e:live`).
 *   - Anything else (a deployed preview, Lovable's sandbox): set E2E_BASE_URL or run
 *     against the dev server already on :8080, signed in as described in auth.setup.e2e.ts.
 */
const remoteURL = process.env["E2E_BASE_URL"];
const local = !remoteURL && existsSync(".env.localdev");
if (local) process.loadEnvFile(".env.localdev");

const LOCAL_PORT = 8181;
const baseURL = remoteURL ?? (local ? `http://localhost:${LOCAL_PORT}` : "http://localhost:8080");
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
  ...(local && {
    webServer: {
      command: `bunx vite dev --mode localdev --port ${LOCAL_PORT} --strictPort`,
      url: baseURL,
      // Always a fresh server, so the model provider below is the one under test.
      reuseExistingServer: false,
      timeout: 120_000,
      env: liveModel ? {} : { BRIDGE_CREW_MODEL_PROVIDER: "fixture" },
    },
  }),
});
