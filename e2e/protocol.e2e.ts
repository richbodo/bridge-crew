import { expect, test } from "@playwright/test";

import { FIXTURE_MODEL, openRoom, say, stationCard } from "./helpers";

/**
 * The protocol fixes (docs/plans/educational-context-2026-10-31.md Part 2). Canned crew
 * replies come back at once, except for a task that says "slowly", which takes four seconds:
 * long enough to redirect or stop it mid-run.
 */
test.describe("the protocol fixes", () => {
  test.skip(!FIXTURE_MODEL, "these lean on the fixture's slow runs");
  test.describe.configure({ timeout: 120_000 });

  test("F3: a redirect supersedes the first run, so only one hail comes back", async ({ page }) => {
    await openRoom(page, { title: `E2E redirect ${Date.now()}` });
    await say(page, "/analyze slowly the ferry fares");
    await expect(stationCard(page, "Analyst").getByText("working")).toBeVisible();

    await say(page, "/redirect analyst the bus timetable");
    await expect(page.getByText("Analyst is hailing")).toHaveCount(1, { timeout: 30_000 });
    // The first run's late reply (after four seconds) is kept, but raises no hail.
    await page.waitForTimeout(6_000);
    await expect(page.getByText("Analyst is hailing")).toHaveCount(1);

    await page.getByRole("button", { name: "Grant the floor" }).click();
    await expect(page.getByText("Analyst has the floor")).toBeVisible();
    await expect(page.getByText(/bus timetable/).last()).toBeVisible();
  });

  test("F6: Stand down ends the run, and no hail follows", async ({ page }) => {
    await openRoom(page, { title: `E2E stop ${Date.now()}` });
    await say(page, "@analyst slowly read the fare rules");
    const analyst = stationCard(page, "Analyst");
    await analyst.getByRole("button", { name: "Stand down" }).click();

    await expect(analyst.getByText("standing by")).toBeVisible();
    await expect(page.getByText("Analyst stood down.")).toBeVisible();
    await page.waitForTimeout(6_000);
    await expect(page.getByText("No hails. The floor is yours.")).toBeVisible();
  });

  test("F2 and F4: a new summon replaces the open hail, and a grant speaks the new work", async ({
    page,
  }) => {
    await openRoom(page, { title: `E2E replace ${Date.now()}`, demo: true });
    await expect(page.getByText("Scout is hailing")).toBeVisible();

    await say(page, "@scout slowly check our own latency numbers");
    await expect(page.getByText("No hails. The floor is yours.")).toBeVisible();
    await expect(page.getByText("Scout is hailing")).toBeVisible({ timeout: 30_000 });

    await page.getByRole("button", { name: "Grant the floor" }).click();
    await expect(page.getByText("Scout has the floor")).toBeVisible();
    await expect(page.getByText(/check our own latency numbers/).last()).toBeVisible();
  });

  test("F10: closing the tab mid-run doesn't strand the crew member", async ({ page, context }) => {
    const { id } = await openRoom(page, { title: `E2E closed tab ${Date.now()}` });
    await say(page, "@analyst slowly look at the fares");
    await page.close();

    const again = await context.newPage();
    await again.goto(`/session/${id}`);
    await expect(again.getByText("Analyst is hailing")).toBeVisible({ timeout: 30_000 });
  });

  test("F11: Send stays live while the crew works", async ({ page }) => {
    await openRoom(page, { title: `E2E send ${Date.now()}` });
    await say(page, "@analyst slowly weigh the options");
    await expect(page.getByText("Crew at work: Analyst.")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send", exact: true })).toBeEnabled();
    await say(page, "And another thought while you work.");
    await expect(page.getByText("And another thought while you work.")).toBeVisible();
  });

  test("F12: a name mid-sentence doesn't summon; a name at the start does", async ({ page }) => {
    await openRoom(page, { title: `E2E names ${Date.now()}` });
    await say(page, "I wonder what the analyst would say");
    await page.waitForTimeout(1_000);
    await expect(stationCard(page, "Analyst").getByText("standing by")).toBeVisible();

    await say(page, "Analyst, what would you say?");
    await expect(page.getByText("Analyst is hailing")).toBeVisible({ timeout: 30_000 });
  });

  test("F16: a Scribe update leaves the Scribe's own hail alone", async ({ page }) => {
    await openRoom(page, { title: `E2E scribe ${Date.now()}` });
    await say(page, "@scribe list the decisions so far");
    await expect(page.getByText("Scribe is hailing")).toBeVisible({ timeout: 30_000 });

    // The fourth prompt asks the Scribe to update plan.md.
    await say(page, "First thought.");
    await say(page, "Second thought.");
    await say(page, "Third thought.");
    await expect(page.getByText(/Fixture plan/)).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("Scribe is hailing")).toBeVisible();
    await expect(stationCard(page, "Scribe").getByText("hailing")).toBeVisible();
  });
});
