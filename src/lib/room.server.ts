import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

import { makeNameLookup, runAgentBrief, writeSharedDoc, type NameLookup } from "./agents.server";
import { assembleContext, type ContributionNote } from "./context";
import { loadPackDocs } from "./context.server";
import type { Mode } from "./machines";
import { enforceSpeechCap } from "./speech";
import { findAddressees, parseSummon, type Addressable } from "./summon";
import { jobOf, templateOf, type Template } from "./templates";

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

export type Refusal = "not_open" | "floor_busy" | "not_current";

async function note(sb: Client, sessionId: string, body: string) {
  await sb.from("transcript").insert({
    session_id: sessionId,
    author_name: "Bridge",
    kind: "system" as const,
    body,
  });
}

export interface RoomSettings {
  seats?: number;
  /** The student's nickname, on a shared seat. */
  studentName?: string;
}

/** A room's template, settings and crew: what every transition needs to know. */
async function roomOf(sb: Client, sessionId: string) {
  const [{ data: session }, { data: crew }] = await Promise.all([
    sb.from("sessions").select("template, settings").eq("id", sessionId).maybeSingle(),
    sb
      .from("agents_state")
      .select("agent, display_name, status, duty, context_packs, current_run_id")
      .eq("session_id", sessionId),
  ]);
  const template = templateOf(session?.template);
  const rows = crew ?? [];
  return {
    template,
    settings: (session?.settings ?? {}) as RoomSettings,
    crew: rows,
    nameOf: makeNameLookup(rows, template),
  };
}

export async function namesFor(sb: Client, sessionId: string): Promise<NameLookup> {
  return (await roomOf(sb, sessionId)).nameOf;
}

function addressable(
  template: Template,
  crew: Array<{ agent: string; display_name: string | null }>,
): Addressable[] {
  return crew.map((row) => {
    const job = jobOf(template, row.agent);
    return { key: row.agent, names: [job.name, row.display_name ?? "", ...(job.aliases ?? [])] };
  });
}

/** A transcript line as the crew reads it: "Sam (student): …". */
function asRead(line: { author_name: string; body: string; speaker_role?: string | null }) {
  return `${line.author_name}${line.speaker_role ? ` (${line.speaker_role})` : ""}: ${line.body}`;
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
async function gatherContext(
  sb: Client,
  sessionId: string,
  template: Template,
  packs: string[],
  nameOf: NameLookup,
) {
  const [{ data: lines }, { data: doc }, { data: work }, docs] = await Promise.all([
    sb
      .from("transcript")
      .select("author_name, body, speaker_role")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true }),
    sb
      .from("stage_docs")
      .select("body")
      .eq("session_id", sessionId)
      .eq("slug", template.doc.slug)
      .maybeSingle(),
    sb
      .from("contributions")
      .select("agent, spoken, brief, outcome")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true }),
    loadPackDocs(sb, sessionId, packs),
  ]);
  const contributions: ContributionNote[] = (work ?? []).map((c) => ({
    name: nameOf(c.agent),
    outcome: c.outcome,
    spoken: c.spoken,
    brief: c.brief,
  }));
  return assembleContext({
    docs,
    plan: doc?.body ?? "",
    planTitle: template.doc.file,
    contributions,
    transcript: (lines ?? []).map(asRead),
  });
}

/** Runs one crew member's task to its end: a hail, a superseded reply, or a failure. */
export async function executeRun(sb: Client, runId: string) {
  const { data: run } = await sb.from("runs").select("*").eq("id", runId).maybeSingle();
  if (!run) return;
  const sessionId = run.session_id;
  const agent = run.agent;
  const { template, crew, nameOf } = await roomOf(sb, sessionId);
  const me = crew.find((row) => row.agent === agent);

  try {
    const packs = (me?.context_packs as string[] | null) ?? [];
    const context = await gatherContext(sb, sessionId, template, packs, nameOf);
    await sb
      .from("agents_state")
      .update({ progress: "gathering and drafting…" })
      .eq("session_id", sessionId)
      .eq("current_run_id", runId);

    const minutes = Math.round(RUN_TIME_LIMIT_MS / 60_000);
    const result = await withTimeout(
      runAgentBrief(template, jobOf(template, agent), run.task, context.text, {
        name: me?.display_name ?? null,
        duty: me?.duty ?? null,
      }),
      RUN_TIME_LIMIT_MS,
      `it took longer than ${minutes} minutes`,
    );

    const { spoken, overflow } = enforceSpeechCap(result.spokenRaw, template.spokenCap);
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
    await note(sb, sessionId, `${nameOf(agent)} stood down.`);
  }
}

