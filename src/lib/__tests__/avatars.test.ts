import { describe, expect, it } from "vitest";

import { COMMON, SIZE, SPRITES, frameOf, pathsOf, poseOf, type Pose } from "../avatars";
import { CREW_STATUSES } from "../machines";
import { gameStudio } from "../templates/game-studio";

const POSES: Pose[] = ["idle", "working", "hailing", "speaking"];
const sprites = Object.entries(SPRITES);

describe("the crew's avatars", () => {
  it("are 16 by 16 in every pose and frame, and every letter has a colour", () => {
    for (const [key, sprite] of sprites) {
      const letters = new Set([
        ".",
        "u",
        "U",
        ...Object.keys(COMMON),
        ...Object.keys(sprite.colors),
      ]);
      for (const pose of POSES) {
        for (const frame of [0, 1] as const) {
          const rows = frameOf(sprite, pose, frame);
          expect(rows, `${key} ${pose}`).toHaveLength(SIZE);
          for (const row of rows) {
            expect(row, `${key} ${pose} ${frame}`).toHaveLength(SIZE);
            for (const letter of row) expect(letters, `${key} uses "${letter}"`).toContain(letter);
          }
        }
      }
      for (const pose of ["working", "hailing", "speaking"] as const) {
        for (const overlay of sprite[pose]) {
          for (const [at, row] of Object.entries(overlay)) {
            expect(Number(at), `${key} ${pose}`).toBeLessThan(SIZE);
            expect(row, `${key} ${pose} row ${at}`).toHaveLength(SIZE);
          }
        }
      }
    }
  });

  it("look different in each state, and the busy poses move", () => {
    for (const [key, sprite] of sprites) {
      const looks = POSES.map((pose) => frameOf(sprite, pose, 0).join("\n"));
      expect(new Set(looks).size, key).toBe(POSES.length);
      for (const pose of ["working", "hailing", "speaking"] as const) {
        expect(frameOf(sprite, pose, 1), `${key} ${pose}`).not.toEqual(frameOf(sprite, pose, 0));
      }
    }
  });

  it("are all different, and every Game Studio job has its own", () => {
    const faces = new Set(sprites.map(([, sprite]) => sprite.base.join("\n")));
    expect(faces.size).toBe(sprites.length);
    const avatars = gameStudio.roster.map((job) => job.avatar);
    expect(avatars.every((avatar) => avatar && avatar in SPRITES)).toBe(true);
    expect(new Set(avatars).size).toBe(gameStudio.roster.length);
  });

  it("pose for every crew member state", () => {
    expect(CREW_STATUSES.map(poseOf)).toEqual(["idle", "working", "hailing", "speaking"]);
    expect(poseOf("stopped")).toBe("idle");
  });

  it("draw each run of one colour as one rectangle", () => {
    expect(pathsOf(["..oo.o", "oo...."])).toEqual([
      { letter: "o", d: "M2 0h2v1h-2zM5 0h1v1h-1zM0 1h2v1h-2z" },
    ]);
  });
});
