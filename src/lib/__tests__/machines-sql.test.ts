import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { CREW_MOVES, CREW_STATUSES } from "../machines";

const MIGRATIONS = join(__dirname, "../../../supabase/migrations");

/** The pairs listed in the newest definition of public.crew_move_allowed. */
function sqlMoves(): Array<[string, string]> {
  const definitions = readdirSync(MIGRATIONS)
    .sort()
    .map((file) => readFileSync(join(MIGRATIONS, file), "utf8"))
    .flatMap((sql) => sql.match(/FUNCTION public\.crew_move_allowed[\s\S]*?\$\$;/g) ?? []);
  const newest = definitions.at(-1);
  if (!newest) throw new Error("No crew_move_allowed function in supabase/migrations.");
  return [...newest.matchAll(/\('([a-z_]+)',\s*'([a-z_]+)'\)/g)].map((m) => [m[1]!, m[2]!]);
}

// F1: one transition table, used by the server, the tests and the database.
describe("the database's crew member machine", () => {
  it("allows exactly the moves in CREW_MOVES", () => {
    const ts = CREW_STATUSES.flatMap((from) => CREW_MOVES[from].map((to) => [from, to]));
    expect(sqlMoves().sort()).toEqual(ts.sort());
  });
});
