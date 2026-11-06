# ZzFX (vendored)

`ZzFX.js` and `LICENSE` are copied unchanged from the `zzfx` npm package, version 1.4.0 (MIT,
https://github.com/KilledByAPixel/ZzFX). `src/lib/game-file.ts` inlines `ZzFX.js`, licence
included, into every version of a Game Studio game, with its `export`s taken off so it runs as a
plain script. It's the full version rather than the micro one, because music needs its
`buildSamples` (`src/lib/music.js`). The files live here, not imported from `node_modules`,
because the server renders games too, and it can't import a raw file from a package. When you
upgrade the `zzfx` package, copy both files again.
