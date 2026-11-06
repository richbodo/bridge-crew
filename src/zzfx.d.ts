// ZzFX (MIT, https://github.com/KilledByAPixel/ZzFX) ships without types.
declare module "zzfx" {
  export function zzfx(...parameters: Array<number | undefined>): AudioBufferSourceNode;
  export const ZZFX: {
    volume: number;
    sampleRate: number;
    audioContext: AudioContext;
    buildSamples(...parameters: Array<number | undefined>): Float32Array;
    playSamples(
      channels: Float32Array[],
      volumeScale?: number,
      rate?: number,
      pan?: number,
      loop?: boolean,
    ): AudioBufferSourceNode;
  };
}
