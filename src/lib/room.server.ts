import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database, Json } from "@/integrations/supabase/types";

import { makeNameLookup, runAgentBrief, writeSharedDoc, type NameLookup } from "./agents.server";
import { assembleContext, type ContributionNote } from "./context";
import { loadPackDocs } from "./context.server";
import type { Mode } from "./machines";
import { labelOf, type AskDraft } from "./made";
import { enforceSpeechCap } from "./speech";
import { saveCurrent, saveVersion, type RoomName } from "./games.server";
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

/** Screen state (docs/state_machines.md §10). Full screen is the browser's, so it isn't saved. */
export interface Screen {
  view: "off" | "on";
  showing: { kind: "made" | "contribution"; id: string } | null;
}

export interface RoomSettings {
  seats?: number;
  /** The student's nickname, on a shared seat. */
  studentName?: string;
  /** The made thing that's the current version (§8). */
  currentVersion?: string;
  screen?: Screen;
}

/** A room's template, settings and crew: what every transition needs to know. */
async function roomOf(sb: Client, sessionId: string) {
  const [{ data: session }, { data: crew }] = await Promise.all([
    sb.from("sessions").select("code, title, template, settings").eq("id", sessionId).maybeSingle(),
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
    name: { code: session?.code ?? "room", title: session?.title ?? "game" } as RoomName,
    crew: rows,
    nameOf: makeNameLookup(rows, template),
  };
}

/**
 * A room's made things in a fixed order. A thing's number in "Made in this room" is its place
 * in this list, which never changes, because removing a thing only marks it Removed.
 */
async function madeInOrder(sb: Client, sessionId: string) {
  const { data } = await sb
    .from("made_things")
    .select("id, kind, name, version, body, state, agent")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });
  return data ?? [];
}

/**
 * The game so far, for a crew member's context: the current version, what's in use, and a
 * numbered list of everything made, which REMOVE refers to (§8).
 */
async function gameSoFar(
  sb: Client,
  sessionId: string,
  template: Template,
  settings: RoomSettings,
  nameOf: NameLookup,
) {
  const things = await madeInOrder(sb, sessionId);
  const current = things.find((t) => t.id === settings.currentVersion);
  const used = things.filter((t) => t.state === "used" && t.kind !== "version");
  const listed = things
    .map((thing, i) => ({ thing, number: i + 1 }))
    .filter(({ thing }) => thing.state !== "removed" && thing.state !== "waiting")
    .map(({ thing, number }) => {
      const state =
        thing.id === settings.currentVersion
          ? "the current version"
          : thing.state === "used"
            ? "in the game"
            : "not used";
      return `- #${number} ${labelOf(thing)}, by ${called(template, nameOf, thing.agent)} (${state})`;
    });
  const parts = [
    current
      ? `### The current version (${labelOf(current)})\n\n\`\`\`html\n${current.body}\n\`\`\``
      : "No version of the game has been built yet.",
    ...used
      .filter((t) => t.kind === "picture")
      .map((t) => `### Picture: ${t.name}\n\n\`\`\`svg\n${t.body}\n\`\`\``),
  ];
  const sounds = used.filter((t) => t.kind === "sound");
  if (sounds.length) {
    parts.push(
      `### Sounds (call zzfx(...list))\n\n${sounds.map((t) => `- ${t.name}: ${t.body}`).join("\n")}`,
    );
  }
  if (listed.length) parts.push(`### Made in this room\n\n${listed.join("\n")}`);
  return parts.join("\n\n");
}

/** The things a REMOVE named, by number: only this crew member's, and never the current version. */
async function removable(
  sb: Client,
  sessionId: string,
  agent: string,
  settings: RoomSettings,
  numbers: number[],
): Promise<string[]> {
  const things = await madeInOrder(sb, sessionId);
  return numbers
    .map((number) => things[number - 1])
    .filter((thing) => thing !== undefined)
    .filter(
      (thing) =>
        thing.agent === agent &&
        (thing.state === "used" || thing.state === "not_used") &&
        thing.id !== settings.currentVersion,
    )
    .map((thing) => thing.id);
}

/** "the Sound designer", or the name the room gave that crew member. */
function called(template: Template, nameOf: NameLookup, agent: string) {
  const name = nameOf(agent);
  return name === jobOf(template, agent).name ? `the ${name}` : name;
}

