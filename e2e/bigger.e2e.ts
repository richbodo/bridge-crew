import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

import { expect, test, type Page } from "@playwright/test";

import { FIXTURE_MODEL, openStudio, say } from "./helpers";

/**
 * Bigger games, Phase A (docs/plans/bigger-games-2026-11-16.md): game folders, the shelf, saves
 * in the room's frame, and Bring in a game. The fixture Engineer in a Bigger room makes a game
 * in two files that counts its visits in a save. e2e/fixtures/games/ holds games to bring in.
 */
test.describe("bigger games", () => {
  test.skip(!FIXTURE_MODEL, "these lean on the fixture's canned games");

  const made = (page: Page) => page.locator("aside");
  const fixtures = resolve("e2e/fixtures/games");

  async function grantNext(page: Page, job: string) {
    await expect(page.getByText(`${job} is hailing`)).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Grant the floor" }).click();
    await expect(page.getByText(`${job} has the floor`).last()).toBeVisible();
  }

  test("a Bigger room's game is a folder of files, and its saves last until Start fresh", async ({
    page,
  }) => {
    const title = `E2E bigger ${Date.now()}`;
    await openStudio(page, { title, games: "bigger" });
    await expect(page.getByText("Game Studio · Bigger games")).toBeVisible();
    await say(page, "Engineer, make the mole dig with the arrow keys.");
    await grantNext(page, "Engineer");
    await expect(made(page).getByText("Version 1")).toBeVisible();

    // The game folder and its bundle are in the room's games folder.
    const games = resolve("test-results/games");
    const folder = readdirSync(games).find((name) =>
      name.endsWith(title.toLowerCase().replaceAll(" ", "-")),
    );
    expect(folder).toBeDefined();
    expect(existsSync(join(games, folder!, "v1.html"))).toBe(true);
    expect(existsSync(join(games, folder!, "v1", "js", "game.js"))).toBe(true);

    await say(page, "on screen");
    const game = page.frameLocator('iframe[title="Version 1"]');
    await expect(game.getByText("Visits: 1")).toBeVisible();

    // The room kept the game's save, so after a reload it's the second visit.
    await page.reload();
    await page.getByRole("button", { name: "We've read it" }).click();
    await expect(game.getByText("Visits: 2")).toBeVisible();
    await page.getByRole("button", { name: "Start fresh" }).click();
    await expect(game.getByText("Visits: 1")).toBeVisible();
  });

  test("a game folder comes into a Simple room once the room is Bigger, with the shelf's Three.js", async ({
    page,
  }) => {
    await openStudio(page, { title: `E2E bring in ${Date.now()}` });
    await expect(page.getByText("Game Studio · Simple games")).toBeVisible();
    await say(page, "on screen");
    await page.getByRole("button", { name: "Bring in a game" }).click();
    await page.getByLabel("Game folder").setInputFiles(join(fixtures, "cube"));

    await expect(page.getByText("This game has 3 files, so it needs a Bigger room.")).toBeVisible();
    await page.getByRole("button", { name: "Make it Bigger and bring it in" }).click();
    await expect(page.getByText("Game Studio · Bigger games")).toBeVisible();

    const game = page.frameLocator('iframe[title="Version 1: cube"]');
    await expect(game.getByText("Three.js r180")).toBeVisible();
    await expect(
      page.getByText(
        /Version 1: cube was written for an older Three.js \(r128\)\. Ask the Engineer to update it/,
      ),
    ).toBeVisible();
    await page.getByRole("button", { name: "Off screen" }).click();
    await expect(
      page.getByText(/Version 1: cube was brought in: 3 files, \d+ KB\. It loaded Three\.js r128/),
    ).toBeVisible();
    await expect(page.getByText(/Its fonts now come from the studio: VT323\./)).toBeVisible();

    // The Tester plays the folder's bundle, Three.js and all.
    await say(page, "Tester, check version 1.");
    await expect(page.getByText("Tester is hailing")).toBeVisible({ timeout: 60_000 });
    await expect(
      page.getByRole("list", { name: "What the Tester saw: arrows" }).getByRole("img"),
    ).toHaveCount(2);
  });

  test("a one-file game comes into a Simple room as it is, and downloads as one file", async ({
    page,
  }) => {
    await openStudio(page, { title: `E2E one file ${Date.now()}` });
    await say(page, "on screen");
    await page.getByRole("button", { name: "Bring in a game" }).click();
    await page.getByLabel("Game file").setInputFiles(join(fixtures, "one-file.html"));
    await expect(
      page.frameLocator('iframe[title="Version 1: one file"]').getByText("Plays: 1"),
    ).toBeVisible();
    await expect(page.getByText("Game Studio · Simple games")).toBeVisible();
    await page.getByRole("button", { name: "Off screen" }).click();
    await expect(made(page).getByText("Version 1: one file")).toBeVisible();
    await say(page, "on screen");

    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download" }).click();
    expect((await download).suggestedFilename()).toMatch(/-v1\.html$/);
  });

  test("a Game Studio room can open with a one-file game, and stays Simple", async ({ page }) => {
    await page.goto("/?kind=game-studio");
    await page.getByLabel("Your name in the room").fill("Pat");
    await page.getByLabel("Student's nickname").fill("Sam");
    // Bigger is the lobby's default; a one-file game can open in either.
    await page.getByLabel("Simple games").check();
    await page.getByLabel("Open a game").check();
    await expect(page.getByRole("button", { name: "Open a room" })).toBeDisabled();
    await page.getByLabel("Game file").setInputFiles(join(fixtures, "one-file.html"));
    await expect(page.getByText(/^one file: 1 file\./)).toBeVisible();
    await expect(page.getByLabel("Simple games")).toBeChecked();

    await page.getByRole("button", { name: "Open a room" }).click();
    await page.waitForURL(/\/session\/[0-9a-f-]+/);
    await page.getByRole("button", { name: "We've read it" }).click();
    await expect(page.getByRole("heading", { name: "one file" })).toBeVisible();
    await expect(page.getByText("Game Studio · Simple games")).toBeVisible();
    await expect(
      page.frameLocator('iframe[title="Version 1: one file"]').getByText("Plays: 1"),
    ).toBeVisible();
  });
});
