import { existsSync } from "node:fs";

import { defineConfig, devices } from "@playwright/test";

/**
 * Local by default: Playwright starts its own dev servers against the local stack (run
 * `just infra` first) — :8181 for most specs, :8182 in demo mode for demo.e2e.ts — with
 * canned crew replies unless E2E_LIVE_MODEL=1 (`just e2e-live`). To test a deployed
 * instance instead, set E2E_BASE_URL, plus E2E_EMAIL and E2E_PASSWORD for an account that
 * exists there; the demo spec is skipped then.
 */
const remoteURL = process.env["E2E_BASE_URL"];
if (!remoteURL) {
  if (!existsSync(".env")) throw new Error("No .env — run scripts/test-infra.sh first.");
  process.loadEnvFile(".env");
}

const LOCAL_PORT = 8181;
const DEMO_PORT = 8182;
const baseURL = remoteURL ?? `http://localhost:${LOCAL_PORT}`;
const demoURL = `http://localhost:${DEMO_PORT}`;
const liveModel = process.env["E2E_LIVE_MODEL"] === "1";
const modelEnv: Record<string, string> = liveModel ? {} : { BRIDGE_CREW_MODEL_PROVIDER: "fixture" };

// Always a fresh server, so the model provider and demo setting are the ones under test.
const devServer = (port: number, env: Record<string, string>) => ({
  command: `bunx vite dev --port ${port} --strictPort`,
  url: `http://localhost:${port}`,
  reuseExistingServer: false,
  timeout: 120_000,
  env,
});

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
      testIgnore: /(auth\.setup|demo)\.e2e\.ts$/,
      use: { ...devices["Desktop Chrome"], storageState: "e2e/.auth/user.json" },
    },
    ...(remoteURL
      ? []
      : [
          {
            name: "demo",
            testMatch: /demo\.e2e\.ts$/,
            use: { ...devices["Desktop Chrome"], baseURL: demoURL },
          },
        ]),
  ],
  ...(!remoteURL && {
    webServer: [
      devServer(LOCAL_PORT, modelEnv),
      devServer(DEMO_PORT, { ...modelEnv, VITE_BRIDGE_CREW_DEMO: "1" }),
    ],
  }),
});
