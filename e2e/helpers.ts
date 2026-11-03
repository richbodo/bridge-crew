import { expect, type Page } from "@playwright/test";

export const STATIONS = ["Scribe", "Scout", "Advocate", "Skeptic", "Analyst"] as const;

/** Local runs answer with canned crew replies unless E2E_LIVE_MODEL=1 (see playwright.config.ts). */
export const FIXTURE_MODEL = !process.env["E2E_BASE_URL"] && process.env["E2E_LIVE_MODEL"] !== "1";

/** Opens a fresh room from the lobby and returns its id and join code. */
export async function openRoom(
  page: Page,
  { title, name = "Tester", demo = false }: { title: string; name?: string; demo?: boolean },
) {
  await page.goto("/");
  await page.getByLabel("Your name in the room").fill(name);
  await page.getByLabel("Session title").fill(title);
  await page.getByRole("button", { name: demo ? "Open a demo room" : "Open a room" }).click();

  await page.waitForURL(/\/session\/[0-9a-f-]+/);
  await expect(page.getByRole("heading", { name: title })).toBeVisible();

  const header = page.locator("header").first();
  const code = (await header.getByText(/^join code /i).innerText()).replace(/join code/i, "").trim();
  const id = page.url().split("/session/")[1]!;
  return { id, code };
}

/** The station card for a given station label. */
export function stationCard(page: Page, label: string) {
  return page.locator("article").filter({ has: page.getByRole("heading", { name: label, exact: true }) });
}

export async function say(page: Page, body: string) {
  const box = page.getByPlaceholder(/Say something/i);
  await box.fill(body);
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(box).toHaveValue("");
}

export const STUDIO_JOBS = [
  "Storyteller",
  "Game designer",
  "Artist",
  "Sound designer",
  "Engineer",
  "Tester",
] as const;

/** Opens a Game Studio room as the teacher, and closes the classroom notice. */
export async function openStudio(
  page: Page,
  { title, teacher = "Pat", student = "Sam" }: { title: string; teacher?: string; student?: string },
) {
  await page.goto("/");
  await page.getByLabel("Game Studio").check();
  await page.getByLabel("Your name in the room").fill(teacher);
  await page.getByLabel("Student's nickname").fill(student);
  await page.getByLabel("Session title").fill(title);
  await page.getByRole("button", { name: "Open a room" }).click();
  await page.waitForURL(/\/session\/[0-9a-f-]+/);
  await expect(page.getByRole("dialog", { name: "Classroom notice" })).toBeVisible();
  await page.getByRole("button", { name: "We've read it" }).click();
  return { id: page.url().split("/session/")[1]! };
}

/** Signs a fresh page in through /auth. */
export async function signIn(page: Page, email: string, password: string) {
  await page.goto("/auth");
  await page.waitForLoadState("networkidle");
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page
    .getByRole("button", { name: /sign in|come aboard/i })
    .first()
    .click();
  await expect(page.getByRole("button", { name: "Open a room" })).toBeVisible();
}
