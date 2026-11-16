import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { gunzipSync } from "node:zlib";

import { afterAll, describe, expect, it } from "vitest";

import { findGameFolder, NEEDS_BUILDING, parseGameLink } from "../github";
import { fetchRepoGame } from "../github.server";
import { readTar } from "../tar";

/** Opening a game from GitHub (docs/plans/games-on-github-2026-11-16.md Part 2). */

const work = mkdtempSync(join(tmpdir(), "github-test-"));
afterAll(() => rmSync(work, { recursive: true, force: true }));

function writeAll(root: string, files: Record<string, string | Buffer>) {
  for (const [path, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), body);
  }
}

describe("a GitHub link", () => {
  it("can be a repository, a folder or file in it, a play link, or owner/repo", () => {
    expect(parseGameLink("https://github.com/someone/rocket-lab")).toEqual({
      owner: "someone",
      repo: "rocket-lab",
      ref: null,
      path: "",
    });
    expect(parseGameLink("github.com/someone/rocket-lab.git")).toMatchObject({
      repo: "rocket-lab",
    });
    expect(parseGameLink("https://github.com/someone/games/tree/main/space/cube")).toEqual({
      owner: "someone",
      repo: "games",
      ref: "main",
      path: "space/cube",
    });
    expect(parseGameLink("https://github.com/someone/games/blob/dev/docs/index.html")).toEqual({
      owner: "someone",
      repo: "games",
      ref: "dev",
      path: "docs",
    });
    expect(parseGameLink("https://someone.github.io/rocket-lab/")).toEqual({
      owner: "someone",
      repo: "rocket-lab",
      ref: null,
      path: "",
    });
    expect(parseGameLink("someone.github.io/rocket-lab/index.html")).toMatchObject({
      repo: "rocket-lab",
    });
    expect(parseGameLink("https://someone.github.io/")).toMatchObject({
      repo: "someone.github.io",
    });
    expect(parseGameLink(" someone/rocket-lab ")).toMatchObject({
      owner: "someone",
      repo: "rocket-lab",
    });
  });

  it("says what a link should look like when it isn't one", () => {
    for (const bad of ["", "rocket-lab", "https://gitlab.com/a/b", "https://github.com/someone"]) {
      expect(() => parseGameLink(bad)).toThrow(/Paste a GitHub link/);
    }
  });
});

describe("finding the game in a repository", () => {
  const find = (files: Record<string, string>, base = "") =>
    findGameFolder(Object.keys(files), base, (path) => files[path]);

  it("looks for index.html at the top, then in docs/, then for the only page", () => {
    expect(find({ "index.html": "", "docs/index.html": "" })).toEqual({ folder: "" });
    expect(find({ "README.md": "", "docs/index.html": "" })).toEqual({ folder: "docs" });
    expect(find({ "README.md": "", "game/play.html": "" })).toEqual({ folder: "game" });
    expect(find({ "a.html": "", "b.html": "" })).toEqual({
      problem:
        "There are 2 web pages in it and no index.html, so it isn't clear which one is the game.",
    });
    expect(find({ "README.md": "" })).toEqual({
      problem: "There's no web page in it, so there's no game to open.",
    });
  });

  it("starts from the folder a link names", () => {
    expect(find({ "index.html": "", "space/cube/index.html": "" }, "space/cube")).toEqual({
      folder: "space/cube",
    });
    expect(find({ "index.html": "" }, "nowhere")).toEqual({
      problem: "There's no folder called nowhere in it.",
    });
  });

  it("plays a built project's built folder, and says when it needs building", () => {
    const pkg = JSON.stringify({
      scripts: { build: "vite build" },
      devDependencies: { vite: "^7" },
    });
    expect(find({ "package.json": pkg, "index.html": "", "dist/index.html": "" })).toEqual({
      folder: "dist",
    });
    expect(
      find({
        "package.json": pkg,
        "index.html": '<script type="module" src="/src/main.ts"></script>',
      }),
    ).toEqual({ problem: NEEDS_BUILDING });
    // A package.json for tidying, with plain scripts, is no reason not to play.
    expect(
      find({
        "package.json": '{"devDependencies":{"prettier":"3"}}',
        "index.html": '<script src="game.js"></script>',
      }),
    ).toEqual({ folder: "" });
  });
});

describe("reading GitHub's archive", () => {
  it("reads git archive's tarball: long paths, pictures, and the commit", () => {
    const repo = join(work, "repo");
    const long = `${"a-very-long-folder-name/".repeat(5)}level-with-a-long-name.json`;
    writeAll(repo, {
      "index.html": "<p>Hello</p>",
      [long]: '{ "level": 1 }',
      "img/sprite.png": Buffer.from([137, 80, 78, 71, 0, 1, 2]),
      "names/kererū.txt": "unicode",
    });
    const git = (...args: string[]) =>
      execFileSync("git", ["-C", repo, ...args], { encoding: "utf8" }).trim();
    git("init", "-q");
    git("add", ".");
    git("-c", "user.name=t", "-c", "user.email=t@example.com", "commit", "-qm", "game");
    const commit = git("rev-parse", "HEAD");
    const archive = execFileSync("git", [
      "-C",
      repo,
      "archive",
      "--format=tar.gz",
      "--prefix=someone-game-abc1234/",
      "HEAD",
    ]);

    const tar = readTar(gunzipSync(archive));
    expect(tar.comment).toBe(commit);
    const files = Object.fromEntries(tar.files.map((file) => [file.path, file.data]));
    expect(Object.keys(files).sort()).toEqual(
      [
        "someone-game-abc1234/index.html",
        `someone-game-abc1234/${long}`,
        "someone-game-abc1234/img/sprite.png",
        "someone-game-abc1234/names/kererū.txt",
      ].sort(),
    );
    expect(new TextDecoder().decode(files[`someone-game-abc1234/${long}`])).toBe('{ "level": 1 }');
    expect([...files["someone-game-abc1234/img/sprite.png"]!]).toEqual([137, 80, 78, 71, 0, 1, 2]);
  });
});

describe("opening a repository's game", () => {
  it("finds the game, reads pictures as data, leaves out what can't be part of it, and names the commit", async () => {
    const root = join(work, "fixtures");
    const commit = "1".repeat(40);
    writeAll(join(root, "someone", "games", commit), {
      "README.md": "# Games",
      LICENSE: "MIT",
      "docs/index.html": "<canvas></canvas>",
      "docs/js/game.js": "draw();",
      "docs/img/hero.png": Buffer.from([137, 80, 78, 71]),
      "docs/trailer.mp4": Buffer.from([0, 0, 0]),
      "docs/.DS_Store": "x",
    });
    writeFileSync(join(root, "someone", "games", "HEAD"), `main ${commit}\n`);
    process.env["BRIDGE_CREW_GITHUB_FIXTURES"] = root;
    try {
      const game = await fetchRepoGame(parseGameLink("someone/games"), { fresh: true });
      expect(game.source).toEqual({
        owner: "someone",
        repo: "games",
        branch: "main",
        commit,
        path: "docs",
      });
      expect(Object.keys(game.files).sort()).toEqual(["img/hero.png", "index.html", "js/game.js"]);
      expect(game.files["img/hero.png"]).toBe("data:image/png;base64,iVBORw==");
      expect(game.left).toEqual(["trailer.mp4"]);
      await expect(fetchRepoGame(parseGameLink("someone/nothing"))).rejects.toThrow(
        "There's no public repository at github.com/someone/nothing. If it's private, the studio can't open it yet.",
      );
    } finally {
      delete process.env["BRIDGE_CREW_GITHUB_FIXTURES"];
    }
  });
});
