import { expect, test } from "@playwright/test";

import { openRoom } from "./helpers";

// Users guide §3 — invite the second human.
test.describe("inviting the second human", () => {
  test("the invite panel shows the code and a copyable /join link", async ({ page, context }) => {
    const { code } = await openRoom(page, { title: `E2E invite ${Date.now()}` });
    await page.getByRole("button", { name: "Invite" }).click();

    await expect(page.getByText("Join code")).toBeVisible();
    await expect(page.getByText(new RegExp(`/join/${code}`))).toBeVisible();

    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.getByRole("button", { name: "Copy invite link" }).click();
    await expect(page.getByText("Invite link copied.")).toBeVisible();
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toContain(`/join/${code}`);
  });

  test("an email invite is recorded and can be revoked", async ({ page }) => {
    await openRoom(page, { title: `E2E email invite ${Date.now()}` });
    await page.getByRole("button", { name: "Invite" }).click();

    const address = `crew+${Date.now()}@example.com`;
    await page.getByLabel("Email an invite").fill(address);
    await page.getByPlaceholder("Optional note").fill("Come aboard");
    await page.getByRole("button", { name: "Send invite" }).click();

    await expect(page.getByText(address)).toBeVisible();
    await page.getByRole("button", { name: "revoke" }).first().click();
    await expect(page.getByText(address)).toHaveCount(0);
  });

  test("the /join/<code> page names the room being joined", async ({ page }) => {
    const title = `E2E join page ${Date.now()}`;
    const { code } = await openRoom(page, { title });
    await page.goto(`/join/${code}`);
    await expect(page.getByText(title)).toBeVisible();
  });

  test("joining by code from the lobby reopens the room", async ({ page }) => {
    const title = `E2E join code ${Date.now()}`;
    const { code, id } = await openRoom(page, { title });
    await page.goto("/");
    await page.getByLabel("Your name in the room").fill("Rae");
    await page.getByLabel("Join with a code").fill(code);
    await page.getByRole("button", { name: "Join", exact: true }).click();
    await page.waitForURL(new RegExp(`/session/${id}`));
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  });

  test("a bad code is rejected, not silently swallowed", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Your name in the room").fill("Rae");
    await page.getByLabel("Join with a code").fill("ZZZZZZ");
    await page.getByRole("button", { name: "Join", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("[data-sonner-toast]")).toBeVisible();
  });
});
