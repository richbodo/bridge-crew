import { expect, test } from "@playwright/test";

import { openRoom, openStudio, say, signIn, stationCard, STUDIO_JOBS } from "./helpers";

// The Game Studio template (docs/plans/educational-context-2026-10-31.md Part 3).
test.describe("the Game Studio", () => {
  test("opens with the notice, six jobs, a shared seat and game.md", async ({ page }) => {
    await openStudio(page, { title: `E2E studio ${Date.now()}` });

    await expect(page.getByText("These are AI characters, and they can be wrong.")).toBeVisible();
    for (const job of STUDIO_JOBS) await expect(stationCard(page, job)).toBeVisible();
    await expect(stationCard(page, "Scribe")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "game.md" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sam" })).toHaveAttribute("aria-pressed", "true");
    // One seat: there's nobody to invite.
    await expect(page.getByRole("button", { name: "Invite" })).toHaveCount(0);
  });

  test("the student asks a crew member by name, grants it, and game.md fills in", async ({ page }) => {
    await openStudio(page, { title: `E2E studio ask ${Date.now()}` });
    await say(page, "Storyteller, why does the mole need gems?");
    await expect(page.getByText("Sam", { exact: true }).first()).toBeVisible();

    await expect(page.getByText("Storyteller is hailing")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Grant the floor" }).click();
    await expect(page.getByText("Storyteller has the floor")).toBeVisible();
    await expect(page.getByText(/Fixture game notes/)).toBeVisible({ timeout: 30_000 });
  });

  test("the speaker switch marks a line as the teacher's", async ({ page }) => {
    await openStudio(page, { title: `E2E studio teacher ${Date.now()}`, teacher: "Pat" });
    await page.getByRole("button", { name: "Pat (teacher)" }).click();
    await say(page, "Let's think about the story first.");
    const line = page.locator("p").filter({ hasText: "Let's think about the story first." });
    await expect(line.getByText("Pat", { exact: true })).toBeVisible();
  });

  test("a name mid-sentence or a slash command doesn't summon anyone", async ({ page }) => {
    await openStudio(page, { title: `E2E studio quiet ${Date.now()}` });
    await say(page, "I think the artist will like this");
    await say(page, "/research gems");
    await page.waitForTimeout(1_000);
    await expect(page.getByText("Crew at work")).toHaveCount(0);
    await expect(page.getByText("No hails. The floor is yours.")).toBeVisible();
  });

  test("Delete room removes the room for good", async ({ page }) => {
    const title = `E2E studio delete ${Date.now()}`;
    await openStudio(page, { title });
    await page.getByRole("button", { name: "Delete room" }).click();
    await page.getByRole("button", { name: "Delete", exact: true }).click();
    await page.waitForURL(/\/$/);
    await expect(page.getByRole("link", { name: new RegExp(title) })).toHaveCount(0);
  });
});

// F14: the template sets the seats.
test("a Deliberation room takes two people, not three", async ({ page, browser }) => {
  const { code } = await openRoom(page, { title: `E2E seats ${Date.now()}` });

  const join = async (email: string, name: string) => {
    const context = await browser.newContext({ storageState: { cookies: [], origins: [] } });
    const guest = await context.newPage();
    await signIn(guest, email, process.env["E2E_PASSWORD"]!);
    await guest.getByLabel("Your name in the room").fill(name);
    await guest.getByLabel("Join with a code").fill(code);
    await guest.getByRole("button", { name: "Join", exact: true }).click();
    return guest;
  };

  const second = await join(process.env["E2E_EMAIL_B"]!, "Milo");
  await second.waitForURL(/\/session\//);

  const third = await join("demo-1@example.com", "Ana");
  await expect(third.getByText("This room is full: it has 2 seats.")).toBeVisible();
});
