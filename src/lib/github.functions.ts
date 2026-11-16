import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Games on GitHub (docs/plans/games-on-github-2026-11-16.md Parts 2 and 3): opening a game from a
 * GitHub link, in the lobby or a room, the room's GitHub link, and Connect GitHub. The server
 * talks to GitHub; the browser only sends the link. The signed-in user's GitHub token, if they've
 * connected, stays on the server: none of these return it.
 */

/**
 * The signed-in user's token, for the server's requests to GitHub. If it can't be read, public
 * games still open without it.
 */
async function tokenFor(userId: string): Promise<string | null> {
  const { tokenOf } = await import("./github-connect.server");
  return tokenOf(userId).catch((error: Error) => {
    console.error("the GitHub connection couldn't be read", error.message);
    return null;
  });
}

/** What's at a GitHub link, for the lobby before the room opens. */
export const lookAtGitHubGame = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { link: string }) => ({ link: String(data.link ?? "").slice(0, 500) }))
  .handler(async ({ data, context }) => {
    const { lookAtGitHubGame: look } = await import("./room.server");
    return look(data.link, await tokenFor(context.userId));
  });

/** A game from a GitHub link as the room's next version, linking the room to it. */
export const bringInFromGitHub = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { sessionId: string; link: string; makeBigger?: boolean }) => ({
    sessionId: data.sessionId,
    link: String(data.link ?? "").slice(0, 500),
    makeBigger: Boolean(data.makeBigger),
  }))
  .handler(async ({ data, context }) => {
    const { bringInFromGitHub: bring } = await import("./room.server");
    return bring(context.supabase, data.sessionId, {
      link: data.link,
      ...(data.makeBigger ? { makeBigger: true } : {}),
      token: await tokenFor(context.userId),
    });
  });

/** The room's GitHub link, and whether GitHub has newer commits. */
export const gitHubStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { sessionId: string }) => data)
  .handler(async ({ data, context }) => {
    const { gitHubStatus: status } = await import("./room.server");
    return status(context.supabase, data.sessionId, await tokenFor(context.userId));
  });

/** GitHub's newest, as the room's next version. */
export const bringInGitHubNewest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { sessionId: string; makeBigger?: boolean }) => data)
  .handler(async ({ data, context }) => {
    const { bringInGitHubNewest: bring } = await import("./room.server");
    return bring(
      context.supabase,
      data.sessionId,
      Boolean(data.makeBigger),
      await tokenFor(context.userId),
    );
  });

// ---------- Connect GitHub (Part 3) ----------

/** The signed-in user's GitHub account, by name, if they've connected one. */
export const gitHubConnection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { connectionOf } = await import("./github-connect.server");
    try {
      const connection = await connectionOf(context.userId);
      return connection
        ? { connected: true as const, login: connection.login }
        : { connected: false as const };
    } catch (error) {
      return { connected: false as const, problem: (error as Error).message };
    }
  });

/** Asks GitHub for a code for the teacher to type at github.com/login/device. */
export const startGitHubConnect = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { startConnect } = await import("./github-connect.server");
    return startConnect(context.userId);
  });

/** Whether the teacher has approved the code yet. */
export const checkGitHubConnect = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { checkConnect } = await import("./github-connect.server");
    return checkConnect(context.userId);
  });

/** Stops waiting for a code. */
export const cancelGitHubConnect = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { cancelConnect } = await import("./github-connect.server");
    cancelConnect(context.userId);
    return { ok: true };
  });

/** Deletes the token from this laptop. */
export const disconnectGitHub = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { disconnect } = await import("./github-connect.server");
    await disconnect(context.userId);
    return { ok: true };
  });
