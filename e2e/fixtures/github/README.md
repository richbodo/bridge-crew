# Fake GitHub repositories

`playwright.config.ts` sets `BRIDGE_CREW_GITHUB_FIXTURES` to this folder, so the tests open games
"from GitHub" without the network (src/lib/github.server.ts). Each repository is
`<owner>/<repo>/<commit>/` with that commit's files, and `HEAD` says `<branch> <newest commit>`.

- `studio-fixtures/space-cube`: a small Three.js game written as modules, with an import map to a
  CDN, in two commits. The second changes its label, for **Bring in GitHub's newest**.
- `studio-fixtures/needs-build`: a Vite project that has to be built before it can play.
