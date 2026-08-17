import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listContextPacks = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string }) => data)
  .handler(async ({ data, context }) => {
    const { listPackSummaries } = await import("./context.server");
    return listPackSummaries(context.supabase, data.sessionId);
  });

export const listSessionPacks = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string }) => data)
  .handler(async ({ data, context }) => {
    const { data: packs, error } = await context.supabase
      .from("context_packs")
      .select("id, name, description, context_docs(id, path, body)")
      .eq("session_id", data.sessionId)
      .order("name");
    if (error) throw new Error(error.message);
    return packs ?? [];
  });

export const createContextPack = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string; name: string; description: string }) => data)
  .handler(async ({ data, context }) => {
    const name = data.name.trim().toLowerCase().replace(/\s+/g, "-");
    if (!name) throw new Error("Give the pack a name.");
    const { error } = await context.supabase
      .from("context_packs")
      .insert({ session_id: data.sessionId, name, description: data.description.trim() });
    if (error) throw new Error(error.message);
    return { ok: true, name };
  });

export const addContextDoc = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { packId: string; path: string; body: string }) => data)
  .handler(async ({ data, context }) => {
    const path = data.path.trim() || "note.md";
    if (!data.body.trim()) throw new Error("The document is empty.");
    const { error } = await context.supabase
      .from("context_docs")
      .insert({ pack_id: data.packId, path, body: data.body });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteContextDoc = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { docId: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("context_docs").delete().eq("id", data.docId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteContextPack = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { packId: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("context_packs").delete().eq("id", data.packId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
