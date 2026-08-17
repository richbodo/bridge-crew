import { expect, test as setup } from "@playwright/test";

/**
 * Restores a Supabase session into browser storage and saves it as Playwright
 * storage state, so every other spec starts signed in.
 *
 * Provide either:
 *   LOVABLE_BROWSER_SUPABASE_STORAGE_KEY + LOVABLE_BROWSER_SUPABASE_SESSION_JSON
 *     (+ optional LOVABLE_BROWSER_SUPABASE_COOKIES_JSON), or
 *   E2E_EMAIL + E2E_PASSWORD for a real sign-in through /auth.
 */
setup("sign in", async ({ page, context }) => {
  const storageKey = process.env["LOVABLE_BROWSER_SUPABASE_STORAGE_KEY"];
  const sessionJson = process.env["LOVABLE_BROWSER_SUPABASE_SESSION_JSON"];
  const cookiesJson = process.env["LOVABLE_BROWSER_SUPABASE_COOKIES_JSON"];
  const email = process.env["E2E_EMAIL"];
  const password = process.env["E2E_PASSWORD"];

  if (!((storageKey && sessionJson) || (email && password))) {
    throw new Error(
      "No e2e credentials. Set LOVABLE_BROWSER_SUPABASE_STORAGE_KEY + _SESSION_JSON, or E2E_EMAIL + E2E_PASSWORD.",
    );
  }

  if (cookiesJson) {
    const origin = process.env["E2E_BASE_URL"] ?? "http://localhost:8080";
    const cookies = JSON.parse(cookiesJson) as Record<string, unknown>[];
    await context.addCookies(cookies.map((c) => ({ ...c, url: origin }) as never));
  }

  await page.goto("/");

  if (storageKey && sessionJson) {
    await page.evaluate(
      ([key, value]) => window.localStorage.setItem(key!, value!),
      [storageKey, sessionJson] as const,
    );
    await page.goto("/");
  } else {
    await page.getByRole("link", { name: /sign in|come aboard/i }).first().click();
    await page.getByLabel(/email/i).fill(email!);
    await page.getByLabel(/password/i).fill(password!);
    await page.getByRole("button", { name: /sign in|come aboard/i }).first().click();
  }

  // Signed in when the lobby offers the room form.
  await expect(page.getByRole("button", { name: "Open a room" })).toBeVisible();

  await context.storageState({ path: "e2e/.auth/user.json" });
});
