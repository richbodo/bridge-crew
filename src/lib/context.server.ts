import type { SupabaseClient } from "@supabase/supabase-js";

import type { ContextDoc, PackSummary, PackSource } from "./context";

type Client = SupabaseClient<any, any, any>;

const RAW = import.meta.glob("/docs/context/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export interface RepoPack {
  name: string;
  docs: ContextDoc[];
}

function buildRepoPacks(): Map<string, ContextDoc[]> {
  const packs = new Map<string, ContextDoc[]>();
  for (const [path, body] of Object.entries(RAW)) {
    const rest = path.replace(/^\/docs\/context\//, "");
    const parts = rest.split("/");
    if (parts.length < 2) continue; // docs/context/README.md and friends
    const name = parts[0]!;
    const list = packs.get(name) ?? [];
    list.push({ pack: name, path, body, source: "repo" });
    packs.set(name, list);
  }
  return packs;
}

const REPO_PACKS = buildRepoPacks();

export function repoPackNames(): string[] {
  return [...REPO_PACKS.keys()].sort();
}

/** Every pack a session can attach: repo packs plus this session's own. */
export async function listPackSummaries(
  supabase: Client,
  sessionId: string,
): Promise<PackSummary[]> {
  const { data: packs } = await supabase
    .from("context_packs")
    .select("id, name, description, context_docs(id)")
    .eq("session_id", sessionId);

  const summaries = new Map<string, PackSummary>();
  for (const [name, docs] of REPO_PACKS) {
    summaries.set(name, {
      name,
      description: "Shipped with the repo",
      sources: ["repo"] as PackSource[],
      docCount: docs.length,
    });
  }
  for (const pack of packs ?? []) {
    const count = (pack.context_docs as unknown as unknown[] | null)?.length ?? 0;
    const existing = summaries.get(pack.name);
    if (existing) {
      existing.sources = [...existing.sources, "session"];
      existing.docCount += count;
      if (pack.description) existing.description = pack.description;
    } else {
      summaries.set(pack.name, {
        name: pack.name,
        description: pack.description ?? "",
        sources: ["session"],
        docCount: count,
      });
    }
  }
  return [...summaries.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Loads every document in the named packs, repo docs first. */
export async function loadPackDocs(
  supabase: Client,
  sessionId: string,
  names: string[],
): Promise<ContextDoc[]> {
  const wanted = names.map((n) => n.trim()).filter(Boolean);
  if (!wanted.length) return [];

  const docs: ContextDoc[] = [];
  for (const name of wanted) docs.push(...(REPO_PACKS.get(name) ?? []));

  const { data: packs } = await supabase
    .from("context_packs")
    .select("name, context_docs(path, body)")
    .eq("session_id", sessionId)
    .in("name", wanted);

  for (const pack of packs ?? []) {
    const rows = (pack.context_docs ?? []) as unknown as Array<{ path: string; body: string }>;
    for (const row of rows) {
      docs.push({ pack: pack.name, path: `session:${pack.name}/${row.path}`, body: row.body, source: "session" });
    }
  }
  return docs;
}
