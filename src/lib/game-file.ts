import MUSIC from "./music.js?raw";
import ZZFX from "./vendor/zzfx/ZzFX.js?raw";

/**
 * A version of the game runs as one HTML file: its bundle (src/lib/bundle.ts), or an old
 * version's own file (docs/plans/educational-context-2026-10-31.md Part 5). Before it runs, in
 * the room or from a file, it gets:
 *   - a content security policy that blocks the network;
 *   - a volume limiter on every sound it makes (docs/plans/bigger-games-2026-11-16.md Part 2);
 *   - storage for saves where the browser has none, as in the room's sandboxed frame;
 *   - ZzFX (MIT), so the game can call zzfx(...) with the Sound designer's sounds, and
 *     playMusic(song) and stopMusic() for its music;
 *   - in the room only, a crash reporter that tells the room when the game throws, and where;
 *   - in the Tester's playtest only, ears: a record of every sound and song the game plays.
 */

const CSP =
  "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; media-src data: blob:; font-src data:";

/** A module's code as a plain script's: the same, without its exports. */
const unexported = (code: string) => code.replace(/^export /gm, "");

/**
 * Every audio context the game makes plays through a gain and a compressor, so no game can be
 * loud. It runs first, so ZzFX's context is limited too.
 */
const LIMITER = `<script>
(function () {
  var Native = window.AudioContext || window.webkitAudioContext;
  if (!Native) return;
  function Limited(options) {
    var context = options === undefined ? new Native() : new Native(options);
    var gain = context.createGain();
    gain.gain.value = 0.7;
    var limit = context.createDynamicsCompressor();
    limit.threshold.value = -10;
    limit.knee.value = 0;
    limit.ratio.value = 20;
    limit.attack.value = 0.003;
    limit.release.value = 0.1;
    gain.connect(limit);
    limit.connect(context.destination);
    // The game connects to its destination as usual, and reaches the limiter instead.
    Object.defineProperty(context, "destination", { value: gain });
    return context;
  }
  Limited.prototype = Native.prototype;
  window.AudioContext = Limited;
  if (window.webkitAudioContext) window.webkitAudioContext = Limited;
})();
</script>`;

/** The message the room's frame sends with a game's saves, whenever they change. */
export const SAVES_MESSAGE = "bridge-crew-saves";
/** The message it sends when the game reloads itself, so the room can reload it with its saves. */
export const RELOAD_MESSAGE = "bridge-crew-reload";

/**
 * Storage for saves (Part 2 of the bigger-games plan). The room's frame has no localStorage, so
 * there it's kept in memory, starting from the saves the room kept, and every change goes to
 * the room. The Tester's always starts empty. A downloaded file uses the browser's own.
 */
function storageScript(saves: Record<string, string> | null, inRoom: boolean): string {
  return `<script>
(function () {
  try {
    var probe = "__bridge_crew__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return;
  } catch (e) {}
  var toRoom = ${inRoom ? "parent !== window" : "false"};
  function storage(start, send) {
    var data = Object.create(null);
    Object.keys(start || {}).forEach(function (key) { data[key] = String(start[key]); });
    function changed() { if (send) parent.postMessage({ type: "${SAVES_MESSAGE}", saves: Object.assign({}, data) }, "*"); }
    var api = {
      getItem: function (key) { key = String(key); return key in data ? data[key] : null; },
      setItem: function (key, value) { data[String(key)] = String(value); changed(); },
      removeItem: function (key) { delete data[String(key)]; changed(); },
      clear: function () { data = Object.create(null); changed(); },
      key: function (i) { var keys = Object.keys(data); return i < keys.length ? keys[i] : null; },
    };
    // localStorage.score = 3 and localStorage["score"] work too, as they do in a browser.
    return new Proxy(api, {
      get: function (target, key) {
        if (key === "length") return Object.keys(data).length;
        if (key in target) return target[key];
        return typeof key === "string" && key in data ? data[key] : undefined;
      },
      set: function (target, key, value) { if (key in target) return false; api.setItem(key, value); return true; },
      deleteProperty: function (target, key) { api.removeItem(key); return true; },
      has: function (target, key) { return key in target || key in data; },
      ownKeys: function () { return Object.keys(data); },
      getOwnPropertyDescriptor: function (target, key) {
        return key in data ? { value: data[key], writable: true, enumerable: true, configurable: true } : undefined;
      },
    });
  }
  var local = storage(${JSON.stringify(saves ?? {}).replace(/</g, "\u003c")}, toRoom);
  var session = storage({}, false);
  Object.defineProperty(window, "localStorage", { configurable: true, get: function () { return local; } });
  Object.defineProperty(window, "sessionStorage", { configurable: true, get: function () { return session; } });
  // A game that reloads itself would come back without its newest saves, so the room reloads it.
  if (toRoom) addEventListener("pagehide", function () { parent.postMessage({ type: "${RELOAD_MESSAGE}" }, "*"); });
})();
</script>`;
}

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
  function report(message, error) {
    // A bundle's scripts end with a sourceURL line, so the stack names the game's own file.
    var at = /([\\w.\\/-]+\\.js):(\\d+)(?::\\d+)?/.exec((error && error.stack) || "");
    var where = at ? " (in " + at[1] + ", line " + at[2] + ")" : "";
    parent.postMessage({ type: "${CRASH_MESSAGE}", message: (String(message || "Something went wrong") + where).slice(0, 300) }, "*");
  }
  addEventListener("error", function (e) { report(e.message, e.error); });
  addEventListener("unhandledrejection", function (e) {
    report(e.reason && e.reason.message ? e.reason.message : e.reason, e.reason);
  });
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
  {
    inRoom,
    listen = false,
    saves = null,
  }: {
    inRoom: boolean;
    listen?: boolean;
    /** In the room: the saves it kept for this game. */
    saves?: Record<string, string> | null;
  },
): string {
  const head = [
    `<meta http-equiv="Content-Security-Policy" content="${CSP}">`,
    LIMITER,
    storageScript(saves, inRoom),
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
