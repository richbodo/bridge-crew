/**
 * Music for Game Studio games. The Sound designer writes a song as notes (the format is in
 * src/lib/made.ts), and this turns it into one loop of samples with ZzFX. It's plain JavaScript
 * because every game gets a copy (src/lib/game-file.ts), and the room imports it too, so a song
 * sounds the same in both. Types are in music.d.ts.
 */

const LETTERS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

/** A note's frequency: "A4" is 440, and "C#5" and "Bb3" work too. Anything else is undefined. */
export function noteFrequency(note) {
  const match = /^([A-Ga-g])([#b]?)(\d)$/.exec(note);
  if (!match) return undefined;
  const semitone =
    LETTERS[match[1].toUpperCase()] + (match[2] === "#" ? 1 : match[2] === "b" ? -1 : 0);
  return 440 * 2 ** ((semitone - 9) / 12 + Number(match[3]) - 4);
}

/** A track's steps: notes, x, - and . (a | marks a bar, and takes no time). */
export function musicSteps(track) {
  return String(track).split(/[\s|]+/).filter(Boolean);
}

/**
 * One loop of a song, as samples. zzfx is ZzFX's ZZFX object, whose buildSamples makes each
 * note. Each step is half a beat; a shorter track repeats to fill the song.
 */
export function musicSamples(song, zzfx) {
  const step = 30 / song.tempo;
  const tracks = Object.keys(song.tracks).map((name) => [
    song.instruments[name],
    musicSteps(song.tracks[name]),
  ]);
  const length = Math.max(0, ...tracks.map(([, steps]) => steps.length));
  const out = new Float32Array(Math.ceil(length * step * zzfx.sampleRate) || 1);

  for (const [instrument, steps] of tracks) {
    if (!instrument || !steps.length) continue;
    const notes = {};
    for (let i = 0; i < length; i++) {
      const note = steps[i % steps.length];
      // x plays the instrument at its own frequency, for drums.
      const frequency = /^x$/i.test(note) ? (instrument[2] ?? 220) : noteFrequency(note);
      if (frequency === undefined) continue; // a rest, a hold, or something unknown
      let held = 1;
      while (i + held < length && steps[(i + held) % steps.length] === "-") held++;
      const key = `${frequency} ${held}`;
      if (!notes[key]) {
        const params = instrument.map((p) => (p === null ? undefined : p));
        params[1] = 0; // no randomness, so the notes stay in tune
        params[2] = frequency;
        if (held > 1) {
          // A held note sustains for its steps, less its attack and release.
          const rest = (params[3] ?? 0) + (params[5] ?? 0.1);
          params[4] = Math.max(params[4] ?? 0, held * step - rest);
        }
        notes[key] = zzfx.buildSamples(...params);
      }
      const samples = notes[key];
      const at = Math.round(i * step * zzfx.sampleRate);
      // A note near the end rings on into the start, so the loop has no gap.
      for (let j = 0; j < samples.length; j++) out[(at + j) % out.length] += samples[j];
    }
  }

  let peak = 0;
  for (const sample of out) peak = Math.max(peak, Math.abs(sample));
  if (peak > 1) for (let i = 0; i < out.length; i++) out[i] /= peak;
  return out;
}
