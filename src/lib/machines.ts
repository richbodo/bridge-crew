/**
 * The room's state machines (docs/state_machines.md), as data and pure functions.
 *
 * - `CREW_MOVES` is the crew member machine (§3). The database trigger `check_crew_move`
 *   checks the same table, and a unit test keeps the two identical.
 * - `step` walks one event through a whole room model (§13): crew members, runs, hails and
 *   the floor. The explorer test tries every short sequence of events and checks the rules
 *   in §14. `variant: "today"` copies the server as it was before the Phase 1 fixes, so the
 *   explorer can reproduce findings F2–F6.
 */

export type CrewStatus = "idle" | "working" | "hand_raised" | "speaking";
export type RunState = "running" | "finished" | "failed" | "superseded";
/** `pending` is Open and `dismissed` is Declined in the docs. */
export type HailState = "pending" | "granted" | "dismissed" | "replaced" | "withdrawn";
export type Outcome = "waiting" | "said" | "declined" | "replaced" | "withdrawn" | "superseded";
export type Mode = "direct" | "help";

/** Crew member state: every move a crew member may make. Staying put is always allowed. */
export const CREW_MOVES: Record<CrewStatus, readonly CrewStatus[]> = {
  idle: ["working"],
  working: ["hand_raised", "idle"],
  hand_raised: ["speaking", "idle", "working"],
  speaking: ["idle"],
};

export const CREW_STATUSES = Object.keys(CREW_MOVES) as CrewStatus[];

export function canMove(from: CrewStatus, to: CrewStatus): boolean {
  return from === to || CREW_MOVES[from].includes(to);
}

/** What the student sees on a crew member's card. */
export const STATUS_LABEL: Record<CrewStatus | "stopped", string> = {
  idle: "standing by",
  working: "working",
  hand_raised: "hailing",
  speaking: "on the floor",
  // A legacy value the database still allows; nothing moves into it any more.
  stopped: "standing by",
};

// ---------- the room model ----------

export interface CrewModel {
  status: CrewStatus;
  run: string | null;
}

export interface RunModel {
  agent: string;
  state: RunState;
  /** The run's contribution, once the model has replied. */
  contribution: string | null;
}

export interface HailModel {
  agent: string;
  run: string;
  contribution: string;
  state: HailState;
}

export interface ContributionModel {
  agent: string;
  run: string;
  outcome: Outcome;
}

export interface RoomModel {
  crew: Record<string, CrewModel>;
  runs: Record<string, RunModel>;
  hails: Record<string, HailModel>;
  contributions: Record<string, ContributionModel>;
  /** Every grant, in order: the hail granted and the contribution that was spoken. */
  said: Array<{ hail: string; contribution: string }>;
  /** The captain's log: one entry per event that changed something. */
  log: string[];
  next: number;
  /** Only the "today" variant: crew members stood down, and the first illegal move made. */
  stopped?: string[];
  illegal?: string;
}

export type RoomEvent =
  /** A summon. While the crew member is Working, this is a redirect. */
  | { type: "summon"; agent: string }
  /** The model replies to a run (late replies to superseded runs included). */
  | { type: "finish"; run: string }
  /** The run errors, or hits the time limit. */
  | { type: "fail"; run: string }
  | { type: "grant"; hail: string }
  | { type: "notNow"; hail: string }
  | { type: "stop"; agent: string }
  | { type: "doneSpeaking"; agent: string }
  /** Any prompt: it interrupts a speaking crew member. */
  | { type: "prompt" };

export type Variant = "fixed" | "today";

export interface StepResult {
  room: RoomModel;
  /** Why the event was refused, if it was. A refused event changes nothing. */
  refused?: string;
}

export function emptyRoom(agents: string[]): RoomModel {
  const crew: Record<string, CrewModel> = {};
  for (const agent of agents) crew[agent] = { status: "idle", run: null };
  return { crew, runs: {}, hails: {}, contributions: {}, said: [], log: [], next: 1 };
}

export function speakerOf(room: RoomModel): string | null {
  return Object.entries(room.crew).find(([, c]) => c.status === "speaking")?.[0] ?? null;
}

function move(room: RoomModel, agent: string, to: CrewStatus) {
  const crew = room.crew[agent]!;
  if (!canMove(crew.status, to)) {
    throw new Error(`illegal crew move ${crew.status} -> ${to} for ${agent}`);
  }
  crew.status = to;
  if (to === "idle") crew.run = null;
}

function openHailOf(room: RoomModel, agent: string): [string, HailModel] | undefined {
  return Object.entries(room.hails).find(([, h]) => h.agent === agent && h.state === "pending");
}

