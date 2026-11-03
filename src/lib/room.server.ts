import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

import { makeNameLookup, runAgentBrief, writePlanDoc, type NameLookup } from "./agents.server";
import { assembleContext, type ContributionNote } from "./context";
import { loadPackDocs } from "./context.server";
import { CREW, type AgentKind } from "./crew";
import type { Mode } from "./machines";
import { enforceSpeechCap } from "./speech";
import { findAddressees, parseSummon, type Addressable } from "./summon";

/**
 * The room's transitions, run by the server (docs/state_machines.md). The moves themselves
 * are database functions (supabase/migrations/20261103080000_crew_machines.sql), so each is
 * atomic and checked against the crew member machine. This module starts runs and Scribe
 * updates itself, so closing a browser tab never strands a crew member (F10).
 */

type Client = SupabaseClient<Database>;

/** A run still going after this long has failed (docs/state_machines.md §4). */
export const RUN_TIME_LIMIT_MS = 5 * 60_000;
/** The Scribe updates the shared document after every this-many prompts (§9). */
export const SCRIBE_EVERY = 4;
const DOC_SLUG = "plan";

export type Refusal = "not_open" | "floor_busy" | "not_current";

async function note(sb: Client, sessionId: string, body: string) {
  await sb.from("transcript").insert({
    session_id: sessionId,
    author_name: "Bridge",
    kind: "system" as const,
    body,
  });
}

async function crewOf(sb: Client, sessionId: string) {
  const { data } = await sb
    .from("agents_state")
    .select("agent, display_name, status, duty, context_packs, current_run_id")
    .eq("session_id", sessionId);
  return data ?? [];
}

export async function namesFor(sb: Client, sessionId: string): Promise<NameLookup> {
  return makeNameLookup(await crewOf(sb, sessionId), CREW);
}

function addressable(crew: Array<{ agent: string; display_name: string | null }>): Addressable[] {
  return crew.map((row) => {
    const job = CREW[row.agent as AgentKind];
    return {
      key: row.agent,
      names: [job?.name ?? row.agent, row.display_name ?? "", ...(job?.aliases ?? [])],
    };
  });
}

function withTimeout<T>(work: Promise<T>, ms: number, message: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([work, timeout]).finally(() => clearTimeout(timer));
}

// ---------- runs ----------

/** Summons a crew member (a redirect if it's working), then runs it in the background. */
export async function startRun(
  sb: Client,
  sessionId: string,
  agent: string,
  task: string,
  mode: Mode,
  announce: string | null,
): Promise<string> {
  const { data: run, error } = await sb.rpc("start_run", {
    _session: sessionId,
    _agent: agent,
    _task: task,
    _mode: mode,
  });
  if (error || !run) throw new Error(error?.message ?? "The crew member couldn't start.");
  if (announce) await note(sb, sessionId, announce);
  void executeRun(sb, run).catch((err: unknown) => console.error(`run ${run} crashed`, err));
  return run;
}

/** Everything a crew member reads before a run: packs, the shared document, the crew's work (F9), the transcript. */
async function gatherContext(sb: Client, sessionId: string, packs: string[], nameOf: NameLookup) {
  const [{ data: lines }, { data: doc }, { data: work }, docs] = await Promise.all([
    sb
      .from("transcript")
      .select("author_name, body")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true }),
    sb.from("stage_docs").select("body").eq("session_id", sessionId).eq("slug", DOC_SLUG).maybeSingle(),
    sb
      .from("contributions")
      .select("agent, spoken, brief, outcome")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true }),
    loadPackDocs(sb, sessionId, packs),
  ]);
  const contributions: ContributionNote[] = (work ?? []).map((c) => ({
    name: nameOf(c.agent as AgentKind),
    outcome: c.outcome,
    spoken: c.spoken,
    brief: c.brief,
  }));
  return assembleContext({
    docs,
    plan: doc?.body ?? "",
    contributions,
    transcript: (lines ?? []).map((line) => `${line.author_name}: ${line.body}`),
  });
}

