import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

import { GITHUB_CLIENT_ID } from "./github";

/**
 * Connect GitHub (docs/plans/games-on-github-2026-11-16.md Part 3), with GitHub's device flow:
 * the server asks GitHub for a code, the teacher types it at github.com/login/device and
 * approves, and the server collects the token. No client secret is needed.
 *
 * The token can read and change every repository the account has, so it never goes to the
 * browser. It lives in github_accounts, which no sign-in can read; this module reads it with the
 * local database's secret key, for the signed-in user only, and gives it to github.server.ts for
 * its requests to GitHub. Nothing else uses that key.
 *
 * With BRIDGE_CREW_GITHUB_FIXTURES set (the tests), GitHub's side is faked: the code is
 * BRDG-CREW, and the second check finds it approved, as "studio-tester".
 */

const SCOPE = "repo";
const API = "https://api.github.com";
const HEADERS = { "User-Agent": "bridge-crew", Accept: "application/json" };

export const FIXTURE_TOKEN = "gho_fixture_token_for_tests_only";
export const FIXTURE_LOGIN = "studio-tester";

function fixtures(): boolean {
  return Boolean(process.env["BRIDGE_CREW_GITHUB_FIXTURES"]);
}

function clientId(): string {
  return process.env["BRIDGE_CREW_GITHUB_CLIENT_ID"]?.trim() || GITHUB_CLIENT_ID;
}

let admin: SupabaseClient<Database> | null = null;

/** The server's own client for github_accounts, with the secret key `just infra` writes to .env. */
function accounts() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_SECRET_KEY"];
  if (!url || !key) {
    throw new Error(
      "This laptop isn't set up for GitHub yet. Close the Game Studio and open it again, or run just infra.",
    );
  }
  admin ??= createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      // New secret keys are opaque strings, not bearer tokens: they go as the apikey only.
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_secret_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
  return admin.from("github_accounts");
}

/** The signed-in user's GitHub account, by name, if they've connected one. */
export async function connectionOf(userId: string): Promise<{ login: string } | null> {
  const { data, error } = await accounts().select("login").eq("user_id", userId).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? { login: data.login } : null;
}

/** The signed-in user's token, for github.server.ts's requests to GitHub only. */
export async function tokenOf(userId: string): Promise<string | null> {
  if (!process.env["SUPABASE_SECRET_KEY"]) return null;
  const { data, error } = await accounts().select("token").eq("user_id", userId).maybeSingle();
  if (error) throw new Error(error.message);
  return data?.token ?? null;
}

// ---------- the device flow ----------

interface Waiting {
  deviceCode: string;
  /** Seconds between checks, as GitHub says; it can ask for slower. */
  interval: number;
  nextCheck: number;
  expires: number;
  /** Fixture mode: how many times it's been checked. */
  checks: number;
}

/** Codes waiting for the teacher to approve, by Bridge Crew user. On this server only. */
const waiting = new Map<string, Waiting>();

export interface DeviceCode {
  /** What the teacher types at GitHub, such as WDJB-MJHT. */
  userCode: string;
  verificationUri: string;
  /** Seconds until the code expires. */
  expiresIn: number;
  /** Seconds between checks. */
  interval: number;
}

async function post(url: string, body: Record<string, string>): Promise<Record<string, unknown>> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { ...HEADERS, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(body),
    });
  } catch {
    throw new Error("GitHub didn't answer. Is this laptop on the internet?");
  }
  const json = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok && !json["error"]) throw new Error(`GitHub said no (${response.status}).`);
  return json;
}

