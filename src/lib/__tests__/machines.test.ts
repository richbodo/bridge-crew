import { describe, expect, it } from "vitest";

import {
  brokenRules,
  canMove,
  CREW_MOVES,
  emptyRoom,
  speakerOf,
  step,
  type RoomEvent,
  type RoomModel,
} from "../machines";

/** Applies events in order; every one must be accepted. */
function walk(events: RoomEvent[], room: RoomModel = emptyRoom(["a", "b"])): RoomModel {
  return events.reduce((current, event) => {
    const { room: next, refused } = step(current, event);
    if (refused) throw new Error(`${event.type} refused: ${refused}`);
    expect(brokenRules(next)).toEqual([]);
    return next;
  }, room);
}

describe("crew member state (docs/state_machines.md §3)", () => {
  it("allows exactly the drawn moves", () => {
    expect(CREW_MOVES).toEqual({
      idle: ["working"],
      working: ["hand_raised", "idle"],
      hand_raised: ["speaking", "idle", "working"],
      speaking: ["idle"],
    });
  });

  it("allows staying put, and refuses shortcuts", () => {
    expect(canMove("working", "working")).toBe(true);
    expect(canMove("idle", "hand_raised")).toBe(false);
    expect(canMove("idle", "speaking")).toBe(false);
    expect(canMove("working", "speaking")).toBe(false);
    expect(canMove("speaking", "working")).toBe(false);
  });
});

// One test per row of the link table (docs/state_machines.md §13).
describe("how the machines link (§13)", () => {
  it("summoned while Idle: Idle → Working, and a new run starts", () => {
    const room = walk([{ type: "summon", agent: "a" }]);
    expect(room.crew["a"]).toEqual({ status: "working", run: "r1" });
    expect(room.runs["r1"]?.state).toBe("running");
  });

  it("summoned while Hailing: the hail is Replaced and a new run starts", () => {
    const room = walk([
      { type: "summon", agent: "a" },
      { type: "finish", run: "r1" },
      { type: "summon", agent: "a" },
    ]);
    expect(room.hails["h3"]?.state).toBe("replaced");
    expect(room.contributions["k2"]?.outcome).toBe("replaced");
    expect(room.crew["a"]).toEqual({ status: "working", run: "r4" });
  });

  it("redirected: the old run is Superseded and the crew member stays Working", () => {
    const room = walk([
      { type: "summon", agent: "a" },
      { type: "summon", agent: "a" },
    ]);
    expect(room.runs["r1"]?.state).toBe("superseded");
    expect(room.crew["a"]).toEqual({ status: "working", run: "r2" });
  });

  it("a superseded run's late reply is kept, and raises no hail", () => {
    const room = walk([
      { type: "summon", agent: "a" },
      { type: "summon", agent: "a" },
      { type: "finish", run: "r1" },
    ]);
    expect(room.contributions["k3"]).toEqual({ agent: "a", run: "r1", outcome: "superseded" });
    expect(Object.keys(room.hails)).toEqual([]);
    expect(room.crew["a"]?.status).toBe("working");
  });

  it("the run finishes: Working → Hailing with a new open hail", () => {
    const room = walk([
      { type: "summon", agent: "a" },
      { type: "finish", run: "r1" },
    ]);
    expect(room.runs["r1"]?.state).toBe("finished");
    expect(room.crew["a"]?.status).toBe("hand_raised");
    expect(room.hails["h3"]).toEqual({ agent: "a", run: "r1", contribution: "k2", state: "pending" });
  });

  it("the run fails: Working → Idle", () => {
    const room = walk([
      { type: "summon", agent: "a" },
      { type: "fail", run: "r1" },
    ]);
    expect(room.runs["r1"]?.state).toBe("failed");
    expect(room.crew["a"]).toEqual({ status: "idle", run: null });
  });

  it("the student grants: the hail is Granted, the crew member Speaking, the floor Held", () => {
    const room = walk([
      { type: "summon", agent: "a" },
      { type: "finish", run: "r1" },
      { type: "grant", hail: "h3" },
    ]);
    expect(room.hails["h3"]?.state).toBe("granted");
    expect(room.contributions["k2"]?.outcome).toBe("said");
    expect(speakerOf(room)).toBe("a");
    expect(room.said).toEqual([{ hail: "h3", contribution: "k2" }]);
  });

  it("a grant while the floor is Held is refused, and the hail stays open", () => {
    const room = walk([
      { type: "summon", agent: "a" },
      { type: "summon", agent: "b" },
      { type: "finish", run: "r1" },
      { type: "finish", run: "r2" },
      { type: "grant", hail: "h4" },
    ]);
    const { room: after, refused } = step(room, { type: "grant", hail: "h6" });
    expect(refused).toBe("floor busy");
    expect(after.hails["h6"]?.state).toBe("pending");
  });

  it("not now: the hail is Declined and the crew member goes back to Idle", () => {
    const room = walk([
      { type: "summon", agent: "a" },
      { type: "finish", run: "r1" },
      { type: "notNow", hail: "h3" },
    ]);
    expect(room.hails["h3"]?.state).toBe("dismissed");
    expect(room.contributions["k2"]?.outcome).toBe("declined");
    expect(room.crew["a"]).toEqual({ status: "idle", run: null });
  });

  it("finishing speaking, or being interrupted, frees the floor", () => {
    const granted: RoomEvent[] = [
      { type: "summon", agent: "a" },
      { type: "finish", run: "r1" },
      { type: "grant", hail: "h3" },
    ];
    expect(speakerOf(walk([...granted, { type: "doneSpeaking", agent: "a" }]))).toBeNull();
    expect(speakerOf(walk([...granted, { type: "prompt" }]))).toBeNull();
  });

  it("stopped: a run is Superseded, a hail Withdrawn, the floor freed", () => {
    const working = walk([
      { type: "summon", agent: "a" },
      { type: "stop", agent: "a" },
    ]);
    expect(working.runs["r1"]?.state).toBe("superseded");
    expect(working.crew["a"]?.status).toBe("idle");

    const hailing = walk([
      { type: "summon", agent: "a" },
      { type: "finish", run: "r1" },
      { type: "stop", agent: "a" },
    ]);
    expect(hailing.hails["h3"]?.state).toBe("withdrawn");
    expect(hailing.contributions["k2"]?.outcome).toBe("withdrawn");

    const speaking = walk([
      { type: "summon", agent: "a" },
      { type: "finish", run: "r1" },
      { type: "grant", hail: "h3" },
      { type: "stop", agent: "a" },
    ]);
    expect(speakerOf(speaking)).toBeNull();
  });

  it("logs every event that changes something (rule 9)", () => {
    const room = walk([
      { type: "summon", agent: "a" },
      { type: "finish", run: "r1" },
      { type: "grant", hail: "h3" },
      { type: "prompt" },
    ]);
    expect(room.log).toHaveLength(4);
  });
});
