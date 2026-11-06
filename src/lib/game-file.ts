import MUSIC from "./music.js?raw";
import ZZFX from "./vendor/zzfx/ZzFX.js?raw";

/**
 * A version of the game is one self-contained HTML file (docs/plans/educational-context-
 * 2026-10-31.md Part 5). Before it runs, in the room or from a file, it gets:
 *   - a content security policy that blocks the network;
 *   - ZzFX (MIT), so the game can call zzfx(...) with the Sound designer's sounds, and
 *     playMusic(song) and stopMusic() for its music;
 *   - in the room only, a crash reporter that tells the room when the game throws;
 *   - in the Tester's playtest only, ears: a record of every sound and song the game plays.
 */

const CSP =
  "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; media-src data: blob:; font-src data:";

/** A module's code as a plain script's: the same, without its exports. */
const unexported = (code: string) => code.replace(/^export /gm, "");

// Wrapped in a function, so only the names put on globalThis below are the game's to call.
const SOUND_SCRIPT = `<script>
(function () {
${unexported(ZZFX).trim()}

${unexported(MUSIC).trim()}

ZZFX.volume = 0.25;
let music;
/** Plays a song from the Sound designer over and over, until stopMusic() or the next song. */
function playMusic(song, loop = true) {
  stopMusic();
  music = ZZFX.playSamples([musicSamples(song, ZZFX)], 0.6, 1, 0, loop);
  return music;
}
function stopMusic() {
  if (music) music.stop();
  music = undefined;
}
// zzfxX is ZzFXMicro's name for the audio, which versions built before music had.
Object.assign(globalThis, { zzfx, ZZFX, playMusic, stopMusic, zzfxX: ZZFX.audioContext });
// Browsers start audio suspended until the player does something.
addEventListener("pointerdown", () => ZZFX.audioContext.resume());
addEventListener("keydown", () => ZZFX.audioContext.resume());
})();
</script>`;

export const CRASH_MESSAGE = "bridge-crew-crash";

const CRASH_REPORTER = `<script>
(function () {
  function report(message) {
    parent.postMessage({ type: "${CRASH_MESSAGE}", message: String(message || "Something went wrong").slice(0, 300) }, "*");
  }
  addEventListener("error", function (e) { report(e.message); });
  addEventListener("unhandledrejection", function (e) { report(e.reason && e.reason.message ? e.reason.message : e.reason); });
})();
</script>`;

/**
 * What the game plays, for the Tester's playtest (src/lib/playtest.server.ts): each call of
 * zzfx, playMusic or stopMusic goes into __heard, as its name and its arguments as JSON.
 */
const EARS = `<script>
(function () {
  var heard = (globalThis.__heard = []);
  ["zzfx", "playMusic", "stopMusic"].forEach(function (name) {
    var play = globalThis[name];
    globalThis[name] = function () {
      var args = Array.prototype.slice.call(arguments);
      heard.push([name, JSON.stringify(name === "zzfx" ? args : args[0])]);
      return play.apply(this, arguments);
    };
  });
})();
</script>`;

/**
 * The game, ready to run: in the room's sandboxed frame, as a file to share, or (listen) in
 * the Tester's playtest.
 */
export function prepareGame(
  html: string,
  { inRoom, listen = false }: { inRoom: boolean; listen?: boolean },
): string {
  const head = [
    `<meta http-equiv="Content-Security-Policy" content="${CSP}">`,
    inRoom ? CRASH_REPORTER : "",
    SOUND_SCRIPT,
    listen ? EARS : "",
  ]
    .filter(Boolean)
    .join("\n");

  const headTag = /<head\b[^>]*>/i.exec(html);
  if (headTag) {
    const at = headTag.index + headTag[0].length;
    return `${html.slice(0, at)}\n${head}\n${html.slice(at)}`;
  }
  const htmlTag = /<html\b[^>]*>/i.exec(html);
  if (htmlTag) {
    const at = htmlTag.index + htmlTag[0].length;
    return `${html.slice(0, at)}\n<head>\n${head}\n</head>\n${html.slice(at)}`;
  }
  return `<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n${head}\n</head>\n<body>\n${html}\n</body>\n</html>`;
}

/** "The Mole Game!" → "the-mole-game", for folder and file names. */
export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/[\s_-]+/g, "-")
      .slice(0, 40) || "game"
  );
}