/** Asks GitHub for a code for the teacher to type. */
export async function startConnect(userId: string): Promise<DeviceCode> {
  if (fixtures()) {
    waiting.set(userId, {
      deviceCode: "fixture-device-code",
      interval: 1,
      nextCheck: 0,
      expires: Date.now() + 900_000,
      checks: 0,
    });
    return {
      userCode: "BRDG-CREW",
      verificationUri: "https://github.com/login/device",
      expiresIn: 900,
      interval: 1,
    };
  }
  const answer = await post("https://github.com/login/device/code", {
    client_id: clientId(),
    scope: SCOPE,
  });
  if (answer["error"] === "device_flow_disabled") {
    throw new Error("The Bridge Crew app on GitHub doesn't have device flow switched on.");
  }
  if (typeof answer["device_code"] !== "string" || typeof answer["user_code"] !== "string") {
    throw new Error(
      `GitHub didn't give a code: ${String(answer["error_description"] ?? answer["error"] ?? "no reason given")}.`,
    );
  }
  const interval = Number(answer["interval"]) || 5;
  const expiresIn = Number(answer["expires_in"]) || 900;
  waiting.set(userId, {
    deviceCode: answer["device_code"],
    interval,
    nextCheck: Date.now() + interval * 1000,
    expires: Date.now() + expiresIn * 1000,
    checks: 0,
  });
  return {
    userCode: answer["user_code"],
    verificationUri: String(answer["verification_uri"] ?? "https://github.com/login/device"),
    expiresIn,
    interval,
  };
}

export type ConnectState =
  | { state: "connected"; login: string }
  | { state: "waiting" }
  | { state: "expired" }
  | { state: "denied" }
  | { state: "none" };

async function save(userId: string, token: string, scope: string) {
  let login = FIXTURE_LOGIN;
  if (!fixtures()) {
    const response = await fetch(`${API}/user`, {
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    }).catch(() => null);
    const user = response?.ok ? ((await response.json()) as { login?: string }) : null;
    if (!user?.login) throw new Error("GitHub gave a key, but wouldn't say whose account it is.");
    login = user.login;
  }
  const { error } = await accounts().upsert({
    user_id: userId,
    login,
    token,
    scope,
    connected_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  return login;
}

/**
 * Whether the teacher has approved yet. Asks GitHub at most once per its interval, however often
 * the page checks.
 */
export async function checkConnect(userId: string): Promise<ConnectState> {
  const code = waiting.get(userId);
  if (!code) {
    const connection = await connectionOf(userId);
    return connection ? { state: "connected", login: connection.login } : { state: "none" };
  }
  if (Date.now() > code.expires) {
    waiting.delete(userId);
    return { state: "expired" };
  }
  if (Date.now() < code.nextCheck) return { state: "waiting" };
  code.nextCheck = Date.now() + code.interval * 1000;
  code.checks += 1;

  if (fixtures()) {
    if (code.checks < 2) return { state: "waiting" };
    waiting.delete(userId);
    return { state: "connected", login: await save(userId, FIXTURE_TOKEN, SCOPE) };
  }

  const answer = await post("https://github.com/login/oauth/access_token", {
    client_id: clientId(),
    device_code: code.deviceCode,
    grant_type: "urn:ietf:params:oauth:grant-type:device_code",
  });
  const token = answer["access_token"];
  if (typeof token === "string" && token) {
    waiting.delete(userId);
    return { state: "connected", login: await save(userId, token, String(answer["scope"] ?? "")) };
  }
  switch (answer["error"]) {
    case "authorization_pending":
      return { state: "waiting" };
    case "slow_down":
      code.interval = Number(answer["interval"]) || code.interval + 5;
      code.nextCheck = Date.now() + code.interval * 1000;
      return { state: "waiting" };
    case "expired_token":
      waiting.delete(userId);
      return { state: "expired" };
    case "access_denied":
      waiting.delete(userId);
      return { state: "denied" };
    default:
      waiting.delete(userId);
      throw new Error(
        `GitHub said no: ${String(answer["error_description"] ?? answer["error"] ?? "no reason given")}.`,
      );
  }
}

/** Stops waiting for a code, if one was shown. */
export function cancelConnect(userId: string) {
  waiting.delete(userId);
}

/**
 * Deletes the token from this laptop. Only the app's owner can cancel it on GitHub, with the
 * app's secret, which the studio doesn't have; the teacher can, at
 * github.com/settings/applications.
 */
export async function disconnect(userId: string) {
  waiting.delete(userId);
  const { error } = await accounts().delete().eq("user_id", userId);
  if (error) throw new Error(error.message);
}
