import { expect, type Page } from "@playwright/test";

export const STATIONS = ["Scribe", "Scout", "Advocate", "Skeptic", "Analyst"] as const;

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

  const code = (await page.getByText(/join code/i).innerText()).replace(/join code/i, "").trim();
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
