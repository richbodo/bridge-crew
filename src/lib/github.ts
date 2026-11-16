/**
 * Games on GitHub (docs/plans/games-on-github-2026-11-16.md): reading a GitHub link, and finding
 * the game in a repository. Pure — no IO; src/lib/github.server.ts talks to GitHub.
 */

/**
 * The "Bridge Crew" OAuth app, registered with device flow switched on, for Connect GitHub
 * (Part 3). A client ID isn't a secret. An adopter can use their own app's through
 * BRIDGE_CREW_GITHUB_CLIENT_ID.
 */
export const GITHUB_CLIENT_ID = "Ov23lihDsDzWZQPJw938";

/** What a pasted link names. */
export interface GitHubLink {
  owner: string;
  repo: string;
  /** A branch, tag or commit, when the link names one; otherwise the main branch. */
  ref: string | null;
  /** A folder in the repository, when the link names one. */
  path: string;
}

/** Where a room's game came from: kept with the room, and shown in its header. */
export interface GitHubSource {
  owner: string;
  repo: string;
  /** The branch the room follows for GitHub's newest. */
  branch: string;
  /** The commit the game came from. */
  commit: string;
  /** The game's folder in the repository: "" for the top, or "docs". */
  path: string;
}

const NAME = /^[A-Za-z0-9_.-]+$/;

export const LINK_HELP =
  "Paste a GitHub link, such as github.com/someone/rocket-lab, a play link such as someone.github.io/rocket-lab, or someone/rocket-lab.";

/**
 * Reads a GitHub link: a repository (`github.com/owner/repo`, with `/tree/branch/folder` or
 * `/blob/branch/file` if it names one), a play link (`owner.github.io/repo/`), or just
 * `owner/repo`. Throws, in words, if it isn't one. A branch name with a slash in it can't be
 * told from its folder, so the first part after /tree/ is taken as the branch.
 */
export function parseGameLink(input: string): GitHubLink {
  const text = input
    .trim()
    .replace(/^git\+/, "")
    .replace(/\.git$/, "");
  if (!text) throw new Error(LINK_HELP);

  let url: URL | null = null;
  try {
    url = new URL(/^[a-z]+:\/\//i.test(text) ? text : `https://${text}`);
  } catch {
    url = null;
  }
  const host = url?.hostname.toLowerCase() ?? "";
  const parts = (url?.pathname ?? "")
    .split("/")
    .filter(Boolean)
    .map((part) => decodeURIComponent(part));

  const check = (link: GitHubLink) => {
    if (!NAME.test(link.owner) || !NAME.test(link.repo)) throw new Error(LINK_HELP);
    return link;
  };

  if (host === "github.com" || host === "www.github.com") {
    const [owner, repo, kind, ref, ...rest] = parts;
    if (!owner || !repo) throw new Error(LINK_HELP);
    if ((kind === "tree" || kind === "blob") && ref) {
      // A file's link names its folder: the game is the folder the page is in.
      const folder = kind === "blob" ? rest.slice(0, -1) : rest;
      return check({ owner, repo, ref, path: folder.join("/") });
    }
    return check({ owner, repo, ref: null, path: "" });
  }

  const pages = /^([a-z0-9-]+)\.github\.io$/.exec(host);
  if (pages) {
    const owner = pages[1]!;
    // A play link's first part is its repository, unless it's the owner's own site.
    const [first] = parts;
    const repo = first && !/\.html?$/i.test(first) ? first : `${owner}.github.io`;
    return check({ owner, repo, ref: null, path: "" });
  }

  const short = /^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)\/?$/.exec(text);
  if (short) return check({ owner: short[1]!, repo: short[2]!, ref: null, path: "" });
  throw new Error(LINK_HELP);
}

/** "github.com/owner/repo", or with its folder. */
export function describeSource(source: { owner: string; repo: string; path?: string }): string {
  return `github.com/${source.owner}/${source.repo}${source.path ? `/${source.path}` : ""}`;
}

export function sourceUrl(source: GitHubSource): string {
  const base = `https://github.com/${source.owner}/${source.repo}`;
  return source.path ? `${base}/tree/${source.commit}/${source.path}` : base;
}

/** A commit's short form, as GitHub shows it. */
export function shortCommit(commit: string): string {
  return commit.slice(0, 7);
}

/** A ref that's a commit's hash rather than a branch's or tag's name. */
export function isCommit(ref: string): boolean {
  return /^[0-9a-f]{7,40}$/i.test(ref);
}

/** Build tools a package.json can name, which mean the page needs building before it runs. */
const BUILD_TOOLS =
  /"(?:vite|webpack|parcel|rollup|esbuild|rolldown|next|react-scripts|@vitejs\/[^"]+|@sveltejs\/[^"]+|typescript)"\s*:/;

export const NEEDS_BUILDING = "This game needs building first, which the studio can't do yet.";

/**
 * Where the game is in a repository's files (Part 2): the folder with index.html at the top,
 * then docs/index.html, GitHub Pages' other usual folder, then the only HTML page. A project
 * whose package.json names a build tool plays from its built folder (dist/ or build/) if it
 * has one; if not, and its page loads source that needs building, it says so. Returns the
 * game's folder ("" for the top), or a problem in words.
 */
export function findGameFolder(
  paths: string[],
  base: string,
  read: (path: string) => string | undefined,
): { folder: string } | { problem: string } {
  const prefix = base ? `${base.replace(/\/+$/, "")}/` : "";
  const inside = paths
    .filter((path) => path.startsWith(prefix))
    .map((path) => path.slice(prefix.length));
  if (!inside.length) return { problem: `There's no folder called ${base} in it.` };
  const has = (path: string) => inside.includes(path);
  const at = (folder: string) => `${prefix}${folder}`.replace(/\/$/, "");

  const pkg = read(`${prefix}package.json`);
  const built = pkg !== undefined && BUILD_TOOLS.test(pkg);
  if (built) {
    for (const folder of ["dist", "build", "docs"]) {
      if (has(`${folder}/index.html`)) return { folder: at(folder) };
    }
  }
  if (has("index.html")) {
    const page = read(`${prefix}index.html`) ?? "";
    // A page that loads TypeScript, JSX or a framework's source can't run until it's built.
    if (
      built &&
      /<script\b[^>]*\ssrc\s*=\s*["']?[^"'\s>]*\.(?:tsx?|jsx|vue|svelte)\b/i.test(page)
    ) {
      return { problem: NEEDS_BUILDING };
    }
    return { folder: at("") };
  }
  if (has("docs/index.html")) return { folder: at("docs") };

  const pages = inside.filter(
    (path) => /\.html?$/i.test(path) && !path.split("/").some((part) => part === "node_modules"),
  );
  if (pages.length === 1) {
    const folder = pages[0]!.split("/").slice(0, -1).join("/");
    return { folder: at(folder) };
  }
  if (built || pkg !== undefined) return { problem: NEEDS_BUILDING };
  return {
    problem: pages.length
      ? `There are ${pages.length} web pages in it and no index.html, so it isn't clear which one is the game.`
      : "There's no web page in it, so there's no game to open.",
  };
}
