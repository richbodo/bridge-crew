import { expect, test } from "@playwright/test";

import { openRoom, openStudio, say, signIn, stationCard, STUDIO_JOBS } from "./helpers";

// The Game Studio template (docs/plans/educational-context-2026-10-31.md Part 3).
test.describe("the Game Studio", () => {
  test("opens with the notice, six jobs, a shared seat and game.md", async ({ page }) => {
    await openStudio(page, { title: `E2E studio ${Date.now()}` });

    await expect(page.getByText("These are AI characters, and they can be wrong.")).toBeVisible();
    for (const job of STUDIO_JOBS) {
      await expect(stationCard(page, job)).toBeVisible();
      await expect(stationCard(page, job).locator("[data-avatar]")).toHaveAttribute("data-pose", "idle");
    }
    await expect(stationCard(page, "Scribe")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "game.md" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sam" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("link", { name: "Guide" })).toHaveAttribute(
      "href",
      /users_guide\.md#part-1-the-game-studio$/,
    );
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

  test("a crew member's avatar works, hails, and stands by again", async ({ page }) => {
    await openStudio(page, { title: `E2E studio avatar ${Date.now()}` });
    const avatar = stationCard(page, "Storyteller").locator("[data-avatar]");
    await expect(avatar).toHaveAttribute("data-pose", "idle");

    // A task that says "slowly" keeps the fixture working for four seconds.
    await say(page, "Storyteller, slowly tell me why the mole needs gems.");
    await expect(avatar).toHaveAttribute("data-pose", "working");
    await expect(avatar).toHaveAttribute("data-pose", "hailing", { timeout: 30_000 });
    await page.getByRole("button", { name: "Grant the floor" }).click();
    await expect(avatar).toHaveAttribute("data-pose", "idle");
    // The others stood by throughout.
    await expect(stationCard(page, "Tester").locator("[data-avatar]")).toHaveAttribute("data-pose", "idle");
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

  test("Reply, How did you do that? and Show detail are separate buttons, and the detail is formatted", async ({
    page,
  }) => {
    await openStudio(page, { title: `E2E studio detail ${Date.now()}` });
    await say(page, "Storyteller, why does the mole need gems?");
    await expect(page.getByText("Storyteller is hailing")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Grant the floor" }).click();

    for (const name of ["Reply", "How did you do that?", "Show detail"]) {
      await expect(page.getByRole("button", { name, exact: true })).toBeVisible();
    }
    await page.getByRole("button", { name: "Show detail" }).click();
    await expect(page.getByRole("heading", { name: "Fixture brief" })).toBeVisible();
    await expect(page.getByText("## Fixture brief")).toHaveCount(0);

    // Reply puts the cursor in the message box, ready to type.
    await page.getByRole("button", { name: "Reply", exact: true }).click();
    await expect(page.getByPlaceholder(/Say something/i)).toBeFocused();
  });

  test("the browser's Back asks before leaving the studio; Leave doesn't", async ({ page }) => {
    const { id } = await openStudio(page, { title: `E2E studio back ${Date.now()}` });
    const ask = page.getByRole("alertdialog", { name: "Leave the studio?" });

    await page.evaluate(() => history.back());
    await expect(ask).toBeVisible();
    await ask.getByRole("button", { name: "Stay here" }).click();
    await expect(ask).toBeHidden();
    await expect(page).toHaveURL(new RegExp(`/session/${id}`));
    await expect(page.getByRole("heading", { name: "Hails" })).toBeVisible();

    await page.evaluate(() => history.back());
    await ask.getByRole("button", { name: "Leave" }).click();
    await page.waitForURL(/\/$/);

    await page.goto(`/session/${id}`);
    await page.getByRole("button", { name: "We've read it" }).click();
    await page.getByRole("link", { name: "Leave" }).click();
    await page.waitForURL(/\/$/);
    await expect(ask).toHaveCount(0);
  });

  test("a crew member suggests asking another, and Yes asks them", async ({ page }) => {
    await openStudio(page, { title: `E2E studio suggest ${Date.now()}` });
    await say(page, "Game designer, get a digging sound from the Sound designer.");
    await expect(page.getByText("Game designer is hailing")).toBeVisible({ timeout: 30_000 });
    const suggestions = page.getByRole("list", { name: "Suggestions" });
    // Nothing is suggested until the crew member speaks.
    await expect(suggestions).toHaveCount(0);

    await page.getByRole("button", { name: "Grant the floor" }).click();
    await expect(suggestions.getByText("Game designer suggests:")).toBeVisible();
    await expect(suggestions.getByText(/Ask the Sound designer: “Please help with this/)).toBeVisible();
    await suggestions.getByRole("button", { name: "Yes" }).click();

    await expect(page.getByText("Sound designer is hailing")).toBeVisible({ timeout: 30_000 });
    await expect(suggestions).toHaveCount(0);
    await page.getByRole("button", { name: "Grant the floor" }).click();
    await expect(page.locator("aside").getByText("Sound: dig")).toBeVisible();
    // The Sound designer was asked, so it doesn't suggest anyone in turn.
    await expect(suggestions).toHaveCount(0);
  });

  test("a suggestion never opens after Not now, and No thanks closes it", async ({ page }) => {
    await openStudio(page, { title: `E2E studio no thanks ${Date.now()}` });
    const suggestions = page.getByRole("list", { name: "Suggestions" });

    await say(page, "Storyteller, get a picture of the mole from the Artist.");
    await expect(page.getByText("Storyteller is hailing")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Not now" }).click();
    await expect(page.getByText("No hails. The floor is yours.")).toBeVisible();
    await expect(suggestions).toHaveCount(0);

    await say(page, "Storyteller, get a picture of the mole from the Artist.");
    await expect(page.getByText("Storyteller is hailing")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Grant the floor" }).click();
    await expect(suggestions.getByText(/Ask the Artist/)).toBeVisible();
    await suggestions.getByRole("button", { name: "No thanks" }).click();
    await expect(suggestions).toHaveCount(0);
    await expect(page.getByText("Artist is hailing")).toHaveCount(0);
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
