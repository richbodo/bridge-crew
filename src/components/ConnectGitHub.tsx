import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  cancelGitHubConnect,
  checkGitHubConnect,
  disconnectGitHub,
  gitHubConnection,
  startGitHubConnect,
} from "@/lib/github.functions";

/**
 * Connect GitHub (docs/plans/games-on-github-2026-11-16.md Part 3), with GitHub's device flow:
 * the app shows a code, the teacher types it at github.com/login/device and approves, and the
 * server keeps the key it gets. The key never comes to this page. On a shared seat, the
 * connection is the signed-in teacher's.
 */

const CONNECTION_KEY = ["github-connection"];

const REVOKE_URL = "https://github.com/settings/applications";

type Code = Awaited<ReturnType<typeof startGitHubConnect>>;

/** Whether the signed-in user has connected GitHub, and as whom. */
function useGitHubConnection() {
  const connection = useServerFn(gitHubConnection);
  return useQuery({ queryKey: CONNECTION_KEY, queryFn: () => connection(), staleTime: 60_000 });
}

/** The connection, and connecting or disconnecting it, in place. */
export function ConnectGitHubPanel() {
  const queryClient = useQueryClient();
  const connection = useGitHubConnection();
  const start = useServerFn(startGitHubConnect);
  const check = useServerFn(checkGitHubConnect);
  const cancel = useServerFn(cancelGitHubConnect);
  const disconnect = useServerFn(disconnectGitHub);

  const [step, setStep] = useState<"idle" | "explain" | "code" | "disconnect">("idle");
  const [code, setCode] = useState<Code | null>(null);
  const [busy, setBusy] = useState(false);
  const [said, setSaid] = useState<string | null>(null);

  // While a code is showing, ask the server whether it's been approved, at GitHub's pace.
  useEffect(() => {
    if (step !== "code" || !code) return;
    let stopped = false;
    const timer = setInterval(
      async () => {
        try {
          const result = await check();
          if (stopped) return;
          if (result.state === "connected") {
            setStep("idle");
            setCode(null);
            setSaid(null);
            void queryClient.invalidateQueries({ queryKey: CONNECTION_KEY });
          } else if (result.state === "expired") {
            setStep("explain");
            setSaid("The code ran out before it was approved. Get a new one.");
          } else if (result.state === "denied") {
            setStep("idle");
            setSaid("GitHub says the connection wasn't approved, so nothing changed.");
          }
        } catch (error) {
          setStep("explain");
          setSaid((error as Error).message);
        }
      },
      Math.max(1, code.interval) * 1000,
    );
    return () => {
      stopped = true;
      clearInterval(timer);
    };
  }, [step, code, check, queryClient]);

  const getCode = async () => {
    setBusy(true);
    setSaid(null);
    try {
      setCode(await start());
      setStep("code");
    } catch (error) {
      setSaid((error as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const openGitHub = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code.userCode);
      toast.success("The code is copied. Paste it on GitHub's page.");
    } catch {
      // No clipboard: the code is on screen to type.
    }
    window.open(code.verificationUri, "_blank", "noopener,noreferrer");
  };

  if (connection.isLoading) return <p className="text-xs text-muted-foreground">Asking…</p>;
  const data = connection.data;

  if (data?.connected) {
    return step === "disconnect" ? (
      <div className="space-y-2 text-xs">
        <p className="text-foreground">
          Disconnect removes the studio's key to <strong>{data.login}</strong> from this laptop. To
          cancel it on GitHub too, revoke Bridge Crew at{" "}
          <a href={REVOKE_URL} target="_blank" rel="noreferrer" className="underline">
            github.com/settings/applications
          </a>
          .
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="destructive"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await disconnect();
                setStep("idle");
                void queryClient.invalidateQueries({ queryKey: CONNECTION_KEY });
              } catch (error) {
                toast.error((error as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            Disconnect
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setStep("idle")}>
            Keep it
          </Button>
        </div>
      </div>
    ) : (
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-foreground">
          Connected to GitHub as <strong>{data.login}</strong>.
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-xs"
          onClick={() => setStep("disconnect")}
        >
          Disconnect
        </Button>
      </div>
    );
  }

  if (step === "code" && code) {
    return (
      <div className="space-y-2 text-xs">
        <p className="text-foreground">
          Type this code on GitHub's page, then approve Bridge Crew:
        </p>
        <p
          aria-label="GitHub code"
          className="select-all rounded-md border border-border bg-background px-3 py-2 text-center font-mono text-2xl tracking-[0.3em] text-foreground"
        >
          {code.userCode}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => void openGitHub()}>
            Copy the code and open GitHub
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              void cancel();
              setStep("idle");
              setCode(null);
            }}
          >
            Cancel
          </Button>
        </div>
        <p className="text-muted-foreground">
          Waiting for GitHub… The page is {code.verificationUri.replace(/^https?:\/\//, "")}. The
          code lasts {Math.round(code.expiresIn / 60)} minutes.
        </p>
      </div>
    );
  }

  if (step === "explain") {
    return (
      <div className="space-y-2 text-xs">
        <p className="text-foreground">
          Connecting lets the studio open your private repositories, and lifts GitHub's limit of 60
          requests an hour. GitHub asks you to let Bridge Crew read and change{" "}
          <strong>every repository your account has</strong>, public and private, because saving a
          game to a private one needs that. A GitHub account just for the studio's games keeps the
          rest out of its reach.
        </p>
        <p className="text-muted-foreground">
          The key GitHub gives stays in this laptop's database. It goes only to GitHub: never to
          this page, never to the crew.
        </p>
        {said ? <p className="text-foreground">{said}</p> : null}
        <div className="flex gap-2">
          <Button size="sm" disabled={busy} onClick={() => void getCode()}>
            Get a code
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setStep("idle")}>
            Not now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1 text-xs">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground">Not connected to GitHub.</span>
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2 text-xs"
          onClick={() => {
            setSaid(null);
            setStep("explain");
          }}
        >
          Connect GitHub
        </Button>
      </div>
      {said ? <p className="text-foreground">{said}</p> : null}
      {data && "problem" in data && data.problem ? (
        <p className="text-muted-foreground">{data.problem}</p>
      ) : null}
    </div>
  );
}

/** A button for the lobby: "Connect GitHub", or who's connected, opening the panel. */
export function ConnectGitHubButton() {
  const connection = useGitHubConnection();
  const login = connection.data?.connected ? connection.data.login : null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="text-[11px] underline hover:text-foreground">
          {login ? `Connected as ${login}` : "Connect GitHub"}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>GitHub</DialogTitle>
          <DialogDescription>
            Games open from public GitHub links without connecting. Connecting is for private
            repositories, and, soon, for saving games to GitHub.
          </DialogDescription>
        </DialogHeader>
        <ConnectGitHubPanel />
      </DialogContent>
    </Dialog>
  );
}
