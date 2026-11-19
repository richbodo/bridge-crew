import { expect, test, type Page } from "@playwright/test";

import { openStudio, say, stationCard } from "./helpers";

/**
 * Tune the crew (docs/plans/tune-the-crew-2026-11-19.md): what each crew member is told, for
 * every room of a kind on this computer. The tuning is shared by every test, so each test puts
 * it back as it found it.
 */

const SUMMARIES =
  "You are the Storyteller. When you offer story ideas, offer three, each with a 100-word summary in your brief.";

/** Back to the original instructions, for every part of the Game Studio's tuning. */
async function untune(page: Page) {
  await page.goto("/tune/game-studio");
  await expect(page.getByRole("heading", { name: "Game Studio" })).toBeVisible();
  const back = page.getByRole("button", { name: /^(Back to the original|Clear)$/ });
  for (let left = await back.count(); left > 0; left = await back.count()) {
    await back.first().click();
    await expect(back).toHaveCount(left - 1);
  }
  await expect(
    page.getByText("Nothing is changed: the crew follows the original instructions."),
  ).toBeVisible();
}

test.describe("tune the crew", () => {
  test.beforeEach(async ({ page }) => untune(page));
  test.afterEach(async ({ page }) => untune(page));

  test("a tuned job reaches every room, Reassign starts from it, and a run keeps it", async ({
    page,
  }) => {
    await page.goto("/?kind=game-studio");
    await page.getByRole("link", { name: "Tune the crew →" }).click();
    await expect(page).toHaveURL(/\/tune\/game-studio$/);

    // The locked parts are shown, not edited.
    const storyteller = page.getByRole("region", { name: "Storyteller" });
    await storyteller.getByText("Everything it's told").click();
    await expect(storyteller.getByText("The setting · fixed in the code")).toBeVisible();

    await storyteller.getByRole("textbox", { name: "Storyteller" }).fill(SUMMARIES);
    await storyteller.getByRole("button", { name: "Save" }).click();
    await expect(storyteller.getByText("Changed", { exact: true })).toBeVisible();
    await expect(page.getByText("Changed from the original: Storyteller.")).toBeVisible();

    await openStudio(page, { title: `E2E tune ${Date.now()}` });
    const card = stationCard(page, "Storyteller");
    await card.getByRole("button", { name: "Reassign" }).click();
    await expect(card.getByRole("textbox", { name: "Duty prompt" })).toHaveValue(SUMMARIES);
    await card.getByRole("button", { name: "Cancel" }).click();

    await say(page, "Storyteller, what's the story?");
    await expect(page.getByText("Storyteller is hailing")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Grant the floor" }).click();
    await page.getByRole("button", { name: "Show detail" }).first().click();
    await page.getByText("What it was told").click();
    const told = page.locator("pre").filter({ hasText: SUMMARIES });
    await expect(told).toBeVisible();
    await expect(told).toContainText("SPOKEN:");
  });

  test("Back to the original undoes a change, and the notes reach every crew member", async ({
    page,
  }) => {
    await page.goto("/tune/game-studio");
    const notes = page.getByRole("region", { name: "Notes for every crew member" });
    await notes.getByRole("textbox").fill("Always say which level you mean.");
    await notes.getByRole("button", { name: "Save" }).click();
    const artist = page.getByRole("region", { name: "Artist" });
    await artist.getByText("Everything it's told").click();
    await expect(
      artist.locator("pre").filter({ hasText: "Always say which level you mean." }),
    ).toBeVisible();

    await notes.getByRole("button", { name: "Clear" }).click();
    await expect(
      page.getByText("Nothing is changed: the crew follows the original instructions."),
    ).toBeVisible();
    await expect(notes.getByRole("textbox")).toHaveValue("");
  });

  test("Export makes a file that Import loads on another computer", async ({ page }) => {
    await page.goto("/tune/game-studio");
    const storyteller = page.getByRole("region", { name: "Storyteller" });
    await storyteller.getByRole("textbox", { name: "Storyteller" }).fill(SUMMARIES);
    await storyteller.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Changed from the original: Storyteller.")).toBeVisible();

    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: "Export" }).click();
    const file = await (await download).path();
    expect((await download).suggestedFilename()).toMatch(
      /^bridge-crew-tuning-game-studio-\d{4}-\d\d-\d\d\.json$/,
    );

    await storyteller.getByRole("button", { name: "Back to the original" }).click();
    await expect(page.getByText("Nothing is changed")).toBeVisible();

    await page.getByLabel("Tuning file").setInputFiles(file);
    const ask = page.getByRole("alertdialog", { name: "Use this file's tuning?" });
    await expect(ask.getByText("It changes: Storyteller.")).toBeVisible();
    await ask.getByRole("button", { name: "Use it" }).click();
    await expect(storyteller.getByRole("textbox", { name: "Storyteller" })).toHaveValue(SUMMARIES);
  });
});
