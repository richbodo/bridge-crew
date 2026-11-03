# ZzFX (vendored)

`ZzFXMicro.min.js` and `LICENSE` are copied unchanged from the `zzfx` npm package, version
1.4.0 (MIT, https://github.com/KilledByAPixel/ZzFX). `src/lib/game-file.ts` inlines them into
every version of a Game Studio game, licence included. They live here, not imported from
`node_modules`, because the server renders games too, and it can't import a raw file from a
package. When you upgrade the `zzfx` package, copy both files again.
