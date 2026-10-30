/**
 * Demo mode (`just demo`): one-click sign-in as either of two seeded local accounts, with
 * each browser tab keeping its own sign-in, so two tabs can be the two humans in a room.
 * Turned on by VITE_BRIDGE_CREW_DEMO=1; meant for a local stack only.
 */
export const DEMO_MODE = import.meta.env["VITE_BRIDGE_CREW_DEMO"] === "1";

// scripts/test-infra.sh seeds these accounts with this password; keep the two in step.
export const DEMO_PASSWORD = "bridge-crew-local";

export interface DemoUser {
  slot: 1 | 2;
  email: string;
  /** Prefilled as "your name in the room", with a colour of its own. */
  name: string;
  color: string;
}

export const DEMO_USERS: readonly DemoUser[] = [
  { slot: 1, email: "demo-1@example.com", name: "Demo 1", color: "#7dd3fc" },
  { slot: 2, email: "demo-2@example.com", name: "Demo 2", color: "#fca5a5" },
];

export function demoUserFor(email: string | null | undefined): DemoUser | undefined {
  return DEMO_MODE ? DEMO_USERS.find((user) => user.email === email) : undefined;
}

/**
 * Supabase keeps one sign-in per browser and tells every tab about it, so a second tab
 * signing in would take over the first. In demo mode the session lives in this tab's
 * sessionStorage, under a key unique to the tab (it also names Supabase's cross-tab
 * channel). Reloading keeps the tab's sign-in; closing the tab ends it.
 */
export function perTabAuthStorage() {
  const TAB_KEY = "bridge-crew:tab";
  let tab = window.sessionStorage.getItem(TAB_KEY);
  if (!tab) {
    // Not crypto.randomUUID(): it only exists on secure origins, and a LAN address isn't one.
    tab = Math.random().toString(36).slice(2, 10);
    window.sessionStorage.setItem(TAB_KEY, tab);
  }
  return { storage: window.sessionStorage, storageKey: `bridge-crew-auth-${tab}` };
}
