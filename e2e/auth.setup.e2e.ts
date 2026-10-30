import { expect, test as setup } from "@playwright/test";

/**
 * Signs in through /auth and saves the session as Playwright storage state, so every
 * other spec starts signed in. Credentials come from E2E_EMAIL + E2E_PASSWORD, which
 * scripts/test-infra.sh writes to .env for the seeded local test user.
 */
setup("sign in", async ({ page, context }) => {
  const email = process.env["E2E_EMAIL"];
  const password = process.env["E2E_PASSWORD"];
  if (!email || !password) {
    throw new Error(
      "No e2e credentials. Run scripts/test-infra.sh, or set E2E_EMAIL + E2E_PASSWORD.",
    );
  }

  await page.goto("/");
  await page
    .getByRole("link", { name: /sign in|come aboard/i })
    .first()
    .click();
  // Filling before hydration finishes gets wiped when React takes over the inputs.
  await page.waitForURL(/\/auth/);
  await page.waitForLoadState("networkidle");
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  const tokenRequest = page.waitForRequest(/\/auth\/v1\/token/);
  await page
    .getByRole("button", { name: /sign in|come aboard/i })
    .first()
    .click();

  // Test rooms must land in the database this run was set up for (e.g. not one that a
  // personal .env.local points the dev server at).
  const expected = process.env["E2E_SUPABASE_URL"];
  const talkingTo = new URL((await tokenRequest).url()).origin;
  if (expected && talkingTo !== new URL(expected).origin) {
    throw new Error(
      `The app under test signs in against ${talkingTo}, not ${expected}. ` +
        "Check .env.local for a SUPABASE_URL override.",
    );
  }

  // Signed in when the lobby offers the room form.
  await expect(page.getByRole("button", { name: "Open a room" })).toBeVisible();

  await context.storageState({ path: "e2e/.auth/user.json" });
});