/** Runs one crew member's task to its end: a hail, a superseded reply, or a failure. */
export async function executeRun(sb: Client, runId: string) {
  const { data: run } = await sb.from("runs").select("*").eq("id", runId).maybeSingle();
  if (!run) return;
  const sessionId = run.session_id;
  const agent = run.agent as AgentKind;
  const crew = await crewOf(sb, sessionId);
  const nameOf = makeNameLookup(crew, CREW);
  const me = crew.find((row) => row.agent === agent);

  try {
    const context = await gatherContext(sb, sessionId, (me?.context_packs as string[] | null) ?? [], nameOf);
    await sb
      .from("agents_state")
      .update({ progress: "gathering and drafting…" })
      .eq("session_id", sessionId)
      .eq("current_run_id", runId);

    const minutes = Math.round(RUN_TIME_LIMIT_MS / 60_000);
    const result = await withTimeout(
      runAgentBrief(agent, run.task, context.text, {
        name: me?.display_name ?? null,
        duty: me?.duty ?? null,
      }),
      RUN_TIME_LIMIT_MS,
      `it took longer than ${minutes} minutes`,
    );

    const { spoken, overflow } = enforceSpeechCap(result.spokenRaw);
    const provenance = context.read ? `_Read: ${context.read}_\n\n` : "";
    const brief = provenance + (overflow ? `${result.brief}\n\n---\n\n${overflow}` : result.brief);
    const summary = spoken.split(/(?<=[.!?])\s+/)[0] || spoken.slice(0, 140);
    const { error } = await sb.rpc("finish_run", {
      _run: runId,
      _spoken: spoken,
      _brief: brief,
      _summary: summary,
    });
    if (error) throw new Error(error.message);
  } catch (error) {
    const message = (error as Error).message;
    const { data: failed } = await sb.rpc("fail_run", { _run: runId, _reason: message });
    if (failed) await note(sb, sessionId, `${nameOf(agent)} couldn't finish: ${message}`);
  }
}

/** Stop: from the Stop button or `/stop` (F6). */
export async function stopCrewMember(sb: Client, sessionId: string, agent: string) {
  const { data: was, error } = await sb.rpc("stop_crew", { _session: sessionId, _agent: agent });
  if (error) throw new Error(error.message);
  if (was && was !== "idle") {
    const nameOf = await namesFor(sb, sessionId);
    await note(sb, sessionId, `${nameOf(agent as AgentKind)} stood down.`);
  }
}

// ---------- prompts (docs/state_machines.md §12) ----------

export async function handlePrompt(
  sb: Client,
  userId: string,
  { sessionId, body, mode = "direct" }: { sessionId: string; body: string; mode?: Mode },
) {
  const text = body.trim();
  if (!text) return { ok: true as const };

  const [crew, { data: me }] = await Promise.all([
    crewOf(sb, sessionId),
    sb
      .from("participants")
      .select("display_name")
      .eq("session_id", sessionId)
      .eq("user_id", userId)
      .maybeSingle(),
  ]);
  const nameOf = makeNameLookup(crew, CREW);
  const statusOf = (agent: string) => crew.find((row) => row.agent === agent)?.status ?? "idle";

  const { error } = await sb.from("transcript").insert({
    session_id: sessionId,
    author_id: userId,
    author_name: me?.display_name ?? "Someone",
    kind: "human" as const,
    body: text,
  });
  if (error) throw new Error(error.message);
  await sb.rpc("interrupt_speaker", { _session: sessionId });
  void countTowardsScribe(sb, sessionId);

  const summon = (agent: string, task: string, announce: string) =>
    startRun(sb, sessionId, agent, task, mode, announce);
  const command = parseSummon(text);

  if (command.type === "stop") {
    await stopCrewMember(sb, sessionId, command.agent);
  } else if (command.type === "debate") {
    await summon(
      "advocate",
      `Argue FOR: ${command.question}`,
      `Advocate and Skeptic are taking up: ${command.question}`,
    );
    await summon("skeptic", `Argue AGAINST: ${command.question}`, "Skeptic is preparing the case against.");
  } else if (command.type === "summon" || command.type === "redirect") {
    const verb = statusOf(command.agent) === "working" ? "redirected" : "is on it";
    await summon(command.agent, command.brief, `${nameOf(command.agent)} ${verb}: ${command.brief}`);
  } else {
    for (const agent of findAddressees(text, addressable(crew))) {
      const verb = statusOf(agent) === "working" ? "was redirected" : "was called on";
      await summon(agent, text, `${nameOf(agent as AgentKind)} ${verb}: ${text}`);
    }
  }
  return { ok: true as const };
}

