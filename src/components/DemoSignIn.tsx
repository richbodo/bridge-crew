import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { DEMO_MODE, DEMO_PASSWORD, DEMO_USERS, type DemoUser } from "@/lib/demo";

/**
 * One-click sign-in as a seeded demo account. Renders nothing outside demo mode. The page
 * reacts to the new session through useAuth, as it would after a password sign-in.
 */
export function DemoSignIn({ className = "" }: { className?: string }) {
  const [busy, setBusy] = useState<number | null>(null);
  if (!DEMO_MODE) return null;

  const signIn = async (user: DemoUser) => {
    setBusy(user.slot);
    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: DEMO_PASSWORD,
    });
    setBusy(null);
    if (error) {
      toast.error(`${error.message}. Run \`just infra\` to seed the demo users.`);
    }
  };

  return (
    <div className={`space-y-2 rounded-lg border border-dashed border-border p-3 ${className}`}>
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        Demo mode · each tab signs in separately
      </p>
      {DEMO_USERS.map((user) => (
        <Button
          key={user.slot}
          variant="secondary"
          className="w-full"
          disabled={busy !== null}
          onClick={() => signIn(user)}
        >
          {`Log me on as demo user ${user.slot}`}
        </Button>
      ))}
    </div>
  );
}
