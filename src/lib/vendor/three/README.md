# Three.js (built for the shelf)

`three.js` is Three.js r180 (MIT, https://threejs.org) with six add-ons (OrbitControls,
PointerLockControls, EffectComposer, RenderPass, UnrealBloomPass and OutputPass), built by
`scripts/build-shelf.ts` from the pinned `three` devDependency into one plain script that defines
the global `THREE`. A game on the shelf loads it with `<script src="studio/three.js"></script>`,
and the bundle (`src/lib/bundle.ts`) inlines it, licence notice included. `LICENSE` is Three.js's.
See `docs/plans/bigger-games-2026-11-16.md`. To change the version, change `THREE_VERSION` in
`src/lib/shelf.ts` and the devDependency together, then run `just shelf`.
