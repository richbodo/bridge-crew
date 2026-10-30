import { expect, test, type Page } from "@playwright/test";

/**
 * Demo mode (`just demo`): one-click sign-in as either seeded demo user, one sign-in per
 * tab. Runs against its own demo-mode dev server (see playwright.config.ts) and opens no
 * rooms, so the demo users' recent rooms stay as you left them.
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
