import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

import type { Mode } from "./machines";

/**
 * The room's server functions. The work happens in room.server.ts, and the moves are checked
 * by the database (docs/state_machines.md). Runs and Scribe updates go on in the background
 * on the server, so a browser tab only sends and listens.
 */

export const postPrompt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    (data: {
      sessionId: string;
      body: string;
      mode?: Mode;
      speaker?: "teacher" | "student";
      replyTo?: string | null;
    }) => data,
  )
  .handler(async ({ data, context }) => {
    const { handlePrompt } = await import("./room.server");
    return handlePrompt(context.supabase, context.userId, data);
  });

export const answerHail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { sessionId: string; hailId: string; grant: boolean }) => data)
  .handler(async ({ data, context }) => {
    const { answerHail: answer } = await import("./room.server");
    return answer(context.supabase, data.sessionId, data.hailId, data.grant);
  });

export const stopCrewMember = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { sessionId: string; agent: string }) => data)
  .handler(async ({ data, context }) => {
    const { stopCrewMember: stop } = await import("./room.server");
    await stop(context.supabase, data.sessionId, data.agent);
    return { ok: true };
  });

/** On screen and Off screen (docs/state_machines.md §10). */
export const setScreen = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    (data: {
      sessionId: string;
      view: "on" | "off";
      showing?: { kind: "made" | "contribution"; id: string } | null;
    }) => data,
  )
  .handler(async ({ data, context }) => {
    const { setScreen: set } = await import("./room.server");
    await set(context.supabase, data.sessionId, {
      view: data.view,
      ...(data.showing === undefined ? {} : { showing: data.showing }),
    });
    return { ok: true };
  });

/** Use this: a made thing that wasn't used goes into the game. */
export const useThing = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { sessionId: string; thingId: string }) => data)
  .handler(async ({ data, context }) => {
    const { useThing: use } = await import("./room.server");
    await use(context.supabase, data.sessionId, data.thingId);
    return { ok: true };
  });

/** Manage: rename, remove or put back a made thing (docs/state_machines.md §8). */
export const manageThing = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    (data: {
      sessionId: string;
      thingId: string;
      action: { type: "rename"; name: string } | { type: "remove" } | { type: "put_back" };
    }) => data,
  )
  .handler(async ({ data, context }) => {
    const { manageThing: manage } = await import("./room.server");
    return manage(context.supabase, data.sessionId, data.thingId, data.action);
  });

/** The big screen's frame caught a crash in a version of the game. */
export const reportCrash = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { sessionId: string; thingId: string; message: string }) => data)
  .handler(async ({ data, context }) => {
    const { reportCrash: report } = await import("./room.server");
    return report(context.supabase, data.sessionId, data.thingId, data.message);
  });

/** A version's bundle, for the big screen and Download (docs/plans/bigger-games-2026-11-16.md). */
export const getGameDocument = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { sessionId: string; thingId: string }) => data)
  .handler(async ({ data, context }) => {
    const { gameDocument } = await import("./room.server");
    return gameDocument(context.supabase, data.sessionId, data.thingId);
  });

/** Bring in a game: a folder or an HTML file the people picked, as the next version. */
export const bringInGame = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    (data: {
      sessionId: string;
      files: Record<string, string>;
      folder?: string;
      /** Files the browser left out, by name, for the room's note. */
      left?: string[];
      makeBigger?: boolean;
    }) => {
      if (!data.files || typeof data.files !== "object") throw new Error("There are no files.");
      return data;
    },
  )
  .handler(async ({ data, context }) => {
    const { bringInGame: bring } = await import("./room.server");
    return bring(context.supabase, data.sessionId, {
      files: data.files,
      ...(data.folder ? { folder: data.folder } : {}),
      ...(data.left?.length ? { left: data.left.slice(0, 50).map(String) } : {}),
      ...(data.makeBigger ? { makeBigger: true } : {}),
    });
  });

/** A Simple room becomes a Bigger room, for good. */
export const makeRoomBigger = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { sessionId: string }) => data)
  .handler(async ({ data, context }) => {
    const { makeRoomBigger: grow } = await import("./room.server");
    await grow(context.supabase, data.sessionId);
    return { ok: true };
  });

export const answerProposal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { sessionId: string; proposalId: string; yes: boolean }) => data)
  .handler(async ({ data, context }) => {
    const { answerProposal: answer } = await import("./room.server");
    return answer(context.supabase, data.sessionId, data.proposalId, data.yes, context.userId);
  });

/** How did you do that? */
export const explain = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    (data: { sessionId: string; contributionId: string; speaker?: "teacher" | "student" }) => data,
  )
  .handler(async ({ data, context }) => {
    const { explain: run } = await import("./room.server");
    await run(context.supabase, context.userId, data);
    return { ok: true };
  });

/**
 * A demo room's opening: a context pack's, from `just demo`'s Context list, or with no context,
 * the one `just run`'s demo room has (src/lib/demo-rooms.ts).
 */
export const seedDemo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { sessionId: string; context?: string }) => data)
  .handler(async ({ data, context }) => {
    const { seedDemoRoom } = await import("./demo-rooms.server");
    await seedDemoRoom(context.supabase, data.sessionId, data.context);
    return { ok: true };
  });

export const updateAgentProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    (data: {
      sessionId: string;
      agent: string;
      name: string;
      duty: string;
      contextPacks?: string[];
    }) => data,
  )
  .handler(async ({ data, context }) => {
    const name = data.name.trim();
    const duty = data.duty.trim();
    const packs = (data.contextPacks ?? []).map((p) => p.trim()).filter(Boolean);
    const { error } = await context.supabase
      .from("agents_state")
      .update({ display_name: name || null, duty: duty || null, context_packs: packs })
      .eq("session_id", data.sessionId)
      .eq("agent", data.agent);
    if (error) throw new Error(error.message);

    const { data: room } = await context.supabase
      .from("sessions")
      .select("template")
      .eq("id", data.sessionId)
      .maybeSingle();
    const { jobOf, templateOf } = await import("./templates");
    const job = jobOf(templateOf(room?.template), data.agent).name;
    const packNote = packs.length ? ` Required reading: ${packs.join(", ")}.` : "";
    await context.supabase.from("transcript").insert({
      session_id: data.sessionId,
      author_name: "Bridge",
      kind: "system" as const,
      body: `${job} station reassigned to ${name || job}.${packNote}`,
    });
    return { ok: true };
  });