// ---------- hails ----------

export async function answerHail(
  sb: Client,
  sessionId: string,
  hailId: string,
  grant: boolean,
): Promise<{ ok: true } | { ok: false; reason: Refusal }> {
  if (!grant) {
    const { data, error } = await sb.rpc("decline_hail", { _hail: hailId });
    if (error) throw new Error(error.message);
    return data === "declined" ? { ok: true } : { ok: false, reason: data as Refusal };
  }

  const { data, error } = await sb.rpc("grant_hail", { _hail: hailId });
  if (error) throw new Error(error.message);
  const result = data as {
    result: "granted" | Refusal;
    agent?: string;
    spoken?: string;
    contribution_id?: string | null;
  };
  if (result.result !== "granted") return { ok: false, reason: result.result };

  const agent = result.agent!;
  const nameOf = await namesFor(sb, sessionId);
  await sb.from("transcript").insert({
    session_id: sessionId,
    author_name: nameOf(agent as AgentKind),
    kind: "agent" as const,
    agent,
    body: result.spoken ?? "",
    contribution_id: result.contribution_id ?? null,
  });
  // In text, speaking ends as soon as the spoken part is in the transcript.
  await sb.rpc("done_speaking", { _session: sessionId, _agent: agent });
  requestScribe(sb, sessionId);
  return { ok: true };
}

// ---------- the Scribe (docs/state_machines.md §9) ----------

async function countTowardsScribe(sb: Client, sessionId: string) {
  const { count } = await sb
    .from("transcript")
    .select("id", { count: "exact", head: true })
    .eq("session_id", sessionId)
    .eq("kind", "human");
  if (count && count % SCRIBE_EVERY === 0) requestScribe(sb, sessionId);
}

/** Asks for a Scribe update. One runs at a time; any asked for meanwhile become one more. */
export function requestScribe(sb: Client, sessionId: string) {
  void (async () => {
    const { data: start } = await sb.rpc("scribe_request", { _session: sessionId, _slug: DOC_SLUG });
    if (!start) return;
    for (;;) {
      try {
        await updateSharedDoc(sb, sessionId);
      } catch (error) {
        console.error("scribe update failed", error);
      }
      const { data: again } = await sb.rpc("scribe_done", { _session: sessionId, _slug: DOC_SLUG });
      if (!again) return;
    }
  })().catch((error: unknown) => console.error("scribe crashed", error));
}

async function updateSharedDoc(sb: Client, sessionId: string) {
  const [{ data: lines }, { data: doc }] = await Promise.all([
    sb
      .from("transcript")
      .select("author_name, body")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true }),
    sb.from("stage_docs").select("body").eq("session_id", sessionId).eq("slug", DOC_SLUG).maybeSingle(),
  ]);
  const material = (lines ?? []).map((line) => `${line.author_name}: ${line.body}`).join("\n");
  const body = await withTimeout(
    writePlanDoc(material, doc?.body ?? ""),
    RUN_TIME_LIMIT_MS,
    "the Scribe took too long",
  );
  // Only the document's text changes; its scribe_state belongs to scribe_done.
  await sb.from("stage_docs").update({ body }).eq("session_id", sessionId).eq("slug", DOC_SLUG);
}

// ---------- the time limit ----------

/** Fails runs that outlived the time limit, e.g. after the server restarted mid-run. */
export async function expireStaleRuns(sb: Client, sessionId: string) {
  const { data: expired } = await sb.rpc("expire_stale_runs", {
    _session: sessionId,
    _limit: `${Math.round(RUN_TIME_LIMIT_MS / 1000) + 60} seconds`,
  });
  if (!expired?.length) return;
  const nameOf = await namesFor(sb, sessionId);
  for (const agent of expired) {
    await note(sb, sessionId, `${nameOf(agent as AgentKind)} couldn't finish: it ran out of time.`);
  }
}
