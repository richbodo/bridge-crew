import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

import { CREW, type AgentKind } from "./crew";
import { canTransition } from "./floor";
import { enforceSpeechCap } from "./speech";
import { parseSummon } from "./summon";

export interface AgentRun {
  agent: AgentKind;
  brief: string;
  summonId: string | null;
}

export const postLine = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string; body: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const body = data.body.trim();
    if (!body) return { runs: [] as AgentRun[] };

    const { data: me } = await supabase
      .from("participants")
      .select("display_name")
      .eq("session_id", data.sessionId)
      .eq("user_id", userId)
      .maybeSingle();

    await supabase.from("transcript").insert({
      session_id: data.sessionId,
      author_id: userId,
      author_name: me?.display_name ?? "Someone",
      kind: "human" as const,
      body,
    });

    // A human speaking always preempts a speaking agent.
    await supabase
      .from("agents_state")
      .update({ status: "idle" as const })
      .eq("session_id", data.sessionId)
      .eq("status", "speaking");

    const summon = parseSummon(body);
    const runs: AgentRun[] = [];

    const start = async (agent: AgentKind, brief: string, note: string) => {
      const { data: row } = await supabase
        .from("summons")
        .insert({ session_id: data.sessionId, agent, brief, summoned_by: userId })
        .select("id")
        .single();
      await supabase
        .from("agents_state")
        .update({ status: "working" as const, current_task: brief, progress: null })
        .eq("session_id", data.sessionId)
        .eq("agent", agent);
      await supabase.from("transcript").insert({
        session_id: data.sessionId,
        author_name: "Bridge",
        kind: "system" as const,
        body: note,
      });
      runs.push({ agent, brief, summonId: row?.id ?? null });
    };

    if (summon.type === "summon") {
      await start(summon.agent, summon.brief, `${CREW[summon.agent].name} is on it: ${summon.brief}`);
    } else if (summon.type === "debate") {
      await start(
        "advocate",
        `Argue FOR: ${summon.question}`,
        `Advocate and Skeptic are taking up: ${summon.question}`,
      );
      await start("skeptic", `Argue AGAINST: ${summon.question}`, `Skeptic is preparing the case against.`);
    } else if (summon.type === "redirect") {
      await start(
        summon.agent,
        summon.brief,
        `${CREW[summon.agent].name} redirected: ${summon.brief}`,
      );
    } else if (summon.type === "stop") {
      await supabase
        .from("agents_state")
        .update({ status: "stopped" as const, current_task: null, progress: null })
        .eq("session_id", data.sessionId)
        .eq("agent", summon.agent);
      await supabase
        .from("hand_raises")
        .update({ state: "dismissed", resolved_by: userId, resolved_at: new Date().toISOString() })
        .eq("session_id", data.sessionId)
        .eq("agent", summon.agent)
        .eq("state", "pending");
      await supabase.from("transcript").insert({
        session_id: data.sessionId,
        author_name: "Bridge",
        kind: "system" as const,
        body: `${CREW[summon.agent].name} stood down.`,
      });
    } else {
      // Plain speech that names crew members re-engages them with the line as the brief.
      for (const agent of parseMentions(body)) {
        await start(agent, body, `${CREW[agent].name} was called on: ${body}`);
      }
    }

    return { runs };

  });

export const runAgent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string; agent: AgentKind; brief: string; summonId: string | null }) => data)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { runAgentBrief } = await import("./agents.server");

    const { data: state } = await supabase
      .from("agents_state")
      .select("status")
      .eq("session_id", data.sessionId)
      .eq("agent", data.agent)
      .maybeSingle();
    if (state?.status === "stopped") return { ok: false, reason: "stopped" as const };

    const { data: recent } = await supabase
      .from("transcript")
      .select("author_name, body")
      .eq("session_id", data.sessionId)
      .order("created_at", { ascending: false })
      .limit(30);
    const contextText = (recent ?? [])
      .reverse()
      .map((line) => `${line.author_name}: ${line.body}`)
      .join("\n");

    await supabase
      .from("agents_state")
      .update({ progress: "gathering and drafting…" })
      .eq("session_id", data.sessionId)
      .eq("agent", data.agent);

    let result;
    try {
      result = await runAgentBrief(data.agent, data.brief, contextText);
    } catch (error) {
      await supabase
        .from("agents_state")
        .update({ status: "idle" as const, progress: null, current_task: null })
        .eq("session_id", data.sessionId)
        .eq("agent", data.agent);
      await supabase.from("transcript").insert({
        session_id: data.sessionId,
        author_name: "Bridge",
        kind: "system" as const,
        body: `${CREW[data.agent].name} could not finish: ${(error as Error).message}`,
      });
      return { ok: false, reason: "error" as const };
    }

    const { data: after } = await supabase
      .from("agents_state")
      .select("status")
      .eq("session_id", data.sessionId)
      .eq("agent", data.agent)
      .maybeSingle();
    if (after?.status === "stopped") return { ok: false, reason: "stopped" as const };

    const { spoken, overflow } = enforceSpeechCap(result.spokenRaw);
    const brief = overflow ? `${result.brief}\n\n---\n\n${overflow}` : result.brief;

    await supabase.from("contributions").insert({
      session_id: data.sessionId,
      agent: data.agent,
      spoken,
      brief,
      summon_id: data.summonId,
    });

    const summary = spoken.split(/(?<=[.!?])\s+/)[0] ?? spoken.slice(0, 140);
    await supabase.from("hand_raises").insert({
      session_id: data.sessionId,
      agent: data.agent,
      summary,
    });
    await supabase
      .from("agents_state")
      .update({ status: "hand_raised" as const, progress: summary })
      .eq("session_id", data.sessionId)
      .eq("agent", data.agent);

    return { ok: true as const };
  });

