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
  .inputValidator(
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
  .inputValidator((data: { sessionId: string; hailId: string; grant: boolean }) => data)
  .handler(async ({ data, context }) => {
    const { answerHail: answer } = await import("./room.server");
    return answer(context.supabase, data.sessionId, data.hailId, data.grant);
  });

export const stopCrewMember = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string; agent: string }) => data)
  .handler(async ({ data, context }) => {
    const { stopCrewMember: stop } = await import("./room.server");
    await stop(context.supabase, data.sessionId, data.agent);
    return { ok: true };
  });

/** On screen and Off screen (docs/state_machines.md §10). */
export const setScreen = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
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
  .inputValidator((data: { sessionId: string; thingId: string }) => data)
  .handler(async ({ data, context }) => {
    const { useThing: use } = await import("./room.server");
    await use(context.supabase, data.sessionId, data.thingId);
    return { ok: true };
  });

/** The big screen's frame caught a crash in a version of the game. */
export const reportCrash = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string; thingId: string; message: string }) => data)
  .handler(async ({ data, context }) => {
    const { reportCrash: report } = await import("./room.server");
    return report(context.supabase, data.sessionId, data.thingId, data.message);
  });

export const answerProposal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string; proposalId: string; yes: boolean }) => data)
  .handler(async ({ data, context }) => {
    const { answerProposal: answer } = await import("./room.server");
    return answer(context.supabase, data.sessionId, data.proposalId, data.yes, context.userId);
  });

/** How did you do that? */
export const explain = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: { sessionId: string; contributionId: string; speaker?: "teacher" | "student" }) => data,
  )
  .handler(async ({ data, context }) => {
    const { explain: run } = await import("./room.server");
    await run(context.supabase, context.userId, data);
    return { ok: true };
  });

export const seedDemo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const script = [
      { author_name: "Rae", kind: "human" as const, body: "Right — do we self-host the transcription or buy it?" },
      { author_name: "Milo", kind: "human" as const, body: "Buying is faster but I don't trust the latency numbers." },
      { author_name: "Rae", kind: "human" as const, body: "/research realtime speech-to-text latency, hosted vs self-hosted" },
      { author_name: "Bridge", kind: "system" as const, body: "Scout is on it: realtime speech-to-text latency, hosted vs self-hosted" },
    ];
    for (const line of script) {
      await supabase.from("transcript").insert({ session_id: data.sessionId, ...line });
    }
    // A finished Scout run, hailing, made through the same moves as a real one.
    const { data: run, error } = await supabase.rpc("start_run", {
      _session: data.sessionId,
      _agent: "scout",
      _task: "realtime speech-to-text latency, hosted vs self-hosted",
      _mode: "direct",
    });
    if (error || !run) throw new Error(error?.message ?? "The demo couldn't start Scout.");
    await supabase.rpc("finish_run", {
      _run: run,
      _spoken:
        "Hosted services land around three hundred milliseconds end to end, self-hosted is faster once it's warm but you own the warm-up. The gap is smaller than the pricing difference suggests. I'd buy for now and keep the interface swappable.",
      _brief:
        "## Findings\n\n- Hosted APIs: ~250-400ms median, predictable, per-minute pricing.\n- Self-hosted small models: ~120-200ms warm, cold start is the real cost.\n- Swap cost is low if the boundary is a stream in / text out interface.\n\n## Confidence\n\nMedium. Numbers are from vendor docs and one benchmark, not our own audio.",
      _summary: "Hosted is close enough on latency — I'd buy and keep it swappable.",
    });
    await supabase.from("stage_docs").upsert(
      {
        session_id: data.sessionId,
        slug: "plan",
        body: "## Where we are\n\nDeciding how to get speech to text into the room.\n\n## Decisions\n\n- None yet.\n\n## Open questions\n\n- Do our own latency numbers match the vendor claims?\n\n## Next\n\n- Hear Scout out, then pick a default.",
      },
      { onConflict: "session_id,slug" },
    );
    return { ok: true };
  });

export const updateAgentProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
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
