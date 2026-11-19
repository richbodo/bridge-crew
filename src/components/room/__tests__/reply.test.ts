import { describe, expect, it } from "vitest";

import { replyPrefix, stillNames, withoutName } from "../reply";
import { findAddressees } from "@/lib/summon";

const crew = [
  { key: "storyteller", names: ["Storyteller"] },
  { key: "game-designer", names: ["Game designer"] },
];

describe("replying from the message box", () => {
  it("names a crew member so the room's parser finds it", () => {
    expect(replyPrefix("Storyteller")).toBe("@Storyteller ");
    expect(replyPrefix("Game designer")).toBe("@Game-designer ");
    expect(findAddressees(`${replyPrefix("Game designer")}make it harder`, crew)).toEqual([
      "game-designer",
    ]);
  });

  it("is still a reply while the name is in the box, in any case", () => {
    const prefix = replyPrefix("Storyteller");
    expect(stillNames("@Storyteller make it funnier", prefix)).toBe(true);
    expect(stillNames("ok @storyteller, again", prefix)).toBe(true);
    expect(stillNames("make it funnier", prefix)).toBe(false);
    expect(stillNames("@Storytellers", prefix)).toBe(false);
  });

  it("takes the name out, and keeps what was typed", () => {
    const prefix = replyPrefix("Storyteller");
    expect(withoutName("@Storyteller ", prefix)).toBe("");
    expect(withoutName("@Storyteller make it funnier", prefix)).toBe("make it funnier");
    expect(withoutName("ok @storyteller again", prefix)).toBe("ok again");
    expect(withoutName("nothing to take", prefix)).toBe("nothing to take");
  });
});
