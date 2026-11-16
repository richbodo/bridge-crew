import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Games on GitHub (docs/plans/games-on-github-2026-11-16.md Part 2): opening a game from a GitHub
 * link, in the lobby or a room, and the room's GitHub link. The server talks to GitHub; the
 * browser only sends the link.
 */

/** What's at a GitHub link, for the lobby before the room opens. */
export const lookAtGitHubGame = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { link: string }) => ({ link: String(data.link ?? "").slice(0, 500) }))
  .handler(async ({ data }) => {
    const { lookAtGitHubGame: look } = await import("./room.server");
    return look(data.link);
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
    });
  });

/** The room's GitHub link, and whether GitHub has newer commits. */
export const gitHubStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { sessionId: string }) => data)
  .handler(async ({ data, context }) => {
    const { gitHubStatus: status } = await import("./room.server");
    return status(context.supabase, data.sessionId);
  });

/** GitHub's newest, as the room's next version. */
export const bringInGitHubNewest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { sessionId: string; makeBigger?: boolean }) => data)
  .handler(async ({ data, context }) => {
    const { bringInGitHubNewest: bring } = await import("./room.server");
    return bring(context.supabase, data.sessionId, Boolean(data.makeBigger));
  });
