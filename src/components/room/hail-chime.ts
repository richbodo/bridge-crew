import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A small two-note chime when a crew member hails, so the people in the room hear it while
 * they're looking at the game. It's made in the browser (Web Audio), so there's no sound file.
 *
 * Browsers only let a page make sound after someone has clicked or typed in it, and Safari only
 * from inside that click, so the first click or key in the room wakes the sound up.
 *
 * The Chime switch in the room's header turns it off. That's kept in this browser, so a
 * classroom that wants quiet turns it off once.
 */

let audio: AudioContext | null = null;

function context(): AudioContext | null {
  if (audio) return audio;
  const Context =
    typeof window === "undefined"
      ? undefined
      : (window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext);
  audio = Context ? new Context() : null;
  return audio;
}

/** One soft bell note: a sine with a quieter octave, quick to start and slow to fade. */
function note(ctx: AudioContext, frequency: number, at: number) {
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(0.12, at + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.45);
  gain.connect(ctx.destination);
  for (const [multiple, level] of [
    [1, 1],
    [2, 0.25],
  ] as const) {
    const tone = ctx.createOscillator();
    const mix = ctx.createGain();
    tone.type = "sine";
    tone.frequency.value = frequency * multiple;
    mix.gain.value = level;
    tone.connect(mix).connect(gain);
    tone.start(at);
    tone.stop(at + 0.5);
  }
}

function ring(ctx: AudioContext) {
  const now = ctx.currentTime + 0.02;
  note(ctx, 880, now); // A5
  note(ctx, 1318.5, now + 0.13); // E6
}

/** The chime, now, or not at all: a chime that waited for a click would arrive late. */
export function playHailChime() {
  const ctx = context();
  if (!ctx) return;
  if (ctx.state === "running") {
    ring(ctx);
    return;
  }
  const asked = Date.now();
  void ctx
    .resume()
    .then(() => {
      if (Date.now() - asked < 1000) ring(ctx);
    })
    .catch(() => undefined);
}

const CHIME_SETTING = "bridge-crew:chime";

/** Whether the chime is on in this browser, and a way to change it. */
export function useChimeSetting(): [boolean, (on: boolean) => void] {
  const [on, setOn] = useState(true);
  // Read once the page is up, so the server's page matches the first render.
  useEffect(() => {
    try {
      setOn(localStorage.getItem(CHIME_SETTING) !== "off");
    } catch {
      // Storage blocked: the chime stays on.
    }
  }, []);
  const change = useCallback((next: boolean) => {
    setOn(next);
    try {
      if (next) localStorage.removeItem(CHIME_SETTING);
      else localStorage.setItem(CHIME_SETTING, "off");
    } catch {
      // Storage blocked: the setting lasts until the page closes.
    }
    // Turned on with a click, so it can play now, even in Safari: this is what you'll hear.
    if (next) playHailChime();
  }, []);
  return [on, change];
}

/**
 * Chimes when a hail appears that wasn't there before, unless the chime is off; the hails a room
 * opens with are quiet.
 */
export function useHailChime(
  roomId: string,
  hails: ReadonlyArray<{ id: string }> | undefined,
  on: boolean,
) {
  const known = useRef<{ roomId: string; seen: Set<string> } | null>(null);

  useEffect(() => {
    const wake = () => {
      const ctx = context();
      if (ctx && ctx.state !== "running") void ctx.resume().catch(() => undefined);
    };
    window.addEventListener("pointerdown", wake, { once: true, capture: true });
    window.addEventListener("keydown", wake, { once: true, capture: true });
    return () => {
      window.removeEventListener("pointerdown", wake, { capture: true });
      window.removeEventListener("keydown", wake, { capture: true });
    };
  }, []);

  useEffect(() => {
    if (!hails) return;
    if (known.current?.roomId !== roomId) {
      known.current = { roomId, seen: new Set(hails.map((hail) => hail.id)) };
      return;
    }
    const { seen } = known.current;
    const fresh = hails.some((hail) => !seen.has(hail.id));
    for (const hail of hails) seen.add(hail.id);
    if (fresh && on) playHailChime();
  }, [roomId, hails, on]);
}