export const resolveHail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string; hailId: string; grant: boolean }) => data)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: hail } = await supabase
      .from("hand_raises")
      .select("*")
      .eq("id", data.hailId)
      .maybeSingle();
    if (!hail || hail.state !== "pending") return { ok: false };

    const agent = hail.agent as AgentKind;
    const { data: states } = await supabase
      .from("agents_state")
      .select("agent, status")
      .eq("session_id", data.sessionId);
    const mine = states?.find((s) => s.agent === agent);
    const someoneElseSpeaking = states?.some((s) => s.status === "speaking" && s.agent !== agent);

    if (data.grant) {
      if (someoneElseSpeaking) return { ok: false, reason: "floor_busy" };
      if (!canTransition((mine?.status ?? "idle") as never, "speaking")) return { ok: false };

      const { data: contribution } = await supabase
        .from("contributions")
        .select("spoken")
        .eq("session_id", data.sessionId)
        .eq("agent", agent)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      await supabase
        .from("agents_state")
        .update({ status: "speaking" as const })
        .eq("session_id", data.sessionId)
        .eq("agent", agent);
      await supabase.from("floor_events").insert({
        session_id: data.sessionId,
        holder: agent,
        event: "granted",
        detail: hail.summary,
      });
      await supabase.from("transcript").insert({
        session_id: data.sessionId,
        author_name: CREW[agent].name,
        kind: "agent" as const,
        agent,
        body: contribution?.spoken ?? hail.summary,
      });
      await supabase
        .from("agents_state")
        .update({ status: "idle" as const, progress: null, current_task: null })
        .eq("session_id", data.sessionId)
        .eq("agent", agent);
    } else {
      await supabase
        .from("agents_state")
        .update({ status: "idle" as const, progress: null, current_task: null })
        .eq("session_id", data.sessionId)
        .eq("agent", agent);
      await supabase.from("floor_events").insert({
        session_id: data.sessionId,
        holder: agent,
        event: "dismissed",
      });
    }

    await supabase
      .from("hand_raises")
      .update({
        state: data.grant ? "granted" : "dismissed",
        resolved_by: userId,
        resolved_at: new Date().toISOString(),
      })
      .eq("id", data.hailId);

    return { ok: true };
  });

export const stopAgent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string; agent: AgentKind }) => data)
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("agents_state")
      .update({ status: "stopped" as const, current_task: null, progress: null })
      .eq("session_id", data.sessionId)
      .eq("agent", data.agent);
    await context.supabase.from("transcript").insert({
      session_id: data.sessionId,
      author_name: "Bridge",
      kind: "system" as const,
      body: `${CREW[data.agent].name} stood down.`,
    });
    return { ok: true };
  });

export const runScribe = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { writePlanDoc } = await import("./agents.server");

    await supabase
      .from("agents_state")
      .update({ status: "working" as const, current_task: "updating plan.md" })
      .eq("session_id", data.sessionId)
      .eq("agent", "scribe");

    const [{ data: lines }, { data: doc }] = await Promise.all([
      supabase
        .from("transcript")
        .select("author_name, body")
        .eq("session_id", data.sessionId)
        .order("created_at", { ascending: false })
        .limit(40),
      supabase
        .from("stage_docs")
        .select("body")
        .eq("session_id", data.sessionId)
        .eq("slug", "plan")
        .maybeSingle(),
    ]);

    const contextText = (lines ?? [])
      .reverse()
      .map((line) => `${line.author_name}: ${line.body}`)
      .join("\n");

    let body: string;
    try {
      body = await writePlanDoc(contextText, doc?.body ?? "");
    } catch {
      await supabase
        .from("agents_state")
        .update({ status: "idle" as const, current_task: null })
        .eq("session_id", data.sessionId)
        .eq("agent", "scribe");
      return { ok: false };
    }

    await supabase
      .from("stage_docs")
      .upsert({ session_id: data.sessionId, slug: "plan", body }, { onConflict: "session_id,slug" });
    await supabase
      .from("agents_state")
      .update({ status: "idle" as const, current_task: null })
      .eq("session_id", data.sessionId)
      .eq("agent", "scribe");

    return { ok: true, body };
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
    await supabase.from("contributions").insert({
      session_id: data.sessionId,
      agent: "scout",
      spoken:
        "Hosted services land around three hundred milliseconds end to end, self-hosted is faster once it's warm but you own the warm-up. The gap is smaller than the pricing difference suggests. I'd buy for now and keep the interface swappable.",
      brief:
        "## Findings\n\n- Hosted APIs: ~250-400ms median, predictable, per-minute pricing.\n- Self-hosted small models: ~120-200ms warm, cold start is the real cost.\n- Swap cost is low if the boundary is a stream in / text out interface.\n\n## Confidence\n\nMedium. Numbers are from vendor docs and one benchmark, not our own audio.",
    });
    await supabase.from("hand_raises").insert({
      session_id: data.sessionId,
      agent: "scout",
      summary: "Hosted is close enough on latency — I'd buy and keep it swappable.",
    });
    await supabase
      .from("agents_state")
      .update({
        status: "hand_raised" as const,
        current_task: "realtime speech-to-text latency",
        progress: "Hosted is close enough on latency — I'd buy and keep it swappable.",
      })
      .eq("session_id", data.sessionId)
      .eq("agent", "scout");
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
