import { describe, expect, it } from "vitest";

import { emptyFloor, floorReducer, type FloorState } from "../floor";

function run(actions: Parameters<typeof floorReducer>[1][], start: FloorState = emptyFloor) {
  return actions.reduce(floorReducer, start);
}

describe("floor state machine", () => {
  it("walks the legal path", () => {
    const state = run([
      { type: "summon", agent: "scout" },
      { type: "raise", agent: "scout" },
      { type: "grant", agent: "scout" },
    ]);
    expect(state.speaking).toBe("scout");
    expect(state.statuses.scout).toBe("speaking");
    expect(floorReducer(state, { type: "finish", agent: "scout" }).speaking).toBeNull();
  });

  it("refuses to grant an agent that never raised a hand", () => {
    const state = run([{ type: "summon", agent: "scout" }, { type: "grant", agent: "scout" }]);
    expect(state.statuses.scout).toBe("working");
    expect(state.speaking).toBeNull();
  });

  it("keeps grants exclusive", () => {
    const state = run([
      { type: "summon", agent: "scout" },
      { type: "raise", agent: "scout" },
      { type: "grant", agent: "scout" },
      { type: "summon", agent: "analyst" },
      { type: "raise", agent: "analyst" },
      { type: "grant", agent: "analyst" },
    ]);
    expect(state.speaking).toBe("scout");
    expect(state.statuses.analyst).toBe("hand_raised");
  });

  it("lets a human preempt whoever is speaking", () => {
    const state = run([
      { type: "summon", agent: "scout" },
      { type: "raise", agent: "scout" },
      { type: "grant", agent: "scout" },
      { type: "human_speaks" },
    ]);
    expect(state.speaking).toBeNull();
    expect(state.statuses.scout).toBe("idle");
  });

  it("stops an agent from any state", () => {
    const state = run([{ type: "summon", agent: "skeptic" }, { type: "stop", agent: "skeptic" }]);
    expect(state.statuses.skeptic).toBe("stopped");
  });
});
