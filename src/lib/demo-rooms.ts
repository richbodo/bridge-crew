import { TEMPLATES } from "./templates";

/**
 * Demo rooms (docs/plans/games-on-github-2026-11-16.md Part 1). In demo mode a Deliberation
 * room is a demo room, on a **Context**: a context pack whose room opens with a scripted
 * opening. The script lives beside its pack as `docs/context/<pack>/demo.md`, in the format
 * `docs/context/README.md` describes, and the crew never reads it (src/lib/context.server.ts
 * leaves it out). A pack without one isn't listed. Pure apart from the scripts, which are
 * bundled at build time; src/lib/demo-rooms.server.ts puts an opening in a room.
 */

/** The Game Studio's own context pack, which has no demo opening. */
export const GAME_STUDIO = "game-studio";

export interface DemoLine {
  name: string;
  body: string;
}

export interface DemoScript {
  /** The pack every station reads, or null for the opening `just run`'s demo room has. */
  pack: string | null;
  /** Its name in the lobby's Context list. */
  context: string;
  /** One line under the name. */
  about: string;
  /** Where it comes in the list, after Game Studio. */
  order: number;
  /** The room's title, unless one is typed. */
  title: string;
  /** What the people said, the last line asking the crew member. */
  people: DemoLine[];
  /** The crew member who hails: a Deliberation job key. */
  crew: string;
  task: string;
  /** The hail's one line. */
  hail: string;
  spoken: string;
  brief: string;
  /** The shared document, plan.md. */
  plan: string;
}

const FIELDS = {
  context: "Context",
  about: "About",
  order: "Order",
  crew: "Crew member",
  task: "Task",
  hail: "Hail",
} as const;

const SECTIONS = ["People", "Spoken", "Brief", "Plan"] as const;

/** A section's text, without the fence around it when it's one fenced block. */
function unfence(text: string): string {
  const trimmed = text.trim();
  const fenced = /^(`{3,})[^\n]*\n([\s\S]*?)\n\1$/.exec(trimmed);
  return (fenced ? fenced[2]! : trimmed).trim();
}

/** Reads one pack's `demo.md`. Throws, naming what's missing, when it isn't in the format. */
export function parseDemoScript(pack: string | null, markdown: string): DemoScript {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const where = pack ? `docs/context/${pack}/demo.md` : "The demo script";

  const title = lines
    .find((line) => line.startsWith("# "))
    ?.slice(2)
    .trim();
  if (!title) throw new Error(`${where} has no # title.`);

  // Sections start at "## Name" outside a fenced block, so a brief can have its own headings.
  const sections = new Map<string, string[]>();
  const intro: string[] = [];
  let current: string[] = intro;
  let fence: string | null = null;
  for (const line of lines) {
    const marker = /^(`{3,})/.exec(line)?.[1];
    if (marker && (fence === null || marker === fence)) fence = fence === null ? marker : null;
    const heading = fence === null && !marker ? /^## (.+)$/.exec(line)?.[1]?.trim() : undefined;
    if (heading && SECTIONS.includes(heading as (typeof SECTIONS)[number])) {
      current = [];
      sections.set(heading, current);
    } else {
      current.push(line);
    }
  }

  const fields: Record<string, string> = {};
  for (const line of intro) {
    const match = /^- \*\*(.+?):\*\* (.+)$/.exec(line.trim());
    if (match) fields[match[1]!] = match[2]!.trim();
  }
  const field = (key: keyof typeof FIELDS) => {
    const value = fields[FIELDS[key]];
    if (!value) throw new Error(`${where} has no "${FIELDS[key]}".`);
    return value;
  };
  const section = (name: (typeof SECTIONS)[number]) => {
    const body = unfence(sections.get(name)?.join("\n") ?? "");
    if (!body) throw new Error(`${where} has no "## ${name}".`);
    return body;
  };

  // "- **Name:** what they said", which may wrap onto indented lines.
  const people: DemoLine[] = [];
  for (const line of section("People").split("\n")) {
    const said = /^- \*\*(.+?):\*\* (.+)$/.exec(line.trim());
    if (said) people.push({ name: said[1]!, body: said[2]!.trim() });
    else if (line.trim() && people.length) people.at(-1)!.body += ` ${line.trim()}`;
  }
  if (!people.length) throw new Error(`${where} has nobody in "## People".`);

  const order = Number(field("order"));
  return {
    pack,
    context: field("context"),
    about: field("about"),
    order: Number.isFinite(order) ? order : 99,
    title,
    people,
    crew: field("crew").toLowerCase(),
    task: field("task"),
    hail: field("hail"),
    spoken: section("Spoken").replace(/\s*\n\s*/g, " "),
    brief: section("Brief"),
    plan: section("Plan"),
  };
}

/** The opening `just run`'s demo room has, which belongs to no pack. */
export const PLAIN_DEMO: DemoScript = {
  pack: null,
  context: "Deliberation",
  about: TEMPLATES.deliberation.description,
  order: 0,
  title: "Demo run",
  people: [
    { name: "Rae", body: "Right — do we self-host the transcription or buy it?" },
    { name: "Milo", body: "Buying is faster but I don't trust the latency numbers." },
    { name: "Rae", body: "/research realtime speech-to-text latency, hosted vs self-hosted" },
  ],
  crew: "scout",
  task: "realtime speech-to-text latency, hosted vs self-hosted",
  hail: "Hosted is close enough on latency — I'd buy and keep it swappable.",
  spoken:
    "Hosted services land around three hundred milliseconds end to end, self-hosted is faster once it's warm but you own the warm-up. The gap is smaller than the pricing difference suggests. I'd buy for now and keep the interface swappable.",
  brief:
    "## Findings\n\n- Hosted APIs: ~250-400ms median, predictable, per-minute pricing.\n- Self-hosted small models: ~120-200ms warm, cold start is the real cost.\n- Swap cost is low if the boundary is a stream in / text out interface.\n\n## Confidence\n\nMedium. Numbers are from vendor docs and one benchmark, not our own audio.",
  plan: "## Where we are\n\nDeciding how to get speech to text into the room.\n\n## Decisions\n\n- None yet.\n\n## Open questions\n\n- Do our own latency numbers match the vendor claims?\n\n## Next\n\n- Hear Scout out, then pick a default.",
};

const RAW = import.meta.glob("/docs/context/*/demo.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** Every pack's demo.md, by pack, as written. */
export const DEMO_FILES: Record<string, string> = Object.fromEntries(
  Object.entries(RAW).map(([path, body]) => [path.split("/")[3]!, body]),
);

function readScripts(): DemoScript[] {
  const scripts: DemoScript[] = [];
  for (const [pack, body] of Object.entries(DEMO_FILES)) {
    if (pack === GAME_STUDIO) continue;
    try {
      scripts.push(parseDemoScript(pack, body));
    } catch (error) {
      // A broken script leaves its pack out of the list; the unit tests name it.
      console.warn((error as Error).message);
    }
  }
  return scripts.sort((a, b) => a.order - b.order || a.context.localeCompare(b.context));
}

const SCRIPTS = readScripts();

export function demoScriptFor(pack: string): DemoScript | undefined {
  return SCRIPTS.find((script) => script.pack === pack);
}

export interface DemoContext {
  /** The pack's name. */
  key: string;
  name: string;
  about: string;
}

/**
 * The Context list on the demo lobby's Deliberation page: each pack with an opening. A Game
 * Studio room is a lesson there too, so it has no Context.
 */
export const DEMO_CONTEXTS: DemoContext[] = SCRIPTS.map((script) => ({
  key: script.pack!,
  name: script.context,
  about: script.about,
}));
