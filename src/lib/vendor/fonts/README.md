# Fonts (built for the shelf)

Each `<id>.css.txt` is one shelf font's `@font-face` rules, with the Latin `woff2` files from its
`@fontsource/<id>` devDependency inlined as data URLs, so a game can use it under the room's
content policy. A game loads one with `<link rel="stylesheet" href="studio/fonts/<id>.css">`, and
the bundle inlines it. They're `.txt` because Vitest empties any `.css` import, even a raw one.
Every font is under the SIL Open Font License 1.1 (`OFL.txt`), and each file starts with its
font's copyright line. The list is `SHELF_FONTS` in `src/lib/shelf.ts`; after changing it, run
`just shelf`.
