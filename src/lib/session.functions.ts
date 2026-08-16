import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

import { CREW_ORDER } from "./crew";

const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function makeCode() {
  return Array.from(
    { length: 6 },
    () => CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)],
  ).join("");
}

export const createSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { title: string; displayName: string; color: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const code = makeCode();

    const { data: session, error } = await supabase
      .from("sessions")
      .insert({ title: data.title || "Untitled session", code, owner_id: userId })
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
      CREW_ORDER.map((agent) => ({
        session_id: session.id,
        agent,
        status: "idle" as const,
      })),
    );
    await supabase.from("stage_docs").insert({ session_id: session.id, slug: "plan", body: "" });
    await supabase.from("transcript").insert({
      session_id: session.id,
      author_name: "Bridge",
      kind: "system" as const,
      body: `Session open. Join code ${session.code}. Summon the crew with /research, /analyze, /debate.`,
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

    const [session, participants, transcript, agents, hails, contributions, doc] =
      await Promise.all([
        supabase.from("sessions").select("id, code, title, owner_id").eq("id", sessionId).maybeSingle(),
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
          .eq("slug", "plan")
          .maybeSingle(),
      ]);

    if (!session.data) throw new Error("Session not found.");
    const me = participants.data?.find((p) => p.user_id === userId) ?? null;
    if (!me) throw new Error("You have not joined this session.");

    return {
      session: session.data,
      me,
      participants: participants.data ?? [],
      transcript: transcript.data ?? [],
      agents: agents.data ?? [],
      hails: hails.data ?? [],
      contributions: contributions.data ?? [],
      plan: doc.data?.body ?? "",
    };
  });

export const myParticipations = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("participants")
      .select("session_id, sessions(id, title, code, created_at)")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(8);
    return (data ?? [])
      .map((row) => row.sessions)
      .filter((s): s is NonNullable<typeof s> => Boolean(s));
  });
