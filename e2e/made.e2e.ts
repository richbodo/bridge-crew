import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

import { expect, test, type Page } from "@playwright/test";

import { FIXTURE_MODEL, openStudio, say } from "./helpers";

/**
 * Making the game (docs/plans/educational-context-2026-10-31.md Parts 4–6): made things, the
 * big screen, Reply and How did you do that?. The fixture crew makes a tiny game, an SVG mole
 * and two sounds; a task with "crash" in it makes a game that throws.
 */
test.describe("making the game", () => {
  test.skip(!FIXTURE_MODEL, "these lean on the fixture's canned games, pictures and sounds");

  const made = (page: Page) => page.locator("aside");

  async function grantNext(page: Page, job: string) {
    await expect(page.getByText(`${job} is hailing`)).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Grant the floor" }).click();
    await expect(page.getByText(`${job} has the floor`).last()).toBeVisible();
  }

  test("the Artist's picture comes with the hail, and goes on screen", async ({ page }) => {
    await openStudio(page, { title: `E2E picture ${Date.now()}` });
    await say(page, "Artist, draw the mole.");
    await expect(page.getByText("Artist is hailing")).toBeVisible({ timeout: 30_000 });
    await expect(page.getByRole("img", { name: "mole" }).first()).toBeVisible();

    await page.getByRole("button", { name: "Grant the floor" }).click();
    await expect(made(page).getByText("Picture: mole")).toBeVisible();
    await expect(made(page).getByText("in the game")).toBeVisible();

    await made(page).getByRole("button", { name: "On screen" }).click();
    await expect(page.getByRole("figure").getByRole("img", { name: "mole" })).toBeVisible();
    await page.getByRole("button", { name: "Off screen" }).click();
    await expect(page.getByRole("heading", { name: "Hails" })).toBeVisible();
  });

  test("saying just “on screen” switches the view, and isn't added to the transcript", async ({
    page,
  }) => {
    await openStudio(page, { title: `E2E screen words ${Date.now()}` });
    await say(page, "On screen.");
    await expect(page.getByText(/Nothing to show yet/)).toBeVisible();
    await say(page, "off screen");
    await expect(page.getByRole("heading", { name: "Hails" })).toBeVisible();
    await expect(page.getByText("On screen.", { exact: true })).toHaveCount(0);
  });

  test("a version plays on screen, is saved to disk, and a crash reaches the Engineer", async ({
    page,
  }) => {
    const title = `E2E version ${Date.now()}`;
    await openStudio(page, { title });
    await say(page, "Engineer, make the mole dig with the arrow keys.");
    await grantNext(page, "Engineer");
    await expect(made(page).getByText("Version 1")).toBeVisible();
    await expect(made(page).getByText("current version")).toBeVisible();

    // v1.html and index.html are in the room's games folder.
    const games = resolve("test-results/games");
    const folder = readdirSync(games).find((name) => name.endsWith(title.toLowerCase().replaceAll(" ", "-")));
    expect(folder).toBeDefined();
    expect(existsSync(join(games, folder!, "v1.html"))).toBe(true);
    expect(existsSync(join(games, folder!, "index.html"))).toBe(true);

    await say(page, "Engineer, add gems, but make it crash.");
    await grantNext(page, "Engineer");
    await say(page, "on screen");
    await expect(page.locator('iframe[title="Version 2"]')).toBeVisible();

    await expect(page.getByText(/Version 2 crashed: “the mole fell off the map”/).first()).toBeVisible({
      timeout: 15_000,
    });
    await page.getByRole("button", { name: "Yes", exact: true }).click();
    await expect(page.getByText(/Engineer is hailing/)).toBeVisible({ timeout: 30_000 });
    // The crew cards are off screen, so the strip's hail has the portrait.
    await expect(page.locator('[data-avatar="engineer"]')).toHaveAttribute("data-pose", "hailing");
  });

  test("Not now leaves a picture unused, and Use this puts it in the game", async ({ page }) => {
    await openStudio(page, { title: `E2E use this ${Date.now()}` });
    await say(page, "Artist, draw a gem.");
    await expect(page.getByText("Artist is hailing")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Not now" }).click();

    await expect(made(page).getByText("not used")).toBeVisible();
    await made(page).getByRole("button", { name: "Use this" }).click();
    await expect(made(page).getByText("in the game")).toBeVisible();
  });

  test("Manage renames a picture, removes it and puts it back", async ({ page }) => {
    await openStudio(page, { title: `E2E manage ${Date.now()}` });
    await say(page, "Artist, draw the mole.");
    await grantNext(page, "Artist");

    await made(page).getByRole("button", { name: "Manage" }).click();
    const dialog = page.getByRole("dialog", { name: "Made in this room" });
    await dialog.getByRole("button", { name: "Rename" }).click();
    await dialog.getByLabel("New name for Picture: mole").fill("grip");
    await dialog.getByRole("button", { name: "Save" }).click();
    await expect(dialog.getByText("Picture: grip")).toBeVisible();

    await dialog.getByRole("button", { name: "Remove" }).click();
    await dialog.getByText("Removed (1)").click();
    await expect(made(page).getByText("Picture: grip")).toHaveCount(0);

    await dialog.getByRole("button", { name: "Put back" }).click();
    await expect(dialog.getByText("Removed (1)")).toHaveCount(0);
    await page.keyboard.press("Escape");
    await expect(made(page).getByText("Picture: grip")).toBeVisible();
    await expect(made(page).getByText("not used")).toBeVisible();
  });

  test("the current version can't be removed, and Manage is on the big screen too", async ({ page }) => {
    await openStudio(page, { title: `E2E manage version ${Date.now()}` });
    await say(page, "Engineer, make the mole dig.");
    await grantNext(page, "Engineer");
    await say(page, "on screen");

    await page.getByRole("button", { name: "Manage" }).click();
    const dialog = page.getByRole("dialog", { name: "Made in this room" });
    await expect(dialog.getByText("Can't remove: the current version")).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Remove" })).toHaveCount(0);

    await dialog.getByRole("button", { name: "Rename" }).click();
    await dialog.getByLabel("New name for Version 1").fill("digging");
    await dialog.getByRole("button", { name: "Save" }).click();
    await expect(dialog.getByText("Version 1: digging")).toBeVisible();
  });

  test("asked to, a crew member removes what it made, once its hail is granted", async ({ page }) => {
    await openStudio(page, { title: `E2E crew removes ${Date.now()}` });
    await say(page, "Artist, draw a gem.");
    await expect(page.getByText("Artist is hailing")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Not now" }).click();
    await expect(made(page).getByText("not used")).toBeVisible();

    await say(page, "Artist, remove the pictures we don't need.");
    await expect(page.getByText("Artist is hailing")).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("Removes, if you grant it:")).toBeVisible();
    // Nothing is removed before the grant.
    await expect(made(page).getByText("Picture: mole")).toBeVisible();

    await page.getByRole("button", { name: "Grant the floor" }).click();
    await expect(page.getByText("Removed:")).toBeVisible();
    await expect(made(page).getByText("Picture: mole")).toHaveCount(0);
  });

  test("the Sound designer's sounds have play buttons", async ({ page }) => {
    await openStudio(page, { title: `E2E sounds ${Date.now()}` });
    await say(page, "Sound designer, make a digging sound.");
    await grantNext(page, "Sound designer");
    await expect(made(page).getByText("Sound: dig")).toBeVisible();
    await made(page).getByRole("button", { name: "Play" }).first().click();
  });

  test("Reply sends the next prompt to the same crew member, about what it said", async ({ page }) => {
    await openStudio(page, { title: `E2E reply ${Date.now()}` });
    await say(page, "Storyteller, why does the mole need gems?");
    await grantNext(page, "Storyteller");

    await page.getByRole("button", { name: "Reply" }).click();
    await expect(page.getByText(/Replying to Storyteller/)).toBeVisible();
    const box = page.getByPlaceholder(/Say something/i);
    await expect(box).toHaveValue("@storyteller ");
    await box.fill("@storyteller make it funnier");
    await page.getByRole("button", { name: "Send", exact: true }).click();

    await grantNext(page, "Storyteller");
    await page.getByRole("button", { name: "Show detail" }).last().click();
    await expect(page.getByText(/Replying to what you said/).last()).toBeVisible();
  });

  test("How did you do that? explains, and changes nothing in the game", async ({ page }) => {
    await openStudio(page, { title: `E2E how ${Date.now()}` });
    await say(page, "Engineer, make the mole dig.");
    await grantNext(page, "Engineer");

    await page.getByRole("button", { name: "How did you do that?" }).click();
    await expect(page.getByText("Engineer, how did you do that?")).toBeVisible();
    await grantNext(page, "Engineer");
    await expect(made(page).getByText(/^Version \d/)).toHaveCount(1);
  });

  test("Download saves a version as an HTML file", async ({ page }) => {
    await openStudio(page, { title: `E2E download ${Date.now()}` });
    await say(page, "Engineer, make the mole dig.");
    await grantNext(page, "Engineer");

    const download = page.waitForEvent("download");
    await made(page).getByRole("button", { name: "Download" }).click();
    expect((await download).suggestedFilename()).toMatch(/-v1\.html$/);
  });
});
