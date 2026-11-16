import { expect, test } from "@playwright/test";

import { FIXTURE_MODEL, openStudio, say } from "./helpers";

/**
 * Opening a game from GitHub (docs/plans/games-on-github-2026-11-16.md Part 2), against the fake
 * repositories in e2e/fixtures/github: a game written as modules opens from its link in the
 * lobby, plays with the shelf's Three.js, and brings in GitHub's newest as a new version.
 */
test.describe("games on GitHub", () => {
  test.skip(!FIXTURE_MODEL, "the fake GitHub is set up for local runs");

  const OLD = "1111111111111111111111111111111111111111";

  test("a game written as modules opens from its GitHub link, and brings in GitHub's newest", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByLabel("Game Studio").check();
    await page.getByLabel("Your name in the room").fill("Pat");
    await page.getByLabel("Student's nickname").fill("Sam");
    await page.getByLabel("Open a game").check();
    await page
      .getByLabel("GitHub link")
      .fill(`https://github.com/studio-fixtures/space-cube/tree/${OLD}`);
    await page.getByRole("button", { name: "Look" }).click();
    await expect(
      page.getByText(
        "space cube: 3 files, from github.com/studio-fixtures/space-cube. It'll be the room's first version.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText(/It's written as modules, and imported Three\.js r160 from the internet\./),
    ).toBeVisible();
    await expect(page.getByLabel("Bigger games")).toBeChecked();

    await page.getByRole("button", { name: "Open a room" }).click();
    await page.waitForURL(/\/session\/[0-9a-f-]+/);
    await page.getByRole("button", { name: "We've read it" }).click();
    await expect(page.getByText("Game Studio · Bigger games · from")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "github.com/studio-fixtures/space-cube" }),
    ).toBeVisible();

    const game = page.frameLocator('iframe[title="Version 1: space cube"]');
    await expect(game.getByText("Space cube 1 · Three.js r180")).toBeVisible();

    // GitHub has moved on since that commit.
    await page.getByRole("button", { name: "GitHub", exact: true }).click();
    await expect(page.getByText("commit 1111111 on main")).toBeVisible();
    await expect(page.getByText(/GitHub has newer commits, up to 2222222\./)).toBeVisible();
    await page.getByRole("button", { name: "Bring in GitHub's newest" }).click();
    await expect(
      page
        .frameLocator('iframe[title="Version 2: space cube"]')
        .getByText("Space cube 2 · Three.js r180"),
    ).toBeVisible();

    await page.getByRole("button", { name: "GitHub", exact: true }).click();
    await expect(page.getByText("commit 2222222 on main")).toBeVisible();
    await expect(page.getByText("It's the same as GitHub's newest.")).toBeVisible();
  });

  test("Bring in takes a GitHub link, and says when a game needs building first", async ({
    page,
  }) => {
    await openStudio(page, { title: `E2E needs build ${Date.now()}` });
    await say(page, "on screen");
    await page.getByRole("button", { name: "Bring in a game" }).click();
    await page.getByLabel("GitHub link").fill("studio-fixtures/needs-build");
    await page.getByRole("button", { name: "Bring it in" }).click();
    await expect(
      page.getByText("This game needs building first, which the studio can't do yet."),
    ).toBeVisible();

    await page.getByLabel("GitHub link").fill("https://studio-fixtures.github.io/space-cube/");
    await page.getByRole("button", { name: "Bring it in" }).click();
    await expect(
      page.getByText(/This game has 3 files, so it needs a Bigger room\./),
    ).toBeVisible();
    await page.getByRole("button", { name: "Make it Bigger and bring it in" }).click();
    await expect(
      page
        .frameLocator('iframe[title="Version 1: space cube"]')
        .getByText("Space cube 2 · Three.js r180"),
    ).toBeVisible();
  });

  test("connecting GitHub shows a code, connects, and disconnects, and the key never reaches the page", async ({
    page,
  }) => {
    // Everything the app's server sends this page, to look for the key in.
    const bodies: Promise<string>[] = [];
    page.on("response", (response) => {
      if (response.url().includes("/_serverFn/")) bodies.push(response.text().catch(() => ""));
    });

    await page.goto("/");
    await page.getByLabel("Game Studio").check();
    await page.getByLabel("Open a game").check();
    await page.getByRole("button", { name: "Connect GitHub" }).click();
    const dialog = page.getByRole("dialog", { name: "GitHub" });
    await dialog.getByRole("button", { name: "Connect GitHub" }).click();
    await expect(
      dialog.getByText(/read and change every repository your account has/),
    ).toBeVisible();
    await dialog.getByRole("button", { name: "Get a code" }).click();
    await expect(dialog.getByLabel("GitHub code")).toHaveText("BRDG-CREW");
    await expect(dialog.getByText("Connected to GitHub as studio-tester.")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Connected as studio-tester" })).toBeVisible();

    // The page's own sign-in can't read the table the key is in.
    const session = await page.evaluate(
      () => Object.entries(localStorage).find(([key]) => key.endsWith("-auth-token"))?.[1] ?? "",
    );
    const access = (JSON.parse(session) as { access_token: string }).access_token;
    const read = await page.request.get(
      `${process.env["SUPABASE_URL"]}/rest/v1/github_accounts?select=token`,
      {
        headers: {
          apikey: process.env["SUPABASE_PUBLISHABLE_KEY"]!,
          Authorization: `Bearer ${access}`,
        },
      },
    );
    expect(read.ok()).toBe(false);
    expect(await read.text()).not.toContain("gho_");
    for (const body of await Promise.all(bodies)) expect(body).not.toContain("gho_");

    await page.getByRole("button", { name: "Connected as studio-tester" }).click();
    await dialog.getByRole("button", { name: "Disconnect" }).click();
    await expect(dialog.getByText(/To cancel it on GitHub too/)).toBeVisible();
    await dialog.getByRole("button", { name: "Disconnect" }).click();
    await expect(dialog.getByText("Not connected to GitHub.")).toBeVisible();
  });
});