function endHail(room: RoomModel, id: string, state: HailState, outcome: Outcome) {
  const hail = room.hails[id]!;
  hail.state = state;
  room.contributions[hail.contribution]!.outcome = outcome;
}

function newRun(room: RoomModel, agent: string): string {
  const id = `r${room.next++}`;
  room.runs[id] = { agent, state: "running", contribution: null };
  return id;
}

function newHail(room: RoomModel, run: string): string {
  const agent = room.runs[run]!.agent;
  const k = `k${room.next++}`;
  room.runs[run]!.contribution = k;
  room.contributions[k] = { agent, run, outcome: "waiting" };
  const h = `h${room.next++}`;
  room.hails[h] = { agent, run, contribution: k, state: "pending" };
  return h;
}

/** Applies one event. Pure: returns a new room, or the same room and a reason if refused. */
export function step(room: RoomModel, event: RoomEvent, variant: Variant = "fixed"): StepResult {
  const r = structuredClone(room);
  const result = variant === "today" ? stepToday(r, event) : stepFixed(r, event);
  return result ? { room, refused: result } : { room: r };
}

/** The machines as drawn. Returns a reason to refuse, or nothing. */
function stepFixed(r: RoomModel, event: RoomEvent): string | void {
  switch (event.type) {
    case "prompt": {
      const speaker = speakerOf(r);
      if (!speaker) return "nobody is speaking";
      move(r, speaker, "idle");
      r.log.push(`interrupted ${speaker}`);
      return;
    }

    case "summon": {
      const crew = r.crew[event.agent];
      if (!crew) return "no such crew member";
      if (crew.status === "speaking") move(r, event.agent, "idle");
      if (crew.status === "working" && crew.run) r.runs[crew.run]!.state = "superseded";
      const open = openHailOf(r, event.agent);
      if (open) endHail(r, open[0], "replaced", "replaced");
      const id = newRun(r, event.agent);
      move(r, event.agent, "working");
      crew.run = id;
      r.log.push(`summoned ${event.agent} as ${id}`);
      return;
    }

    case "finish": {
      const run = r.runs[event.run];
      if (!run) return "no such run";
      if (run.contribution) return "the model already replied";
      if (run.state !== "running" && run.state !== "superseded") return "run has ended";
      if (run.state === "superseded") {
        const k = `k${r.next++}`;
        run.contribution = k;
        r.contributions[k] = { agent: run.agent, run: event.run, outcome: "superseded" };
        r.log.push(`kept ${k} as superseded`);
        return;
      }
      run.state = "finished";
      const h = newHail(r, event.run);
      move(r, run.agent, "hand_raised");
      r.log.push(`${run.agent} hails with ${h}`);
      return;
    }

    case "fail": {
      const run = r.runs[event.run];
      if (!run || run.state !== "running") return "run is not running";
      run.state = "failed";
      move(r, run.agent, "idle");
      r.log.push(`${event.run} failed`);
      return;
    }

    case "grant": {
      const hail = r.hails[event.hail];
      if (!hail || hail.state !== "pending") return "hail is not open";
      const speaker = speakerOf(r);
      if (speaker && speaker !== hail.agent) return "floor busy";
      const crew = r.crew[hail.agent]!;
      if (crew.status !== "hand_raised" || crew.run !== hail.run) return "hail is not current";
      endHail(r, event.hail, "granted", "said");
      move(r, hail.agent, "speaking");
      r.said.push({ hail: event.hail, contribution: hail.contribution });
      r.log.push(`granted ${event.hail}`);
      return;
    }

    case "notNow": {
      const hail = r.hails[event.hail];
      if (!hail || hail.state !== "pending") return "hail is not open";
      endHail(r, event.hail, "dismissed", "declined");
      const crew = r.crew[hail.agent]!;
      if (crew.status === "hand_raised" && crew.run === hail.run) move(r, hail.agent, "idle");
      r.log.push(`not now ${event.hail}`);
      return;
    }

    case "stop": {
      const crew = r.crew[event.agent];
      if (!crew) return "no such crew member";
      if (crew.status === "idle") return "nothing to stop";
      if (crew.status === "working" && crew.run) r.runs[crew.run]!.state = "superseded";
      const open = openHailOf(r, event.agent);
      if (open) endHail(r, open[0], "withdrawn", "withdrawn");
      move(r, event.agent, "idle");
      r.log.push(`stopped ${event.agent}`);
      return;
    }

    case "doneSpeaking": {
      const crew = r.crew[event.agent];
      if (!crew || crew.status !== "speaking") return "not speaking";
      move(r, event.agent, "idle");
      r.log.push(`${event.agent} finished speaking`);
      return;
    }
  }
}

