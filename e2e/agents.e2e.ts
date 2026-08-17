import { expect, test } from "@playwright/test";

import { openRoom, say, stationCard } from "./helpers";

/**
 * Users guide §5, §6, §9 — summoning, floor control, demo mode.
 * These specs call the live model, so they are slow and cost credits.
 * Run them with: bunx playwright test e2e/agents.e2e.ts
 */
test.describe("summoning and the floor", () => {
  test.describe.configure({ timeout: 180_000 });

  test("a demo room opens with the canned scene and a Scout hail waiting", async ({ page }) => {
    await openRoom(page, { title: `E2E demo ${Date.now()}`, demo: true });
    await expect(page.getByText(/Rae/).first()).toBeVisible();
    await expect(page.getByText(/Milo/).first()).toBeVisible();
    await expect(page.getByText("Scout is hailing")).toBeVisible();
    await expect(page.getByRole("button", { name: "Grant the floor" })).toBeVisible();
    // Seeded plan.md is present in the right column.
    await expect(page.getByText("plan.md")).toBeVisible();
  });

  test("granting the floor puts the agent's line in the transcript with a written brief", async ({
    page,
  }) => {
    await openRoom(page, { title: `E2E grant ${Date.now()}`, demo: true });
    await page.getByRole("button", { name: "Grant the floor" }).click();

    await expect(page.getByText("Scout has the floor")).toBeVisible({ timeout: 60_000 });
    await expect(page.getByText("No hails. The floor is yours.")).toBeVisible();

    // The full brief folds open and closed.
    await page.getByRole("button", { name: "On screen" }).first().click();
    await expect(page.getByRole("button", { name: "Clear screen" })).toBeVisible();
    await page.getByRole("button", { name: "Clear screen" }).click();
    await expect(page.getByRole("button", { name: "On screen" }).first()).toBeVisible();
  });

  test("Not now dismisses a hail without anything being said", async ({ page }) => {
    await openRoom(page, { title: `E2E dismiss ${Date.now()}`, demo: true });
    await page.getByRole("button", { name: "Not now" }).click();
    await expect(page.getByText("No hails. The floor is yours.")).toBeVisible();
    await expect(page.getByText("Scout has the floor")).toHaveCount(0);
  });

  test("/research summons Scout, who works and then hails", async ({ page }) => {
    await openRoom(page, { title: `E2E research ${Date.now()}` });
    await say(page, "/research self-hosted speech-to-text options for two-person calls");

    const scout = stationCard(page, "Scout");
    await expect(scout.getByText(/working|hailing/)).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("Scout is hailing")).toBeVisible({ timeout: 120_000 });
  });

  test("naming a station in ordinary speech re-engages it", async ({ page }) => {
    await openRoom(page, { title: `E2E mention ${Date.now()}` });
    await say(page, "@analyst what did the vendor docs actually say about latency?");
    const analyst = stationCard(page, "Analyst");
    await expect(analyst.getByText(/working|hailing/)).toBeVisible({ timeout: 30_000 });
  });

  test("/debate engages Advocate and Skeptic together", async ({ page }) => {
    await openRoom(page, { title: `E2E debate ${Date.now()}` });
    await say(page, "/debate should we self-host the transcription service?");
    await expect(stationCard(page, "Advocate").getByText(/working|hailing/)).toBeVisible({
      timeout: 30_000,
    });
    await expect(stationCard(page, "Skeptic").getByText(/working|hailing/)).toBeVisible({
      timeout: 30_000,
    });
  });

  test("Stand down returns a working station to standing by", async ({ page }) => {
    await openRoom(page, { title: `E2E stand down ${Date.now()}` });
    await say(page, "/analyze the ferry cooperative's fare structure");
    const analyst = stationCard(page, "Analyst");
    await expect(analyst.getByRole("button", { name: "Stand down" })).toBeVisible({
      timeout: 30_000,
    });
    await analyst.getByRole("button", { name: "Stand down" }).click();
    await expect(stationCard(page, "Analyst").getByText("stood down")).toBeVisible({
      timeout: 30_000,
    });
  });

  test("an attached context pack is actually read — the canary fact comes back", async ({ page }) => {
    await openRoom(page, { title: `E2E canary ${Date.now()}` });

    const card = stationCard(page, "Scout");
    await card.getByRole("button", { name: "Reassign" }).click();
    await card.getByRole("button", { name: /kereru-ferry-coop/ }).click();
    await card.getByRole("button", { name: "Save station" }).click();
    await expect(page.getByText("Station updated.")).toBeVisible();

    await say(page, "@scout who chairs the Kereru ferry cooperative board, and name the fare rule?");
    await expect(page.getByText("Scout is hailing")).toBeVisible({ timeout: 120_000 });
    await page.getByRole("button", { name: "Grant the floor" }).click();
    await expect(page.getByText("Scout has the floor")).toBeVisible({ timeout: 60_000 });

    await page.getByRole("button", { name: "On screen" }).first().click();
    await expect(page.getByText(/Marama Whitiora/i).first()).toBeVisible({ timeout: 30_000 });
  });
});
