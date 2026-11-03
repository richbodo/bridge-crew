export type PackSource = "repo" | "session";

export interface ContextDoc {
  pack: string;
  path: string;
  body: string;
  source: PackSource;
}

export interface PackSummary {
  name: string;
  description: string;
  sources: PackSource[];
  docCount: number;
}

/** Hard ceiling on the assembled prompt, in characters. */
export const CONTEXT_BUDGET = 400_000;

export function sortDocs(docs: ContextDoc[]): ContextDoc[] {
  const rank = (doc: ContextDoc) => {
    if (doc.source === "repo" && doc.path.endsWith("/index.md")) return 0;
    if (doc.source === "repo") return 1;
    return 2;
  };
  return [...docs].sort((a, b) => {
    if (a.pack !== b.pack) return a.pack.localeCompare(b.pack);
    const diff = rank(a) - rank(b);
    return diff !== 0 ? diff : a.path.localeCompare(b.path);
  });
}

function renderDoc(doc: ContextDoc): string {
  return `--- ${doc.path} ---\n${doc.body.trim()}`;
}

export function summarisePacks(docs: ContextDoc[]): string {
  const counts = new Map<string, number>();
  for (const doc of docs) counts.set(doc.pack, (counts.get(doc.pack) ?? 0) + 1);
  return [...counts.entries()]
    .map(([pack, n]) => `${pack} (${n} doc${n === 1 ? "" : "s"})`)
    .join(", ");
}

/** One piece of the crew's work, and what happened to it (F9). */
export interface ContributionNote {
  name: string;
  outcome: string | null;
  spoken: string;
  brief: string;
}

const OUTCOME_LABEL: Record<string, string> = {
  waiting: "waiting to be heard",
  said: "said to the room",
  declined: "the people said not now",
  replaced: "replaced by newer work",
  withdrawn: "stopped before it was heard",
  superseded: "superseded: the task changed before it finished",
};

function renderContribution(c: ContributionNote): string {
  const outcome = (c.outcome && OUTCOME_LABEL[c.outcome]) || "earlier work";
  return `### ${c.name} (${outcome})\n\n${c.spoken.trim()}\n\n${c.brief.trim()}`;
}

export interface AssembleInput {
  docs: ContextDoc[];
  plan?: string;
  /** What the shared document is called: plan.md, game.md. */
  planTitle?: string;
  /** The crew's earlier work, oldest first. */
  contributions?: ContributionNote[];
  transcript: string[];
  budget?: number;
}

export interface AssembledContext {
  text: string;
  /** Human-readable notes about anything that did not fit. */
  dropped: string[];
  /** "pack (n docs), pack (n docs)" — the provenance line for the written brief. */
  read: string;
}

/**
 * Builds the standing-context block a crew member reads before every run:
 * whole packs first, then the living plan, the crew's work so far, then the transcript.
 * Nothing is trimmed silently — anything dropped is named in the prompt.
 */
export function assembleContext({
  docs,
  plan = "",
  planTitle,
  contributions = [],
  transcript,
  budget = CONTEXT_BUDGET,
}: AssembleInput): AssembledContext {
  const ordered = sortDocs(docs);
  const dropped: string[] = [];

  const heading = planTitle ? `Living document: ${planTitle}` : "Living plan";
  const planBlock = plan.trim() ? `## ${heading}\n\n${plan.trim()}` : "";
  const overhead = planBlock.length + 400;

  // Packs get everything except a reserve for the plan, the crew's work and the transcript.
  const transcriptReserve = Math.min(
    Math.floor(budget * 0.4),
    transcript.join("\n").length + 1,
  );
  const rendered = contributions.map(renderContribution);
  const workReserve = Math.min(
    Math.floor(budget * 0.3),
    rendered.reduce((n, text) => n + text.length + 2, 0),
  );
  const packBudget = Math.max(0, budget - overhead - transcriptReserve - workReserve);

  const kept: ContextDoc[] = [];
  let used = 0;
  for (const doc of ordered) {
    const rendered = renderDoc(doc);
    if (used + rendered.length > packBudget) {
      dropped.push(`${doc.path} (too large to fit)`);
      continue;
    }
    kept.push(doc);
    used += rendered.length + 2;
  }

  const byPack = new Map<string, ContextDoc[]>();
  for (const doc of kept) {
    const list = byPack.get(doc.pack) ?? [];
    list.push(doc);
    byPack.set(doc.pack, list);
  }

  const packBlock = byPack.size
    ? `## Standing context — required reading\n\nYou must read every document below and use it before answering. Cite specifics from it where they bear on the task.\n\n${[
        ...byPack.entries(),
      ]
        .map(([pack, list]) => `### pack: ${pack}\n\n${list.map(renderDoc).join("\n\n")}`)
        .join("\n\n")}`
    : "";

  // The crew's work, newest first until its reserve is spent.
  const work: string[] = [];
  let workUsed = 0;
  for (let i = rendered.length - 1; i >= 0; i -= 1) {
    const text = rendered[i] ?? "";
    if (workUsed + text.length + 2 > workReserve) {
      dropped.push(`${i + 1} earlier contribution${i === 0 ? "" : "s"}`);
      break;
    }
    work.unshift(text);
    workUsed += text.length + 2;
  }
  const workBlock = work.length
    ? `## The crew's work so far\n\nEverything the crew has produced in this room, and what happened to it. Build on it, and don't repeat it.\n\n${work.join("\n\n")}`
    : "";

  const remaining = Math.max(0, budget - overhead - used - workUsed);
  const lines: string[] = [];
  let transcriptUsed = 0;
  for (let i = transcript.length - 1; i >= 0; i -= 1) {
    const line = transcript[i] ?? "";
    if (transcriptUsed + line.length + 1 > remaining) {
      dropped.push(`${i + 1} earlier transcript line${i === 0 ? "" : "s"}`);
      break;
    }
    lines.unshift(line);
    transcriptUsed += line.length + 1;
  }

  const transcriptBlock = `## Session transcript\n\n${lines.join("\n") || "(nothing yet)"}`;
  const droppedBlock = dropped.length
    ? `## Note\n\nThe following did not fit and was left out: ${dropped.join("; ")}.`
    : "";

  const text = [packBlock, planBlock, workBlock, transcriptBlock, droppedBlock]
    .filter(Boolean)
    .join("\n\n");

  return { text, dropped, read: summarisePacks(kept) };
}
