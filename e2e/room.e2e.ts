import { expect, test } from "@playwright/test";

import { openRoom, say, stationCard, STATIONS } from "./helpers";

// Users guide §2, §4, §5 (buttons), §7, §10.
test.describe("the room", () => {
  test("opening a room gives a join code, all five stations, and plan.md", async ({ page }) => {
    const { code } = await openRoom(page, { title: `E2E room ${Date.now()}` });

    expect(code).toMatch(/^[A-Z0-9]{4,8}$/);
    await expect(page.getByRole("heading", { name: "Hails" })).toBeVisible();
    await expect(page.getByText("No hails. The floor is yours.")).toBeVisible();
    await expect(page.getByText("plan.md")).toBeVisible();
    for (const station of STATIONS) {
      await expect(stationCard(page, station)).toBeVisible();
    }
    // Each station starts standing by.
    await expect(stationCard(page, "Scout").getByText("standing by")).toBeVisible();
  });

  test("the human is labelled (you) in the participant strip", async ({ page }) => {
    await openRoom(page, { title: `E2E identity ${Date.now()}`, name: "Rae" });
    await expect(page.getByText("Rae")).toBeVisible();
    await expect(page.getByText("(you)")).toBeVisible();
  });

  test("typing puts the line in the transcript for everyone", async ({ page }) => {
    await openRoom(page, { title: `E2E talk ${Date.now()}`, name: "Rae" });
    await say(page, "Hosted or self-hosted speech-to-text?");
    await expect(page.getByText("Hosted or self-hosted speech-to-text?")).toBeVisible();

    // And it survives a reload — it is persisted, not local state.
    await page.reload();
    await expect(page.getByText("Hosted or self-hosted speech-to-text?")).toBeVisible();
  });

  test("Engage opens an inline brief composer on a standing-by station", async ({ page }) => {
    await openRoom(page, { title: `E2E engage ui ${Date.now()}` });
    const card = stationCard(page, "Analyst");
    await card.getByRole("button", { name: "Engage" }).click();
    await expect(card.getByPlaceholder(/What should Analyst take on\?/)).toBeVisible();
    await card.getByRole("button", { name: "Cancel" }).click();
    await expect(card.getByPlaceholder(/What should Analyst take on\?/)).toHaveCount(0);
  });

  test("Reassign renames a station, rewrites its duty, and persists", async ({ page }) => {
    await openRoom(page, { title: `E2E reassign ${Date.now()}` });
    const card = stationCard(page, "Scribe");
    await card.getByRole("button", { name: "Reassign" }).click();
    await card.getByPlaceholder("Scribe").fill("Bug_Reporter");
    await card
      .getByPlaceholder("Keeps the living plan, decisions and open questions.")
      .fill("Collect the bugs raised in this conversation and summarise them for approval.");
    await card.getByRole("button", { name: "Save station" }).click();

    await expect(page.getByText("Station updated.")).toBeVisible();
    const renamed = stationCard(page, "Bug_Reporter");
    await expect(renamed).toBeVisible();
    await expect(renamed.getByText("was Scribe")).toBeVisible();
    await expect(renamed.getByText(/Collect the bugs raised/)).toBeVisible();

    await page.reload();
    await expect(stationCard(page, "Bug_Reporter")).toBeVisible();
  });

  test("Reset to default puts the stock crew member back", async ({ page }) => {
    await openRoom(page, { title: `E2E reset ${Date.now()}` });
    let card = stationCard(page, "Skeptic");
    await card.getByRole("button", { name: "Reassign" }).click();
    await card.getByPlaceholder("Skeptic").fill("Doubter");
    await card.getByRole("button", { name: "Save station" }).click();
    await expect(stationCard(page, "Doubter")).toBeVisible();

    card = stationCard(page, "Doubter");
    await card.getByRole("button", { name: "Reassign" }).click();
    await card.getByRole("button", { name: "Reset to default" }).click();
    await card.getByRole("button", { name: "Save station" }).click();
    await expect(stationCard(page, "Skeptic")).toBeVisible();
  });

  test("Leave returns to the lobby and the room is listed under recent rooms", async ({ page }) => {
    const title = `E2E leave ${Date.now()}`;
    const { code } = await openRoom(page, { title });
    await page.getByRole("link", { name: "Leave" }).click();
    await page.waitForURL(/\/$/);
    const recent = page.getByRole("link", { name: new RegExp(title) });
    await expect(recent).toBeVisible();
    await expect(page.getByText(code, { exact: false }).first()).toBeVisible();

    // Reopening restores the room.
    await recent.click();
    await page.waitForURL(/\/session\//);
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  });

  test("the room header links to the guide on GitHub", async ({ page }) => {
    await openRoom(page, { title: `E2E guide link ${Date.now()}` });
    await expect(page.getByRole("link", { name: "Guide" })).toHaveAttribute(
      "href",
      "https://github.com/richbodo/bridge-crew/blob/main/docs/users_guide.md",
    );
  });
});
