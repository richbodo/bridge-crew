import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { gunzipSync } from "node:zlib";

import { DATA_FILES, MAX_FILE_BYTES, MAX_GAME_BYTES, MAX_GAME_FILES, TEXT_FILES } from "./bring-in";
import { findGameFolder, isCommit, type GitHubLink, type GitHubSource } from "./github";
import { readTar } from "./tar";

/**
 * Opening a game from GitHub (docs/plans/games-on-github-2026-11-16.md Part 2): the server
 * downloads the repository's archive, unpacks it in memory, and finds the game in it, which then
 * comes in as Bring in does. A public repository needs no sign-in. GitHub allows 60 requests an
 * hour from one network without one, and opening a game takes two.
 *
 * Tests set BRIDGE_CREW_GITHUB_FIXTURES to a folder of fake repositories, so nothing goes to
 * GitHub: <owner>/<repo>/<commit>/ holds each commit's files, and <owner>/<repo>/HEAD says
 * "<branch> <commit>" for the newest. Without HEAD, the only commit is the newest, on main.
 */

const API = "https://api.github.com";
/** GitHub asks for a User-Agent; this one names the app, not the person. */
const HEADERS = {
  "User-Agent": "bridge-crew",
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
/** The biggest repository the studio downloads, compressed. */
const MAX_ARCHIVE_BYTES = 60_000_000;

/** A game found in a repository: its files as Bring in takes them, and where it came from. */
export interface RepoGame {
  files: Record<string, string>;
  /** Files that can't be part of a game, or were too big, by name. */
  left: string[];
  source: GitHubSource;
}

export class GitHubProblem extends Error {}

function fixtures(): string | null {
  return process.env["BRIDGE_CREW_GITHUB_FIXTURES"] || null;
}

/** GitHub's answer, or a problem in words. */
async function request(url: string, accept?: string): Promise<Response> {
  let response: Response;
  try {
    response = await fetch(url, { headers: accept ? { ...HEADERS, Accept: accept } : HEADERS });
  } catch {
    throw new GitHubProblem("GitHub didn't answer. Is this laptop on the internet?");
  }
  if (response.ok) return response;
  const left = response.headers.get("x-ratelimit-remaining");
  if ((response.status === 403 || response.status === 429) && left === "0") {
    const reset = Number(response.headers.get("x-ratelimit-reset")) * 1000;
    const when = reset
      ? new Date(reset).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      : "an hour";
    throw new GitHubProblem(
      `GitHub only answers 60 requests an hour from one network without signing in, and they're used up. Try again after ${when}.`,
    );
  }
  if (response.status === 404) throw new GitHubProblem("not found");
  throw new GitHubProblem(`GitHub said no (${response.status} ${response.statusText}).`);
}

function notFound(link: GitHubLink): GitHubProblem {
  return new GitHubProblem(
    `There's no public repository at github.com/${link.owner}/${link.repo}${link.ref ? ` with ${link.ref}` : ""}. If it's private, the studio can't open it yet.`,
  );
}

interface Archive {
  /** Paths in the repository, without the archive's own top folder. */
  files: Map<string, Uint8Array>;
  branch: string;
  commit: string;
}

async function fromGitHub(link: GitHubLink): Promise<Archive> {
  const base = `${API}/repos/${link.owner}/${link.repo}`;
  let repo: { default_branch: string; size: number };
  try {
    repo = (await (await request(base)).json()) as typeof repo;
  } catch (error) {
    throw (error as Error).message === "not found" ? notFound(link) : error;
  }
  if (repo.size * 1024 > MAX_ARCHIVE_BYTES * 2) {
    throw new GitHubProblem(
      `That repository is ${Math.round(repo.size / 1024)} MB, too big for the studio to open.`,
    );
  }
  // A link to a commit follows the main branch for GitHub's newest.
  const ref = link.ref ?? repo.default_branch;
  const branch = link.ref && !isCommit(link.ref) ? link.ref : repo.default_branch;

  let response: Response;
  try {
    response = await request(`${base}/tarball/${encodeURIComponent(ref)}`);
  } catch (error) {
    throw (error as Error).message === "not found" ? notFound(link) : error;
  }
  const size = Number(response.headers.get("content-length"));
  if (size > MAX_ARCHIVE_BYTES) {
    throw new GitHubProblem("That repository is too big for the studio to open.");
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length > MAX_ARCHIVE_BYTES) {
    throw new GitHubProblem("That repository is too big for the studio to open.");
  }
  const tar = readTar(gunzipSync(bytes));
  const files = new Map<string, Uint8Array>();
  for (const file of tar.files) {
    // GitHub's archive puts everything in one folder, named for the repository and commit.
    const path = file.path.split("/").slice(1).join("/");
    if (path) files.set(path, file.data);
  }
  const commit = tar.comment ?? ref;
  return { files, branch, commit };
}

/** A fake repository from BRIDGE_CREW_GITHUB_FIXTURES, for tests. */
function fromFixtures(root: string, link: GitHubLink): Archive {
  const repo = join(root, link.owner, link.repo);
  if (!existsSync(repo)) throw notFound(link);
  const head = existsSync(join(repo, "HEAD"))
    ? readFileSync(join(repo, "HEAD"), "utf8").trim().split(/\s+/)
    : ["main", readdirSync(repo).find((name) => statSync(join(repo, name)).isDirectory()) ?? ""];
  const [mainBranch, newest] = [head[0]!, head[1]!];
  const commit = link.ref && isCommit(link.ref) ? link.ref : newest;
  const dir = join(repo, commit);
  if (!existsSync(dir)) throw notFound(link);
  const files = new Map<string, Uint8Array>();
  const walk = (folder: string) => {
    for (const name of readdirSync(folder)) {
      const path = join(folder, name);
      if (statSync(path).isDirectory()) walk(path);
      else files.set(relative(dir, path).split("\\").join("/"), readFileSync(path));
    }
  };
  walk(dir);
  return { files, branch: link.ref && !isCommit(link.ref) ? link.ref : mainBranch, commit };
}

/** The newest commit on a branch: one request, to see whether GitHub has moved on. */
export async function newestCommit(source: GitHubSource): Promise<string> {
  const root = fixtures();
  if (root) {
    const head = join(root, source.owner, source.repo, "HEAD");
    if (existsSync(head)) return readFileSync(head, "utf8").trim().split(/\s+/)[1]!;
    return source.commit;
  }
  const response = await request(
    `${API}/repos/${source.owner}/${source.repo}/commits/${encodeURIComponent(source.branch)}`,
    "application/vnd.github.sha",
  ).catch((error: Error) => {
    throw error.message === "not found"
      ? new GitHubProblem(
          `GitHub can't find ${source.branch} in ${source.owner}/${source.repo} any more.`,
        )
      : error;
  });
  return (await response.text()).trim();
}

const MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf",
  otf: "font/otf",
};

