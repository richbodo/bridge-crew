import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { expect, test, type Page } from "@playwright/test";

/**
 * Demo mode (`just demo`): one-click sign-in as either seeded demo user, one sign-in per
 * tab, and a lobby with one button and a Context to choose. Runs against its own demo-mode dev
 * server (see playwright.config.ts). The demo users open no rooms, so their recent rooms stay as
 * you left them: the tests that open rooms sign in as the e2e user.
 */

async function logOnAs(page: Page, slot: 1 | 2) {
  // A click before hydration does nothing.
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: `Log me on as demo user ${slot}` }).click();
}

test("two tabs are two different demo users", async ({ context }) => {
  const one = await context.newPage();
  const two = await context.newPage();

  await one.goto("/");
  await logOnAs(one, 1);
  await expect(one.getByText("Demo user 1", { exact: true })).toBeVisible();
  await expect(one.getByLabel("Your name in the room")).toHaveValue("Demo 1");

  await two.goto("/");
  await logOnAs(two, 2);
  await expect(two.getByText("Demo user 2", { exact: true })).toBeVisible();
  await expect(two.getByLabel("Your name in the room")).toHaveValue("Demo 2");

  // The second sign-in didn't take over the first tab, and a reload keeps the tab's user.
  await expect(one.getByText("Demo user 1", { exact: true })).toBeVisible();
  await expect(one.getByText("Demo user 2", { exact: true })).toHaveCount(0);
  await one.reload();
  await expect(one.getByText("Demo user 1", { exact: true })).toBeVisible();

  // Signing out in one tab leaves the other signed in.
  await two.getByRole("button", { name: "Sign out" }).click();
  await expect(two.getByRole("button", { name: "Log me on as demo user 2" })).toBeVisible();
  await one.reload();
  await expect(one.getByText("Demo user 1", { exact: true })).toBeVisible();
});

test("an invite link offers the demo sign-in", async ({ page }) => {
  await page.goto("/join/ZZZZZZ");
  await logOnAs(page, 2);
  // Signed in on the spot; no room has this code, so the page says so.
  await expect(page.getByRole("heading", { name: "That invite doesn't work" })).toBeVisible();
});

/** Signs in as the e2e user, whose rooms are the tests' own. */
async function signInAsTester(page: Page) {
  await page.goto("/auth");
  await page.waitForLoadState("networkidle");
  await page.getByLabel(/email/i).fill(process.env["E2E_EMAIL"]!);
  await page.getByLabel(/password/i).fill(process.env["E2E_PASSWORD"]!);
  await page
    .getByRole("button", { name: /sign in|come aboard/i })
    .first()
    .click();
  await expect(page.getByRole("button", { name: "Open a demo room" })).toBeVisible();
}

test("the demo lobby has one button, and a Context with Game Studio picked", async ({ page }) => {
  await page.goto("/");
  await logOnAs(page, 1);
  await expect(page.getByRole("button", { name: "Open a demo room" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open a room" })).toHaveCount(0);
  await expect(page.getByRole("group", { name: "Kind of room" })).toHaveCount(0);

  const context = page.getByRole("group", { name: "Context" });
  await expect(context.getByRole("radio")).toHaveCount(5);
  await expect(context.getByLabel("Game Studio")).toBeChecked();
  await expect(page.getByText("The crew · Game Studio")).toBeVisible();
  await expect(page.getByLabel("New game")).toBeChecked();

  await context.getByLabel("Kererū Ferry Co-op").check();
  await expect(page.getByText("The crew · Deliberation")).toBeVisible();
  await expect(page.getByRole("group", { name: "Game" })).toHaveCount(0);
});

test("each Deliberation context opens a demo room whose crew reads its pack", async ({ page }) => {
  test.setTimeout(150_000);
  await signInAsTester(page);
  const packs: [string, string][] = [
    ["Kererū Ferry Co-op", "kereru-ferry-coop"],
    ["NZ politics", "nz-politics"],
    ["Social epidemiology", "social-epidemiology"],
    ["Bridge Crew protocol", "bridge-crew-protocol"],
  ];
  for (const [label, pack] of packs) {
    await test.step(label, async () => {
      const script = readFileSync(join("docs/context", pack, "demo.md"), "utf8");
      const title = /^# (.+)$/m.exec(script)![1]!;
      const crew = /\*\*Crew member:\*\* (\w+)/.exec(script)![1]!;
      const hail = /\*\*Hail:\*\* (.+)$/m.exec(script)![1]!;
      const name = crew[0]!.toUpperCase() + crew.slice(1);

      await page.goto("/");
      await page.getByRole("group", { name: "Context" }).getByLabel(label).check();
      await expect(page.getByLabel("Session title")).toHaveAttribute("placeholder", title);
      await page.getByRole("button", { name: "Open a demo room" }).click();
      await page.waitForURL(/\/session\/[0-9a-f-]+/);

      await expect(page.getByRole("heading", { name: title })).toBeVisible();
      await expect(page.getByText(`Every station reads the ${pack} pack.`)).toBeVisible();
      await expect(page.getByText(`${name} is hailing`)).toBeVisible();
      await expect(page.getByText(hail).first()).toBeVisible();
      await expect(page.getByText("plan.md")).toBeVisible();
    });
  }
});

test("a Game Studio demo room can open with a game from a folder", async ({ page }) => {
  await signInAsTester(page);
  await page.goto("/");
  await page.getByLabel("Student's nickname").fill("Sam");
  await page.getByLabel("Open a game").check();
  await expect(page.getByRole("button", { name: "Open a demo room" })).toBeDisabled();
  await page.getByLabel("Game folder").setInputFiles(resolve("e2e/fixtures/games/cube"));

  await expect(page.getByText("cube: 3 files. It'll be the room's first version.")).toBeVisible();
  await expect(
    page.getByText(
      "This game has 3 files, so it needs a Bigger room. The room will make Bigger games.",
    ),
  ).toBeVisible();
  await expect(page.getByLabel("Bigger games")).toBeChecked();
  await expect(page.getByLabel("Simple games")).toBeDisabled();
  await expect(page.getByLabel("Session title")).toHaveAttribute("placeholder", "cube");

  await page.getByRole("button", { name: "Open a demo room" }).click();
  await page.waitForURL(/\/session\/[0-9a-f-]+/);
  await page.getByRole("button", { name: "We've read it" }).click();
  await expect(page.getByRole("heading", { name: "cube" })).toBeVisible();
  await expect(page.getByText("Game Studio · Bigger games")).toBeVisible();
  await expect(
    page.frameLocator('iframe[title="Version 1: cube"]').getByText("Three.js r180"),
  ).toBeVisible();
});
