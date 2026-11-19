import { expect, test } from "@playwright/test";

import { STATIONS } from "./helpers";

// Users guide §2, §6 and §7 — the lobby.
test.describe("lobby", () => {
  test("asks what kind of room first, and nothing else", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "What kind of room?" })).toBeVisible();
    await expect(page.getByRole("link", { name: /^Game Studio/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /^Deliberation/ })).toBeVisible();
    await expect(page.getByLabel("Your name in the room")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /Open a/ })).toHaveCount(0);

    // Each kind has its own page, and Back comes back to the choice.
    await page.getByRole("link", { name: /^Game Studio/ }).click();
    await expect(page).toHaveURL(/\?kind=game-studio$/);
    await expect(page.getByRole("button", { name: "Quick start" })).toBeVisible();
    await page.goBack();
    await expect(page.getByRole("heading", { name: "What kind of room?" })).toBeVisible();
    await page.getByRole("link", { name: /^Deliberation/ }).click();
    await expect(page.getByRole("button", { name: "Open a room" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Quick start" })).toHaveCount(0);
    await page.getByRole("link", { name: "← Kind of room" }).click();
    await expect(page.getByRole("heading", { name: "What kind of room?" })).toBeVisible();
  });

  test("the Game Studio's page puts Quick start first, then the settings, then the crew", async ({
    page,
  }) => {
    await page.goto("/?kind=game-studio");
    const top = async (name: string | RegExp, role: "button" | "heading" = "button") =>
      (await page.getByRole(role, { name }).first().boundingBox())!.y;
    const quick = await top("Quick start");
    const settings = await top("Settings", "heading");
    const open = await top("Open a room");
    const crew = await top(/The crew/, "heading");
    expect(quick).toBeLessThan(settings);
    expect(settings).toBeLessThan(open);
    expect(open).toBeLessThan(crew);
    await expect(page.getByText("Teacher and Student · a new game · Bigger games")).toBeVisible();
  });

  test("shows the whole crew roster and how a turn works", async ({ page }) => {
    await page.goto("/?kind=deliberation");
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

  test("a Deliberation room's page has the room form and the join-by-code box", async ({
    page,
  }) => {
    await page.goto("/?kind=deliberation");
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
