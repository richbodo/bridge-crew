import { expect, test, type Page } from "@playwright/test";

import { openStudio, say, stationCard } from "./helpers";

/**
 * A quick start and a room that's easy to follow: the lobby's defaults, the first tip, a chime
 * for a hail, a light round a working portrait, and a moment's light on what's new.
 */

/** Counts the tones the page makes, in place of listening for them. */
async function countTones(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __tones: number; AudioContext: typeof AudioContext };
    w.__tones = 0;
    const Real = w.AudioContext;
    w.AudioContext = class extends Real {
      override createOscillator() {
        w.__tones += 1;
        return super.createOscillator();
      }
    };
  });
  return () => page.evaluate(() => (window as unknown as { __tones: number }).__tones);
}

test.describe("a quick start", () => {
  test("a Game Studio room opens with the lobby's defaults, nothing typed", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Game Studio").check();
    await expect(page.getByLabel("Bigger games")).toBeChecked();
    await expect(page.getByLabel("Your name in the room")).toHaveValue("Teacher");
    await expect(page.getByLabel("Student's nickname")).toHaveValue("Student");
    await expect(page.getByText("A nickname, not their real name.")).toBeVisible();
    const title = page.getByLabel("Session title");
    await expect(title).toHaveValue(/^Session \d{4}-\d\d-\d\d \d\d:\d\d$/);
    const named = await title.inputValue();

    await page.getByRole("button", { name: "Open a room" }).click();
    await page.waitForURL(/\/session\/[0-9a-f-]+/);
    await page.getByRole("button", { name: "We've read it" }).click();
    await expect(page.getByRole("heading", { name: named })).toBeVisible();
    await expect(page.getByText("Game Studio · Bigger games")).toBeVisible();
    // The name is the role, so it isn't said twice.
    await expect(page.getByText("Teacher and Student", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Teacher", exact: true })).toBeVisible();

    const box = page.getByPlaceholder(/Say something/);
    await expect(box).toHaveAttribute(
      "placeholder",
      /\nTry telling the Storyteller the basic story of the game first\.$/,
    );
  });

  test("a Deliberation room keeps its own name box empty", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Deliberation").check();
    await expect(page.getByLabel("Your name in the room")).toHaveValue("");
    await expect(page.getByLabel("Session title")).toHaveValue(/^Session /);
  });
});

test.describe("following the room", () => {
  test("a hail chimes once, and the hails a room opens with don't", async ({ page }) => {
    const tones = await countTones(page);
    await openStudio(page, { title: `E2E chime ${Date.now()}` });
    expect(await tones()).toBe(0);

    await say(page, "Storyteller, why does the mole need gems?");
    await expect(page.getByText("Storyteller is hailing")).toBeVisible({ timeout: 30_000 });
    // Two notes, each a tone and its octave.
    await expect.poll(tones).toBe(4);

    await page.reload();
    await expect(page.getByText("Storyteller is hailing")).toBeVisible();
    await page.waitForTimeout(1_000);
    expect(await tones()).toBe(0);
  });

  test("a working crew member's portrait has a light round it, on its card and by the box", async ({
    page,
  }) => {
    await openStudio(page, { title: `E2E busy ${Date.now()}` });
    const avatar = stationCard(page, "Storyteller").locator("[data-avatar]");
    await expect(avatar).not.toHaveClass(/crew-avatar-busy/);

    await say(page, "Storyteller, slowly tell me why the mole needs gems.");
    await expect(avatar).toHaveClass(/crew-avatar-busy/);
    const atWork = page.getByText("Crew at work: Storyteller.");
    await expect(atWork).toBeVisible();
    await expect(atWork.locator('[data-avatar="storyteller"]')).toHaveClass(/crew-avatar-busy/);

    await expect(avatar).toHaveAttribute("data-pose", "hailing", { timeout: 30_000 });
    await expect(avatar).not.toHaveClass(/crew-avatar-busy/);
    await expect(page.getByText("Crew at work")).toHaveCount(0);
  });

  test("what's new in game.md, and in Made in this room, lights up for a moment", async ({
    page,
  }) => {
    await openStudio(page, { title: `E2E fresh ${Date.now()}` });
    const aside = page.locator("aside");

    await say(page, "Storyteller, why does the mole need gems?");
    await expect(page.getByText("Storyteller is hailing")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Grant the floor" }).click();
    await expect(aside.getByText(/Fixture game notes/)).toBeVisible({ timeout: 30_000 });
    await expect(aside.locator("[data-fresh]").first()).toBeVisible();
    await expect(aside.getByText("· updated")).toBeVisible();
    // It fades, and then nothing is marked.
    await expect(aside.locator("[data-fresh]")).toHaveCount(0, { timeout: 10_000 });

    await say(page, "Artist, draw a gem.");
    await expect(page.getByText("Artist is hailing")).toBeVisible({ timeout: 30_000 });
    await expect(aside.locator('[data-fresh] [data-made="picture"]')).toBeVisible();
  });
});
