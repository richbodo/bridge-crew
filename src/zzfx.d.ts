// ZzFX (MIT, https://github.com/KilledByAPixel/ZzFX) ships without types.
declare module "zzfx" {
  export function zzfx(...parameters: Array<number | undefined>): AudioBufferSourceNode;
  export const ZZFX: { volume: number; audioContext: AudioContext };
}