/**
 * The server as it was before the Phase 1 fixes (src/lib/room.functions.ts at 01fefb6).
 * It wrote statuses directly, so `force` allows any move and records the illegal ones.
 */
function stepToday(r: RoomModel, event: RoomEvent): string | void {
  const stopped = (r.stopped ??= []);
  const force = (agent: string, to: CrewStatus) => {
    const crew = r.crew[agent]!;
    if (!canMove(crew.status, to)) r.illegal ??= `${agent} moved ${crew.status} -> ${to}`;
    crew.status = to;
  };

  switch (event.type) {
    case "prompt": {
      const speaker = speakerOf(r);
      if (!speaker) return "nobody is speaking";
      force(speaker, "idle");
      return;
    }

    case "summon": {
      // postLine: the status becomes working. Open hails and the old run are left alone.
      const crew = r.crew[event.agent];
      if (!crew) return "no such crew member";
      if (crew.status === "speaking") force(event.agent, "idle");
      const id = newRun(r, event.agent);
      force(event.agent, "working");
      crew.run = id;
      r.stopped = stopped.filter((a) => a !== event.agent);
      return;
    }

    case "finish": {
      // runAgent: thrown away if the crew member was stood down, otherwise it always hails.
      const run = r.runs[event.run];
      if (!run || run.state !== "running") return "run is not running";
      run.state = "finished";
      if (stopped.includes(run.agent)) return;
      newHail(r, event.run);
      force(run.agent, "hand_raised");
      return;
    }

    case "fail": {
      const run = r.runs[event.run];
      if (!run || run.state !== "running") return "run is not running";
      run.state = "failed";
      force(run.agent, "idle");
      r.crew[run.agent]!.run = null;
      return;
    }

    case "grant": {
      // resolveHail: checks the floor and the status, then speaks the newest contribution.
      const hail = r.hails[event.hail];
      if (!hail || hail.state !== "pending") return "hail is not open";
      const speaker = speakerOf(r);
      if (speaker && speaker !== hail.agent) return "floor busy";
      const crew = r.crew[hail.agent]!;
      if (!canMove(crew.status, "speaking")) return "Someone else has the floor right now.";
      const newest = Object.entries(r.contributions)
        .filter(([, c]) => c.agent === hail.agent)
        .at(-1)![0];
      endHail(r, event.hail, "granted", "said");
      force(hail.agent, "speaking");
      r.said.push({ hail: event.hail, contribution: newest });
      return;
    }

    case "notNow": {
      const hail = r.hails[event.hail];
      if (!hail || hail.state !== "pending") return "hail is not open";
      endHail(r, event.hail, "dismissed", "declined");
      force(hail.agent, "idle");
      return;
    }

    case "stop": {
      // The Stand down button: stood down, with any open hail left open.
      const crew = r.crew[event.agent];
      if (!crew) return "no such crew member";
      if (crew.status === "idle") return "nothing to stop";
      force(event.agent, "idle");
      if (!stopped.includes(event.agent)) stopped.push(event.agent);
      return;
    }

    case "doneSpeaking": {
      const crew = r.crew[event.agent];
      if (!crew || crew.status !== "speaking") return "not speaking";
      force(event.agent, "idle");
      return;
    }
  }
}

// ---------- the rules (docs/state_machines.md §14) ----------

export interface Broken {
  rule: number;
  why: string;
}

