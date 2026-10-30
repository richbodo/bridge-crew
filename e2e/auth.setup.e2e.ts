import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import { expect, test as setup } from "@playwright/test";

/**
 * Restores a Supabase session into browser storage and saves it as Playwright
 * storage state, so every other spec starts signed in.
 *
 * Credentials come from, in order:
 *   1. LOVABLE_BROWSER_SUPABASE_STORAGE_KEY + LOVABLE_BROWSER_SUPABASE_SESSION_JSON
 *      (+ optional LOVABLE_BROWSER_SUPABASE_COOKIES_JSON)
 *   2. a session file (E2E_SESSION_FILE, default ~/.cache/lovable-auth/session.json)
 *   3. E2E_EMAIL + E2E_PASSWORD, signed in through /auth
 */
interface SessionFile {
  storage_key: string;
  session: unknown;
  cookies?: Record<string, unknown>[];
}

function fromFile(): { storageKey: string; sessionJson: string; cookies: Record<string, unknown>[] } | null {
  const path: string = process.env["E2E_SESSION_FILE"] || join(homedir(), ".cache/lovable-auth/session.json");
  try {
    const raw = JSON.parse(readFileSync(path, "utf8")) as SessionFile;
    if (!raw.storage_key || !raw.session) return null;
    return {
      storageKey: raw.storage_key,
      sessionJson: JSON.stringify(raw.session),
      cookies: raw.cookies ?? [],
    };
  } catch {
    return null;
  }
}

setup("sign in", async ({ page, context }) => {
  // Local stack (scripts/test-infra.sh): sign in with the seeded test user, never a Lovable session.
  const localSupabase = process.env["E2E_SUPABASE_URL"];
  const fileSession = localSupabase ? null : fromFile();
  const lovable = (key: string) => (localSupabase ? undefined : process.env[key]);
  const storageKey = lovable("LOVABLE_BROWSER_SUPABASE_STORAGE_KEY") || fileSession?.storageKey;
  const sessionJson = lovable("LOVABLE_BROWSER_SUPABASE_SESSION_JSON") || fileSession?.sessionJson;
  const cookiesJson = lovable("LOVABLE_BROWSER_SUPABASE_COOKIES_JSON");
  const cookies = cookiesJson
    ? (JSON.parse(cookiesJson) as Record<string, unknown>[])
    : (fileSession?.cookies ?? []);
  const email = process.env["E2E_EMAIL"];
  const password = process.env["E2E_PASSWORD"];

  if (!((storageKey && sessionJson) || (email && password))) {
    throw new Error(
      "No e2e credentials. Provide a Lovable auth session file, LOVABLE_BROWSER_SUPABASE_* env vars, or E2E_EMAIL + E2E_PASSWORD.",
    );
  }

  const origin = process.env["E2E_BASE_URL"] || "http://localhost:8080";
  if (cookies.length) {
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
    // Filling before hydration finishes gets wiped when React takes over the inputs.
    await page.waitForURL(/\/auth/);
    await page.waitForLoadState("networkidle");
    await page.getByLabel(/email/i).fill(email!);
    await page.getByLabel(/password/i).fill(password!);
    const tokenRequest = page.waitForRequest(/\/auth\/v1\/token/);
    await page.getByRole("button", { name: /sign in|come aboard/i }).first().click();

    // Never let a local run write test rooms into the Lovable Cloud database.
    const talkingTo = new URL((await tokenRequest).url()).origin;
    if (localSupabase && talkingTo !== new URL(localSupabase).origin) {
      throw new Error(
        `The app under test signs in against ${talkingTo}, not the local Supabase at ${localSupabase}. ` +
          "It was started without --mode localdev; stop it and let Playwright start its own server.",
      );
    }
  }

  // Signed in when the lobby offers the room form.
  await expect(page.getByRole("button", { name: "Open a room" })).toBeVisible();

  await context.storageState({ path: "e2e/.auth/user.json" });
});
