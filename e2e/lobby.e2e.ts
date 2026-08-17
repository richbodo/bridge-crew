import { expect, test } from "@playwright/test";

import { STATIONS } from "./helpers";

// Users guide §1 — sign in and the lobby.
test.describe("lobby", () => {
  test("shows the whole crew roster and how a turn works", async ({ page }) => {
    await page.goto("/");
    for (const station of STATIONS) {
      await expect(page.getByText(station, { exact: true }).first()).toBeVisible();
    }
    await expect(page.getByText("How a turn works")).toBeVisible();
  });

  test("the users guide link points at the GitHub markdown file", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Users guide" });
    await expect(link).toHaveAttribute(
      "href",
      "https://github.com/richbodo/bridge-crew/blob/main/docs/users_guide.md",
    );
    await expect(link).toHaveAttribute("target", "_blank");
  });

  test("there is no in-app guide page any more", async ({ page }) => {
    const response = await page.goto("/guide");
    const notFound = await page.getByText(/not found/i).count();
    expect(response?.status() === 404 || notFound > 0).toBeTruthy();
  });

  test("offers the room form and the join-by-code box when signed in", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel("Your name in the room")).toBeVisible();
    await expect(page.getByLabel("Session title")).toBeVisible();
    await expect(page.getByRole("button", { name: "Open a room" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Open a demo room" })).toBeVisible();
    await expect(page.getByLabel("Join with a code")).toBeVisible();
  });

  test("a pasted invite link is reduced to its join code", async ({ page }) => {
    await page.goto("/");
    const box = page.getByLabel("Join with a code");
    await box.fill("http://localhost:8080/join/abc123");
    await expect(box).toHaveValue("ABC123");
  });
});