/** A crew member's ASK, as a proposal that opens if its hail is granted (§7). */
function proposalFrom(
  template: Template,
  crew: Array<{ agent: string; display_name: string | null }>,
  nameOf: NameLookup,
  draft: AskDraft,
  mode: Mode,
) {
  const [target] = findAddressees(`${draft.name}:`, addressable(template, crew));
  if (!target) return null;
  return {
    target,
    task: draft.task,
    question: `Ask ${called(template, nameOf, target)}: “${draft.task}”`,
    mode,
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
  settings: RoomSettings,
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
    game: template.bigScreen ? await gameSoFar(sb, sessionId, template, settings, nameOf) : "",
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
  const { template, settings, name, crew, nameOf } = await roomOf(sb, sessionId);
  const me = crew.find((row) => row.agent === agent);

  try {
    const packs = (me?.context_packs as string[] | null) ?? [];
    const context = await gatherContext(sb, sessionId, template, settings, packs, nameOf);
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
    // Help changes nothing in the game unless asked (Part 6), so a help run makes and removes nothing.
    const help = run.mode === "help";
    const made = help ? [] : result.made;
    const removes =
      help || !result.removes.length
        ? []
        : await removable(sb, sessionId, agent, settings, result.removes);
    const ask =
      template.crewProposals && result.ask
        ? proposalFrom(template, crew, nameOf, result.ask, run.mode as Mode)
        : null;
    const { error } = await sb.rpc("finish_run", {
      _run: runId,
      _spoken: spoken,
      _brief: brief,
      _summary: summary,
      _made: made as unknown as Json,
      _ask: ask as unknown as Json,
      _removes: removes,
    });
    if (error) throw new Error(error.message);
    if (made.some((thing) => thing.kind === "version")) await saveVersionsOf(sb, runId, name);
  } catch (error) {
    const message = (error as Error).message;
    const { data: failed } = await sb.rpc("fail_run", { _run: runId, _reason: message });
    if (failed) await note(sb, sessionId, `${nameOf(agent)} couldn't finish: ${message}`);
  }
}

/** Saves a run's versions to the room's games folder (Part 5). */
async function saveVersionsOf(sb: Client, runId: string, name: RoomName) {
  const { data: versions } = await sb
    .from("made_things")
    .select("version, body")
    .eq("run_id", runId)
    .eq("kind", "version");
  for (const v of versions ?? []) {
    if (v.version) await saveVersion(name, v.version, v.body).catch(logFileError);
  }
}

/** index.html follows the current version. */
async function saveCurrentVersion(sb: Client, sessionId: string) {
  const { settings, name } = await roomOf(sb, sessionId);
  if (!settings.currentVersion) return;
  const { data: current } = await sb
    .from("made_things")
    .select("body")
    .eq("id", settings.currentVersion)
    .maybeSingle();
  if (current) await saveCurrent(name, current.body).catch(logFileError);
}

/** One entry in the captain's log (floor_events), as whoever is signed in. */
async function logEvent(sb: Client, sessionId: string, holder: string, event: string, detail: string | null) {
  await sb.rpc("log_event", {
    _session: sessionId,
    _holder: holder,
    _event: event,
    // The SQL function takes nulls; the generated types don't say so.
    _detail: detail as string,
    _run: null as unknown as string,
  });
}

function logFileError(error: unknown) {
  // The game is safe in the database; only the copy on disk is missing.
  console.error("couldn't write to the games folder", error);
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

const SCREEN_WORDS = /^\s*(on|off)\s+screen[.!]?\s*$/i;

export async function handlePrompt(
  sb: Client,
  userId: string,
  {
    sessionId,
    body,
    mode = "direct",
    speaker,
    replyTo,
  }: { sessionId: string; body: string; mode?: Mode; speaker?: Speaker; replyTo?: string | null },
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

  // "on screen" and "off screen" switch the view; they aren't added to the transcript (§12).
  const words = SCREEN_WORDS.exec(text);
  if (template.bigScreen && words) {
    const on = words[1]!.toLowerCase() === "on";
    await setScreen(sb, sessionId, on ? { view: "on", showing: await newestThing(sb, sessionId) } : { view: "off" });
    return { ok: true as const };
  }

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
    // Reply: a prompt linked to a contribution goes to its crew member, unless it names others.
    const answering = replyTo
      ? (
          await sb
            .from("contributions")
            .select("agent, spoken")
            .eq("id", replyTo)
            .eq("session_id", sessionId)
            .maybeSingle()
        ).data
      : null;
    const named = findAddressees(text, addressable(template, crew));
    const agents = named.length ? named : answering ? [answering.agent] : [];
    for (const agent of agents) {
      const verb = statusOf(agent) === "working" ? "was redirected" : "was called on";
      const task =
        answering?.agent === agent
          ? `Replying to what you said: “${answering.spoken}”\n\n${text}`
          : text;
      // The prompt is the line just above, so the note says only who.
      await summon(agent, task, `${nameOf(agent)} ${verb}.`);
    }
  }
  return { ok: true as const };
}

// ---------- the screen (docs/state_machines.md §10) ----------

/** The newest thing worth showing: the newest made thing, or else the newest spoken contribution. */
async function newestThing(sb: Client, sessionId: string): Promise<Screen["showing"]> {
  const [{ data: thing }, { data: said }] = await Promise.all([
    sb
      .from("made_things")
      .select("id")
      .eq("session_id", sessionId)
      .neq("state", "removed")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    sb
      .from("contributions")
      .select("id")
      .eq("session_id", sessionId)
      .eq("outcome", "said")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);
  if (thing) return { kind: "made", id: thing.id };
  if (said) return { kind: "contribution", id: said.id };
  return null;
}

/** On screen, Off screen, or what's showing. Saved with the room, so it survives a reload. */
export async function setScreen(
  sb: Client,
  sessionId: string,
  next: { view: Screen["view"]; showing?: Screen["showing"] },
) {
  const { settings } = await roomOf(sb, sessionId);
  const screen: Screen = {
    view: next.view,
    showing: next.showing === undefined ? (settings.screen?.showing ?? null) : next.showing,
  };
  const { error } = await sb
    .from("sessions")
    .update({ settings: { ...settings, screen } as unknown as Json })
    .eq("id", sessionId);
  if (error) throw new Error(error.message);
  await logEvent(sb, sessionId, "room", next.view === "on" ? "on_screen" : "off_screen", screen.showing ? `${screen.showing.kind} ${screen.showing.id}` : null);
}

// ---------- made things (docs/state_machines.md §8) ----------

/** Use this: the student picks a made thing that wasn't used. */
export async function useThing(sb: Client, sessionId: string, thingId: string) {
  const { error } = await sb.rpc("use_made_thing", { _thing: thingId });
  if (error) throw new Error(error.message);
  await saveCurrentVersion(sb, sessionId);
}

/** Why Manage couldn't remove, rename or put back a thing, in words. */
const MANAGE_REFUSALS: Record<string, string> = {
  current: "That's the current version. Use another version first, then remove this one.",
  waiting: "That's still waiting on its hail. Grant it or press Not now first.",
  removed_already: "That was already removed.",
  not_removed: "That isn't removed.",
  empty: "Give it a name.",
};

/** Manage (§8): Rename, Remove or Put back, from the people. */
export async function manageThing(
  sb: Client,
  sessionId: string,
  thingId: string,
  action: { type: "rename"; name: string } | { type: "remove" } | { type: "put_back" },
): Promise<{ ok: true } | { ok: false; message: string }> {
  const { data: thing } = await sb
    .from("made_things")
    .select("id")
    .eq("id", thingId)
    .eq("session_id", sessionId)
    .maybeSingle();
  if (!thing) return { ok: false, message: "That isn't in this room." };
  const { data, error } =
    action.type === "rename"
      ? await sb.rpc("rename_made_thing", { _thing: thingId, _name: action.name })
      : action.type === "remove"
        ? await sb.rpc("remove_made_thing", { _thing: thingId })
        : await sb.rpc("put_back_made_thing", { _thing: thingId });
  if (error) throw new Error(error.message);
  const done = { rename: "renamed", remove: "removed", put_back: "put_back" }[action.type];
  if (data !== done)
    return { ok: false, message: MANAGE_REFUSALS[data] ?? "That didn't work. Try again." };
  return { ok: true };
}

/** A version crashed on the big screen: the room proposes asking the Engineer to fix it. */
export async function reportCrash(sb: Client, sessionId: string, thingId: string, message: string) {
  const { template, nameOf } = await roomOf(sb, sessionId);
  const { data: thing } = await sb
    .from("made_things")
    .select("name, kind, version")
    .eq("id", thingId)
    .eq("session_id", sessionId)
    .maybeSingle();
  const engineer = template.roster.find((job) => job.makes === "version");
  if (!thing || thing.kind !== "version" || !engineer) return { ok: false as const };

  // "Uncaught Error: the mole fell off the map" reads better without the browser's prefix.
  const what =
    message
      .trim()
      .replace(/^Uncaught\s+/, "")
      .replace(/^Error:\s*/, "")
      .slice(0, 200) || "something went wrong";
  const label = labelOf(thing);
  const { error } = await sb.from("proposals").insert({
    session_id: sessionId,
    source: "room",
    kind: "summon",
    target: engineer.key,
    task: `${label} crashed with this error: “${what}”. Find the cause, fix it, and change nothing else.`,
    question: `${label} crashed: “${what}”. Ask the ${nameOf(engineer.key)} to fix it?`,
    made_thing_id: thingId,
  });
  // One open crash proposal per version: a second report of the same crash changes nothing.
  if (error) return { ok: false as const };
  await note(sb, sessionId, `${label} crashed: ${what}`);
  await logEvent(sb, sessionId, "room", "crashed", what);
  return { ok: true as const };
}

// ---------- proposals (docs/state_machines.md §7) ----------

/** Yes or No thanks. Yes starts the summon in the name of whoever is speaking. */
export async function answerProposal(
  sb: Client,
  sessionId: string,
  proposalId: string,
  yes: boolean,
  userId: string,
) {
  const { data: answered, error } = await sb
    .from("proposals")
    .update({
      state: yes ? "accepted" : "declined",
      answered_by: userId,
      answered_at: new Date().toISOString(),
    })
    .eq("id", proposalId)
    .eq("session_id", sessionId)
    .eq("state", "open")
    .select("kind, target, task, question, source, proposed_by, mode")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!answered) return { ok: false as const, reason: "not_open" as const };
  await logEvent(sb, sessionId, answered.target, yes ? "proposal_accepted" : "proposal_declined", answered.question);
  if (yes) {
    const { template, nameOf } = await roomOf(sb, sessionId);
    const suggested =
      answered.source === "crew" && answered.proposed_by
        ? `${called(template, nameOf, answered.proposed_by).replace(/^the /, "The ")} suggested asking you this, and the student said yes:\n\n${answered.task}`
        : answered.task;
    await startRun(
      sb,
      sessionId,
      answered.target,
      suggested,
      answered.mode as Mode,
      `${nameOf(answered.target)} is on it: ${answered.task}`,
    );
  }
  return { ok: true as const };
}

// ---------- How did you do that? (Part 6) ----------

export async function explain(
  sb: Client,
  userId: string,
  { sessionId, contributionId, speaker }: { sessionId: string; contributionId: string; speaker?: Speaker },
) {
  const { data: contribution } = await sb
    .from("contributions")
    .select("agent, spoken")
    .eq("id", contributionId)
    .eq("session_id", sessionId)
    .maybeSingle();
  if (!contribution) throw new Error("That contribution isn't in this room.");
  const { template, settings, nameOf } = await roomOf(sb, sessionId);
  const { data: me } = await sb
    .from("participants")
    .select("display_name")
    .eq("session_id", sessionId)
    .eq("user_id", userId)
    .maybeSingle();
  const role = template.sharedSeat ? (speaker ?? "student") : null;
  await sb.from("transcript").insert({
    session_id: sessionId,
    author_id: userId,
    author_name: role === "student" ? settings.studentName || "Student" : (me?.display_name ?? "Someone"),
    kind: "human" as const,
    body: `${nameOf(contribution.agent)}, how did you do that?`,
    speaker_role: role,
  });
  await sb.rpc("interrupt_speaker", { _session: sessionId });
  const who = role ?? "person";
  await startRun(
    sb,
    sessionId,
    contribution.agent,
    `The ${who} pressed “How did you do that?” on what you said: “${contribution.spoken}”\n\nExplain how you made it, step by step, at the ${who}'s level. Show the one small piece that matters most (a few lines of code, a part of the picture, or a sound's numbers) in the brief, and say what each part does. Don't change anything: just explain. Don't hand back a FILE, PICTURE or SOUNDS block this time.`,
    "help",
    `${nameOf(contribution.agent)} is working out how to explain it.`,
  );
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
  // A granted version became the current version (the database did that), so index.html follows.
  await saveCurrentVersion(sb, sessionId);
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
