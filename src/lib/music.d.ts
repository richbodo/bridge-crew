/** A song, as the Sound designer writes it (src/lib/made.ts) and src/lib/music.js plays it. */
export interface Song {
  /** Beats a minute; each step is half a beat. */
  tempo: number;
  /** ZzFX parameter lists, by name. A note's pitch replaces the frequency (the third). */
  instruments: Record<string, Array<number | null>>;
  /** Each track plays on the instrument with the same name. */
  tracks: Record<string, string>;
}

/** What musicSamples needs from ZzFX: its ZZFX object. */
export interface SampleMaker {
  sampleRate: number;
  buildSamples(...parameters: Array<number | undefined>): Float32Array;
}

export function noteFrequency(note: string): number | undefined;
export function musicSteps(track: string): string[];
export function musicSamples(song: Song, zzfx: SampleMaker): Float32Array;