const decoder = new TextDecoder();

/** Games opened in the last few minutes, so looking at one and then opening it downloads once. */
const recent = new Map<string, { at: number; game: RepoGame }>();
const RECENT_MS = 5 * 60_000;

/**
 * Opens the game in a repository: downloads it, finds the game's folder, and reads its files as
 * Bring in takes them, text as text and pictures and fonts as data URLs. Throws a GitHubProblem,
 * in words, if it can't. `fresh` skips the copy from the last few minutes, for GitHub's newest.
 */
export async function fetchRepoGame(
  link: GitHubLink,
  { fresh = false }: { fresh?: boolean } = {},
): Promise<RepoGame> {
  const key = `${link.owner}/${link.repo}@${link.ref ?? ""}:${link.path}`.toLowerCase();
  const kept = recent.get(key);
  if (!fresh && kept && Date.now() - kept.at < RECENT_MS) return kept.game;
  const game = await openRepoGame(link);
  recent.set(key, { at: Date.now(), game });
  if (recent.size > 8) recent.delete(recent.keys().next().value!);
  return game;
}

async function openRepoGame(link: GitHubLink): Promise<RepoGame> {
  const root = fixtures();
  const archive = root ? fromFixtures(root, link) : await fromGitHub(link);
  const paths = [...archive.files.keys()];
  const read = (path: string) => {
    const data = archive.files.get(path);
    return data === undefined ? undefined : decoder.decode(data);
  };
  const found = findGameFolder(paths, link.path, read);
  if ("problem" in found) throw new GitHubProblem(found.problem);

  const prefix = found.folder ? `${found.folder}/` : "";
  const files: Record<string, string> = {};
  const left: string[] = [];
  let total = 0;
  for (const [path, data] of archive.files) {
    if (!path.startsWith(prefix)) continue;
    const inside = path.slice(prefix.length);
    if (inside.split("/").some((part) => part.startsWith(".") || part === "node_modules")) continue;
    const name = inside.split("/").pop()!;
    const text = TEXT_FILES.test(inside);
    if (!text && !DATA_FILES.test(inside)) {
      // A repository's own files aren't worth naming; a game's video or sound is.
      if (!/^(?:LICEN[CS]E|COPYING|CNAME|Makefile|package(?:-lock)?\.json)$/i.test(name))
        left.push(inside);
      continue;
    }
    if (
      data.length > MAX_FILE_BYTES ||
      total + data.length > MAX_GAME_BYTES ||
      Object.keys(files).length >= MAX_GAME_FILES
    ) {
      left.push(`${inside} (too big)`);
      continue;
    }
    const extension = /\.([a-z0-9]+)$/i.exec(inside)?.[1]?.toLowerCase() ?? "";
    files[inside] = text
      ? decoder.decode(data)
      : `data:${MIME[extension] ?? "application/octet-stream"};base64,${Buffer.from(data).toString("base64")}`;
    total += data.length;
  }
  return {
    files,
    left,
    source: {
      owner: link.owner,
      repo: link.repo,
      branch: archive.branch,
      commit: archive.commit,
      path: found.folder,
    },
  };
}
