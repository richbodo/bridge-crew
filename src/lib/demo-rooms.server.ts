import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

import { demoScriptFor, PLAIN_DEMO, type DemoScript } from "./demo-rooms";
import { jobOf, templateOf } from "./templates";

type Client = SupabaseClient<Database>;

/**
 * Puts a demo room's opening in the room (docs/plans/games-on-github-2026-11-16.md Part 1):
 * every station gets the context's pack, the people's lines go in the transcript, and the crew
 * member's hail is made through the same moves as a real run, start_run then finish_run.
 * Without a context, it's the opening `just run`'s demo room has always had.
 */
export async function seedDemoRoom(sb: Client, sessionId: string, context?: string) {
  const script: DemoScript | undefined = context ? demoScriptFor(context) : PLAIN_DEMO;
  if (!script) throw new Error(`There's no demo for "${context}".`);

  const { data: room, error: roomError } = await sb
    .from("sessions")
    .select("template")
    .eq("id", sessionId)
    .maybeSingle();
  if (roomError) throw new Error(roomError.message);
  const template = templateOf(room?.template);
  if (template.key !== "deliberation")
    throw new Error("A demo opening is for a Deliberation room.");
  const job = jobOf(template, script.crew);

  if (script.pack) {
    const { error } = await sb
      .from("agents_state")
      .update({ context_packs: [script.pack] })
      .eq("session_id", sessionId);
    if (error) throw new Error(error.message);
  }

  const lines = [
    ...(script.pack
      ? [
          {
            author_name: "Bridge",
            kind: "system" as const,
            body: `Every station reads the ${script.pack} pack.`,
          },
        ]
      : []),
    ...script.people.map((line) => ({
      author_name: line.name,
      kind: "human" as const,
      body: line.body,
    })),
    {
      author_name: "Bridge",
      kind: "system" as const,
      body: `${job.name} is on it: ${script.task}`,
    },
  ];
  for (const line of lines) {
    const { error } = await sb.from("transcript").insert({ session_id: sessionId, ...line });
    if (error) throw new Error(error.message);
  }

  const { data: run, error } = await sb.rpc("start_run", {
    _session: sessionId,
    _agent: script.crew,
    _task: script.task,
    _mode: "direct",
  });
  if (error || !run) throw new Error(error?.message ?? `The demo couldn't start ${job.name}.`);
  const { error: finishError } = await sb.rpc("finish_run", {
    _run: run,
    _spoken: script.spoken,
    _brief: script.brief,
    _summary: script.hail,
  });
  if (finishError) throw new Error(finishError.message);

  const { error: docError } = await sb
    .from("stage_docs")
    .upsert(
      { session_id: sessionId, slug: template.doc.slug, body: script.plan },
      { onConflict: "session_id,slug" },
    );
  if (docError) throw new Error(docError.message);
}