/** Checks the rules that can be seen in the room model, and lists every one that's broken. */
export function brokenRules(room: RoomModel): Broken[] {
  const broken: Broken[] = [];
  if (room.illegal) broken.push({ rule: 0, why: `illegal crew move: ${room.illegal}` });

  const speakers = Object.entries(room.crew).filter(([, c]) => c.status === "speaking");
  if (speakers.length > 1) broken.push({ rule: 1, why: "two crew members hold the floor" });

  for (const [agent] of speakers) {
    const last = room.said.at(-1);
    if (!last || room.hails[last.hail]?.agent !== agent) {
      broken.push({ rule: 2, why: `${agent} speaks without a grant of its own hail` });
    }
  }

  const openByAgent = new Map<string, number>();
  for (const [id, hail] of Object.entries(room.hails)) {
    if (hail.state !== "pending") continue;
    openByAgent.set(hail.agent, (openByAgent.get(hail.agent) ?? 0) + 1);
    const crew = room.crew[hail.agent]!;
    if (crew.status !== "hand_raised" || crew.run !== hail.run) {
      broken.push({ rule: 3, why: `${id} is open but ${hail.agent} has moved on` });
    }
  }
  for (const [agent, n] of openByAgent) {
    if (n > 1) broken.push({ rule: 3, why: `${agent} has ${n} open hails` });
  }

  for (const { hail, contribution } of room.said) {
    if (room.contributions[contribution]?.run !== room.hails[hail]?.run) {
      broken.push({ rule: 4, why: `${hail} was granted but ${contribution} was spoken` });
    }
  }

  for (const [id, run] of Object.entries(room.runs)) {
    const crew = room.crew[run.agent]!;
    if (run.state === "running" && !(crew.status === "working" && crew.run === id)) {
      broken.push({ rule: 5, why: `${id} is still running but isn't ${run.agent}'s current run` });
    }
  }
  for (const [agent, crew] of Object.entries(room.crew)) {
    if (crew.status === "working" && room.runs[crew.run ?? ""]?.state !== "running") {
      broken.push({ rule: 5, why: `${agent} is Working with no run in progress` });
    }
  }

  for (const [id, run] of Object.entries(room.runs)) {
    if (run.contribution && !room.contributions[run.contribution]) {
      broken.push({ rule: 6, why: `${id}'s contribution was lost` });
    }
  }
  return broken;
}

// ---------- the explorer ----------

/** Every event worth trying from this room: the people's moves, and the model's. */
export function possibleEvents(room: RoomModel): RoomEvent[] {
  const events: RoomEvent[] = [{ type: "prompt" }];
  for (const agent of Object.keys(room.crew)) {
    events.push({ type: "summon", agent }, { type: "stop", agent }, { type: "doneSpeaking", agent });
  }
  for (const [id, run] of Object.entries(room.runs)) {
    if (!run.contribution && (run.state === "running" || run.state === "superseded")) {
      events.push({ type: "finish", run: id });
    }
    if (run.state === "running") events.push({ type: "fail", run: id });
  }
  for (const id of Object.keys(room.hails)) {
    events.push({ type: "grant", hail: id }, { type: "notNow", hail: id });
  }
  return events;
}

export interface Counterexample extends Broken {
  events: RoomEvent[];
}

export interface Exploration {
  rooms: number;
  broken: Counterexample[];
}

function keyOf(room: RoomModel): string {
  const { log: _log, ...rest } = room;
  return JSON.stringify(rest);
}

/**
 * Breadth-first: tries every sequence of events up to `depth`, so the sequence recorded for
 * each kind of broken rule is a shortest one. It keeps exploring past a broken rule, so one
 * finding doesn't hide the next.
 */
export function explore({
  agents = ["a", "b"],
  depth = 6,
  variant = "fixed" as Variant,
}: { agents?: string[]; depth?: number; variant?: Variant } = {}): Exploration {
  const start = emptyRoom(agents);
  const seen = new Set([keyOf(start)]);
  let frontier: Array<{ room: RoomModel; events: RoomEvent[] }> = [{ room: start, events: [] }];
  const broken: Counterexample[] = [];
  const kinds = new Set<string>();
  const generic = (why: string) =>
    agents.reduce(
      (text, agent) => text.replace(new RegExp(`\\b${agent}\\b`, "g"), "@"),
      why.replace(/\b[rhk]\d+\b/g, "#"),
    );

  for (let d = 0; d < depth && frontier.length; d += 1) {
    const nextFrontier: typeof frontier = [];
    for (const { room, events } of frontier) {
      for (const event of possibleEvents(room)) {
        const { room: after, refused } = step(room, event, variant);
        if (refused) continue;
        const key = keyOf(after);
        if (seen.has(key)) continue;
        seen.add(key);
        const path = [...events, event];
        for (const bad of brokenRules(after)) {
          const kind = `${bad.rule}:${generic(bad.why)}`;
          if (kinds.has(kind)) continue;
          kinds.add(kind);
          broken.push({ ...bad, events: path });
        }
        nextFrontier.push({ room: after, events: path });
      }
    }
    frontier = nextFrontier;
  }
  return { rooms: seen.size, broken };
}

export function describeEvents(events: RoomEvent[]): string {
  return events
    .map((e) => {
      switch (e.type) {
        case "prompt":
          return "a prompt";
        case "summon":
        case "stop":
        case "doneSpeaking":
          return `${e.type} ${e.agent}`;
        case "finish":
        case "fail":
          return `${e.type} ${e.run}`;
        case "grant":
        case "notNow":
          return `${e.type} ${e.hail}`;
      }
    })
    .join(" → ");
}
