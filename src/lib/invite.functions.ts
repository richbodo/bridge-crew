import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listInvites = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string }) => data)
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("invites")
      .select("id, email, note, status, last_sent_at, accepted_at, created_at")
      .eq("session_id", data.sessionId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const sendInvite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string; email: string; note?: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const email = data.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("That doesn't look like an email address.");

    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("invites")
      .select("id", { count: "exact", head: true })
      .eq("session_id", data.sessionId)
      .gte("created_at", since);
    if ((count ?? 0) >= 5) throw new Error("Too many invites just now — give it a few minutes.");

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("id, code, title")
      .eq("id", data.sessionId)
      .maybeSingle();
    if (sessionError) throw new Error(sessionError.message);
    if (!session) throw new Error("Room not found.");

    const { data: invite, error } = await supabase
      .from("invites")
      .insert({
        session_id: data.sessionId,
        email,
        note: data.note?.trim() || null,
        invited_by: userId,
        status: "pending",
      })
      .select("id, email, note, status, last_sent_at, accepted_at, created_at")
      .single();
    if (error) throw new Error(error.message);

    // Email delivery turns on once the sender domain is verified.
    // Until then the invite exists and the link/code paths work.
    return { invite, emailed: false as const, code: session.code };
  });

export const revokeInvite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string; inviteId: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("invites")
      .update({ status: "revoked" })
      .eq("id", data.inviteId)
      .eq("session_id", data.sessionId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const peekSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { code: string }) => data)
  .handler(async ({ data, context }) => {
    const code = data.code.trim().toUpperCase();
    const { data: session, error } = await context.supabase
      .from("sessions")
      .select("id, code, title")
      .eq("code", code)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!session) return null;

    const { data: participants } = await context.supabase
      .from("participants")
      .select("id, display_name, color, user_id")
      .eq("session_id", session.id);

    return {
      session,
      participants: participants ?? [],
      alreadyIn: (participants ?? []).some((p) => p.user_id === context.userId),
    };
  });

export const acceptInvites = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string }) => data)
  .handler(async ({ data, context }) => {
    const email = (context.claims as { email?: string } | null)?.email?.toLowerCase();
    if (!email) return { ok: true };
    await context.supabase
      .from("invites")
      .update({ status: "accepted", accepted_at: new Date().toISOString() })
      .eq("session_id", data.sessionId)
      .eq("email", email)
      .eq("status", "pending");
    return { ok: true };
  });
