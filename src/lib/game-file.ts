import ZZFX_LICENSE from "./vendor/zzfx/LICENSE?raw";
import ZZFX_MICRO from "./vendor/zzfx/ZzFXMicro.min.js?raw";

/**
 * A version of the game is one self-contained HTML file (docs/plans/educational-context-
 * 2026-10-31.md Part 5). Before it runs, in the room or from a file, it gets:
 *   - a content security policy that blocks the network;
 *   - ZzFX (MIT), so the game can call zzfx(...) with the Sound designer's sounds;
 *   - in the room only, a crash reporter that tells the room when the game throws.
 */

const CSP =
  "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; media-src data: blob:; font-src data:";

const ZZFX_SCRIPT = `<script>
/* ZzFX ${"\n"}${ZZFX_LICENSE.trim()}${"\n"}*/
${ZZFX_MICRO.trim()}
zzfxV = 0.25;
// Browsers start audio suspended until the player does something.
addEventListener("pointerdown", () => zzfxX.resume());
addEventListener("keydown", () => zzfxX.resume());
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

/** The game, ready to run: in the room's sandboxed frame, or as a file to share. */
export function prepareGame(html: string, { inRoom }: { inRoom: boolean }): string {
  const head = [
    `<meta http-equiv="Content-Security-Policy" content="${CSP}">`,
    inRoom ? CRASH_REPORTER : "",
    ZZFX_SCRIPT,
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