// ---------- prompts (docs/state_machines.md §12) ----------

export type Speaker = "teacher" | "student";

export async function handlePrompt(
  sb: Client,
  userId: string,
  {
    sessionId,
    body,
    mode = "direct",
    speaker,
  }: { sessionId: string; body: string; mode?: Mode; speaker?: Speaker },
) {
  const text = body.trim();
  if (!text) return { ok: true as const };

  const [{ template, settings, crew, nameOf }, { data: me }] = await Promise.all([
    roomOf(sb, sessionId),
    sb
      .from("participants")
      .select("display_name")
      .eq("session_id", sessionId)
      .eq("user_id", userId)
      .maybeSingle(),
  ]);
  const statusOf = (agent: string) => crew.find((row) => row.agent === agent)?.status ?? "idle";

  // On a shared seat, the switch says who's talking: the student, or the teacher signed in.
  const role = template.sharedSeat ? (speaker ?? "student") : null;
  const author =
    role === "student" ? settings.studentName || "Student" : (me?.display_name ?? "Someone");
  const { error } = await sb.from("transcript").insert({
    session_id: sessionId,
    author_id: userId,
    author_name: author,
    kind: "human" as const,
    body: text,
    speaker_role: role,
  });
  if (error) throw new Error(error.message);
  await sb.rpc("interrupt_speaker", { _session: sessionId });
  void countTowardsScribe(sb, sessionId);

  const summon = (agent: string, task: string, announce: string) =>
    startRun(sb, sessionId, agent, task, mode, announce);
  const command = template.slashCommands ? parseSummon(text) : ({ type: "none" } as const);

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
    for (const agent of findAddressees(text, addressable(template, crew))) {
      const verb = statusOf(agent) === "working" ? "was redirected" : "was called on";
      await summon(agent, text, `${nameOf(agent)} ${verb}: ${text}`);
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
    author_name: nameOf(agent),
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
    const { template } = await roomOf(sb, sessionId);
    const slug = template.doc.slug;
    const { data: start } = await sb.rpc("scribe_request", { _session: sessionId, _slug: slug });
    if (!start) return;
    for (;;) {
      try {
        await updateSharedDoc(sb, sessionId, template);
      } catch (error) {
        console.error("scribe update failed", error);
      }
      const { data: again } = await sb.rpc("scribe_done", { _session: sessionId, _slug: slug });
      if (!again) return;
    }
  })().catch((error: unknown) => console.error("scribe crashed", error));
}

/**
 * The Scribe reads the transcript, which holds only the people's prompts and the spoken
 * parts of granted contributions, plus those contributions' briefs. Declined, replaced and
 * superseded work stays out.
 */
async function updateSharedDoc(sb: Client, sessionId: string, template: Template) {
  const slug = template.doc.slug;
  const [{ data: lines }, { data: doc }, { data: said }] = await Promise.all([
    sb
      .from("transcript")
      .select("author_name, body, speaker_role")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true }),
    sb.from("stage_docs").select("body").eq("session_id", sessionId).eq("slug", slug).maybeSingle(),
    sb
      .from("contributions")
      .select("agent, brief")
      .eq("session_id", sessionId)
      .eq("outcome", "said")
      .order("created_at", { ascending: true }),
  ]);
  const transcript = (lines ?? []).map(asRead).join("\n");
  const briefs = (said ?? [])
    .slice(-12)
    .map((c) => `### ${jobOf(template, c.agent).name}\n\n${c.brief}`)
    .join("\n\n");
  const material = briefs
    ? `${transcript}\n\nThe briefs behind what the crew said:\n\n${briefs}`
    : transcript;
  const body = await withTimeout(
    writeSharedDoc(template, material, doc?.body ?? ""),
    RUN_TIME_LIMIT_MS,
    "the Scribe took too long",
  );
  // Only the document's text changes; its scribe_state belongs to scribe_done.
  await sb.from("stage_docs").update({ body }).eq("session_id", sessionId).eq("slug", slug);
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
    await note(sb, sessionId, `${nameOf(agent)} couldn't finish: it ran out of time.`);
  }
}
