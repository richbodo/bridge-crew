import { describe, expect, it } from "vitest";

import {
  brokenRules,
  describeEvents,
  emptyRoom,
  explore,
  step,
  type RoomEvent,
  type Variant,
} from "../machines";

/**
 * The explorer: tries every sequence of events, with two crew members, and checks the rules
 * in docs/state_machines.md §14. Two crew members are enough, by symmetry. `just test` walks
 * 7 events deep (about 30,000 rooms); `just flows` walks 9 (about 870,000).
 */
const DEPTH = Number(process.env["EXPLORER_DEPTH"] ?? 7);

describe("the explorer", () => {
  it(`finds no broken rule in the machines as drawn, ${DEPTH} events deep`, { timeout: 120_000 }, () => {
    const { rooms, broken } = explore({ depth: DEPTH });
    for (const b of broken) {
      console.log(`rule ${b.rule}: ${b.why}\n  ${describeEvents(b.events)}`);
    }
    expect(broken).toEqual([]);
    expect(rooms).toBeGreaterThan(1000);
    console.log(`explored ${rooms} rooms`);
  });

  it("finds broken rules in the server as it was before the fixes", () => {
    const { broken } = explore({ depth: 5, variant: "today" });
    for (const b of broken) {
      console.log(`before the fixes, rule ${b.rule}: ${b.why}\n  ${describeEvents(b.events)}`);
    }
    expect(new Set(broken.map((b) => b.rule))).toEqual(new Set([0, 3, 4, 5]));
  });
});

/** Replays events, ignoring refusals, and returns the rules broken at the end. */
function replay(events: RoomEvent[], variant: Variant): number[] {
  const room = events.reduce((r, e) => step(r, e, variant).room, emptyRoom(["a", "b"]));
  return [...new Set(brokenRules(room).map((b) => b.rule))].sort();
}

// Each finding's reproduction, from docs/plans/educational-context-2026-10-31.md Part 2.
describe("the findings reproduce before the fixes, and not after", () => {
  const cases: Array<{ id: string; rules: number[]; events: RoomEvent[] }> = [
    {
      id: "F2: summoning a hailing crew member leaves its hail open",
      rules: [3],
      events: [
        { type: "summon", agent: "a" },
        { type: "finish", run: "r1" },
        { type: "summon", agent: "a" },
      ],
    },
    {
      id: "F3: a redirect doesn't end the first run, and both hail",
      rules: [3, 5],
      events: [
        { type: "summon", agent: "a" },
        { type: "summon", agent: "a" },
        { type: "finish", run: "r1" },
      ],
    },
    {
      id: "F4: a grant speaks the newest contribution, not the hail's",
      rules: [3, 4],
      events: [
        { type: "summon", agent: "a" },
        { type: "finish", run: "r1" },
        { type: "summon", agent: "a" },
        { type: "finish", run: "r4" },
        { type: "grant", hail: "h3" },
      ],
    },
    {
      id: "F5: Not now on an old hail sends a working crew member to Idle, and its run hails from Idle",
      rules: [0],
      events: [
        { type: "summon", agent: "a" },
        { type: "finish", run: "r1" },
        { type: "summon", agent: "a" },
        { type: "notNow", hail: "h3" },
        { type: "finish", run: "r4" },
      ],
    },
    {
      id: "F6: the Stand down button leaves the hail open",
      rules: [3],
      events: [
        { type: "summon", agent: "a" },
        { type: "finish", run: "r1" },
        { type: "stop", agent: "a" },
      ],
    },
  ];

  for (const { id, rules, events } of cases) {
    it(id, () => {
      expect(replay(events, "today")).toEqual(rules);
      expect(replay(events, "fixed")).toEqual([]);
    });
  }
});
