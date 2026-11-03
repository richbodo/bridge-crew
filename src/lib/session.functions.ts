import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

import { templateOf, type TemplateKey } from "./templates";

const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function makeCode() {
  return Array.from(
    { length: 6 },
    () => CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)],
  ).join("");
}

export const createSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      title: string;
      displayName: string;
      color: string;
      template?: TemplateKey;
      studentName?: string;
    }) => data,
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const code = makeCode();
    const template = templateOf(data.template);
    const studentName = data.studentName?.trim();
    if (template.sharedSeat && !studentName) throw new Error("Give the student a nickname.");

    const { data: session, error } = await supabase
      .from("sessions")
      .insert({
        title: data.title || "Untitled session",
        code,
        owner_id: userId,
        template: template.key,
        settings: { seats: template.seats, ...(studentName ? { studentName } : {}) },
      })
      .select("id, code, title")
      .single();
    if (error) throw new Error(error.message);

    const { error: joinError } = await supabase.from("participants").insert({
      session_id: session.id,
      user_id: userId,
      display_name: data.displayName || "Someone",
      color: data.color,
    });
    if (joinError) throw new Error(joinError.message);

    await supabase.from("agents_state").insert(
      template.roster.map((job) => ({
        session_id: session.id,
        agent: job.key,
        status: "idle" as const,
        context_packs: template.defaultPacks,
      })),
    );
    await supabase
      .from("stage_docs")
      .insert({ session_id: session.id, slug: template.doc.slug, body: "" });
    await supabase.from("transcript").insert({
      session_id: session.id,
      author_name: "Bridge",
      kind: "system" as const,
      body: `Session open. Join code ${session.code}. ${template.openingNote}`,
    });

    return session;
  });

export const joinSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { code: string; displayName: string; color: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: session, error } = await supabase
      .from("sessions")
      .select("id, code, title")
      .eq("code", data.code.trim().toUpperCase())
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!session) throw new Error("No session with that code.");

    const { error: joinError } = await supabase.from("participants").upsert(
      {
        session_id: session.id,
        user_id: userId,
        display_name: data.displayName || "Someone",
        color: data.color,
        last_seen_at: new Date().toISOString(),
      },
      { onConflict: "session_id,user_id" },
    );
    if (joinError) throw new Error(joinError.message);

    return session;
  });

export const getRoom = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const sessionId = data.sessionId;
    // The time limit: runs that outlived it (say, across a server restart) fail now (F10).
    const { expireStaleRuns } = await import("./room.server");
    await expireStaleRuns(supabase, sessionId);

    const { data: room } = await supabase
      .from("sessions")
      .select("template")
      .eq("id", sessionId)
      .maybeSingle();
    const template = templateOf(room?.template);

    const [session, participants, transcript, agents, hails, contributions, doc] =
      await Promise.all([
        supabase
          .from("sessions")
          .select("id, code, title, owner_id, template, settings")
          .eq("id", sessionId)
          .maybeSingle(),
        supabase.from("participants").select("*").eq("session_id", sessionId),
        supabase
          .from("transcript")
          .select("*")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: true })
          .limit(300),
        supabase.from("agents_state").select("*").eq("session_id", sessionId),
        supabase
          .from("hand_raises")
          .select("*")
          .eq("session_id", sessionId)
          .eq("state", "pending")
          .order("created_at", { ascending: true }),
        supabase
          .from("contributions")
          .select("*")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: true }),
        supabase
          .from("stage_docs")
          .select("*")
          .eq("session_id", sessionId)
          .eq("slug", template.doc.slug)
          .maybeSingle(),
      ]);

    if (!session.data) throw new Error("Session not found.");
    const me = participants.data?.find((p) => p.user_id === userId) ?? null;
    if (!me) throw new Error("You have not joined this session.");

    return {
      session: session.data,
      template: template.key,
      settings: (session.data.settings ?? {}) as { seats?: number; studentName?: string },
      me,
      participants: participants.data ?? [],
      transcript: transcript.data ?? [],
      agents: agents.data ?? [],
      hails: hails.data ?? [],
      contributions: contributions.data ?? [],
      plan: doc.data?.body ?? "",
      scribeState: doc.data?.scribe_state ?? "idle",
    };
  });

/** Delete room: removes the room and everything in it, for good. Only its owner can. */
export const deleteRoom = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string }) => data)
  .handler(async ({ data, context }) => {
    const { data: gone, error } = await context.supabase
      .from("sessions")
      .delete()
      .eq("id", data.sessionId)
      .eq("owner_id", context.userId)
      .select("id");
    if (error) throw new Error(error.message);
    if (!gone?.length) throw new Error("Only the person who opened this room can delete it.");
    return { ok: true };
  });

export const myParticipations = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("participants")
      .select("session_id, sessions(id, title, code, created_at, template)")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(8);
    return (data ?? [])
      .map((row) => row.sessions)
      .filter((s): s is NonNullable<typeof s> => Boolean(s));
  });
