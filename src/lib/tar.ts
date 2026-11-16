/**
 * Reads a tar archive, as GitHub serves a repository (docs/plans/games-on-github-2026-11-16.md
 * Part 2): `git archive`'s ustar, with pax headers for long paths and a global header whose
 * comment is the commit. Gunzip it first. Pure — no IO.
 */

export interface TarFile {
  path: string;
  data: Uint8Array;
}

export interface Tar {
  files: TarFile[];
  /** The global header's comment: for a GitHub archive, the commit's full hash. */
  comment: string | null;
}

const BLOCK = 512;
const decoder = new TextDecoder();

function text(bytes: Uint8Array, start: number, length: number): string {
  const slice = bytes.subarray(start, start + length);
  const end = slice.indexOf(0);
  return decoder.decode(end < 0 ? slice : slice.subarray(0, end));
}

function octal(bytes: Uint8Array, start: number, length: number): number {
  const value = text(bytes, start, length).trim();
  return value ? parseInt(value, 8) : 0;
}

/** A pax header's records: "<length> <key>=<value>\n", where the length counts bytes. */
function paxRecords(data: Uint8Array): Record<string, string> {
  const records: Record<string, string> = {};
  let at = 0;
  while (at < data.length) {
    const space = data.indexOf(32, at);
    if (space < 0) break;
    const length = Number(decoder.decode(data.subarray(at, space)));
    if (!length) break;
    const body = decoder.decode(data.subarray(space + 1, at + length - 1));
    const equals = body.indexOf("=");
    if (equals > 0) records[body.slice(0, equals)] = body.slice(equals + 1);
    at += length;
  }
  return records;
}

export function readTar(bytes: Uint8Array): Tar {
  const files: TarFile[] = [];
  let comment: string | null = null;
  let nextPath: string | null = null;
  let at = 0;
  while (at + BLOCK <= bytes.length) {
    const header = bytes.subarray(at, at + BLOCK);
    if (header.every((byte) => byte === 0)) break;
    const size = octal(header, 124, 12);
    const type = String.fromCharCode(header[156] || 48);
    const data = bytes.subarray(at + BLOCK, at + BLOCK + size);
    at += BLOCK + Math.ceil(size / BLOCK) * BLOCK;

    if (type === "g") {
      comment = paxRecords(data)["comment"] ?? comment;
      continue;
    }
    if (type === "x") {
      nextPath = paxRecords(data)["path"] ?? null;
      continue;
    }
    if (type === "L") {
      nextPath = text(data, 0, data.length);
      continue;
    }
    const prefix = text(header, 345, 155);
    const name = text(header, 0, 100);
    const path = nextPath ?? (prefix ? `${prefix}/${name}` : name);
    nextPath = null;
    if (type === "0" || type === "\0") files.push({ path, data });
  }
  return { files, comment };
}
