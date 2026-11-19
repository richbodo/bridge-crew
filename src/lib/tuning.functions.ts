import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

import { isTemplateKey, TEMPLATES, type Template, type TemplateKey } from "./templates";
import { cleanPart, dutyPart, type Tuning, type TuningRow } from "./tuning";

/** Tune the crew's reads and writes (docs/plans/tune-the-crew-2026-11-19.md). */

function templateFor(kind: string): Template {
  if (!isTemplateKey(kind)) throw new Error(`There's no ${kind} room to tune.`);
  return TEMPLATES[kind];
}

/** The original text of a part, or throws when the part isn't one this kind of room has. */
function originalOf(template: Template, part: string): string | null {
  if (part === "notes") return null;
  if (part === "doc") return template.doc.scribe;
  const job = part.startsWith("duty:")
    ? template.roster.find((j) => dutyPart(j.key) === part)
    : undefined;
  if (!job) throw new Error(`A ${template.name} room has nothing called ${part} to tune.`);
  return job.duty;
}

export const getTuning = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((data: { kind: TemplateKey }) => data)
  .handler(async ({ data, context }) => {
    const template = templateFor(data.kind);
    const { data: rows, error } = await context.supabase
      .from("crew_tuning")
      .select("part, body, updated_at")
      .eq("template", template.key);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

/** Saves one part; text that's empty or the original takes the tuning away. */
export const saveTuningPart = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { kind: TemplateKey; part: string; text: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const template = templateFor(data.kind);
    const body = cleanPart(data.text, originalOf(template, data.part));
    const { error } = body
      ? await supabase
          .from("crew_tuning")
          .upsert({ template: template.key, part: data.part, body, updated_by: userId })
      : await supabase
          .from("crew_tuning")
          .delete()
          .eq("template", template.key)
          .eq("part", data.part);
    if (error) throw new Error(error.message);
    return { tuned: Boolean(body) };
  });

/** Replaces a kind of room's tuning with an imported file's (src/lib/tuning.ts importTuning). */
export const replaceTuning = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { kind: TemplateKey; tuning: Tuning }) => data)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const template = templateFor(data.kind);
    const wanted: Array<[string, string]> = [
      ...Object.entries(data.tuning.duties).map(
        ([job, text]) => [dutyPart(job), text] as [string, string],
      ),
      ["notes", data.tuning.notes ?? ""],
      ["doc", data.tuning.doc ?? ""],
    ];
    const rows: TuningRow[] = [];
    for (const [part, text] of wanted) {
      const body = cleanPart(text, originalOf(template, part));
      if (body) rows.push({ part, body });
    }
    const { error: cleared } = await supabase
      .from("crew_tuning")
      .delete()
      .eq("template", template.key);
    if (cleared) throw new Error(cleared.message);
    if (rows.length) {
      const { error } = await supabase
        .from("crew_tuning")
        .insert(rows.map((row) => ({ ...row, template: template.key, updated_by: userId })));
      if (error) throw new Error(error.message);
    }
    return { parts: rows.length };
  });

/** What a run was told: its whole system prompt, as recorded when it started. */
export const runInstructions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((data: { runId: string }) => data)
  .handler(async ({ data, context }) => {
    const { data: run, error } = await context.supabase
      .from("runs")
      .select("instructions")
      .eq("id", data.runId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { instructions: run?.instructions ?? null };
  });
